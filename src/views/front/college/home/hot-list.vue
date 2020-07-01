<template>
  <!-- 学院首页主要内容 -->
  <div class="clearfix">
    <collegeTitle></collegeTitle>
    <div class="hk-hotlist-title-but text-l margin-b-10">
      <el-button v-for="(item,index) in screenBtn" :key="index" @click="onScreen(index)" round :class="isIndex === index ? 'is-active' : ''">{{item.label}}</el-button>
    </div>
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
      isIndex: 0,
      screenBtn: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '水'
      }, {
        value: 2,
        label: '土壤'
      }, {
        value: 3,
        label: '大气'
      }, {
        value: 4,
        label: '固体废物'
      }, {
        value: 5,
        label: '医疗废物'
      }, {
        value: 6,
        label: '危险液体'
      }],
      articleList: [
        {
          title: "探索盘州区环保事业发展",
          subtitle: "盘州区环保局发布了文章",
          add_time: "21小时前",
          fabulous: "78",
          badly: "3",
          paragraph:
            "我不是环评师，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活"
        },
        {
          title: "如何做一名优秀的环评报告师？",
          fabulous: "78",
          badly: "3",
          paragraph:
            "我不是环评师，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活"
        }
      ]
    };
  },
  created() {
    // this.Setread()
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
    onScreen (index) {
      // console.log(index)
      this.isIndex = index
    } 
  }
};
</script>

<style lang='less' scoped>
@import "../college.less";
.hk-hotlist-title-but {
  height: 40px;
  .el-button {
    height: 34px;
    min-width: 79px;
    padding: 0;
    color: #333;
    line-height: 32px;
    &:hover,&:focus, &.is-active {
      background: #FFA342;
      color: #fff;
      border-color: #FFA342;
    }
  }
}
</style>
