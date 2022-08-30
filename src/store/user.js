import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogout
} from '@/api/ApiManagement'
import {
    setToken,
    getToken,
    removeToken
} from '@/utils/token.js'


// search 模块小仓库
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        console.log('33333')
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        console.log('22222222')
        state.userInfo = userInfo
    },
    // 清楚本地数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }

};
const actions = {
    // 获取验证码
    async getCode({
        commit
    }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ooook'
        } else {
            Promise.reject(new Error('faile'))
        }
    },
    //  注册
    async userRegister({
        commit
    }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ooook'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async userLogin({
        commit
    }, data) {

        let result = await reqUserLogin(data)
        if (result.code == 200) {
            console.log('44444', result)
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'oooook'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({
        commit
    }) {

        let result = await reqUserInfo()
        console.log('11111111', result.code)
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)

        }
    },
    //退出登录
    async userLogout({
        commit
    }) {
        let result = await reqLogout()
        console.log('3333333', result.code)
        if (result.code == 200) {
            // action  中不能直接操作state
            commit('CLEAR')
            return 'ooook'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }


};
// 计算属性  主要是简化仓库中的数据
const getters = {



};

// 对外暴露Store类的一个实例
export default {
    state, // 仓库存储数据的地方 状态
    mutations, // 唯一修改state的手段
    actions, //处理action，可以书写自己的业务逻辑，也可以处理异步
    getters, //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

};