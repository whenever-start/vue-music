<template>
  <div class="mini-player" @click="togglePlayerScreen">
    <div class="mini-player-avatar">
      <img :src="playlist[curIndex].image" />
    </div>

    <div class="mini-player-text">
      <p class="name">{{ playlist[curIndex].name }}</p>
      <p class="assist">{{ playlist[curIndex].singer }}</p>
    </div>

    <i
      class="mini-player-operate"
      :class="playing ? 'icon-pause' : 'icon-play'"
      @click.stop="togglePlaying"
    ></i>
    <i class="mini-player-operate icon-playlist" @click.stop="toggle"></i>
  </div>
</template>

<script>
import { playerMixin } from 'assets/js/mixin'
export default {
  mixins: [playerMixin],
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.show)
    }
  }
}
</script>

<style lang="less">
@import '~assets/less/variable';

.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  height: 44px;
  padding: 0 10px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      display: block;
    }
  }

  &-text {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px;
    height: 40px;

    .assist {
      color: @cl-assist;
    }
  }

  &-operate {
    margin-left: 15px;
    font-size: 22px;
    color: #000;
  }
}
</style>
