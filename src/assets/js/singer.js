import pinyin from 'tiny-pinyin'
export default class Singer {
  constructor({ id, image, avatar, name, initial }) {
    this.id = id
    this.image = image
    this.avatar = avatar
    this.name = name
    this.initial = initial
  }
}

export const createSinger = (singerData) => {
  return new Singer({
    id: singerData.id,
    image: singerData.picUrl,
    avatar: singerData.img1v1Url,
    name: singerData.name,
    initial: pinyin.convertToPinyin(singerData.name)[0]
  })
}
