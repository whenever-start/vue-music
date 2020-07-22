import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)

import { Popup, Slider, Icon, Loading } from 'vant'
Vue.use(Popup)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Loading)
// Vue.use(Loadmore)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('./assets/image/error.jpg'),
  loading: require('./assets/image/loading.gif'),
  attempt: 2
})
// api
import './request'

Vue.prototype.$log = window.console.log

Vue.config.productionTip = false

// import fastclick from 'fastclick'
// fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
