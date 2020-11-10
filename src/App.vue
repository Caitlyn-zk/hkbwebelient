<template>
  <div id="app">
    <!-- <Main v-show="true"  v-if="isRouterAlive"></Main> -->
    <!-- 主要内容 -->
    <!-- 用于乘宽导航所占位置 -->
    <router-view name="Head" ></router-view>
    <keep-alive>
      <router-view name="body" v-if="$route.meta.keepAlive"></router-view>
       
    </keep-alive>
    <router-view name="body" v-if="!$route.meta.keepAlive"></router-view>
    <!-- 右侧回到顶部组件 -->
    <backtop></backtop>
    <!-- 底部 -->
    <router-view name="Foot"></router-view>
  </div>
</template>

<script>
// import Main from "./views/Main";
import backtop from '@/components/common/backtop'
export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
      // showCard: true
    };
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  created () {
 
  },
  computed: {
  },
  matched() {},
  components: {
    // Main,
    backtop
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    },
  },
};
</script>

<style lang="less">
#app {
  background: #f6f6f8;
  width: 100%;
  height: 100%;
}
.el-popover {
  min-width: 0px !important;
  padding: 5px !important;
}
#nprogress .bar {
  background: #0bd094 !important; //自定义颜色
}

</style>
