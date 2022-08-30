import {
    reqGetSearchInfo
} from '@/api/ApiManagement'

// search 模块小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    // 获取search模块的数据
    async getSearchList({
        commit
    }, params = {}) {
        // 当前这个reqGetSearchInfo这个函数在电泳获取服务器数据的时候，至少传递一个参数（空对象）
        // params 形参：是当用户派发action的时候 第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
// 计算属性  主要是简化仓库中的数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }

};

// 对外暴露Store类的一个实例
export default {
    state, // 仓库存储数据的地方 状态
    mutations, // 唯一修改state的手段
    actions, //处理action，可以书写自己的业务逻辑，也可以处理异步
    getters, //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

};