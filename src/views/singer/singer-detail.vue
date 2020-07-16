<template>
  <div class="singer-detail">
    <playlist-detail
      :songs="songs"
      :bg-image="singer.image"
      :title="singer.name"
    ></playlist-detail>
  </div>
</template>

<script>
import PlaylistDetail from 'components/playlist-detail/playlist-detail.vue'
import { playerMixin } from 'assets/js/mixin'
import { CODE_OK } from 'request/config'
import { createSong } from 'assets/js/song'
export default {
  components: { PlaylistDetail },
  mixins: [playerMixin],
  data() {
    return {
      songs: []
    }
  },
  methods: {
    _getSongs() {
      this.$services
        .artists({
          params: { id: this.singer.id }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            console.log(res.hotSongs)
            this.songs = this._normalizeSongs(res.hotSongs)
          }
        })
    },
    _normalizeSongs(list) {
      let arr = []
      list.forEach((data) => {
        if (data.id) {
          arr.push(createSong(data))
        }
      })
      return arr
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm._getSongs()
    })
  }
}
</script>
