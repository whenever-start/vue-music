/**
 * class Song
 */
export default class Song {
  constructor({ id, name, singer, alias, album, duration, image, url }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.alias = alias
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.lyric = ''
  }

  // getLyric() {
  //   if (this.lyric) return Promise.resolve(this.lyric)

  //   return new Promise((resolve, reject) => {
  //     services
  //       .lyric({
  //         params: { id: this.id }
  //       })
  //       .then((res) => {
  //         if (res.code === CODE_OK) {
  //           this.lyric = res.lyric
  //           resolve(this.lyric)
  //         } else {
  //           reject('没有歌词')
  //         }
  //       })
  //   })
  // }
}

export const createSong = (data) => {
  return new Song({
    id: data.id,
    name: data.name,
    singer: mergeSinger(data.ar),
    alias: mergeAlias(data.alia),
    album: data.al.name,
    duration: data.dt,
    image:
      data.al.picUrl ||
      `http://p1.music.126.net/dmlAK3-hoUyQMq_Rrx24dg==/${data.al.pic}.jpg`,
    url: `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
  })
}

function mergeSinger(artists) {
  if (artists.length === 0) return ''
  let arr = []
  artists.forEach((item) => arr.push(item.name))
  return arr.join(' / ')
}
function mergeAlias(alias) {
  if (alias.length === 0) return ''
  let arr = []
  alias.forEach((name) => arr.push(`(${name})`))
  return arr.join('、')
}
