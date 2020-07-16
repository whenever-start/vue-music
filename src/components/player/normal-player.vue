<template>
  <div class="normal-player">
    <div class="background">
      <img :src="curSong.image" alt="" />
    </div>

    <header class="header">
      <i class="van-icon van-icon-arrow-left" @click="togglePlayerScreen"></i>
      <div>
        <p class="name">{{ curSong.name }}</p>
        <p class="assist">
          {{ curSong.singer }}
          <i class="van-icon van-icon-arrow"></i>
        </p>
      </div>
      <i class="van-icon van-icon-share"></i>
    </header>

    <section class="content" @click="toggleContentShow">
      <div class="cd-rotate-position" v-show="contentShow === 'cd'">
        <cd-rotate :image="curSong.image" :playing="playing"></cd-rotate>
        <transition name="fade">
          <p class="play-lyric">
            {{ playLyric }}
          </p>
        </transition>
      </div>

      <div class="lyric-position" v-show="contentShow === 'lyric'">
        <player-lyric
          :lyric="curSong.lyric"
          :curTime="curDuration"
          :playing="playing"
          @lrc="getPlayLyric"
        ></player-lyric>
      </div>
    </section>

    <footer class="footer">
      <play-slider
        :duration="duration"
        :percent="percent"
        :curTime="curTime"
        @change="seek"
        @drag-end="dragEnd"
      ></play-slider>

      <div class="controls">
        <i class="icon" :class="playModeIcon" @click="togglePlayMode"></i>
        <i class="icon icon-prev" @click="skipTo('prev')"></i>
        <i
          class="controls-play van-icon"
          :class="`van-icon-${playing ? 'pause' : 'play'}-circle-o`"
          @click="togglePlaying"
        ></i>
        <i class="icon icon-next" @click="skipTo('next')"></i>
        <i class="icon icon-playlist" @click.stop="toggle"></i>
      </div>
    </footer>
  </div>
</template>

<script>
import PlaySlider from 'base-components/play-slider/play-slider'
import PlayerLyric from './player-lyric'
import CdRotate from './cd-rotate'
import { playerMixin } from 'assets/js/mixin'
import { mapMutations, mapGetters } from 'vuex'

export default {
  mixins: [playerMixin],
  components: {
    PlaySlider,
    PlayerLyric,
    CdRotate
  },
  props: {
    lyric: {
      type: String,
      default: ''
    },
    curTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      percent: 0,
      show: false,
      contentShow: 'cd',
      playLyric: ''
    }
  },
  computed: {
    ...mapGetters(['curDuration', 'duration'])
  },
  methods: {
    ...mapMutations({
      setCurDuration: 'SET_CUR_DURATION',
      setCurSongLyric: 'SET_CUR_SONG_LYRIC'
    }),
    seek(percent) {
      let duration = this.duration * (percent / 100)
      this.setCurDuration(duration)
      this.$emit('seek', duration)
    },
    dragEnd() {
      if (!this.playing) this.togglePlaying()
    },
    toggle() {
      this.$emit('toggle', !this.show)
    },
    toggleContentShow() {
      this.contentShow = this.contentShow === 'cd' ? 'lyric' : 'cd'
    },
    getPlayLyric(txt) {
      this.playLyric = txt
    }
  },
  watch: {
    curTime(newVal) {
      this.percent = newVal / this.duration
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';

.normal-player {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: @layer-top;
  background-color: #333;
  @space: 20px;
  color: #fff;

  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      opacity: 0.8;
      filter: blur(100px);
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @space;
    height: 60px;
    flex: none;

    & > .van-icon {
      font-size: 22px;
    }

    .assist {
      color: #ddd;
      margin-top: 6px;

      .van-icon {
        font-size: 12px;
      }
    }
  }

  .content {
    flex: 1 0 0;
    overflow: hidden;

    .cd-rotate-position {
      width: 80%;
      margin: 70px auto 0;
    }

    .play-lyric {
      line-height: 50px;
      color: #fff;
      margin-top: 10px;
      text-align: center;
      transition: 1s opacity;
    }

    .lyric-position {
      height: 100%;
      margin-top: 10px;
      overflow: hidden;
    }
  }

  .footer {
    padding: 0 20px;
    flex: none;
    // height: 60px;

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;

      .icon {
        font-size: 22px;
      }

      .controls-play {
        font-size: 32px;
      }
    }
  }
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 0.5;
}
.fade-enter-to,
.fade-leave-to {
  opacity: 1;
}
</style>
