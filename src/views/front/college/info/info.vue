<template>
  <div class="content">
    <!-- 导航部分 -->
    <navigation></navigation>
    <div class="info padding-t-30 margin-b-20">
      <div class="info-menu-left margin-r-26">
        <div class="recommended-list">
          <div
            class="block-list clearfix hk-cursor"
            v-for="(item,index) in infoNav"
            :key="index"
            :class="infoAcitve === item.id ? 'is-active' : ''"
            @click="onPage(index,item)"
          >
            <span class="iconfont hk-icon-text" :class="item.icon"></span>
            <span class="recommended-name title-nowrap padding-l-11 line-40">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="info-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../common/navigation";
export default {
  data() {
    return {
      infoAcitve: 2,
      infoNav: [
        {
          id: 1,
          icon: "icon-xinxi",
          name: "评论",
          url: "/front/college/info/comment"
        },
        {
          id: 2,
          icon: "icon-feedback",
          name: "信息",
          url: "/front/college/info/list"
        },
        {
          id: 3,
          icon: "icon-tuihuiqingqiu",
          name: "投稿请求",
          url: "/front/college/info/submitrequest"
        }
      ]
    };
  },
  created() {},
  components: {
    navigation
  },
  mounted () {
    this.onRouterPathChanged();
  },
  methods: {
    // 页面跳转
    onPage(index, item) {
      if (index) this.infoAcitve = item.id;
      this.$router.push({ path: item.url });
    },
    onRouterPathChanged(val, oldval) {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      if (pathrouter.indexOf("/front/college/info/comment") !== -1) {
        that.infoAcitve = 1;
      } else if (pathrouter.indexOf("/front/college/info/list") !== -1) {
        that.infoAcitve = 2;
      } else {
        that.infoAcitve = 3;
      }
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        // console.log(val);
        let path = val.path;
        let that = this;
        // (pathrouter.indexOf('/front/college/info/submitrequest') !== -1)
        if (val.path === "/front/college/info/submitrequest/manage") {
          this.infoAcitve = 3;
        }
        this.onRouterPathChanged();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./info.less";
</style>