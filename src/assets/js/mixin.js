import { mapGetters, mapActions } from 'vuex'
import { playMode } from 'assets/js/config'

export const playerMixin = {
  computed: {
    ...mapGetters([
      'playlist',
      'sequenceList',
      'disc',
      'fullScreen',
      'curIndex',
      'curSong',
      'playMode',
      'playing'
    ]),
    playModeIcon() {
      let cls = ''
      if (this.playMode === playMode.sequence) {
        cls = 'van-icon-exchange van-icon'
      } else if (this.playMode === playMode.loop) {
        cls = 'icon-sequence'
      } else if (this.playMode === playMode.random) {
        cls = 'icon-random'
      }
      return cls
    },
    playModeText() {
      let text = ''
      if (this.playMode === playMode.sequence) {
        text = '顺序播放'
      } else if (this.playMode === playMode.loop) {
        text = '循环播放'
      } else if (this.playMode === playMode.random) {
        text = '随机播放'
      }
      return text
    }
  },
  methods: {
    ...mapActions([
      'selectPlay',
      'randomPlay',
      'skipTo',
      'togglePlaying',
      'pause',
      'togglePlayerScreen',
      'togglePlayMode'
    ])
  }
}
