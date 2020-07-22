<template>
  <div class="top-list">
    <playlist-detail :songs="songs" :title="rank.name" :bgImage="rank.image" />
  </div>
</template>

<script>
import PlaylistDetail from 'components/playlist-detail/playlist-detail'
import { playerMixin } from 'assets/js/mixin'
import { formatSongs } from 'assets/js/song'
import { CODE_OK } from 'request/config'
export default {
  name: 'TopList',
  components: {
    PlaylistDetail
  },
  mixins: [playerMixin],
  data() {
    return {
      songs: []
    }
  },
  methods: {
    getSongs(id) {
      this.$services
        .playlistDetail({
          params: { id }
        })
        .then((res) => {
          if ((res.code = CODE_OK)) {
            console.log(res.playlist.tracks)
            this.songs = formatSongs(res.playlist.tracks)
          }
        })
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getSongs(to.query.id)
    })
  }
}
</script>
