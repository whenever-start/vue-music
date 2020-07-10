<template>
  <section class="playlist">
    <playlist-detail
      :songs="songs"
      :bg-image="bgImage"
      :title="title"
    ></playlist-detail>
  </section>
</template>

<script>
import PlaylistDetail from 'components/playlist-detail/playlist-detail.vue'
import { mapGetters } from 'vuex'
import { createSong } from 'assets/js/song'
import { CODE_OK } from 'request/config'

export default {
  name: 'Playlist',
  components: {
    PlaylistDetail
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['disc', 'playlist']),
    bgImage() {
      return this.disc.picUrl
    },
    title() {
      return this.disc.name
    }
  },
  methods: {
    _getSongs(id) {
      this.$services
        .playlistDetail({
          params: { id }
        })
        .then((res) => {
          if (res.code === CODE_OK) {
            console.log('list: ', res.playlist.tracks)
            this.songs = this._normalizeSongs(res.playlist.tracks)
          }
        })
        .catch((err) => console.log(err))
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
      vm._getSongs(to.query.id)
    })
  },
  created() {
    this._getSongs(this.disc.id)
  }
}
</script>
