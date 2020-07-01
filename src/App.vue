<template>
  <div id="app">
    <!-- <Main v-show="true"  v-if="isRouterAlive"></Main> -->
    <!-- 加载时显示 -->
    <!-- <div class="loading" v-if="showCard"> -->
      <!-- 点点动画相关代码 -->
      <!-- <div class="mock">数据加载中</div>
      <div class="loader-inner ball-pulse">
        <div></div>
        <div></div>
        <div></div>
      </div> -->
    <!-- </div> -->
    <!-- 主要内容 -->
    <!-- 用于乘宽导航所占位置 -->
    <div class="top-height"></div>
    <router-view name="Head" v-if="isRouterAlive"></router-view>
    <router-view name="body" v-if="isRouterAlive"></router-view>
    <!-- 底部 -->
    <router-view name="Foot"></router-view>
  </div>
</template>

<script>
import Main from "./views/Main";
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
  created() {
  },
  matched() {},
  components: {
    Main
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
  .top-height {
    height: 50px;
    background: #fff;
  }
}
.el-popover {
  min-width: 104px;
}
#nprogress .bar {
  background: #0bd094 !important; //自定义颜色
}

// 加载等待
// .loading {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 100%;
//   background-color: #fff;
//   opacity: 1;
//   z-index: 1000;
// }
// .loading .mock {
//   height: 30px;
//   position: absolute;
//   top: 45%;
//   left: 50%;
//   transform: translateX(-50%);
//   font-size: 25px; /*px*/
//   color: #03a9f4;
//   /*text-align: center;*/
//   line-height: 30px;
// }
// 点点动画相关样式
// .ball-pulse {
//   position: absolute;
//   top: 50%;
//   left: 48%;
//   transform: translateX(-22%);
// }
// .loading .ball-pulse div {
//   background-color: #03a9f4;
//   width: 30px;
//   height: 30px;
//   border-radius: 100%;
//   margin: 2px;
//   animation-fill-mode: both;
//   display: inline-block;
// }
// .loading .ball-pulse div:nth-child(1) {
//   animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
// }
// .loading .ball-pulse div:nth-child(2) {
//   animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
// }
// .loading .ball-pulse div:nth-child(3) {
//   animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
// }

// @-webkit-keyframes scale {
//   0% {
//     -webkit-transform: scale(1);
//     transform: scale(1);
//     opacity: 1;
//   }
//   45% {
//     -webkit-transform: scale(0.1);
//     transform: scale(0.1);
//     opacity: 0.7;
//   }
//   80% {
//     -webkit-transform: scale(1);
//     transform: scale(1);
//     opacity: 1;
//   }
// }
// @keyframes scale {
//   0% {
//     -webkit-transform: scale(1);
//     transform: scale(1);
//     opacity: 1;
//   }
//   45% {
//     -webkit-transform: scale(0.1);
//     transform: scale(0.1);
//     opacity: 0.7;
//   }
//   80% {
//     -webkit-transform: scale(1);
//     transform: scale(1);
//     opacity: 1;
//   }
// }
</style>
