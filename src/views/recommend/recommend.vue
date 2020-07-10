<template>
  <div class="recommend">
    <mt-loadmore
      ref="loadmore"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      topPullText=""
      :topDistance="20"
      :auto-fill="false"
      :bottomAllLoaded="allLoaded"
    >
      <!-- 轮播图 -->
      <base-slider v-if="this.banners.length > 0">
        <div class="banner-thumb" v-for="item in banners" :key="item.bannerId">
          <img :src="item.pic" />
        </div>
      </base-slider>

      <section class="show-module">
        <header class="show-module-header">
          <h3 class="title">歌单推荐</h3>
          <span class="more">歌单广场</span>
        </header>
        <base-list class="show-module-list">
          <li v-for="item in playlists" :key="item.id">
            <div class="show-module-cell" @click="selectItem(item)">
              <div class="thumbnail">
                <img v-lazy="item.picUrl" alt="" />
              </div>
              <span class="name">{{ item.name }}</span>
              <span class="num">{{ item.playCount }}</span>
            </div>
          </li>
        </base-list>
      </section>
    </mt-loadmore>
  </div>
</template>

<script>
import BaseSlider from 'base-components/slider/base-slider'
import BaseList from 'base-components/show-list/base-list'
import { mapMutations } from 'vuex'
import { CODE_OK } from 'request/config.js'

export default {
  components: {
    BaseSlider,
    BaseList
    // Scroll
  },
  data() {
    return {
      banners: [],
      playlists: [],
      limit: 30,
      allLoaded: false
    }
  },
  created() {
    this._getBanners()
    this._getPlaylists()
  },
  methods: {
    ...mapMutations({
      setDisc: 'SET_DISC'
    }),
    async loadTop() {
      try {
        await this._getBanners()
        this.$refs.loadmore.onTopLoaded()
      } catch (error) {
        return await Promise.reject(error)
      }
    },
    async loadBottom() {
      try {
        this.limit += 30
        await this._getPlaylists()
        this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = false
      } catch (error) {
        return Promise.reject(error)
      }
    },
    selectItem(item) {
      this.$router.push({
        path: '/playlist',
        query: { id: item.id }
      })
      this.setDisc(item)
    },
    _getBanners() {
      this.$services
        .banners({
          params: { type: 2 }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            this.banners = res.banners
          }
        })
        .catch((err) => console.log(err))
    },
    _getPlaylists() {
      this.$services
        .personalized({
          params: { limit: this.limit }
        })
        .then((res) => {
          console.log('playlists: ', res)
          if (res.code == CODE_OK) {
            this.playlists = res.result
          }
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>
