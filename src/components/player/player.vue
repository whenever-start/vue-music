<template>
  <div class="player" v-if="playlist.length > 0">
    <normal-player
      v-show="fullScreen"
      :curTime="curTime"
      @seek="onSeek"
      @toggle="togglePopup"
    ></normal-player>

    <mini-player v-show="!fullScreen" @toggle="togglePopup"></mini-player>

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
import { playerMixin } from 'assets/js/mixin'
import { CODE_OK } from 'request/config'

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
      show: false,
      curTime: 0
    }
  },
  computed: {
    source() {
      if (this.playlist.length === 0) return
      return this.playlist[this.curIndex].url
    }
  },
  methods: {
    onReady() {
      this.songReady = true
    },
    onEnd() {
      this.skipTo('next')
    },
    onError() {
      console.error('加载失败: ', this.curSong)
      this.skipTo('next')
    },
    onStalled() {
      this.$refs.audio.load()
      this.$refs.audio.play()
    },
    onSeek(duration) {
      this.$refs.audio.currentTime = duration
    },
    updateTime(e) {
      this.curTime = Math.floor(e.target.currentTime)
    },
    play() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.songReady) {
          clearInterval(this.timer)
          this.$refs.audio.play()
        }
      }, 500)
    },
    togglePopup(show) {
      this.show = show
    },
    _getLyric() {
      // 已有歌词, 或者还未有当前播放歌曲, 则不获取歌词
      if (!!this.curSong.lyric || !this.curSong.id) return

      this.$services
        .lyric({
          params: { id: this.curSong.id }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            this.setCurSongLyric(res.lrc.lyric)
          }
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
  },
  created() {
    this.setPlayingState(false)
    this._getLyric()
  },
  watch: {
    source() {
      this._getLyric()
      this.play()
    },
    playing(playing) {
      const audio = this.$refs.audio
      if (!audio) return
      this.$nextTick(() => {
        playing ? audio.play() : audio.pause()
      })
    }
  }
}
</script>
