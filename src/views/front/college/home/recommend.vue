<template>
  <!-- 学院首页主要内容 -->
  <div class="clearfix">
    <collegeTitle></collegeTitle>
    <div class="fr hk-college-draft">
      <rightModul></rightModul>
    </div>
    <div class="fl hk-college-content">
      <articleList :articleList="articleList"></articleList>
    </div>
  </div>
</template>

<script>
import collegeTitle from "@/components/college/college-title.vue";
import articleList from "@/components/college/article-list.vue";
import rightModul from '@/components/college/right-modul.vue'
export default {
  data() {
    return {
      articleList: [
        {
          title: "探索盘州区环保事业发展",
          subtitle: "盘州区环保局发布了文章",
          add_time: "21小时前",
          fabulous: "78",
          badly: "3222",
          paragraph:
            "我不是环评师，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活"
        },
        {
          title: "如何做一名优秀的环评报告师？",
          fabulous: "78",
          badly: "3",
          paragraph:
            "我不是环评师，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活"
        }
      ]
    };
  },
  created() {
  },
  components: {
    collegeTitle,
    articleList,
    rightModul
  },
  methods: {
    onDetails() {
      // console.log('跳转详情')
      this.$router.push({ path: "/front/college/question/answer" });
    },
  }
};
</script>

<style lang='less' scoped>
</style>
