import * as types from './mutation-types'
import { saveSearch, clearSearch } from 'assets/js/cache'

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
  },
  [types.SET_RANK](state, rank) {
    state.rank = rank
  },

  // search
  [types.SET_QUERY](state, query) {
    state.query = query
  },
  [types.SET_HOTS](state, hots) {
    state.hots = hots
  },
  [types.SET_SUGGESTS](state, suggests) {
    state.suggests = suggests
  },
  [types.SET_HISTORIES](state, query) {
    state.histories = saveSearch(query)
  },
  [types.CLEAR_HISTORIES](state) {
    state.histories = clearSearch()
  },
  [types.SET_RESULTS](state, results) {
    state.results = results
  }
}

export default mutations
