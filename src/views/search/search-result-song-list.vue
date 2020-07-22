<template>
  <div class="search-result-song-list">
    <ul class="song-list">
      <li
        class="song-list-cell"
        v-for="song in songs"
        :key="song.id"
        @click="selectItem(song)"
      >
        <div class="item-content">
          <p class="item-name">
            {{ song.name }}
          </p>
          <p class="item-assist">
            {{ song.artists | mergeSinger }} - {{ song.album.name }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mergeSinger } from 'assets/js/song'
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    mergeSinger
  },
  methods: {
    selectItem(song) {
      this.$emit('select', song)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/variable';

.search-result-song-list {
  .song-list {
    &-cell {
      margin-top: 20px;

      &:first {
        margin-top: 0;
      }

      .item-name {
        color: #3079ff;
        font-size: @fs-x;
      }

      .item-assist {
        margin-top: 10px;
        color: @cl-assist;
      }
    }
  }
}
</style>
