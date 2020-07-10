<template>
  <div class="player" v-if="playlist.length > 0">
    <normal-player
      v-show="fullScreen"
      @seek="onSeek"
      @toggle="togglePopup"
    ></normal-player>

    <mini-player v-show="!fullScreen" @toggle="togglePopup"></mini-player>

    <!-- controls
      style="position: fixed;top:200px;left:0;zIndex: 3000" -->
    <audio
      :src="source"
      ref="audio"
      @canplay="onReady"
      @ended="onEnd"
      @error="onError"
      @timeupdate="updateTime"
      @stalled="onStalled"
    ></audio>

    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '60%' }"
      round
    >
      <player-playlist></player-playlist>
    </van-popup>
  </div>
</template>

<script>
import NormalPlayer from './normal-player'
import MiniPlayer from './mini-player'
import PlayerPlaylist from 'components/player-playlist/player-playlist'
import { mapMutations } from 'vuex'
import { playerMixin } from 'assets/js/mixin'

export default {
  components: {
    NormalPlayer,
    MiniPlayer,
    PlayerPlaylist
  },
  mixins: [playerMixin],
  data() {
    return {
      songReady: false,
      timer: null,
      show: false
    }
  },
  computed: {
    source() {
      if (this.playlist.length === 0) return
      return this.playlist[this.curIndex].url
    }
  },
  methods: {
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurDuration: 'SET_CUR_DURATION'
    }),
    onReady() {
      this.songReady = true
    },
    onEnd() {
      this.next()
    },
    onError() {
      console.log(this.curSong)
      this.next()
    },
    onStalled() {
      this.$refs.audio.load()
      this.$refs.audio.play()
    },
    onSeek(duration) {
      this.$refs.audio.currentTime = duration
    },
    next() {
      this._initState()
      this.skipTo('next')
    },
    prev() {
      this._initState()
      this.skipTo('prev')
    },
    updateTime(e) {
      let currentTime = Math.floor(e.target.currentTime)
      this.setCurDuration(currentTime)
    },
    togglePopup(show) {
      this.show = show
    },
    _initState() {
      this.songReady = false
      this.setPlayingState(false)
    }
  },
  watch: {
    source() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.songReady) {
          clearInterval(this.timer)
          this.$refs.audio.play()
        }
      }, 500)
    },
    playing(newVal) {
      const audio = this.$refs.audio
      if (!audio) return
      this.$nextTick(() => {
        newVal ? audio.play() : audio.pause()
      })
    }
  }
}
</script>
