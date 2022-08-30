import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

// const state = {};
// const mutations = {};
// const actions = {};
// const getters = {};


// 引入小仓库
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopCart from './ShopCart/shopCart'
import user from './user.js'
import trade from './trade.js'



// 对外暴露Store类的一个实例
const store = new Vuex.Store({
    // 实现vuex 仓库 模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }

});
export default store