<template>
<!-- 顶部导航 -->
  <div class="hk-top-main">
    <!-- 首页 -->
      <el-menu
        :default-active='activeIndex1'
        class="font-14 clearfix hk-el-menu-right-main content text-l"
        mode="horizontal"
        @select="handleSelect"
        background-color="#202329"
        active-text-color="#61caa2"
        v-if="navtype == 1 && activeIndex2 == ''">
        <div class="hk-text-green fl hk-left-title padding-t-7 padding-r-40">
            <img class="hk-top-logo margin-lr-10" src="../../assets/image/logo.png"/>
        </div>
        <province></province>
        <el-menu-item index="1" class="hk-white padding-l-10"><router-link class="hk-nav-a" to="/">首页</router-link></el-menu-item>
        <el-submenu index="2">
            <template slot="title" >发布中心</template>
            <el-menu-item index="2-1"><router-link class="hk-rout-link-fb hk-nav-a" to="/front/project">饮用水工程</router-link></el-menu-item>
            <el-menu-item index="2-2">生态环境工程</el-menu-item>
            <el-menu-item index="2-3" >项目环评</el-menu-item>
            <el-menu-item index="2-4">环境监测</el-menu-item>
            <el-menu-item index="2-5">环保竣工验收</el-menu-item>
            <el-menu-item index="2-6">环保应急预案</el-menu-item>
            <el-menu-item index="2-7">环保其他咨询</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" ><router-link class="hk-rout-link-fb hk-nav-a" to="/front/project">环评公示</router-link></el-menu-item>
        <el-menu-item index="4" ><router-link class="hk-nav-a" to="/front/store">商城</router-link></el-menu-item>
        <!-- <el-menu-item index="5" ><router-link class="hk-nav-a" to="/front/recruit">水环境招聘</router-link></el-menu-item> -->
        <el-submenu index="5">
            <template slot="title" >水环境招聘</template>
            <el-menu-item index="5-1" ><router-link class="hk-nav-a hk-rout-link-fb" to="/front/recruit">水环境招聘</router-link></el-menu-item>
            <el-menu-item index="5-2"><router-link class="hk-nav-a hk-rout-link-fb" to="/front/newrecruit">招聘职位</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="6" ><router-link class="hk-nav-a" to="/front/college">水环境学院</router-link></el-menu-item>
        <!-- 右边导航 -->
        <topright></topright>
      </el-menu>
      <!-- 项目 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo font-14 content"
        mode="horizontal"
        @select="handleSelect"
        background-color="#202329"
        active-text-color="#61caa2"
        v-else-if="navtype !== 1 && activeIndex2 == ''">
        <div class="fl hkk-nav-mbar margin-r-20 padding-t-15">
          <span class="hk-cursor">{{pageTitle}}</span>
        </div>
        <province></province>
        <el-menu-item index="1"  class="padding-l-10 hk-header"><router-link class="hk-nav-a" to="/">首页</router-link></el-menu-item>
        <el-menu-item index="3" ><router-link class="hk-rout-link-fb hk-nav-a" to="/front/project">项目中心</router-link></el-menu-item>
        <el-menu-item index="4" ><router-link class="hk-nav-a" to="/front/store">商城</router-link></el-menu-item>
        <!-- <el-menu-item index="5" ><router-link class="hk-nav-a" to="/front/recruit">水环境招聘</router-link></el-menu-item> -->
        <el-submenu index="5">
            <template slot="title" >水环境招聘</template>
            <el-menu-item index="5-1" ><router-link class="hk-nav-a hk-rout-link-fb" to="/front/recruit">水环境招聘</router-link></el-menu-item>
            <el-menu-item index="5-2"><router-link class="hk-nav-a hk-rout-link-fb" to="/front/newrecruit">招聘职位</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="6" ><router-link class="hk-nav-a" to="/front/college">水环境学院</router-link></el-menu-item>
        <!-- 右边导航 -->
        <topright></topright>
      </el-menu>
      <div v-if="activeIndex2 == '1'" class="my-resume-nav">
        <div class="nav-content">
          <img src="../../assets/image/logo.png" />
          <div class="nav-select">
            <div class=""> <router-link  to="/" tag="div">首页</router-link></div>
            <div class=""> <router-link  to="/user/person/index" tag="div">个人中心</router-link></div>
            <div class=""> <router-link  to="/user/person/my/resume-center" tag="div">简历中心</router-link></div>
          </div>
        </div>
      </div>
      <Levitate></Levitate>
  </div>
</template>

<script>
import topright from './fontnav-right'
import province from './fontnav-province'
import Levitate from "../common/levitate"
export default {
  data () {
    return {
      activeIndex: '3',
      activeIndex1: '1',
      activeIndex2: '',
      pageTitle: '项目中心',
      pageTitleData: ['项目中心', '环科宝商城', '环科宝招聘', '环科宝学院'],
      navtype: 1
    }
  },
  components: {
    topright,
    province,
    Levitate
  },
  created () {
  },
  mounted () {
    // 监听路由变化
    this.getPath()
    this.onRouterPathChanged()
  },
  methods: {
    handleSelect (key, keyPath) {
      var index = ''
      index = key.slice(0, 1)
      if (index === '2') {
        this.$router.push({path: '/front/project'})
        this.activeIndex = '3'
      }
    },
    onRouterPathChanged (val, oldval) {
      let that = this
      let pathrouter = this.$router.currentRoute.path
      if (this.pathrouter === '/') {
        // 改变一级导航的状态
        this.activeIndex = '1'
        this.activeIndex1 = '1'
      } else {
        if (pathrouter.indexOf('/front/project') !== -1) {
          this.activeIndex = '3'
          this.$set(this, 'pageTitle', this.pageTitleData[0])
        } else if (pathrouter.indexOf('front/recruit') !== -1) {
          this.$set(this, 'pageTitle', this.pageTitleData[2])
          that.$set(that, 'activeIndex', '5-1')
        } else if (pathrouter.indexOf('front/newrecruit') !== -1) {
          this.$set(this, 'pageTitle', this.pageTitleData[2])
          that.$set(that, 'activeIndex', '5-2')
        } else if (pathrouter.indexOf('front/store') !== -1) {
          that.$set(that, 'activeIndex', '4')
          this.$set(this, 'pageTitle', this.pageTitleData[1])
          this.$router.push({name: 'CmpFrontStorelist'})
        } else if (pathrouter.indexOf('front/college') !== -1) {
          that.$set(that, 'activeIndex', '6')
          this.$set(this, 'pageTitle', this.pageTitleData[3])
        } else if (pathrouter.indexOf('/user/person') !== -1 || pathrouter.indexOf('/aboutus') !== -1) {
          that.$set(that, 'activeIndex', '0')
        }
      }
      window.localStorage.setItem('activeIndex', this.activeIndex)
    },
    getPath () {
      let pathrouter = this.$router.currentRoute.path
      if (pathrouter === '/') {
        this.$set(this, 'navtype', 1)
      } else if (pathrouter.indexOf('/user/person') !== -1 || pathrouter.indexOf('/aboutus') !== -1) {
        this.$set(this, 'navtype', 1)
        this.activeIndex1 = '0'
      } else {
        this.$set(this, 'navtype', 2)
      }
      if ( pathrouter === '/user/my/resume') {
        this.activeIndex2 = "1"
      } else {
        this.activeIndex2 = ""
      }
    }
  },
  watch: {
    $route: {
      handler (val, oldval) {
        // console.log(val)
        this.onRouterPathChanged(val, oldval)
        this.getPath()
      }
    }
  }
}
</script>

<style lang="less">
@import './fontnav.less';
</style>
