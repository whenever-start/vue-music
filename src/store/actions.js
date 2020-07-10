import * as types from './mutation-types'
import { playMode } from 'assets/js/config'
import { shuffle } from 'assets/js/util'

/**
 *
 * 点击播放
 * @param {Array} list 当前点击项所在列表
 * @param {Number} index 当前 index
 */
export const selectPlay = ({ state, commit }, { list, index }) => {
  commit(types.SET_SEQUENCE_LIST, { list })

  let _list
  if (state.playMode === playMode.sequence) {
    _list = list
  } else if (state.playMode === playMode.loop) {
    _list = list
  } else if (state.playMode === playMode.random) {
    _list = shuffle(list)
    index = findSongIndex(_list, list[index])
  }
  commit(types.SET_CUR_INDEX, index)
  commit(types.SET_PLAYLIST, { list: _list })
  commit(types.SET_PLAYING_STATE, true)
}

/**
 *
 * 随机播放
 * @param {Array} list 当前点击项所在列表
 */
export const randomPlay = ({ commit }, { list }) => {
  commit(types.SET_SEQUENCE_LIST, { list })

  commit(types.SET_PLAY_MODE, playMode.random)

  let _list = shuffle(list)
  commit(types.SET_CUR_INDEX, 0)
  commit(types.SET_PLAYLIST, { list: _list })
  commit(types.SET_PLAYING_STATE, true)
}

/**
 *
 * 上 / 下一首
 * @param {String} direction next | prev
 */
// export const skipTo = ({ state, commit, dispatch }, { direction }) => {
export const skipTo = ({ state, commit, dispatch }, direction) => {
  let index = state.curIndex
  let len = state.playlist.length
  if (direction === 'next') {
    index++
  } else if (direction === 'prev') {
    index--
  } else {
    throw new Error('direction 必须为 next 或 prev')
  }

  if (state.playMode === playMode.sequence) {
    if (index === -1) {
      index = 0
      dispatch('pause')
      return
    }
    if (index === len) {
      index = len - 1
      dispatch('pause')
      return
    }
  } else if (state.playMode === playMode.loop) {
    if (direction === 'next') {
      index = index === len ? 0 : index
    } else {
      // prev
      index = index === -1 ? len - 1 : index
    }
  } else if (state.playMode === playMode.random) {
    dispatch('randomPlay', {
      list: state.sequenceList
    })
    return
  }
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_CUR_INDEX, index)
}

/**
 * 切换 playing 状态(true / false)
 */
export const togglePlaying = ({ state, commit }) => {
  commit(types.SET_PLAYING_STATE, !state.playing)
}

export const togglePlayMode = ({ state, commit }) => {
  console.log('toggle playMode')
  let len = Object.keys(playMode).length
  let mode = (state.playMode + 1) % len
  commit(types.SET_PLAY_MODE, mode)
}

/**
 * 暂停播放
 */
export const pause = ({ commit }) => {
  commit(types.SET_PLAYING_STATE, false)
}

/**
 * 切换全屏播放 | 最小化
 */
export const togglePlayerScreen = ({ state, commit }) => {
  commit(types.SET_FULL_SCREEN, !state.fullScreen)
}

/**
 * 输入歌单列表和歌曲对象, 输出歌曲所在 index
 * @param {Array} list 歌单列表
 * @param {Object} song 歌曲对象
 */
function findSongIndex(list, song) {
  return list.findIndex((item) => item.id === song.id)
}
