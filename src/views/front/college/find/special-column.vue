<template>
  <div class="hk-special-column clearfix padding-b-20 padding-t-29">
    <!-- <div class="hk-addproject-title-mbar">专栏</div> -->
    <div class="hk-special-list">
      <specialColumn :specialColumnList="specialColumnList"></specialColumn>
    </div>
    <div class="block clearfix" style="margin-top:15px;" >
      <el-pagination
      class="fr"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="list_rows"
        layout="prev, pager, next"
        :total="total"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import specialColumn from '@/components/college/special-column.vue'
export default {
  data () {
    return {
      // 第几页
      // page: 1,
      // 一页几条
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      list_rows: 5, // 每页的数据条数
      specialColumnList: [{
        id: 1,
        title: '专栏题目',
        // 专栏介绍
        introduce: '这是一个有趣的专题，主要内容是它可以给人类带来很多新鲜的...',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 2,
        title: '专栏题目',
        // 专栏介绍
        introduce: '这是一个有趣的专题，主要内容是它可以给人类带来很多新鲜的...',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 3,
        title: '专栏题目',
        // 专栏介绍
        introduce: '这是一个有趣的专题，主要内容是它可以给人类带来很多新鲜的...',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 4,
        title: '专栏题目',
        // 专栏介绍
        introduce: '这是一个有趣的专题，主要内容是它可以给人类带来很多新鲜的...',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 5,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 6,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 7,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 8,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 9,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 10,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 11,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }]
    }
  },
  components: {
    specialColumn
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.list_rows = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
    },
  }
}
</script>

<style lang="less" scoped>
  .hk-special-list {
    display: flex;
    justify-content: space-evenly;
  }
  .hk-addproject-title-mbar {
    border: none;
  }
</style>