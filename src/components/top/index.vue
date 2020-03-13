<template>
<!-- 顶部导航 -->
  <div class="hk-top-main">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo font-14"
        mode="horizontal"
        @select="handleSelect"
        background-color="#000"
        active-text-color="#61caa2">
        <el-menu-item class="hk-text-green padding-l-20">让水环境治理回归本质，保护绿水青山</el-menu-item>
        <el-menu-item class="hk-text-green">
            <img class="hk-top-logo margin-lr-10" src="../../assets/image/logo.png"/>
        </el-menu-item>
        <el-menu-item class="hk-text-green">
            <i class="el-icon-location-outline font-20"></i>
            <span>贵州</span>
            <span class="text-white hk-top-adds">[切换]</span>
        </el-menu-item>
        <el-menu-item index="1" class="hk-text-green padding-l-10">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">发布中心</template>
            <el-menu-item index="2-1">饮用水工程</el-menu-item>
            <el-menu-item index="2-2">生态环境工程</el-menu-item>
            <el-menu-item index="2-3">项目环评</el-menu-item>
            <el-menu-item index="2-4">环境监测</el-menu-item>
            <el-menu-item index="2-5">环保竣工验收</el-menu-item>
            <el-menu-item index="2-6">环保应急预案</el-menu-item>
            <el-menu-item index="2-7">环保其他咨询</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">项目公示</el-menu-item>
        <el-menu-item index="4">资料中心</el-menu-item>
        <el-menu-item index="5">水环境学院</el-menu-item>
        <el-menu-item index="6">水环境人才</el-menu-item>
        <!-- 右边导航 -->
        <div class="hk-top-nav-r fr hk-top-content font-12 padding-r-20">
            <span class="hk-top-r-text">发布项目</span>
            <span class="hk-top-r-text">找人才</span>
            <span class="hk-top-r-text">人才注册</span>
            <span class="hk-top-r-text">共享图纸</span>
            <span class="hk-top-r-text">消息中心</span>
            <span class="hk-top-r-text">消息中心</span>
            <i class="iconfont icon-cart"></i>
        </div>
        <!-- <el-menu-item index="6"><a href="#" target="_blank">Orders</a></el-menu-item> -->
      </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less">
@import './css/index.less';
</style>
