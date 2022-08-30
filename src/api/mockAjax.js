// 对于axios 二次封装

import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// start：进度条开始  done：进度条结束

import 'nprogress/nprogress.css'

// 1利用axios 对象的的方法create，去创建一个axios案例
// 2 request 就是axios 只不过稍微配置一下
const requests = axios.create({

    // 配置对象 baseURl ---是基于哪个路径
    baseURL: "/mock",
    // 代表请求超时的时间5s
    timeout: 5000,

})

//请求拦截器 在发请求之前 请求拦截器可以检测 可以再请求发出之前做一些事情
requests.interceptors.request.use(config => {
    //config ：配置对象，对象里面有一个属性很重要，header请求头
    // 进度条开始
    nprogress.start()
    return config;
})



//响应拦截器、
requests.interceptors.response.use((res) => {
    // 成功的回调函数。服务期相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done()
    return res.data;
}, () => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})



// 对外暴露
export default requests