<template>
  <section class="player-playlist">
    <header class="header van-hairline--bottom">
      <div class="header-left" @click="togglePlayMode">
        <i class="icon" :class="playModeIcon"></i>
        <span class="text">
          {{ playModeText }}
        </span>
      </div>

      <div class="header-right">
        <span class="text">收藏全部</span>
        <i class="icon icon-clear"></i>
      </div>
    </header>
    <div class="wrap">
      <ul class="list">
        <li
          class="list-cell"
          v-for="(song, index) in sequenceList"
          :key="song.id"
          :class="{ 'list-cell--active': playlist[curIndex].id === song.id }"
          @click="selectSong(song, index)"
        >
          <div class="content">
            <i class="icon-play" v-show="playlist[curIndex].id === song.id"></i>
            <p class="info van-ellipsis">{{ song.name }} - {{ song.singer }}</p>
            <i class="icon icon-delete"></i>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { playerMixin } from 'assets/js/mixin'
// import { playMode } from 'assets/js/config'
export default {
  mixins: [playerMixin],
  methods: {
    selectSong(song, index) {
      if (this.playlist.length > 0 && song.id === this.curSong.id) {
        this.togglePlayerScreen()
        return
      }
      this.selectPlay({
        index,
        list: this.sequenceList
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';

.player-playlist {
  padding: 0 @pd-base;
  height: 100%;
  overflow: hidden;
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left,
    &-right {
      display: flex;
      align-items: center;
      height: 60px;
    }

    &-left {
      .text {
        margin-left: 10px;
      }
    }

    &-right {
      .text {
        margin-right: 10px;
      }
    }

    .icon {
      font-size: 18px;
      color: @cl-assist-l;
    }
  }

  .wrap {
    padding: 0 @pd-base;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;

    .list {
      &-cell {
        height: 40px;

        &--active {
          color: @cl-primary-l;
        }

        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;

          .info {
            margin-left: 10px;
            margin-right: 10px;
            flex-grow: 1;
          }

          .icon {
            color: @cl-assist-l;
          }
        }
      }
    }
  }
}
</style>
