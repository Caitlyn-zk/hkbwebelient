<template>
  <div id="app">
    <!-- 用于乘宽导航所占位置 -->
    <div class="top-height"></div>
    <router-view name="Head" ></router-view>
    <keep-alive include="Testkeepalive,Project">
      <router-view name="body" v-if="$route.meta.keepAlive"></router-view>
       
    </keep-alive>
    <router-view name="body" v-if="!$route.meta.keepAlive"></router-view>
   <!-- 底部 -->
      <router-view name="Foot"></router-view>
  </div>
</template>

<script>
// import Top from '../components/frontHeadNav/headnavigation.vue'
// import Footer from '../components/frontFooter/index.vue'
export default {
  name: 'App',
  components: {
    // Footer,
    // Top
  },
  created () {
    // console.log('这里是首页')
    // console.log($route.meta.keepAlive)
  },
  computed: {
    cachedViews () {
      // console.log('car=======>',this.$store.state.tagsView.cachedViews)
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>

<style lang="less">
#app {
  background: #f6f6f8;
  width: 100%;
  height: 100%;
  .top-height {
    height: 50px;
    background: #fff;
    // margin-bottom: 50px;
  }
}
</style>
