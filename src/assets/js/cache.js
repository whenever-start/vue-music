import { addItemToArray, deleteFromArray } from './util'
import { get, set, remove } from './storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

export const saveSearch = (query) => {
  let histories = get(SEARCH_KEY, [])
  addItemToArray(histories, query, (item) => item === query, SEARCH_MAX_LEN)
  set(SEARCH_KEY, histories)
  return histories
}

export const deleteSearch = (query) => {
  let histories = get(SEARCH_KEY, [])
  deleteFromArray(histories, (item) => item === query)
  set(SEARCH_KEY, histories)
  return histories
}

export const clearSearch = () => {
  remove(SEARCH_KEY)
  return []
}

export const loadSearch = () => {
  return get(SEARCH_KEY, [])
}
