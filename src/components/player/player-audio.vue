<template>
  <audio :src="source" controls ref="audio" @canplay="onReady"></audio>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: ''
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      songReady: false,
      timer: null
    }
  },
  methods: {
    onReady() {
      this.songReady = true
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

      newVal ? audio.play() : audio.pause()
    }
  }
}
</script>

<style></style>
