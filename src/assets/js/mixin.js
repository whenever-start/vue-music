import { mapGetters, mapActions, mapMutations } from 'vuex'
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
      'playing',
      'singer'
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
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST',
      setSequenceList: 'SET_SEQUENCE_LIST',
      setDisc: 'SET_DISC',
      setFullScreen: 'SET_FULL_SCREEN',
      setCurIndex: 'SET_CUR_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurDuration: 'SET_CUR_DURATION',
      setCurSongLyric: 'SET_CUR_SONG_LYRIC',
      setSinger: 'SET_SINGER'
    }),
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
