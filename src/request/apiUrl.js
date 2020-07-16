/*
 * api接口地址汇总
 */

export const apiUrl = {
  /**
   * 登陆
   * @param phone(必选) 手机号码
   * @param password(必选) 密码
   * @example /login/cellphone?phone=xxx&password=yyy
   */
  login: '/login/cellphone',

  /**
   * 每日推荐歌单(需要登陆)
   * @example /recommend/resource
   */
  recommendResource: '/recommend/resource',

  /**
   * 推荐歌单
   * @param limit(可选) 返回的歌单上限, 默认 30
   * @example /personalized
   * @returns res.result
   */
  personalized: '/personalized',

  /**
   * 获取歌单详情
   * @param id(必选) 歌单 id
   * @example /playlist/detail?id=24381616
   */
  playlistDetail: '/playlist/detail',

  /**
   * 每日推荐歌曲 (需要登录)
   * @example /recommend/songs
   */
  recommendSongs: '/recommend/songs',

  /**
   * 推荐新音乐
   * @example /personalized/newsong
   */
  recommendNewSongs: '/personalized/newsong',

  /**
   * 排行榜
   * @example /top/list
   */
  topList: '/top/list',

  /**
   * 推荐电台
   * @example /program/recommend
   */
  programRecommend: '/program/recommend',

  /**
   * 获取用户信息
   * @param id(必选)
   * @example /user/detail?uid=32953014
   */
  userDetail: '/user/detail',

  /**
   * 获取歌曲详情
   * @param ids 多个id用逗号分开: ids=111,222,333...
   * @example /song/detail?ids=347230
   */
  songDetail: '/song/detail',

  /**
   * 获取歌曲播放地址
   * @param id(必选)
   * @example /song/url?id=347230
   */
  songUrl: '/song/url',

  /**
   * 获取歌词
   * @param id(必选)
   * @example /lyric?id=33894312
   */
  lyric: '/lyric',

  /**
   * 轮播图
   * @param type 0(默认): pc, 1: android, 2: iphone, 3: ipad
   * @example /banner?type=2
   */
  banners: '/banner',

  /**
   * 歌手分类列表
   * @param cat(必选): 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
   * @param limit(可选) 默认30
   * @param offset
   * @param type(可选) -1 全部, 1 男歌手, 2 女歌手, 3 乐队
   * @param area(可选) -1 全部, 7 华语, 96 欧美, 8 日本, 16 韩国, 0 其他
   * @example /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
   */
  artistList: '/artist/list',

  /**
   * @param id(必须)
   * @example /artists?id=6452
   */
  artists: '/artists'
}
