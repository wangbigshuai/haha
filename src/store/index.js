import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    os_count:1,
    os_name:'',

    app_name:'',
    app_version:'',
    app_status:1,
    activeIndex_app:'0',

    //采集os所用到的状态
    status:1,
    status1:0,
    // status2:1,
    activeIndex: '0',
    activeIndex1:'0',

  //操作系统指纹信息
   showOsInfo_row:{},
   showAppInfo_row:{},
   //操作系统对比
   contrast_row1:{},
   contrast_row2:{},
//兼容性分析
   app_contrast:{},
   os_contrast:{},
   selections:[],
   check:{}

   //c操作系统新加兼容性
  //  app_contrast1:{},
  //  os_contrast1:{},
//操作系统新加对比
  //  contrast_row11:{},
  //  contrast_row22:{},




  },
  // created() {

  // },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
export default store;
