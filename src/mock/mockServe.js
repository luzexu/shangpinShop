// 引入Mockjs
import Mock from 'mockjs'
// 把JSON数据格式引入进来
import banner from './banner.json'
import floor from './floors.json'

// webpack 默认对外暴露的，图片JSON数据格式

// mock 数据：第一个参数 请求地址 第二个参数 请求数据
Mock.mock("/mock/banner", {
    code: 200,
    data: banner
}) // 模拟首页大的轮播图的数据
Mock.mock("/mock/floor", {
    code: 200,
    data: floor
})