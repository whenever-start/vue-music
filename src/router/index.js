import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Recommend from '../views/recommend/recommend'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: Recommend
      },
      {
        path: 'singer',
        name: 'Singer',
        component: () => import('../views/singer/singer')
      },
      {
        path: 'rank',
        name: 'Rank',
        component: () => import('../views/rank/rank')
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/search/search')
      }
    ]
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import('../views/playlist/playlist')
  },
  {
    path: '/singer-detail',
    name: 'SingerDetail',
    component: () => import('../views/singer/singer-detail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
