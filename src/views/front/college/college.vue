<template>
  <div>
    <div class="content hk-mycllege">
      <div class="hk-collega-main clearfix">
        <div class="hk-collega-input margin-l-20">
          <el-input placeholder="请输入想要搜索学院内容" v-model="inputcoll" class="search-input">
            <el-button slot="append" class="hk-search-button" @click="onSearch">搜索</el-button>
          </el-input>
        </div>
        <!-- 按钮 -->
        <el-button
          round
          class="hk-collega-round fr margin-t-20"
          @click="onQuizzed"
        >提问</el-button>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-college-tab-main">
          <el-tab-pane label="首页" name="index">
            <router-view name="FrontCollegeTitle"></router-view>
          </el-tab-pane>
          <el-tab-pane label="发现" name="find"></el-tab-pane>
          <el-tab-pane label="等你来答" name="waitAnswer"></el-tab-pane>
        </el-tabs>
        <div class="hk-college-index text-center">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <quizzedPopup :quizzed="quizzed" @close="onCloseQuizzedPopup"></quizzedPopup>
  </div>
</template>

<script>
import Question from "./question/question";
import quizzedPopup from '@/components/popup/quizzed-popup'
export default {
  data() {
    return {
      activeName: "index",
      inputcoll: "",
      quizzed: {
        eject:false
      },
    };
  },
  components: {
    Question,
    quizzedPopup
  },
  created () {
    this.onRouterPathChanged()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.name);
      if (tab.name === "index") {
        this.$router.push({ path: "/front/college/home/recommend" });
      } else if (tab.name === "waitAnswer") {
        this.$router.push({ path: "/front/college/question/question" });
      } else if (tab.name === "find") {
        this.$router.push({ path: "/front/college/find/find" });
      }
    },
    onRouterPathChanged(val, oldval) {
      let that = this;
      let pathrouter = this.$router.currentRoute.path
      if (pathrouter.indexOf("/front/college/home") !== -1) {
        this.activeName = "index";
      } else if (pathrouter.indexOf("/front/college/find") !== -1) {
        this.activeName = "find";
      } else if (pathrouter.indexOf("/front/college/question") !== -1) {
        this.activeName = "waitAnswer";
      }
    },
    
    // 提问弹框的一些操作
    onQuizzed (e) {
      this.quizzed.eject = true
    },
    onCloseQuizzedPopup (e) {
      this.quizzed.eject = false
    },
    onSearch () {
      this.$router.push({path: '/front/college/home/search'})
    },
  },
  watch: {
    // 当路由变化时执行
    $route(to,from){
      // this.pathrouter = to.path
      this.onRouterPathChanged();
    }
  }
};
</script>

<style lang='less'>
@import "./college.less";
</style>
