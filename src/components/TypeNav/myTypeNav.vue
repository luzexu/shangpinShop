<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <!-- 过度动画 transition -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                @mouseenter="changeIndex(index)"
                @mouseleave="leaveIndex"
                class="item bo"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{
                      c2.categoryName
                    }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{
                        c3.categoryName
                      }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash  最好的引入方式就是按需加载
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户鼠标以上哪一个一级分类
      currentIndex: -1,
      show: true,
    }
  },
  // 组件挂在完毕 可以向服务器发请求
  mounted() {
    // 组件挂在完毕 让show的属性变成false
    //  如果不是Home 路由组件，将typeNav进行隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
    this.$store.dispatch('categoryList')
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数。当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state 其实即为大仓库的数据
      categoryList: (state) => {
        return state.home.categoryList.splice(0, 15)
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex
    // throttle 不要用箭头函数，可能会出现上下弯 this问题
    changeIndex: throttle(function (index) {
      // 正常情况（用户慢慢的操作） 鼠标进入，每一个一级分类
      // changeIndex(index) {
      //   this.currentIndex = index
      // },
      this.currentIndex = index
    }, 50),
    // 鼠标移出的事件回调
    leaveIndex() {
      this.currentIndex = -1
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // this.$router.push('/search')
      let element = event.target

      // 获取到的当前事件的节点有可能是h3 a dt dl
      // 节点有一个属性dataset 属性，可以获取到节点的自定义属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset // 解构赋值

      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 一级分类 二级分类 三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 整理参数
        // location.query = query
        // this.$router.push(location)
        //  判断 如果路由跳转的时候，带有params参数，捎带着传过去
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    // 当鼠标移入的时候 让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
    // 当鼠标离开的时候 让商品列表进行隐藏
    leaveShow() {
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;

    position: relative;
    > div {
      display: flex;
    }
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: #bfa;
        }
      }
    }
    // 过度动画的样式
    .sort-enter {
      height: 0;
      transform: rotate(0) deg;
    }
    .sort-enter-to {
      height: 461px;
      transform: rotate(360deg);
    }
    // 定义动画的事件和速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>