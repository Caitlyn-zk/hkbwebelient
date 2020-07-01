<template>
<!-- 专题列表页 -->
  <div class="padding-t-29 padding-b-20">
    <!-- <div class="font-16 text-bold line-46">专题列表</div> -->
    <listOfTopics :topicsList="topicsList"></listOfTopics>
  </div>
</template>

<script>
import listOfTopics from '@/components/college/special.vue'
export default {
  data () {
    return {
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
      }]
    }
  },
  components: {
    listOfTopics,
  },
}
</script>

<style lang="less" scoped>
</style>
