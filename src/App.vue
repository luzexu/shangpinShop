<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在HomeSearch显示 在Login register 隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
    <!-- v-show="!$router.meta.show"   真个页面都不显示了
     -->
  </div>
</template>

<script>
import Header from './components/Header/myHeader.vue'
import Footer from './components/Footer/myFooter.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    //  通过Vuex 发请求获取数据 存储于仓库中 获取商品分类的三级列表
    this.$store.dispatch('categoryList')
  },
}
</script>

<style>
</style>
