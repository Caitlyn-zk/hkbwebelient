<template>
  <div class="hk-find-main padding-b-20">
    <!-- 这里实发现页 -->
    <div class="hk-find-special">
      <div class="clearfix hk-find-title">
        <router-link class="fr" to="/front/college/find/special">
          <el-button round>专题查看更多</el-button>
        </router-link>
        <span class="font-24 text-blacks fl">推荐专题</span>
      </div>
      <div class="">
        <listOfTopics :topicsList="topicsList"></listOfTopics>
      </div>
      <div class="clearfix hk-find-title">
        <router-link class="fr" to="/front/college/find/specialcolumn">
          <el-button round>专栏查看更多</el-button>
        </router-link>
        <span class="font-24 text-blacks fl">专栏推荐</span>
      </div>
      <div>
        <specialColumn :specialColumnList="specialColumnList"></specialColumn>
      </div>
    </div>
  </div>
</template>

<script>
import listOfTopics from '@/components/college/special.vue'
import specialColumn from '@/components/college/special-column.vue'
export default {
  data () {
    return {
      // 专题列表
      topicsList: [{
        id: 1,
        title: '水土保持工作者的必修课',
        // 更新时间
        update_time: '6',
        // 浏览数
        browse: '8989',
        labelList: [{
          value: 1,
          label: '标签1',
          // 话题
          topic: '1、如何在沙漠土壤性质的土壤中去做'
        }, {
          value: 2,
          label: '标签2',
          topic: '2、如何在沙漠土壤性质的土壤中去做'
        }, {
          value: 3,
          label: '标签3',
          topic: '3、如何在沙漠土壤性质的土壤中去做'
        }]
      }, {
        id: 2,
        title: '水土保持工作者的必修课',
        // 更新时间
        update_time: '6',
        // 浏览数
        browse: '8989',
        labelList: [{
          value: 1,
          label: '标签1',
          // 话题
          topic: '1、如何在沙漠土壤性质的土壤中去做'
        }, {
          value: 2,
          label: '标签2',
          topic: '2、如何在沙漠土壤性质的土壤中去做'
        }, {
          value: 3,
          label: '标签3',
          topic: '3、如何在沙漠土壤性质的土壤中去做'
        }]
      }, {
        id: 3,
        title: '水土保持工作者的必修课',
        // 更新时间
        update_time: '6',
        // 浏览数
        browse: '8989',
        labelList: [{
          value: 1,
          label: '标签1',
          // 话题
          topic: '1、如何在沙漠土壤性质的土壤中去做'
        }, {
          value: 2,
          label: '标签2',
          topic: '2、如何在沙漠土壤性质的土壤中去做'
        }, {
          value: 3,
          label: '标签3',
          topic: '3、如何在沙漠土壤性质的土壤中去做'
        }]
      }],
      // 专栏类表
      specialColumnList: [{
        id: 1,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 2,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 3,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
        add_time: '5',
        // 关注度
        attention: '9999',
      }, {
        id: 4,
        title: '专栏题目',
        // 专栏介绍
        introduce: '专栏简介专栏简介专栏简介专栏简介',
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
      }]
    }
  },
  components: {
    specialColumn,
    listOfTopics,
  },
}
</script>

<style lang="less" scoped>
  .hk-find-title {
    height: 60px;
    line-height: 60px;
    letter-spacing: 2px;
    .el-button {
      border-color: #05d797;
      color: #05d797;
    }
  }
</style>
