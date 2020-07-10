<template>
  <div class="play-slider">
    <span class="text">{{ format(curTime) }}</span>
    <van-slider
      class="slider"
      :style="{ width: 'auto' }"
      button-size="10px"
      v-model="value"
      :valur="value"
      @change="onChange"
      @drag-start="onStart"
      @drag-end="onEnd"
    ></van-slider>
    <span class="text">{{ format(duration) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  computed: {
    curTime() {
      return (this.value * this.duration) / 100
    }
  },
  data() {
    return {
      value: this.percent,
      /**
       * 进度条是否可以变化(拖动时)
       */
      canSeek: true
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.value)
    },
    format(duration) {
      duration = Math.floor(duration)
      let second = this._pad(duration % 60)
      let minute = this._pad(Math.floor(duration / 60))
      return `${minute}:${second}`
    },
    onStart() {
      this.canSeek = false
      this.$emit('drag-start')
    },
    onEnd() {
      this.canSeek = true
      this.$emit('drag-end')
    },
    _pad(num) {
      if (num < 10) {
        return '0' + num
      } else {
        return num + ''
      }
    }
  },
  watch: {
    percent(newVal) {
      if (!this.canSeek) return
      this.value = newVal * 100
    }
  }
}
</script>

<style lang="less" scoped>
.play-slider {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    flex: 0 1 auto;
    color: #fff;
  }

  .slider {
    flex: 1 0 auto;
    margin: 0 10px;
  }
}
</style>
