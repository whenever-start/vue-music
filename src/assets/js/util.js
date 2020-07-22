function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 将新项添加到原数组(添加到最前, 符合匹配项删除, 可以保持最大长度)
 * @param {Array} arr 原数组
 * @param {String} item 要添加的新项
 * @param {Function} compare 对比函数
 * @param {Number} maxLen 可选, 原数组最大长度
 * @example
 *
 * addItemToArray(['邓紫棋','光年之外','泡沫'], '泡沫', item => item === '泡沫', 10)
 * // => ['泡沫',邓紫棋','光年之外']
 *
 * addItemToArray([{id: 1}, {id: 2}], {id: 3}, item => item.id === 3, 10)
 * // => [{id: 3}, {id: 1}, {id: 2}]
 */
export function addItemToArray(arr, item, compare, maxLen) {
  const index = arr.findIndex(compare)

  if (index === -1) {
    // 未找到
  } else if (index === 0) {
    // 第一个
    return
  } else if (index > 0) {
    // 已有, 但非第一个
    arr.splice(index, 1)
  }
  arr.unshift(item)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

export function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index === -1) return
  arr.splice(index, 1)
}
