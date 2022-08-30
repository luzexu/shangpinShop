// 配置路由的地方 
// 引进vue
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)
// 引入 store
import store from '@/store'

//引入路由组件
// import Home from '@/views/Home/myHome.vue'
import Search from '@/views/Search/mySearch.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart/index.vue'
import Trade from '@/views/Trade/index.vue'
import Pay from '@/views/Pay/index.vue'
import PaySuccess from '@/views/PaySuccess/index.vue'
import Center from '@/views/Center/index.vue'
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'

// 路由懒加载
const foo = () => {
    return import('@/views/Home/myHome.vue')
}
// 先把VueRouter原型对象的push 先保存一份
let originPush = VueRouter.prototype.push;
// .log(originPush)

// 重写路由
// 第一个参数  告诉原来的push方法 往哪里跳
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

// 配置路由

let router = new VueRouter({
    // 配置路由
    routes: [{
        // 重定向
        path: '*',
        redirect: '/home',


    }, {
        path: '/home',
        component: foo,
        meta: {
            show: true
        },

    }, {
        // /:keyword
        path: '/search',
        component: () => import('@/views/Search/mySearch.vue'),
        meta: {
            show: true
        },
        name: "search",

    }, {
        path: '/login',
        component: Login,
        meta: {
            show: true
        },
        name: 'aaa'
    }, {
        path: '/register',
        component: Register,
        meta: {
            show: false
        },
        name: 'bbb'
    }, {

        path: '/detail/:skuId?',
        component: Detail
    }, {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess
    }, {
        path: '/shopcart',
        component: ShopCart
    }, {
        path: '/trade',
        component: Trade,
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }

    }, {
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }

        }
    }, {
        path: '/paysuccess',
        component: PaySuccess,

    }, {
        path: '/center',
        component: Center,
        // 二级路由
        children: [{
            path: 'myorder',
            component: MyOrder
        }, {
            path: 'grouporder',
            component: GroupOrder
        }, {
            path: '/center',
            redirect: '/center/myorder'
        }]
    }],
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {

            y: 0
        }
    }

})

// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    console.log('name111111', name)

    if (token) {

        // 用户已经登录了 还想去login  不行
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录了  去的不是login
            // 如果用户名已有
            if (name) {

                next()
            } else {
                // 没有用户信息  派发action让仓库存储用户信息再跳转
                try {

                    console.log('name22222', name)
                    await store.dispatch('getUserInfo')
                    console.log('name333333', name)
                    next()
                } catch (error) {
                    /////////////////////
                    console.log('4444444', name)
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录不能去交易相关的网页 
        let toPath = to.path
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/center') !== -1 || toPath.indexOf('/pay') !== -1) {
            next('/login?redirect=' + toPath)
        }
        next()
    }
})






export default router