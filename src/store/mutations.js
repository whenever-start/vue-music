import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAYLIST](state, { list }) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, { list }) {
    state.sequenceList = list
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_CUR_INDEX](state, index) {
    state.curIndex = index
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playMode = mode
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },

  [types.SET_CUR_DURATION](state, duration) {
    state.curDuration = duration
  },

  [types.SET_CUR_SONG_LYRIC](state, lyric) {
    state.playlist[state.curIndex].lyric = lyric
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
