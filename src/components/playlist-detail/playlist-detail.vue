<template>
  <section class="playlist-detail">
    <header class="playlist-detail-header">
      <i class="icon-back icon" @click="back"></i>
      <h1 class="title">{{ title }}</h1>
    </header>

    <div class="playlist-detail-info" ref="info" :style="bgStyle">
      <div class="mask"></div>
    </div>

    <div class="layer" ref="layer"></div>

    <div class="playlist-detail-list-shell" ref="shell">
      <div class="wrapper" ref="wrapper" :style="wrapperStyle">
        <song-list :songs="songs" @select="selectSong"></song-list>
      </div>
    </div>
  </section>
</template>

<script>
import BScroll from 'better-scroll'
import SongList from 'components/song-list/song-list'
import { playerMixin } from 'assets/js/mixin'

export default {
  name: 'PlaylistDetail',
  components: {
    SongList
  },
  mixins: [playerMixin],
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    bgImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollY: 0,
      reserveTop: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`
    },
    wrapperStyle() {
      return this.playlist.length > 0 ? 'bottom: 60px' : ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true
        // startY: 10 // 处理移动端, 页面刷新后无法滑动(via浏览器)
      })

      this.scroll.on('scroll', (pos) => {
        this.scrollY = pos.y
      })
    },
    selectSong(song, index) {
      if (this.playlist.length > 0 && song.id === this.curSong.id) {
        this.togglePlayerScreen()
        return
      }
      this.selectPlay({
        index,
        list: this.songs
      })
    }
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.reserveTop, newY)
      this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
      if (newY < this.reserveTop) {
        this.$refs.info.style.height = '40px'
        this.$refs.info.style.zIndex = 10
      } else {
        this.$refs.info.style.height = ''
        this.$refs.info.style.zIndex = 0
      }
    }
  },
  mounted() {
    this._initScroll()
    this.reserveTop = -(this.$refs.wrapper.offsetTop - 40)
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';
@import '~assets/less/mixin';

.playlist-detail {
  height: 100%;
  overflow: hidden;

  &-header {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;

    .title {
      font-size: @fs-xxl;
      color: #fff;
      .line-clamp(1);
      margin-right: 10px;
    }

    .icon {
      padding: 10px;
      font-size: 22px;
      color: #fff;
    }
  }

  &-info {
    position: relative;
    height: 50%;
    background-size: cover;

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
      z-index: 999;
    }
  }

  .layer {
    position: relative;
    height: 100%;
  }

  &-list-shell {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 1;

    .wrapper {
      position: absolute;
      top: 50%;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
