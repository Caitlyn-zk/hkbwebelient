<template>
  <!-- 标题: 推荐，关注，热榜 -->
  <el-menu
    class="hk-collega-title text-center margin-b-10 el-menu-demo"
    :default-active="activecollege"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <router-link to="/front/college/home/recommend" class="hk-collegetilte-a">
        <span class="hk-coleage-bar">推荐</span>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/front/college/home/follow" class="hk-collegetilte-a">
        <span class="hk-coleage-bar">关注</span>
      </router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/front/college/home/hotlist" class="hk-collegetilte-a">
        <span class="hk-coleage-bar">热榜</span>
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activecollege: "0"
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
      if (pathrouter.indexOf("/front/college/home/recommend") !== -1) {
        this.activecollege = "1";
      } else if (pathrouter.indexOf("/front/college/home/follow") !== -1) {
        this.activecollege = "2";
      } else if (pathrouter.indexOf("/front/college/home/hotlist") !== -1) {
        this.activecollege = "3";
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
      // width: 56px;
  }
  .hk-coleage-bar {
    color: #656565;
    font-family:Microsoft YaHei;
  }
}
</style>
