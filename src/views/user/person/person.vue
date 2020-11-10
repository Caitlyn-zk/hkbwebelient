<template>
  <div class="hk-person content">
    <div class="hk-person-title text-center">
      <!-- 搜索栏 -->
      <el-input placeholder="请输入你想要的内容搜索" v-model="searchinput" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="工程">
          <el-option label="项目" value="1"></el-option>
          <el-option label="公示" value="2"></el-option>
          <el-option label="招聘" value="3"></el-option>
          <el-option label="商城" value="4"></el-option>
          <el-option label="学院" value="5"></el-option>
        </el-select>
        <el-button slot="append" class="hk-search-but" @click="onSearch">搜索</el-button>
      </el-input>
    </div>
    <div class="hk-person-content clearfix">
      <!-- 左侧导航栏 -->
      <div class="fl hk-person-left-nav clearfix">
        <div class="hk-person-nav-bar">
          <el-menu
            :default-active="active"
            :default-openeds="['2','4']"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          ><router-link to="/user/person/index">
              <el-menu-item index="1">
                  <div>
                    <span class="text-person-size" slot="title">首页</span>
                  </div>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template class="hk-el-submenu_title" slot="title">
                <span class="text-person-size">简历管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user/person/my/resume-center" >
                  <el-menu-item index="2-2">
                      <div>
                        <i class="iconfont icon-dian"></i>
                        <span>简历中心</span>
                      </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/my/collect">
                  <el-menu-item index="2-3">
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>我的收藏</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/my/applyfor">
                  <el-menu-item index="2-4">
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>我的申请</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/resume/shield-company">
                  <el-menu-item index="2-5">
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>屏蔽公司</span>
                    </div>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <router-link class="font-14 text-dark" to="/user/person/my/college">
              <el-menu-item index="3">
                <div>
                  <span class="text-person-size" slot="title">我的学院</span>
                </div>
              </el-menu-item>
            </router-link>
            <el-submenu index="4">
              <template slot="title">
                <span class="text-person-size">更多</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user/person/more/salary-query">
                  <el-menu-item index="4-1">
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>薪资查询</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/more/subscribe">
                  <el-menu-item index="4-2" >
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>我的订阅</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/more/privacy">
                  <el-menu-item index="4-3">
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>个人隐私</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/more/account">
                  <el-menu-item index="4-4">
                    <div>
                      <i class="iconfont icon-dian"></i>
                      <span>账号设置</span>
                    </div>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 右侧主要内容展示 -->
      <div class="fl hk-person-content-main clearfix">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      personSearch: '',
      inputSearch: '',
      searchinput: '',
      select: '',
      active: '1'
    }
  },
  mounted () {
    this.onRouterPathChanged()
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
      // console.log(123)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
      // console.log(key)
    },
    // 搜索框
    onSearch () {
      this.$router.push({path: '/front/recruit/post/search', query: {key: this.inputValue}})
      document.documentElement.scrollTop = 0
    },
    onRouterPathChanged (val, oldval) {
      let that = this
      let pathrouter = this.$router.currentRoute.path
      if (this.pathrouter === '/user/person/index') {
        // 改变一级导航的状态
        this.active = '1'
      } else {
        if (pathrouter.indexOf('/user/person/my/resume') !== -1) {
          this.active = '2-1'
        } else if (pathrouter.indexOf('/user/person/my/resume-center') !== -1) {
          this.active = '2-2'
        } else if (pathrouter.indexOf('/user/person/my/collect') !== -1) {
          this.active = '2-3'
        } else if (pathrouter.indexOf('/user/person/my/applyfor') !== -1) {
          this.active = '2-4'
        } else if (pathrouter.indexOf('/user/person/resume/shield-company') !== -1) {
          this.active = '2-5'
        } else if (pathrouter.indexOf('/user/person/more/salary-query') !== -1) {
          this.active = '4-1'
        } else if (pathrouter.indexOf('/user/person/more/subscribe') !== -1) {
          this.active = '4-2'
        } else if (pathrouter.indexOf('/user/person/more/privacy') !== -1) {
          this.active = '4-3'
        } else if (pathrouter.indexOf('/user/person/more/account') !== -1) {
          this.active = '4-4'
        }
      }
      // window.localStorage.setItem('active', this.active)
    },
    //
    onSearch(){
      if(this.select == '' || this.select == '1' || this.select == '2'){
        this.$router.push({path:'/front/project/search',query:{key:this.searchinput}})
      } else if (this.select == '3') {
        this.$router.push({path:'/front/recruit/post/search',query:{key:this.searchinput}})
      } else if (this.select == '4') {
        this.$router.push({path:'/front/store',query:{key:this.searchinput}})
      } else if (this.select == '5') {
        this.$router.push({path:'/front/college/home/recommend',query:{key:this.searchinput}})
      }
    }
  },
  watch: {
    $route: {
      handler (val, oldval) {
        this.onRouterPathChanged(val, oldval)
      }
    }
  },
}
</script>

<style lang="less">

@import "./person.less";
</style>
