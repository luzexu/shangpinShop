<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start - 1 > 1">···</button>

    <!-- 中间结构 动态生成 v-for  可以遍历数组 -->
    <template v-for="(page, index) in startNumAndEndNum.end">
      <button
        :key="index"
        v-if="page >= startNumAndEndNum.start"
        @click="$emit('getPageNo', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>

    <button v-if="startNumAndEndNum.end < totalPage">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage - 1"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'myPagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算出总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumAndEndNum() {
      const { continues, totalPage, pageNo } = this
      // 先定义两个变量存储起始数字和结束数字
      let start = 0,
        end = 0
      //不正常现象 总页码数没有连续页码数多
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象 总页码大于 连续页码
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 把出现不正常的现象start数字出现0或者负数  纠正
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return { start, end }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
// .active {
//   background-color: skyblue;
// }
</style>