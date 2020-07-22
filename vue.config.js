module.exports = {
  publicPath: '/', //根路径
  outputDir: 'dist', //构建输出目录，执行：npm run build后项目打包在dist文件下
  assetsDir: 'assets', //静态资源目录（js,css,img,fonts）
  chainWebpack: (config) => {
    // 别名, .set(key, value)
    config.resolve.alias
      .set('components', '@/components')
      .set('api', '@/api')
      .set('assets', '@/assets')
      .set('store', '@/store')
      .set('views', '@/views')
      .set('request', '@/request')
      .set('base-components', '@/base-components')
  },
  devServer: {
    open: true, //浏览器自动打开页面
    host: 'localhost', //域名
    port: 8060,
    https: false,
    hotOnly: false //热更新（webpack已实现了，这里false即可）
  }
}
