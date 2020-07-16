# Player 组件

## 结构

***位置:*** `App.vue`

**结构:**

```text
Player                  获取/初始化数据: 播放列表, 歌词
  |-NormalPlayer        全屏播放器
    |-CdRotate          cd 旋转, props: playing(控制是否旋转)
    |-PlayerLyric       歌词播放器, props: playing(控制是否播放), curTime(关联播放器进度条) lyric(歌词)
    |-Play-Slider       播放进度条, props: curTime duration
  |-MiniPlayer          mini 播放器
  |-audio
```
