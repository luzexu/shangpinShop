import {
    reqCartList,
    reqDeleteCartById,
    reqUpdateCheckedByid
} from '@/api/ApiManagement'

// search 模块小仓库
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }

};
const actions = {
    // 获取购物车列表数据
    async getCartList({
        commit
    }) {
        let result = await reqCartList()

        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车数据
    async deleteCartBySkuId({
        commit
    }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'okkkkk'
        } else {
            return Promise.reject(new Error('hahahha'))
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckById({
        commit
    }, {
        skuId,
        isChecked
    }) {

        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ooook'
        } else {
            return Promise.reject(new Error('hhhh'))
        }
    },
    // 删除全部勾选的产品
    deleteALLCheckedCart({
        dispatch,
        getters
    }) {
        // context 
        let PromiseAll = []
        getters.cartList[0].cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : ''
            PromiseAll.push(promise)


        });
        return Promise.all(PromiseAll)

    },
    // 修改全部产品的状态
    updateAllCartChecked({
        dispatch,
        state
    }, isChecked) {
        let resultAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let result = dispatch('updateCheckById', {
                skuId: item.skuId,
                isChecked
            })
            resultAll.push(result)

        })
        return Promise.all(resultAll)
    }

};
// 计算属性  主要是简化仓库中的数据
const getters = {
    cartList(state) {
        return state.cartList || {}
    },
    // cartInfoList(state) {
    //     return
    // }


};

// 对外暴露Store类的一个实例
export default {
    state, // 仓库存储数据的地方 状态
    mutations, // 唯一修改state的手段
    actions, //处理action，可以书写自己的业务逻辑，也可以处理异步
    getters, //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

};