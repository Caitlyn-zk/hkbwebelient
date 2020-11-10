<template>
<!-- 顶部导航 -->
  <!-- 右边导航 -->
  <div class="hk-top-nav-r fr hk-top-content">
    <!-- 未登录状态 -->
    <span v-if="isLogin == false || isLogin == undefined" class="hk-main-text">
      <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
        <span class="el-dropdown-link hk-cursor">
          <span class="hk-top-r-text hk-top-r-text-fabu padding-r-12">发布</span>
          <span>|</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link class="text-blacks"  :to="{path:'/user/org/project/add',query:{proid:0}}">发布项目</router-link></el-dropdown-item>
          <el-dropdown-item><router-link class="text-blacks" :to="{path:'/user/org/post/public',query:{id:0}}">发布职位</router-link></el-dropdown-item>
          <el-dropdown-item><router-link class="text-blacks" to="/front/college/home/recommend">提问</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="hk-top-r-text padding-lr-12 font-14" style="border:none;"><router-link class="head"  to="/user/org/talentpool">找人才</router-link></span>
      <el-button class="hk-right-button" @click="onOrgService">企业服务</el-button>
      <span class="hk-top-r-text padding-lr-12 hk-top-r-text-fabu font-14"><router-link class="head"  to="/account/login">登录</router-link></span>
      <span class="font-14">|</span>
      <span class="hk-top-r-text padding-l-12 font-14"><router-link class="head"  to="/account/register">注册</router-link></span>
    </span>
    <!-- 登录状态 -->
    <span v-else class="">
      <!-- 登录个人端状态 -->
      <span class="hk-org-nav-news">
        <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
          <span class="el-dropdown-link hk-cursor">
            <span class="hk-top-r-text hk-top-r-text-fabu padding-lr-12 font-14">发布</span>|
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link class="text-blacks"  :to="{path:'/user/org/project/add',query:{proid:0}}">发布项目</router-link></el-dropdown-item>
            <el-dropdown-item><router-link class="text-blacks" :to="{path:'/user/org/post/public',query:{id:0}}">发布职位</router-link></el-dropdown-item>
            <el-dropdown-item><router-link class="text-blacks" to="/front/college/home/recommend">提问</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="">
          <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
            <span class="el-dropdown-link">
              <el-badge :value="unread_count" class="item">
                <span class="padding-lr-12 font-14 hk-cursor" style="border:none;">消息中心</span>
              </el-badge>
            </span>
            <el-dropdown-menu slot="dropdown" class="hk-person-news" style="width: 200px;">
              <router-link  style="color: #000;" class="infocenter"  :to="{path:'/account/infocenter'}"><el-dropdown-item>消息</el-dropdown-item></router-link>
            </el-dropdown-menu>
          </el-dropdown>
          
          <el-button class="hk-right-button" @click="onOrgService">企业服务</el-button>
          <el-dropdown :hide-on-click="false" class="hk-myname" style="color: #fff;">
            <span class="el-dropdown-link hk-cursor clearfix">
              <!-- 控制显示字数 -->
              <div class="fl text-center hk-user-name padding-lr-12">
                  {{userInfo.real_name}}
              </div>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link class="text-blacks font-14" to="/user/person/index">个人中心</router-link></el-dropdown-item>
              <el-dropdown-item @click.native.passive="onLogout" class="font-14">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </span>
    </span>
  </div>
</template>

<script>
import store from '@/store'
import { logout,getUserOrgInfo} from '@/api/user'
import { mapGetters } from 'vuex'
import router from '@/router'


export default {

  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      userInfo:'userInfo'
    }),
    unread_count () {
      if (this.userInfo.unread_count !== 0) {
        return this.userInfo.unread_count
      }
      return null
    },
    real_name(){
      if (this.userInfo.real_name) {
        if (this.userInfo.person_reg_state < 100) {
            if (this.userInfo.person_reg_state === 10) {
                router.push({ path: '/account/user/register/basicinfo' })
            } else if (this.userInfo.person_reg_state === 20) {
                router.push({ path: '/account/user/register/edu' })
            } else if (this.userInfo.person_reg_state === 30) {
                router.push({ path: '/account/user/register/jw' })
            }
        }else{
          return this.userInfo.real_name
        }
      }
      return null
    }
  },
  created () {
  },
  mounted: function () {
    if(this.isLogin)
        this.$store.dispatch("USERINFO", true)
  },
  methods: {
    // 退出登录
    onLogout () {
      logout().then( res => {
        if (res.status == 200) {
          // console.log('退出登录成功')
          
          store.commit('LOGOUT')

          const { fullPath, name } = router.currentRoute
          // console.log("full path " + fullPath)
          if (fullPath.indexOf('/user/person') != -1) {
              //退出到登陆页面
              this.$router.push({path: '/account/login'})
          }

        }else{
          
        }
      })
    },

    onOrgService(){
      this.$router.push({path: '/user/org/index'})
    },
  }
}
</script>

<style lang="less" scoped>
// @import './fontnav.less';
.hk-main-text {
  font-size: 0;
  outline: none;
}
/deep/.hk-top-nav-r {
  font-size: 0;
  outline: none;
  float: right;
  .hk-top-r-text {
    font-size: 14px;
    &.hk-border-not {
      border-right: none;
    }
  }
  // 个人端消息中心
  .hk-person-news {
    width: 200px;
    min-height: 100px;
  }
}
.hk-org-nav-news {
    font-size: 0;
    /deep/.el-badge {
      height: 100%;
      margin-top: -1px;
      .el-badge__content {
        border: #F56C6C;
        right: 22px;
        top: 11px;
        height: 14px;
        padding: 0 5px;
        line-height: 13px;
        font-size: 10px;
      }
      .hk-top-r-text {
        padding-right: 20px;
      }
      .hk-myname {
        position: relative;
        padding-left: 5px;
        width: 80px;
        color: #fff;
        .el-dropdown-link {
          margin-left: 5px;
          color: #fff;
        }
      }
    }
    // 发布消息
    .hk-top-r-text-fabu {
      // height: 14px;
      // border-right: 1px solid #fff;
    }
  }
  .hk-top-r-text-fabu {
     height: 14px;
    // border-right: 1px solid #FFFFFF !important;
  }
.head{
  color:#fff;
}
a.text-blacks {
  &:hover {
    color: #00BB8D;
  }
}
.head:hover{
  color:#61caa2;
}
// 按钮
  .hk-right-button {
    &.el-button {
      height: 30px;
      padding: 0 10px;
      background: #00BB8D;
      border-color: #00BB8D;
      color: #fff;
    }
    a {
      color: #fff;
    }
  }
.hk-user-name {
  display:block;
  // width:80px;
  max-width: 80px;
  min-width: 50px;
  height: 50px;
  overflow:hidden;
  text-overflow:ellipsis;
  color: #00E49E;
  white-space:nowrap;
}
</style>
