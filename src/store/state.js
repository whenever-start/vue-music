import { playMode } from 'assets/js/config'
const state = {
  playlist: [],
  sequenceList: [],
  curIndex: 0,
  disc: {},
  fullScreen: false,
  playMode: playMode.sequence,
  playing: false,
  curDuration: 0,
  singer: {}
}

export default state
