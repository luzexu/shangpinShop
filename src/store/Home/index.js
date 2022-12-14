import {
    reqCategoryList,
    reqGetBannerList,
    reqFloorList
} from '@/api/ApiManagement'
// home 模块小仓库
const state = {
    // state 中的数据默认初始值别瞎写
    categoryList: [],
    bannerList: [],
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
};
const actions = {
    // 通过api 里面的接口函数调用，向服务器发请求，获取服务期的数据
    async categoryList({
        commit
    }) {
        let result = await reqCategoryList()

        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({
        commit
    }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floor数据
    async getFloorList({
        commit
    }) {
        let result = await reqFloorList()

        if (result.code == 200) {
            // 提交mutation
            commit('GETFLOORLIST', result.data)
        }
    }

};
const getters = {};

// 对外暴露Store类的一个实例
export default {
    state, // 仓库存储数据的地方 状态
    mutations, // 唯一修改state的手段
    actions, //处理action，可以书写自己的业务逻辑，也可以处理异步
    getters, //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

};