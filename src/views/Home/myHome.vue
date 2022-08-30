<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav />
    <ListContainer />
    <Rcommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="index" :list="floor" />
    <Brand />
  </div>
</template>



<script>
// 引入其余的组件
import ListContainer from '@/views/Home/ListContainer/myListContainer.vue'

import Rcommend from '@/views/Home/Recommend/myRecommend.vue'
import Rank from '@/views/Home/Rank/myRank.vue'
import Like from '@/views/Home/Like/myLike.vue'
import Floor from '@/views/Home/Floor/myFloor.vue'
import Brand from '@/views/Home/Brand/myBrand.vue'
import { mapState } from 'vuex'
export default {
  components: { ListContainer, Rcommend, Rank, Like, Floor, Brand },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
}
</script>

<style>
</style>