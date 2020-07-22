import services from 'request'
import { mergeSinger } from 'assets/js/song'
import { CODE_OK } from 'request/config'

const LIST_COUNT = 3

export default class Rank {
  constructor({ id, name, image, updateInfo, list }) {
    this.id = id
    this.name = name
    this.image = image
    this.updateInfo = updateInfo
    this.list = list
  }
}

export const createRank = (data) => {
  let list = []
  if (data.tracks.length >= LIST_COUNT) {
    list = data.tracks
  } else {
    services
      .playlistDetail({
        params: { id: data.id }
      })
      .then((res) => {
        if (res.code === CODE_OK) {
          let _list = res.playlist.tracks.slice(0, 3)
          _list.forEach((item) => {
            list.push({
              first: item.name,
              second: mergeSinger(item.ar)
            })
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return new Rank({
    id: data.id,
    name: data.name,
    image: data.coverImgUrl,
    updateInfo: data.updateFrequency,
    list
  })
}
