<template>
  <section class="player-lyric">
    <div class="lyric-wrap" ref="lyricWrap">
      <div class="lyric-list" ref="lyricList">
        <p
          ref="lyricLine"
          class="lyric-line"
          :class="{ 'lyric-line--active': curLine === index }"
          v-for="(line, index) in curLyric.lines"
          :key="index"
        >
          {{ line.txt }}
        </p>
      </div>
    </div>
    <div class="layer"></div>
  </section>
</template>

<script>
import Lyric from 'assets/js/lyric'

/**
 * 当前歌词 top
 */
const CENTER_LINE_TOP = 200
export default {
  props: {
    /**
     * 原始歌词, 字符串
     */
    lyric: {
      type: String,
      default: ''
    },
    /**
     * 歌曲 audio.currentTime
     * 单位 s
     * 作用: 改变播放进度时(拖动播放进度条), 调整歌词进度
     */
    curTime: {
      type: Number,
      default: 0
    },
    /**
     * 作用: 歌曲播放/暂停时, 歌词播放/暂停
     */
    playing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curLyric: {},
      curLine: 0,
      firstPlay: false
    }
  },
  methods: {
    handleLyric({ lineNum, txt }) {
      this.curLine = lineNum
      if (lineNum < 5) {
        this.$refs.lyricWrap.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        const line = this.$refs.lyricLine[lineNum]
        this.$refs.lyricWrap.scrollTo({
          top: line.offsetTop - CENTER_LINE_TOP,
          behavior: 'smooth'
        })
      }
      this.$emit('lrc', txt)
    },
    formatLyc() {
      this.curLyric = new Lyric(this.lyric, this.handleLyric)

      if (this.playing) this.curLyric.play()
    }
  },
  created() {
    this.formatLyc()
  },
  watch: {
    lyric() {
      this.curLyric.stop()
      this.formatLyc()
      this.curLyric.seek(0)
    },
    playing() {
      if (Object.keys(this.curLyric).length === 0) return
      this.curLyric.togglePlay()
    },
    curTime(time) {
      this.curLyric.seek(time * 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.player-lyric {
  height: 100%;
  position: relative;

  .lyric-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;

    .lyric-list {
      padding: 0 20px;

      .lyric-line {
        line-height: 50px;
        font-size: 14px;
        text-align: center;
        color: #aaa;

        &:first-child {
          margin-top: 0;
        }

        &--active {
          color: #fff;
        }
      }
    }
  }

  .layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
