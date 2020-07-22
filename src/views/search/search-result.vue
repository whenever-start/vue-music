<template>
  <div class="search-result">
    <van-loading v-show="loading" :style="{ 'text-align': 'center' }" />

    <song-list :songs="results" @select="selectSong" />
  </div>
</template>

<script>
import SongList from './search-result-song-list'
export default {
  components: {
    SongList
  },
  props: {
    results: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectSong(song) {
      this.$emit('selectSong', song)
    }
  }
}
</script>
