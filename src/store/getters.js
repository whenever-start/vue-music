export const playlist = (state) => state.playlist
export const sequenceList = (state) => state.sequenceList
export const disc = (state) => state.disc
export const fullScreen = (state) => state.fullScreen
export const curIndex = (state) => state.curIndex
export const curSong = (state) => state.playlist[state.curIndex] || {}
export const playMode = (state) => state.playMode
export const playing = (state) => state.playing

export const duration = (state, getters) =>
  Math.floor(getters.curSong.duration / 1000) || 0 // 音频总时长, 单位: 秒 只读
export const curDuration = (state) => state.curDuration

export const singer = (state) => state.singer
