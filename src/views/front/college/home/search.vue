<template>
  <div>
    <div class="hk-title">
      <el-menu
        class="hk-collega-title text-center margin-b-10 el-menu-demo"
        :default-active="activecollege"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <router-link to="/front/college/home/search/index" class="hk-collegetilte-a">
            <span class="hk-coleage-bar">综合</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/front/college/home/search/user" class="hk-collegetilte-a">
            <span class="hk-coleage-bar">用户</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/front/college/home/search/special" class="hk-collegetilte-a">
            <span class="hk-coleage-bar">专题</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/front/college/home/search/specialdolumn" class="hk-collegetilte-a">
            <span class="hk-coleage-bar">专栏</span>
          </router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 内容部分 -->
    <div class="hk-search-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activecollege: "1"
    };
  },
  mounted() {
    this.onRouterPathChanged();
  },
  methods: {
    handleSelect() {},
    onRouterPathChanged(val, oldval) {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      if (pathrouter.indexOf("/front/college/home/search/index") !== -1) {
        this.activecollege = "1";
      } else if (pathrouter.indexOf("/front/college/home/search/user") !== -1) {
        this.activecollege = "2";
      } else if (pathrouter.indexOf("/front/college/home/search/special") !== -1) {
        this.activecollege = "3";
      } else {
        this.activecollege = "4";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hk-collega-title {
  .el-menu-item {
    padding: 0 !important;
    margin: 0 20px !important;
    .hk-collegetilte-a {
      display: inline-block;
      padding: 0 0px;
    }
  }
  &.el-menu--horizontal > .el-menu-item.is-active {
      color: #0BD094;
      border-color: #0BD094;
      border-bottom: 4px solid #0BD094;
      // width: 56px;#656565
  }
  .hk-coleage-bar {
    color: #656565;
    font-family:Microsoft YaHei;
  }
}
</style>
