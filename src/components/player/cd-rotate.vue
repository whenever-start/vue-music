<template>
  <div class="cd-rotate">
    <div class="cd-wrap" ref="cdWrap" :class="{ 'cd-wrap--paused': !playing }">
      <img :src="image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    console.log(this.$refs.cdWrap)
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/mixin';

.cd-rotate {
  position: relative;
  padding-bottom: 100%;

  &:before {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    .bg-image('./disc');
    background-repeat: no-repeat;
    background-size: contain;
  }

  .cd-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
    z-index: 3;
    background-image: url('./disc_default.png');
    background-repeat: no-repeat;
    background-size: contain;
    animation: rotate 20s infinite linear forwards;

    &--paused {
      animation-play-state: paused;
    }

    img {
      width: 100%;
      display: block;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
