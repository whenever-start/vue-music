import { playMode } from 'assets/js/config'
import { loadSearch } from 'assets/js/cache'
const state = {
  playlist: [],
  sequenceList: [],
  curIndex: 0,
  disc: {},
  fullScreen: false,
  playMode: playMode.sequence,
  playing: false,
  curDuration: 0,
  singer: {},
  rank: {},
  query: '',
  hots: [],
  suggests: [],
  histories: loadSearch(),
  results: []
}

export default state
