<template>
  <div class="hk-college">
    <!-- 导航部分 -->
    <div class="hk-college-nav">
      <h1 class="font-20">我的学院</h1>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link to="/user/person/my/college/dynamic">动态</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/user/person/my/college/answer">回答</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/user/person/my/college/askquestion">提问</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/user/person/my/college/article">文章</router-link></el-menu-item>
        <el-menu-item index="5"><router-link to="/user/person/my/college/specialcolumn">专栏</router-link></el-menu-item>
        <el-menu-item index="6"><router-link to="/user/person/my/college/collection">收藏</router-link></el-menu-item>
        <el-menu-item index="7"><router-link to="/user/person/my/college/follow">关注</router-link></el-menu-item>
      </el-menu>
    </div>
    <!-- 内容部分 -->
    <div class="clearfix hk-college-content">
      <div class="hk-college-content-right fr">
        <rightModule></rightModule>
      </div>
      <div class="hk-college-content-left fl">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import rightModule from './right-module'
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  components: {
    rightModule
  },
  mounted () {
    this.onRouterPathChanged()
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    onRouterPathChanged (val, oldval) {
      let that = this
      let pathrouter = this.$router.currentRoute.path
      if (pathrouter.indexOf('/user/my/college/dynamic') !== -1) {
        this.activeIndex = '1'
      } else if (pathrouter.indexOf('/user/person/my/college/answer') !== -1) {
        that.$set(that, 'activeIndex', '2')
      } else if (pathrouter.indexOf('/user/person/my/college/askquestion') !== -1) {
        that.$set(that, 'activeIndex', '3')
      } else if (pathrouter.indexOf('/user/person/my/college/article') !== -1) {
        that.$set(that, 'activeIndex', '4')
      } else if (pathrouter.indexOf('/user/person/my/college/specialcolumn') !== -1) {
        that.$set(that, 'activeIndex', '5')
      } else if (pathrouter.indexOf('/user/person/my/college/collection') !== -1) {
        that.$set(that, 'activeIndex', '6')
      } else if (pathrouter.indexOf('/user/person/my/college/follow') !== -1) {
        that.$set(that, 'activeIndex', '7')
      }
    },
  }
}
</script>

<style lang="less" scoped>
.hk-college {
  margin: 0 10px;
  padding: 20px 10px;
  padding-right: 0;
  margin-right: 0;
  background: #fff;
  .hk-college-nav {
    color: #333;
    margin-bottom: 10px;
    .el-menu.el-menu--horizontal {
      border: none;
      background: transparent;
      .el-menu-item {
        color: #333;
        padding-left: 0px;
        padding-right: 0px;
        font-size: 16px;
        a {
          display: inline-block;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
      
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
      background: transparent;
      color: #0BD094;
    }
  }
  // 内容部分样式
  .hk-college-content {
    .hk-college-content-right {
    }
    .hk-college-content-left {
      width: 707px;
    }
  }
}
</style>