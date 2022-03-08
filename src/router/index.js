import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue' // index.js在router目录下 相对位置 
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

import oslnfo1 from '../components/osInfo/oslnfo1.vue'
import oslnfo2 from '../components/osInfo/oslnfo2.vue'
import osCollection from '../components/osInfo/osCollection1.vue'
import osContrast from '../components/osInfo/osContrast.vue'

import  ELFScan from '../components/osInfo/ELFScan.vue'

import appInfo from '../components/appInfo/appinfo.vue'
import appCollection from '../components/appInfo/appCollection.vue'
import showAppInfo from '../components/appInfo/showAppInfo.vue'
import  showAppCompatibleInfo from '../components/appInfo/showAppCompatibleInfo.vue'
import showCheckInfo from '../components/appInfo/showCheckInfo.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect: '/login'},
  { path: '/login',component: Login },
  { path: '/home',component: Home,name:'haha',meta: {keepAlive: true},
    redirect:'Weclome',
    children:[
    {path:'/weclome',component:Welcome},
    {path:'/zhiwen1',component:oslnfo1},
    {path:'/osinfo2',component:oslnfo2},
    {path:'/os1',component:osCollection},
    {path:'/os2',component:osContrast},


    {path:'/zhiwen2',component:appInfo},
    {path:'/appCollection',component:appCollection},
    {path:'/showAppInfo',component:showAppInfo},
    {path:'/showAppCompatibleInfo',component:showAppCompatibleInfo},
    {path:'/showCheckInfo',component:showCheckInfo},

    {path:'/ELFScan',component:ELFScan}

]
  }
 
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})


// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
