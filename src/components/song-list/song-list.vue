<template>
  <ul class="song-list">
    <!-- :class="{ 'song-list-item--active': itemActive(song) }" -->
    <li
      class="song-list-item"
      :class="{
        'song-list-item--active':
          playlist.length > 0 ? playlist[curIndex].id === song.id : false
      }"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <span class="item-rank">{{ index + 1 }}</span>
      <div class="item-content">
        <p class="item-name">
          {{ song.name }}
          <span class="name-assist" v-if="song.alias">{{ song.alias }}</span>
        </p>
        <p class="item-assist">{{ song.singer }}</p>
      </div>
      <i class="more-operate van-icon van-icon-ellipsis"></i>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['playlist', 'curIndex'])
  },
  methods: {
    selectItem(song, index) {
      this.$emit('select', song, index)
    },
    itemActive(song) {
      if (this.playlist.length === 0) return false
      this.playlist[this.curIndex].id === song.id
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';
@import '~assets/less/mixin';

.song-list {
  padding: 10px 0;
  background-color: #fff;

  &-item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    &:active {
      background-color: #f2f2f2;
    }

    &--active {
      .item-name {
        color: @cl-primary-l;
      }
    }

    .item-rank {
      width: 50px;
      flex-shrink: 0;
      text-align: center;
      color: @cl-assist;
    }

    .item-content {
      flex-grow: 1;
      width: calc(100% - 100px);

      .item-name {
        font-size: @fs-x;
        .line-clamp(1);

        &-assist {
          margin-left: 4px;
          color: @cl-assist;
        }
      }

      .item-assist {
        margin-top: 10px;
        color: @cl-assist;
      }
    }

    .more-operate {
      width: 50px;
      flex-shrink: 0;
      text-align: center;
    }
  }
}
</style>
