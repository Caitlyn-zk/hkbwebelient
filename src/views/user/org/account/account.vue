<template>
  <div class="hk-person content">
    <div class="hk-addproject-title">
        账户中心
    </div>
    <div class="hk-person-content clearfix">
      <!-- 左侧导航栏 -->
      <div class=" hk-person-left-nav clearfix">
        <div class="hk-person-nav-bar">
          <el-menu
            :default-active="active"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item v-for="(item,index) in menuData" :key="index" :index="item.value">
              <router-link :to="item.path">
                <div>
                  <span class="text-person-size" slot="title">{{item.label}}</span>
                </div>
              </router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <!-- 右侧主要内容展示 -->
      <div class=" hk-person-content-main clearfix">
        <div class="hk-org-step-title"  v-if="steps">
          <el-steps :active="stepsNumber">
              <el-step title="上传营业执照" description="0"></el-step>
              <el-step title="补充公司信息" description="0"></el-step>
          </el-steps>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: '1',
      stepsNumber: 1,
      steps: false,
      menuData:[
        {
            value:'0',
            label:'个人信息',
            path:'/user/org/account/org/personalinfox'
        },
        {
            value:'1',
            label:'企业信息',
            path:'/user/org/account/orginfo'
        },
        {
            value:'2',
            label:'账户设置',
            path:'/user/org/account/setting'
        }
      ]
    }
  },
  created(){
  },
  mounted () {
    this.onRouterPathChanged()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      console.log(123)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
      console.log(key)
    },
    onRouterPathChanged (val, oldval) {
      let that = this
      let pathrouter = this.$router.currentRoute.path
      if (pathrouter.indexOf('/user/org/account/org/personalinfox') !== -1) {
          this.active = '0'
      } else  if (pathrouter.indexOf('/user/org/account/orginfo') !== -1 || pathrouter.indexOf('user/org/account/uploadlicense') !== -1 || pathrouter.indexOf('/user/org/account/companyinfo') !== -1) {
          this.active = '1'
      } else {
          this.active = '2'
      }
      if (pathrouter.indexOf('user/org/account/uploadlicense') !== -1){
        this.stepsNumber = 1
        this.steps = true
      } else if (pathrouter.indexOf('/user/org/account/companyinfo') !== -1) {
        this.stepsNumber = 2
        this.steps = true
      } else {
        this.steps = false
      }

    },
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

@import "./account.less";
</style>
