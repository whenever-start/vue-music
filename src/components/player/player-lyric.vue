<template>
  <section class="player-lyric">
    <div class="lyric-wrap">
      <div class="lyric-list">
        <p class="lyric-line" v-for="(line, index) in lines" :key="index">
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * 传入 lyric, currentTime
 */
export default {
  props: {
    lyric: {
      type: String,
      default: ''
    },
    /**
     * 歌曲 audio.currentTime
     * 单位 s
     */
    curTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      lines: [],
      times: []
    }
  }
}
</script>

<style lang="less" scoped>
.player-lyric {
  .lyric-wrap {
    .lyric-list {
      .lyric-line {
        margin-top: 20px;
      }
    }
  }
}
</style>
