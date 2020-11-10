<template>
  <div class="hk-person-main content clearfix">
    <div class="hk-person-title-bar">
      <div class="hk-person-portrait clearfix">
        <div class="fl margin-r-24">
          <img v-if="org_logo" :src="org_logo" alt="" class="avatar">
          <!-- <div v-else class="user-img-replace"></div> -->
          <img v-else src="@/assets/image/user_img.png" class="user-img">
        </div>
        <div class="fl ">
          <span class="hk-author-name">{{org_name}}</span>
          <div>{{org_email == '' ? '邮箱：未绑定':'邮箱：'+ org_email}}&#12288;&#12288;{{org_phone == '' ? '手机号：未绑定':'手机号：'+org_phone}}</div>
          <div class="hk-binding">
            <el-button type="text" @click="onmodifyEmail">{{org_email == '' ? '绑定邮箱':'修改邮箱'}}</el-button>
            <el-button type="text" @click="onmodifyPhone">{{org_phone == '' ? '绑定手机号':'修改手机号'}}</el-button>
            <el-button type="text" @click="onAuthentication">企业认证</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="hk-cont-main clearfix">
      <div class="hk-cont-right-person fr">
        <div class="hk-cont-right-box">
          <ul class="hk-cont-right-box-bar">
            <div class="hk-like-bar clearfix">
              <el-button class="fr hk-more-bar" type="text">查看全部</el-button>
              <span class="hk-like-title">代办事项</span>
            </div>
            <li class="hk-topic-word-bar hk-cursor clearfix" v-for="item in 11" :key="item">
              <span class="fr hk-text-title-data">2020-12-11</span>
              <span class="hk-text-title-bar">关注话题《水土保持怎么做》</span>
            </li>
          </ul>
        </div>
        <div class="hk-box-buttom">
          <h4 class="hk-convenient-nav">快捷导航</h4>
          <ul class="hk-convenient-item">
            <li class="hk-convenient-item-bar hk-cursor">
              <router-link to="/user/org/project">
                <i class="iconfont icon-guanli hk-nav-icon-bar hk-nav-el-icon-bar"></i>
                <div class="hk-item-text-bar"><span>项目管理</span></div>
              </router-link>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <router-link to="/user/org/post/manage">
                <i class="iconfont icon-drxx12 hk-nav-icon-bar"></i>
                <div class="hk-item-text-bar"><span>职位管理</span></div>
              </router-link>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <i class="iconfont icon-icon_article hk-nav-icon-bar"></i>
              <div class="hk-item-text-bar"><span>发布文章</span></div>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <i class="iconfont icon-xiangmu hk-nav-icon-bar"></i>
              <div class="hk-item-text-bar"><span>项目中心</span></div>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <router-link :to="{path:'/user/org/post/public',query:{id:0}}">
                <i class="el-icon-s-promotion hk-nav-icon-bar hk-nav-el-icon-bar"></i>
                <div class="hk-item-text-bar"><span>发布职位</span></div>
              </router-link>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <router-link :to="{path:'/user/org/project/add',query:{proid:0}}">
                <i class="iconfont icon-xiugai hk-nav-icon-bar hk-nav-el-icon-bar"></i>
                <div class="hk-item-text-bar"><span>项目管理</span></div>
              </router-link>
              
            </li>
          </ul>
        </div>
      </div>
      <div class="fl clearfix">
        <ul class="hk-theme-main clearfix">
          <li class="hk-theme-list">
            <h4 class="hk-theme-titel">学院数据</h4>
            <div class="hk-browse-bar hk-cursor" v-for="item in college" :key="item.id">
              <p class="hk-borwse-title">{{item.title}}</p>
              <span class="hk-brouse-number">{{item.views}}</span>
            </div>
          </li>
          <li class="hk-theme-list">
            <h4 class="hk-theme-titel">项目数据</h4>
            <div class="hk-browse-bar hk-cursor" v-for="item in porject" :key="item.id">
              <p class="hk-borwse-title">{{item.title}}</p>
              <span class="hk-brouse-number">{{item.views}}</span>
            </div>
          </li>
          <li class="hk-theme-list">
            <h4 class="hk-theme-titel">职位数据</h4>
            <div class="hk-browse-bar hk-cursor" v-for="item in postList" :key="item.id">
              <p class="hk-borwse-title">{{item.title}}</p>
              <span class="hk-brouse-number">{{item.views}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="hk-recommend">
      <div class="hk-recommend-title clearfix">
        <span class="fr line-70">
          <el-button type="text" class="font-14">查看更多</el-button>
        </span>
        <span class="hk-recommen-title-bar">推荐项目</span>
        <el-button class="margin-l-17" type="text">换一批</el-button>
      </div>
      <ul class="hk-recommend-list">
        <li class="hk-recommend-list-bar shows" v-for="item in 6" :key="item">
          <div class="clearfix hk-recommend-title-name">
            <span class="fr public-post-salary">14W-15W</span>
            <span class="hk-recommend-title-bar public-title-bar title-nowrap">贵州财经大学饮用水工程</span>
          </div>
          <div class="hk-recommend-company clearfix">
            <span class="fr">2020-05-02</span>
            <span>发布机构：贵州财经大学</span>
          </div>
        </li>
      </ul>
    </div>
    <modifyPhone :phonePopup="phonePopup" @close="onClosePhonePopup" @submit="onPhoneSubmit"></modifyPhone>
    <modifyEmail :emailPopup="emailPopup" @close="onCloseEmailPopup" @submit="onEmailSubmit"></modifyEmail>
  </div>
</template>

<script>
import modifyPhone from "components/popup/modify-phone"
import modifyEmail from "components/popup/modify-email"
export default {
  inject: ['reload'],
  components:{ modifyPhone, modifyEmail},
  data () {
    return {
      // 个人信息
      userInfolists: [],
      college: [
        {
          id: 1,
          title: '发表文章',
          views: 98
        }, {
          id: 2,
          title: '发布专栏',
          views: 98
        }, {
          id: 3,
          title: '今日浏览',
          views: 98
        }, {
          id: 4,
          title: '历史浏览',
          views: 98
        }, {
          id: 5,
          title: '提问',
          views: 98
        }, {
          id: 6,
          title: '回答',
          views: 98
        }, {
          id: 7,
          title: '关注',
          views: 98
        }, {
          id: 8,
          title: '收藏',
          views: 98
        }],
        porject: [{
          id: 1,
          title: '工程项目',
          views: 98
        }, {
          id: 2,
          title: '公示项目',
          views: 98
        }, {
          id: 3,
          title: '今日浏览',
          views: 98
        }, {
          id: 4,
          title: '历史浏览',
          views: 98
        }
      ],
      phonePopup: false,
      emailPopup: false,
      // 职位
      postList: [{
        id: 1,
        title: '发布职位',
        views: 98
      }, {
        id: 2,
        title: '今日申请',
        views: 98
      }, {
        id: 3,
        title: '历史申请',
        views: 98
      }, {
        id: 4,
        title: '处理简历',
        views: 98
      }, {
        id: 5,
        title: '未处理简历',
        views: 98
      }, {
        id: 6,
        title: '今日安排',
        views: 98
      }, {
        id: 7,
        title: '明日安排',
        views: 98
      }, {
        id: 8,
        title: '历史安排',
        views: 98
      }],
    }
  },
  created () {
    // this.reload()
  },
  computed:{
    org_name () {
      if (this.$store.state.app.userInfo.org_list) {
        if (this.$store.state.app.userInfo.org_list.length>0) {
          return this.$store.state.app.userInfo.org_list[0].org_name
        }
      }
      return '新企业'
    },
    org_email () {
      if (this.$store.state.app.userInfo.email) {
       return this.$store.state.app.userInfo.email
      }
      return ''
    },
    org_phone () {
      if (this.$store.state.app.userInfo.phone) {
        return this.$store.state.app.userInfo.phone
      }
      return ''
    },
    org_logo(){
      if (this.$store.state.app.userInfo.org_list && this.$store.state.app.userInfo.org_list[0] !== undefined) {
        return 'http://cdn.65ph.com/' + this.$store.state.app.userInfo.org_list[0].org_logo
      }
      return ''
    }
  },
  methods: {
    // 绑定邮箱
    onmodifyEmail(){
      this.emailPopup = true
      // this.$router.push({path: '/account/org/bindingve/email'})
    },
    // 绑定手机号
    onmodifyPhone(){
      this.phonePopup = true
    },
    onAuthentication(){
      this.$router.push({path:'/user/org/account/orginfo'})
    },
    onClosePhonePopup(){
      this.phonePopup = false
    },
    onCloseEmailPopup(){
      this.emailPopup = false
    },
    onPhoneSubmit(){
      this.phonePopup = false
      this.reload()
    },
    onEmailSubmit(){
      this.emailPopup = false
      this.reload()
    }
  }
}
</script>

<style lang="less" scoped>

@import './org-index.less';
</style>
