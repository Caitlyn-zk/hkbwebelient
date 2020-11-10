<template>
  <div>
    <div class="top-height"></div>
    <div class="hk-backstagenv">
      <div class="hk-backstagenv-fixed">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo font-14 content"
          mode="horizontal"
          @select="handleSelect"
          background-color="#202329"
          active-text-color="#05D797"
        >
          <div class="fl hk-nav-mbar margin-r-20 padding-t-15">
            <router-link to="/">
              <el-badge value="企业" class="item">
                <el-button type="text" class="font-16 hk-cursor line-24" size="small">环科宝</el-button>
              </el-badge>
            </router-link>
          </div>
          <el-menu-item index="1" class="padding-l-10 hk-header">
            <router-link class="hk-nav-a" to="/user/org/index">首页</router-link>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">项目管理</template>
            <el-menu-item index="2-1">
              <router-link class="hk-rout-link-fb hk-nav-a" to="/user/org/project">项目列表</router-link>
            </el-menu-item>
            <el-menu-item index="2-2" @click="peleaseProject">
              <router-link
                class="hk-rout-link-fb hk-nav-a"
                :to="{path:'/user/org/project/add',query:{proid:0}}"
              >发布项目</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <router-link class="hk-nav-a" to="/user/org/notice/list">环评公示</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link class="hk-nav-a" to>学院</router-link>
          </el-menu-item>

          <el-submenu index="5">
            <template slot="title">人才库管理</template>
            <el-menu-item index="5-1">
              <router-link
                class="hk-rout-link-fb hk-nav-a text-white"
                to="/user/org/talentpool"
              >平台人才库</router-link>
            </el-menu-item>
            <el-menu-item index="5-1">
              <router-link
                class="hk-rout-link-fb hk-nav-a"
                to="/user/org/talentpool/resumeInbox"
              >收信箱</router-link>
            </el-menu-item>
            <el-menu-item index="5-1">
              <router-link
                class="hk-rout-link-fb hk-nav-a"
                to="/user/org/talentpool/collection"
              >人才收藏</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="6">
            <router-link class="hk-nav-a" to="/user/org/post/manage">职位管理</router-link>
          </el-menu-item>

          <!-- 右边导航 -->
          <div class="hk-backnav-right fr clearfix">
            <span class="hk-org-nav-news font-14">
              <span class="hk-jianxiquchu">
                <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
                  <span class="el-dropdown-link">
                    <el-badge :value="unread_count" class="item">
                      <router-link to="/user/org/talentpool/resumeInbox" class="hk-nav-a">
                        <span class="hk-top-r-text">消息中心</span>
                      </router-link>
                    </el-badge>
                  </span>
                  <el-dropdown-menu
                    slot="dropdown"
                    class="hk-person-news"
                    style="width: 200px;min-height: 100px;"
                  >
                    <el-dropdown-item>消息0001</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
                  <span class="hk-top-r-text hk-cursor" style="padding-right:12px;">发布</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link
                        class="text-blacks"
                        :to="{path:'/user/org/project/add',query:{proid:0}}"
                      >发布项目</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        class="text-blacks"
                        :to="{path:'/user/org/post/public',query:{id:0}}"
                      >发布职位</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link class="text-blacks" to="/front/college/home/recommend">提问</router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
                  <span class="el-dropdown-link hk-cursor clearfix">
                    <!-- 控制显示字数 -->
                    <div class="fl text-center padding-lr-12 hk-org-name" style>{{org_name}}</div>
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link class="text-blacks" :to="{path:'/user/org/account/index'}">账户中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link class="text-blacks" :to="{path:'/user/org/account/setting'}">修改资料</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.passive="onLogout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </span>
            </span>
          </div>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/api/user";
import store from "@/store";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      defaultActive: "1"
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
      userInfo: "userInfo"
    }),
    // 获取机构名称
    org_name() {
      if (this.userInfo.org_list) {
        if (this.userInfo.org_list.length > 0) {
          return this.userInfo.org_list[0].org_name;
        }
      }
      return "新企业";
    },
    unread_count() {
      if (this.userInfo.unread_count !== 0) {
        return this.userInfo.unread_count;
      }
      return null;
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        // console.log(val)
        this.onRouterPathChanged(val, oldval);
      }
    }
  },
  created() {
    this.getRouter();
    // this.peleaseProject()
  },
  mounted() {
    if (this.isLogin) this.$store.dispatch("USERINFO", true);
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    onRouterPathChanged(val, oldval) {
      this.type1active = 1;
      // this.$router.go(0)
      // console.log('路由', val)
      this.getRouter();
    },
    peleaseProject() {
      this.$router.push({
        name: "CmpOrgAddProject",
        query: {
          proid: 0
        }
      });
    },
    getRouter() {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      // console.log(pathrouter)
      // 导航类型2的判断状态
      if (pathrouter.indexOf("/user/org/project") !== -1) {
        this.$set(this, "defaultActive", "2-1");
        // console.log(pathrouter + '这是是2')
      } else if (pathrouter.indexOf("/user/org/talentpool") !== -1) {
        that.$set(that, "defaultActive", "5-1");
      } else if (pathrouter.indexOf("/user/org/college") !== -1) {
        that.$set(that, "defaultActive", "4");
      } else if (pathrouter.indexOf("/user/org/post") !== -1) {
        that.$set(that, "defaultActive", "6");
      } else if (pathrouter.indexOf("/user/org/notice") !== -1) {
        that.$set(that, "defaultActive", "3");
      } else if (pathrouter === "/user/org/index") {
        this.$set(this, "defaultActive", "1");
      }
    },
    // 退出登录
    onLogout() {
      logout().then(res => {
        // console.log('退出企业登陆',JSON.stringify(res))
        if (res.status === 200) {
          store.commit("LOGOUT");
          const { fullPath, name } = router.currentRoute;
          if (fullPath.indexOf("/user/org") != -1) {
            // 退出到登陆页面
            this.$router.push({ path: "/account/org/login" });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "./orgbacknav.less";
</style>
