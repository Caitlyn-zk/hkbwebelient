<template>
  <div class="hk-person-main">
    <div class="hk-person-title-bar">
      <div class="hk-person-portrait padding-t-20 padding-r-20 clearfix">
        <div class="hk-person-button fr">
        </div>
        <div class="fl margin-r-24 margin-t-8">
          <img :src="avatar == '' ? require('@/assets/image/user_img.png') : avatar " class="user-img">
        </div>
        <div class="fl">
          <span class="hk-author-name">{{real_name}}</span>
          <span class="hk-major">
            <!-- 学校 -->
            <span>{{school}}</span><span class="major">{{major}}</span>
            <div class="hk-work-bar-main clearfix">
              <div class="line-26 hk-work-bar">
                <span>{{email ==''? '邮箱：未绑定':'邮箱：'+ email}}</span>
              </div>
              <div class="line-26 hk-work-bar">
                <span>{{phone ==''? '手机号：未绑定':'手机号：'+ phone}}</span>
              </div>
            </div>
            <div class="hk-binding">
              <el-button type="text" @click="onBindingEmail">{{email !=='' ? '修改邮箱':'邮箱绑定'}}</el-button>
              <el-button type="text" @click="onBindingPhone">{{phone !=='' ?'修改手机号':'手机号绑定'}}</el-button>
              <!-- <el-button type="text" @click="onAut">个人认证</el-button> -->
            </div>
          </span>
        </div>
      </div>
      <!-- <el-button round class="hk-person-edit-but">编辑</el-button> -->
    </div>
    <div class="hk-cont-main clearfix">
      <div class="hk-cont-right-person fr">
        <ul class="hk-cont-right-box">
          <div class="hk-like-bar clearfix">
            <el-button class="fr hk-more-bar" type="text">查看更多</el-button>
            <span class="hk-like-title">猜你喜欢</span>
          </div>
          <li class="hk-topic-word-bar hk-cursor" v-for="item in 11" :key="item">
            <span>关注话题《水土保持怎么做》</span>
          </li>
        </ul>
        <div class="hk-box-buttom">
          <h4 class="hk-convenient-nav">快捷导航</h4>
          <ul class="hk-convenient-item">
            <li class="hk-convenient-item-bar hk-cursor">
              <i class="el-icon-s-promotion hk-nav-icon-bar hk-nav-el-icon-bar"></i>
              <div class="hk-item-text-bar"><span>投递简历</span></div>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <i class="iconfont icon-icon_article hk-nav-icon-bar"></i>
              <div class="hk-item-text-bar"><span>发布文章</span></div>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <router-link to="/user/person/my/resume">
                <i class="iconfont icon-xiugai hk-nav-icon-bar hk-nav-el-icon-bar"></i>
                <div class="hk-item-text-bar"><span>修改简历</span></div>
              </router-link>
            </li>
            <li class="hk-convenient-item-bar hk-cursor">
              <i class="iconfont icon-xiangmu hk-nav-icon-bar"></i>
              <div class="hk-item-text-bar"><span>热点专题</span></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="clearfix fl">
        <ul class="hk-theme-main clearfix">
          <li class="hk-theme-list fl">
            <h4 class="hk-theme-titel">我的简历</h4>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">{{invitationCount}}</span>
              <span>谁看过我</span>
            </div>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">{{deliveryCount}}</span>
              <span>我的申请</span>
            </div>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">{{lookMeCount}}</span>
              <span>面试邀请</span>
            </div>
          </li>
          <!-- 我的学院 -->
          <li class="hk-theme-list fl">
            <h4 class="hk-theme-titel">我的学院</h4>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">98</span>
              <span>我的提问</span>
            </div>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">98</span>
              <span>我的回答</span>
            </div>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">98</span>
              <span>我的文章</span>
            </div>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">98</span>
              <span>我的专栏</span>
            </div>
          </li>
          <!-- 我的关注 -->
          <li class="hk-theme-list fl">
            <h4 class="hk-theme-titel">我的关注</h4>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">98</span>
              <span>关注的人</span>
            </div>
            <div class="hk-browse-bar clearfix">
              <span class="fr hk-brouse-number">98</span>
              <span>我的粉丝</span>
            </div>
          </li>
        </ul>
        <div class="hk-system-main">
          <h4 class="hk-system-title">系统信息</h4>
          <div class="hk-system-cont-main">
            <div class="hk-system-list clearfix hk-cursor" v-for="(item,index) in messageList" :key="index">
              <span class="fr hk-system-date">{{item.add_time}} </span>
              <span>{{item.ms_title}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hk-recommend">
      <div class="hk-recommend-title clearfix">
        <span class="fr line-70">
          <el-button type="text" class="font-14" @click="onSeeMore">查看更多</el-button>
        </span>
        <span class="hk-recommen-title-bar">推荐岗位</span>
        <el-button class="margin-l-10" type="text" @click="onNextPage">换一批</el-button>
      </div>
      <ul class="hk-recommend-list">
        <li class="hk-recommend-list-bar shows" v-for="(post,index) in postList" :key="index" @click="onPostDetail(post)">
          <div class="clearfix hk-recommend-title-name">
            <span class="fr public-post-salary">{{post.min_salary | onSalary}}-{{post.max_salary | onSalary}}</span>
            <span class="hk-recommend-title-bar public-title-bar title-nowrap hk-cursor">{{post.post_name}}</span>
          </div>
          <p class="hk-recommend-company">{{post.org_name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {userAdminIndex,getRecommendPostList} from '@/api/user'
import {mainSalary} from "@/config/constant";
import utils from '@/utils/index.js'
import { mapMutations, mapGetters } from "vuex";
export default {
  filters:{
    onSalary (value) {
      var obj = utils.findObj(mainSalary, value)
      return obj.label
    },
  },
  data () {
    return {
      // 个人信息
      userInfolists: [],
      invitationCount: 0,
      deliveryCount: 0,
      lookMeCount: 0,
      messageList: [],
      postList: [],
      currentPage: 1,
      list_rows: 6,
      post_name: '',
      RecentBrowsingSalary: mainSalary,
      // avatar: '/static/img/footer_QR_code.png',
    }
  },
  computed:{
    real_name () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.real_name) {
        return this.$store.state.app.userInfo.real_name
      }
      return '新用户'
    },
    email () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.email) {
        return this.$store.state.app.userInfo.email
      }
      return ''
    },
    phone () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.phone) {
        return this.$store.state.app.userInfo.phone
      }
      return ''
    },
    school () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.school) {
        return this.$store.state.app.userInfo.school
      }
      return ''
    },
    major () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.major) {
        return this.$store.state.app.userInfo.major
      }
      return ''
    },
    avatar(){
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.avatar) {
        return 'http://cdn.65ph.com/' + this.$store.state.app.userInfo.avatar
      }
      return ''
    },
    ...mapGetters({
      postVistRecord: "postVistRecord"
    })
  },
  created () {
    this.getUserAdminIndex()
    this.get_RecommendPostList()
    //初始化职位访问记录
    this.INIT_POST_RECORD();
  },
  methods: {
    ...mapMutations(["INIT_POST_RECORD", "ADD_POST_RECORD"]),
    getUserAdminIndex () {
      userAdminIndex().then(res=>{
        console.log(res.data)
        console.log("个人中心信息",JSON.stringify(res))
        // 邀请数
        this.invitationCount = res.data.invitation_count
        // 申请
        this.deliveryCount = res.data.delivery_count
        // 查看数
        this.lookMeCount = res.data.look_me_count
        this.messageList = res.data.message_list
      })
    },
    // 获取推荐职位列表
    get_RecommendPostList () {
      var data = {
        page: this.currentPage,
        list_rows: this.list_rows
      }
      getRecommendPostList(data).then(res=>{
        if (res.status==200) {
          this.postList = res.data
          console.log(res.data)
          this.post_name = res.data[0].post_name
        }
        // console.log("职位列表",JSON.stringify(res))
      })
    },
    // 切换下一页
    onNextPage () {
      // 目前根据返回数是否大于等于6，请求推荐职位
      if (this.postList.length >= 6) {
        this.currentPage = this.currentPage + 1
        this.get_RecommendPostList()
      } else {
        this.currentPage = 1
        this.get_RecommendPostList()
      }
    },
    onPostDetail(val){
      // console.log(val);
      let max_salary = null, min_salary = null
      this.RecentBrowsingSalary.forEach(item => {
        if (item.value === val.min_salary) {
          return min_salary = item.label
        }
        if (item.value === val.max_salary) {
          return max_salary = item.label
        }
      })
      // console.log(min_salary +'-' + max_salary)
      this.ADD_POST_RECORD({
        post_id: val.post_id,
        org_name: val.org_name,
        post_name: val.post_name,
        salary: min_salary +'-' + max_salary
      });
      // this.$router.push({path:'/front/recruit/post/detail',query:{post_id:id}})
      this.$router.push({path:'/front/recruit/post/detail',query:{post_id:val.post_id}});
    },
    // 查看更多
    onSeeMore(){
      this.$router.push({path:'/front/recruit/post/search'})
    },
     // 绑定邮箱
    onBindingEmail(){
      this.$router.push({path: '/account/user/bindingve/email'})
    },
    // 绑定手机号
    onBindingPhone(){
      this.$router.push({path: '/account/user/bindingve/phone'})
    },
    // 认证
    onAut(){

    }
  }
}
</script>

<style lang="less" scoped>

@import './home.less';
</style>
