// api 统一管理  management
import requests from './Request'
import mockRequests from './mockAjax.js'
// /api/product/getBaseCategoryList 无参数
export const reqCategoryList = () => {
    // 发请求axios发请求返回结果Promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// 获取banner（home）首页轮播图接口

export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}

// 获取floor数据
export const reqFloorList = () => {
    return mockRequests.get('/floor')
}
// 获取搜索模块的数据 地址 /api/list 方式POST
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}*/
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}


// 获取产品详情信息的接口 URL：/api/item/{ skuId }   GET请求

export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/item/${ skuId }`,
        method: 'get',

    })
}

// 将产品添加到购物车中（或者更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${ skuId }/${ skuNum }`,
        method: 'post'
    })
}

// 获取购物车列表
// URL /api/cart/cartList get
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}


// 删除购物车数据 接口
// /api/cart / deleteCart / {skuId}  DELETE
export const reqDeleteCartById = (skuId) => {
    return requests({
        url: `/cart/deleteCart/ ${skuId}`,
        method: 'delete'
    })
}

// 8.切换商品选中状态
// /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCheckedByid = (skuId, isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}


//  获取验证码
// /api/user/passport/sendCode/{phone}  获取验证码  // get
export const reqGetCode = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get'
    })
}
// 16.1请求地址
// /api/user/passport/register
// 16.2请求方式
// POST
// 16.3参数类型
// 参数名称	类型	是否必选	描述
// phone	string	Y	注册手机号
// password	string	Y	密码
// code	string	Y	验证码

// 注册用户
export const reqUserRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'POST',
        data

    })
}

// 2.登录
// 2.1请求地址
// /api/user/passport/login
// 2.2请求方式
// POST
// 2.3参数类型
// 参数名称	类型	是否必选	描述
// phone	string	Y	用户名
// password	string	Y	密码

// 登录
export const reqUserLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'POST',
        data
    })
}

//  /user/passport/auth/getUserInfo

export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}
//17.退出登陆 请求地址 /api/user/passport/logout GET
// 退出登录
export const reqLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}
// 获取用户地址信息
///api/user/userAddress/auth/findUserAddressList   get

export const reqAddressInfo = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}


//     10.获取订单交易页信息
// 10.1请求地址
// /api/order/auth/trade
// 10.2请求方式
// GET
export const reqOrderInfo = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'GET'
    })
}

// 12.提交订单
// 12.1请求地址
// /api/order/auth/submitOrder?tradeNo={tradeNo}
// 12.2请求方式
// POST
// 12.3参数类型
// 参数名称	类型	是否必选	描述
// traderNo	string	Y	交易编号(拼接在路径中)
// consignee	string	Y	收件人姓名
// consigneeTel	string	Y	收件人电话
// deliveryAddress	string	Y	收件地址
// paymentWay	string	Y	支付方式
// (ONLINE代表在线)
// orderComment	string	Y	订单备注
// orderDetailList	Array	Y	存储多个商品对象的数组
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'POST'
    })
}


// 13.获取订单支付信息
// 13.1请求地址
// /api/payment/weixin/createNative/{orderId}
// 13.2请求方式
// GET
// 13.3参数类型
// 参数名称	类型	是否必选	描述
// orderId	string	Y	支付订单ID
// (通过提交订单得到)
export const reqPayment = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'GET'
    })
}



// 14.查询支付订单状态
// 14.1请求地址
// /api/payment/weixin/queryPayStatus/{orderId}
// 14.2请求方式
// GET
// 14.3参数类型
// 参数名称	类型	是否必选	描述
// orderId	string	Y	支付订单ID
// 14.4返回示例
// 成功：
// {
//     "code": 205,
//     "message": "支付中",
//     "data": null,
//     "ok": false
// }
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}


// 11.获取我的订单列表
// 11.1请求地址
// /api/order/auth/{page}/{limit}
// 11.2请求方式
// GET
// 11.3参数类型
// 参数名称	类型	是否必选	描述
// page	string	Y	页码
// limit	string	Y	每页显示数量
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'GET'
    })
}