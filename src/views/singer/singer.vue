<template>
  <div class="singer">
    <section
      class="singer-main"
      ref="singerMain"
      @scroll="handleAnchorFixed"
      @touchend="backAnchorFixed"
    >
      <singer-list
        v-for="(item, index) in singers"
        :key="item.title"
        :item="item"
        :index="index"
        :anchorIndex="anchorIndex"
        @select="selectSinger"
      ></singer-list>
    </section>
    <div class="index-bar">
      <ul class="index-list">
        <li
          class="index-list-item"
          :class="{ 'index-list-item--active': anchorIndex === index }"
          v-for="(anchor, index) in anchors"
          :key="anchor"
          @touchstart.stop="onIndexBarTouchStart"
          @touchmove.stop="onIndexBarTouchMove"
          @click="anchorIndex = index"
        >
          {{ anchor }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SingerList from './singer-list'
import { CODE_OK } from 'request/config'
import { HOT_TITLE, HOT_LEN } from 'assets/js/config'
import { createSinger } from 'assets/js/singer'
import { playerMixin } from 'assets/js/mixin'

const ANCHOR_INDEX_HEIGHT = 19
export default {
  components: {
    SingerList
  },
  mixins: [playerMixin],
  data() {
    return {
      singers: [],
      anchorIndex: 0,
      anchorTops: [],
      scrollTop: 0,
      startY: 0
    }
  },
  computed: {
    anchors() {
      let arr = []
      this.singers.forEach((singer) => {
        arr.push(singer.title[0])
      })
      return arr
    }
  },
  methods: {
    selectSinger({ singer }) {
      console.log(singer)
      this.setSinger(singer)
      this.$router.push('/singer-detail')
    },
    onIndexBarTouchMove(e) {
      let deltaY = e.touches[0].pageY - this.startY
      let title = e.target.innerText
      let scrollHeight = this.$refs.singerMain.scrollHeight
      let offsetHeight = this.$refs.singerMain.offsetHeight
      let index = this.anchors.indexOf(title)
      let _anchorIndex = parseInt(deltaY / ANCHOR_INDEX_HEIGHT) + index

      if (_anchorIndex < 0 || _anchorIndex > this.anchors.length - 1) return

      if (scrollHeight - this.anchorTops[_anchorIndex] >= offsetHeight) {
        this.anchorIndex = _anchorIndex
      }
    },
    onIndexBarTouchStart(e) {
      this.startY = e.touches[0].pageY
    },
    handleAnchorFixed(e) {
      this.scrollTop = e.target.scrollTop
      const len = this.anchorTops.length

      for (let i = 0; i < len; i++) {
        if (i < len - 1) {
          if (
            this.scrollTop >= this.anchorTops[i] &&
            this.scrollTop < this.anchorTops[i + 1]
          ) {
            this.anchorIndex = i
            return
          }
        } else {
          if (this.scrollTop > this.anchorTops[len - 1]) {
            this.anchorIndex = i
            return
          }
        }
      }
    },
    backAnchorFixed() {
      const len = this.anchorTops.length
      for (let i = 0; i < len; i++) {
        let offsetTop = this.anchorTops[i]
        if (this.scrollTop >= offsetTop - 34 && this.scrollTop < offsetTop) {
          this.$refs.singerMain.scrollTo(0, offsetTop)
        }
      }
    },
    formatSingers(list) {
      const singers = []
      const map = {}
      const hot = {
        title: HOT_TITLE,
        items: []
      }

      list.forEach((item, index) => {
        let singer = createSinger(item)

        // 热门
        if (index < HOT_LEN) {
          hot.items.push(singer)
        }

        // A-Z(对象) singers = {A: [], B: []}
        if (!map[singer.initial]) {
          map[singer.initial] = []
          map[singer.initial].push(singer)
        } else {
          map[singer.initial].push(singer)
        }
      })
      // 对象->数组 singers = [{title: A, items: []}, {...}]
      for (let key in map) {
        singers.push({
          title: key,
          items: map[key]
        })
      }
      // 排序
      singers.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 添加热门数组到最前
      singers.unshift(hot)

      return singers
    },
    _initAnchors() {
      const anchorElms = this.$refs.singerMain.querySelectorAll('.anchor')
      anchorElms.forEach((elm) => {
        this.anchorTops.push(elm.offsetTop - 90)
      })

      this.$once('hook:updated', this._initAnchors)
    },
    _getSinger() {
      this.$services
        .artistList({ params: { limit: 30, type: -1 } })
        .then((res) => {
          if (res.code === CODE_OK) {
            this.singers = this.formatSingers(res.artists)
          }
        })
    }
  },
  created() {
    this._getSinger()
  },
  mounted() {
    this._initAnchors()
  },
  watch: {
    anchorIndex() {
      this.$refs.singerMain.scrollTo(0, this.anchorTops[this.anchorIndex])
    }
  }
}
</script>
