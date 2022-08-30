import {
    reqGoodsInfo,
    reqAddOrUpdateShopCart
} from '@/api/ApiManagement'

// 封装有课身份模块uuid
import {
    getUUID
} from '@/utils/uuid_token.js'
// home 模块小仓库
const state = {
    // state 中的数据默认初始值别瞎写
    goodInfo: {},
    uuid_token: getUUID()

};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }

};
const actions = {
    // 获取产品信息
    async getGoodInfo({
        commit
    }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中 || 修改某个产品的个数
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('haha'))
        }

    }


};
// 简化数据而生
const getters = {

    // 路径导航简化的数据
    categoryView(state) {

        return state.goodInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};

// 对外暴露Store类的一个实例
export default {
    state, // 仓库存储数据的地方 状态
    mutations, // 唯一修改state的手段
    actions, //处理action，可以书写自己的业务逻辑，也可以处理异步
    getters, //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

};