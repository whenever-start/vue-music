# vue-music

[toc]

## 待完成

`normal-player` 动画
全屏播放 `share` 弹出框
全屏播放 点击 `header` 处的歌手跳转到歌手页面

## 命令

---

```shell
# 安装依赖
npm install
# 运行
npm run serve
# 打包
npm run build
# lint
npm run lint
```

## vue.config.js

---

> [配置](https://cli.vuejs.org/config/)

**配置路径别名:**

> [vue-cli3 配置路径别名](https://segmentfault.com/a/1190000016135314)
[配置路径别名](https://segmentfault.com/q/1010000013261283)

```js
let path = require('path')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    chainWebpack: config => { // 别名, .set(key, value)  注意: ChainedMap不可用
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('assets', resolve('src/assets'))
            .set('store', resolve('src/store'))
            .set('views', resolve('src/views'))
    }
}
```

```js
module.exports = {
    publicPath: "/", //根路径
    outputDir: "dist", //构建输出目录，执行：npm run build后项目打包在dist文件下
    assetsDir: "assets", //静态资源目录（js,css,img,fonts）
    chainWebpack: config => { // 别名, .set(key, value), @已经配置过了, 可以直接拿来用
        config.resolve.alias
            .set('components', '@/components')
            .set('api', '@/api')
            .set('assets', '@/assets')
            .set('store', '@/store')
            .set('views', '@/views')
    },
    devServer: {
        open: true, //浏览器自动打开页面
        host: 'localhost', //域名
        port: 8060,
        https: false,
        hotOnly: false //热更新（webpack已实现了，这里false即可）
    }
}
```

## 依赖

---

```shell
# 解决移动端点击3s延迟, main.js 引入
cnpm install fastclick
```

```js
@import fastclick from 'fastclick'
fastclick.attach(document.body)
```

## 路由

---

```html
<nav class="tab">
    <router-link class="tab-item"
        v-for="item in tabs"
        :key="item.path"
        :to="item.path"
        active-class="tab-item--active"
    >
        <span class="tab-label">{{item.label}}</span>
    </router-link>
</nav>
```

```js
tabs: [
    {label: '推荐', path: '/recommend'},
    {label: '歌手', path: '/singer'},
    {label: '排行榜', path: '/rank'},
    {label: '搜索', path: '/search'}
]
```

**router/index.js:**

```js
const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        name: 'Recommend',
        component: Recommend
    },
    {
        path: '/singer',
        name: 'Singer',
        component: () => import('../views/singer/singer')
    },
    {
        path: '/rank',
        name: 'Rank',
        component: () => import('../views/rank/rank')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/search')
    }
]
```

## API

---


