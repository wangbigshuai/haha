import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import { Loading } from 'element-ui';


// 导入NProgress, 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import store from './store'

// axios.defaults.baseURL = 'http://182.254.157.241:8000/api/'
axios.defaults.baseURL = 'http://192.168.1.103:8000/api/'

// // loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading () {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    background: 'rgba(0,0,0,0.5)',
    spinner: 'el-icon-loading',
    fullscreen:false,
    target: document.querySelector('.loading-area') // 设置加载动画区域
  })
}
function endLoading () {
  loading.close()
}
  function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
 function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 在request 拦截器中, 展示进度条 NProgress.start()
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  NProgress.start()
  if (config.isLoading !== false) { // 如果配置了isLoading: false，则不显示loading
    showFullScreenLoading()
  }

  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
// })
},error=>{
  hideFullScreenLoading()
  return Promise.reject(error.response)
})
// response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  hideFullScreenLoading() // 响应成功关闭loading
  return config
},error => {
  hideFullScreenLoading()
  let _status = error.response && error.response.status
  if (_status === 504 || _status === 404) {
    // 跳转404页面（目前没有，只能先跳转首页）
    router.push({ path: '/' })
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
