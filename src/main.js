import Vue from 'vue'
import App from './App.vue'

// 三级联动组件 --- 全局组件
import TypeNav from './components/TypeNav/myTypeNav'
// 两个参数 第一个 全局组件的名字第二个参数是哪一个组件
Vue.component(TypeNav.name, TypeNav)

import Carousel from '@/components/Carousel/myCarousel.vue'
Vue.component(Carousel.name, Carousel)

import Pagination from '@/components/Pagination/myPagination.vue'
Vue.component(Pagination.name, Pagination)


// 引入mockjs文件
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 发请求 search数据
import {
  reqGetSearchInfo
} from '@/api/ApiManagement'

// 引入路由
import router from '@/router'


// 引入vuex仓库

import store from '@/store';


// 引入element-UI
import {
  MessageBox
} from 'element-ui'

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import aoteman from '@/assets/images/1.gif'

// 引入表单校验插件
import '@/validate/validate.js'


Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: aoteman,
  attempt: 1
})

//element UI 注册组件的时候 还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;





// 统一接口文件api文件里面全部请求函数
import * as API from '@/api//ApiManagement'



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },

  // 注册路由  底下的写法KV一致 省略V 【router小写】
  // 组件都会拥有$router属性
  router,

  // 注册仓库 组件实例的身上会多一个属性$router
  store
}).$mount('#app')