<template>
  <div class="hk-answer-later content margin-t-15">
    <!-- 我关注的问题类表页 -->
    <div class="content">
      <div class="question-title" id="boxFixed" :class="isFixed ? 'is-top' :''">
        <div class="title padding-lr-10">我关注的问题</div>
        <div class="triangle"></div>
      </div>
      <!-- 内容部分 -->
      <questionList :questionLists="questionLists"></questionList>
    </div>
  </div>
</template>

<script>
import questionList from "@/components/college/question-list.vue";
export default {
  data() {
    return {
      isFixed: false,
      questionLists: [
        {
          id: 1,
          ignore: false,
          title: "19年环评注册师考试，关注问题111？",
          update_time: "4",
          views: "999",
          answer: "89",
          answer_views: "333"
        }
      ]
    };
  },
  components: {
    questionList
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.hk-answer-later {
  margin-top: 15px;
  font-family: Microsoft YaHei;
}
</style>