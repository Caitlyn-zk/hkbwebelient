<template>
  <!-- 顶部导航 -->
  <div>
    <div class="top-height"></div>
    <div class="hk-top-main">
      <div class="content font-nav-content" v-if="activeIndex2 == ''">
        <div class="clearfix fontnav-left-main">
          <div
            v-show="activeIndex !== '1' && activeIndex !== '4'"
            class="hkk-nav-mbar margin-r-20 padding-t-16 fl"
            >
            <span class="hk-cursor">{{pageTitle}}</span>
          </div>
          <province></province>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo font-14"
          mode="horizontal"
          @select="handleSelect"
          background-color="#333344"
          active-text-color="#61caa2"
        >
          <el-menu-item index="1" class="padding-l-10 hk-header">
            <router-link class="hk-nav-a" to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2" v-show="activeIndex == '1'">
            <router-link class="hk-nav-a" to="/front/project/new">招商项目</router-link>
          </el-menu-item>
          <el-menu-item index="2" v-show="activeIndex !== '1'">
            <router-link class="hk-nav-a" to="/front/project/new">项目中心</router-link>
          </el-menu-item>
          <el-menu-item index="2" v-show="activeIndex == '1'">
            <router-link class="hk-nav-a" to="/front/project/new">环评公示</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link class="hk-nav-a" to="/front/store">商城</router-link>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">水环境招聘</template>
            <el-menu-item index="5-1">
              <router-link class="hk-nav-a hk-rout-link-fb" to="/front/recruit">水环境招聘</router-link>
            </el-menu-item>
            <el-menu-item index="5-2">
              <router-link class="hk-nav-a hk-rout-link-fb" to="/front/newrecruit">招聘职位</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="6">
            <router-link class="hk-nav-a" to="/front/college/recommend">水环境学院</router-link>
          </el-menu-item>
        </el-menu>
        <!-- 右边导航 -->
        <topright></topright>
      </div>
      <div v-if="activeIndex2 == '1'" class="my-resume-nav">
        <div class="nav-content">
          <img src="../../assets/image/logo1.png" />
          <div class="nav-select">
            <div class>
              <router-link to="/" tag="div">首页</router-link>
            </div>
            <div class>
              <router-link to="/user/person/index" tag="div">个人中心</router-link>
            </div>
            <div class>
              <router-link to="/user/person/my/resume-center" tag="div">简历中心</router-link>
            </div>
          </div>
        </div>
      </div>
      <Levitate></Levitate>
    </div>
  </div>
</template>

<script>
import topright from "./fontnav-right";
import province from "./fontnav-province";
import Levitate from "../common/levitate";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "",
      pageTitle: "项目中心",
      pageTitleData: ["项目中心", "", "环科宝招聘", "环科宝学院"]
    };
  },
  components: {
    topright,
    province,
    Levitate
  },
  created() {},
  mounted() {
    // 监听路由变化
    this.getPath();
    this.onRouterPathChanged();
  },
  methods: {
    handleSelect(key, keyPath) {
      let that = this;
      var index = "";
      index = key.slice(0, 1);
      // console.log(keyPath)
    },
    onRouterPathChanged() {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      if (pathrouter.indexOf("front/project") !== -1) {
        that.$set(that, "activeIndex", "2");
        that.$set(that, "pageTitle", that.pageTitleData[0]);
      } else if (pathrouter.indexOf("front/recruit") !== -1) {
        that.$set(that, "pageTitle", that.pageTitleData[2]);
        that.$set(that, "activeIndex", "5-1");
      } else if (pathrouter.indexOf("front/newrecruit") !== -1) {
        that.$set(that, "pageTitle", that.pageTitleData[2]);
        that.$set(that, "activeIndex", "5-2");
      } else if (pathrouter.indexOf("front/store") !== -1) {
        that.$set(that, "activeIndex", "4");
        that.$set(that, "pageTitle", that.pageTitleData[1]);
        that.$router.push({ name: "CmpFrontStorelist" });
      } else if (pathrouter.indexOf("front/college") !== -1) {
        that.$set(that, "activeIndex", "6");
        that.$set(that, "pageTitle", that.pageTitleData[3]);
      } else if (
        pathrouter.indexOf("/user/person") !== -1 ||
        pathrouter.indexOf("/aboutus") !== -1
      ) {
        that.$set(that, "activeIndex", "0");
      } else if (pathrouter === '/') {
        // 改变一级导航的状态
        that.activeIndex = "1";
      }
    },
    getPath() {
      let pathrouter = this.$router.currentRoute.path;
      if (pathrouter === "/") {
        this.activeIndex = "1";
      } else if (
        pathrouter.indexOf("/user/person") !== -1 ||
        pathrouter.indexOf("/aboutus") !== -1
      ) {
        this.activeIndex = "0";
      }
      if (pathrouter === "/user/my/resume") {
        this.activeIndex2 = "1";
      } else {
        this.activeIndex2 = "";
      }
    }
  },
  watch: {
    // '$route':'onRouterPathChanged',
    $route: {
      handler(val, oldval) {
        let that = this;
        // console.log(val.path)
        if (val.path === "/front/project") {
          that.$set(that, "activeIndex", "2");
        }
        this.getPath();
        this.onRouterPathChanged();
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style lang="less">
@import "./fontnav.less";
</style>
