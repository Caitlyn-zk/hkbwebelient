<template>
  <div class="hk-person-resume" ref="resume"> 
    <!-- 主要title -->
    <!-- <div class="hk-resume-title font-16">简历完成度( {{complete}}% ) （9年工作经验）</div> -->
    <!-- 小导航 -->
    <!-- 资料内容 -->
    <div class="hk-detail-bar" id="state" ref="myMenu">
      <div class="nav" id="boxFixed" :class="isFixed ? 'is_fixed':''">
        <div class="top-wrap">
          <div class="nav_top">{{real_name}}的简历</div>
          <div class="cup-box">
            <div class="cup">更新：{{ update_time | formatDate}} <i class="el-icon-question"></i></div>
            <div class="cup">公开：{{privacy_state |onPrivacyState}} <i class="el-icon-question"></i></div>
            <div class="cup">
              <el-rate
                v-model="complete"
                disabled
                text-color="#0097f9"
                score-template="{value}">
              </el-rate>
            </div>
            <!-- <div class="cup">英文简历 <i class="el-icon-arrow-right"></i></div> -->
          </div>
          <div class="btnbox">
            <div class="p-but" @click="onUpdate">刷新</div>
            <div class="p-but geige">预览</div>
          </div>
        </div>
        <div class="nav_body">
          <div v-for="(item,index) in navList" :key="index" @click="jump(index)" class="nav-list" :class="navIndex == index ? 'select-nav':''">
            <!-- <i class="el-icon-user nav-icon" :class="navIndex === index ? 'select-nav-icon':'icon1' " size="30"></i> -->
            <img :src="navIndex === index ? item.icon2: item.icon1" alt="">
            <div class="nav-name">{{item.label}}</div>
            <!-- <i class="el-icon-check judge-icon" :style="{'color':resumeJudge[index] ?'':'' }" size="20"></i> -->
          </div>
        </div>
      </div>
      <div id="resumes" class="hk-detail-title"  >
        <!-- 头像以及基本资料 -->
        <userInfo class="d_jump" ref="d_jump" :userInfo="userInfoLists" @info="infoData"></userInfo>
        <!-- 求职意向 -->
        <jwIntention class="d_jump" ref="d_jump" :jwList="jwList" ></jwIntention>
        <!-- 求职状态 -->
        <workState class="d_jump" ref="d_jump" :jobWantState="jobWantState" ></workState>
        <!-- 教育经历 -->
        <education class="d_jump" ref="d_jump" :eduLists="educationList" @educontent="receiveEduData"></education>
        <!-- 工作经历 -->
        <workFor class="d_jump" ref="d_jump" :workList="workList" @workcontent="receiveWorkForData"></workFor>
        <!-- 项目经历 -->
        <myProject class="d_jump" ref="d_jump" :projectList="projectList" @project="receiveProjectData"></myProject>
        <!-- 我的证书 -->
        <myCert class="d_jump" ref="d_jump" :certList="certList" @cert="receiveCertData"></myCert>
      </div>
    </div>
  </div>
</template>

<script>
import jwIntention from 'components/resume/resume-jw'
import workState from 'components/resume/resume-jw-state'
import education from 'components/resume/resume-edu'
import workFor from 'components/resume/resume-workfor'
import myProject from 'components/resume/resume-project'
import myCert from 'components/resume/resume-cert'
import userInfo from 'components/resume/resume-info'
import {getUserResumeDetail} from '@/api/recruit'
import { in_time, privacyState } from '@/config/constant.js'
import utils from '@/utils/index.js'
import {formatDate} from '@/utils/formatDate.js'
export default {
  inject: ['reload'],
  filters:{
    onPrivacyState (value) {
      var obj = utils.findObj(privacyState, value)
      return obj.label
    },
    formatDate(value) {
        var value = value * 1000
        let date = new Date(value)
        return formatDate(date, 'yyyy-MM-dd')
    }
  },
  data () {
    return {
      // 个人信息
      userInfo: [],
      resumeJudge:[false,false,false,false,false,false,false],
      offsetTop: 0,
      real_name:'',
      activeName: '1',
      isActive: '1',
      scrolls: {},
      navDistance: 212,
      navStyle: 0,
      // 个人信息
      userInfoLists: {},
      // 求职意向
      jwList: {},
      // 教育背景数据
      educationList: [],
      // 工作经历数据
      workList: [],
      // 证书
      certList: [],
      // 工作项目
      projectList: [],
      jobWantState: {},
      isFixed: false,
      scrollHeight: null,
      // 简历填写白分比
      complete: 20,
      navList:[
        {
          code:0,
          label:"个人信息",
          icon1:require("@/assets/image/icon/icon-info.png"),
          icon2:require('@/assets/image/icon/icon-info-select.png')
        },
        {
          code:1,
          label:"求职意向",
          icon1:require('@/assets/image/icon/icon-jw.png'),
          icon2:require('@/assets/image/icon/icon-jw-select.png')
        },
        {
          code:2,
          label:"求职状态",
          icon1:require('@/assets/image/icon/icon-state.png'),
          icon2:require('@/assets/image/icon/icon-state-select.png')
        },
        {
          code:3,
          label:"教育经历",
          icon1:require('@/assets/image/icon/icon-edu.png'),
          icon2:require('@/assets/image/icon/icon-edu-select.png')
        },
        {
          code:4,
          label:"工作经历",
          icon1:require('@/assets/image/icon/icon-workfor.png'),
          icon2:require('@/assets/image/icon/icon-workfor-select.png')
        },
        {
          code:5,
          label:"项目经历",
          icon1:require('@/assets/image/icon/icon-project.png'),
          icon2:require('@/assets/image/icon/icon-project-select.png')
        },
        {
          code:6,
          label:"我的证书",
          icon1:require('@/assets/image/icon/icon-certificate.png'),
          icon2:require('@/assets/image/icon/icon-certificate-select.png')
        },
      ],
      navIndex: 0,
      resume_id: null,
      update_time: null,
      privacy_state:null
    }
  },
  created () {
    this.onScrollBehavior()
    this.resume_id = this.$route.query.resume_id
    // 请求用户信息列表
    this.userInfoList()
  },
  components: {
    jwIntention,
    workState,
    education,
    workFor,
    myProject,
    myCert,
    userInfo
  },
  mounted: function () {
    window.addEventListener('scroll', this.initHeight);
    this.$nextTick(() => {
        window.addEventListener('scroll', this.onScroll)
        if(document.querySelector('#boxFixed')){
          this.offsetTop = document.querySelector('#boxFixed').offsetTop;
        }
    })
  },
  methods: {
    initHeight() {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    handleSelect (key, keyPath) {
      var index = ''
      index = key
    },
    onScroll () {
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolled > 212) {
        this.navDistance = scrolled
        if (scrolled >= 1200) {
          this.activeName = '7'
          this.navDistance = scrolled - 220
        } else if (scrolled <= 255 && scrolled >= 212) {
          this.activeName = '2'
        } else if (scrolled <= 384 && scrolled >= 255) {
          this.activeName = '3'
        } else if (scrolled < 550 && scrolled >= 384) {
          this.activeName = '4'
        } else if (scrolled < 775 && scrolled >= 550) {
          this.activeName = '5'
          if ( this.workList.length == 0 || this.projectList.length == 0) {
            this.navDistance = 500
          } else {
            this.navDistance = scrolled
          }
        } else if (scrolled < 1200 && scrolled >= 775) {
          this.activeName = '6'
          if ( this.workList.length == 0 || this.projectList.length == 0) {
            this.navDistance = 550
          } else {
            this.navDistance = scrolled
          }
        }
      } else if (scrolled <= 212) {
        this.activeName = '1'
        this.navDistance = 212
      }
    },
    onScrollBehavior (index) {
    },
    // 请求用户信息
    userInfoList () {
      // console.log(this.resume_id)
      let that = this
      getUserResumeDetail(that.resume_id).then(res => {
        // console.log("用户信息",JSON.stringify(res.data))
        that.real_name = res.data.user_info.real_name
        that.update_time = res.data.resume_user.update_time
        that.privacy_state = res.data.resume_user.privacy_state
        that.userInfoLists = res.data
        // 教育背景赋值
        that.$set(that, 'educationList', res.data.edu)
        that.$set(that, 'workList', res.data.work)
        that.$set(that, 'jwList', res.data.resume_user)
        that.$set(that, 'certList', res.data.cert)
        that.$set(that, 'jobWantState', res.data.resume_user)
        that.$set(that, 'projectList', res.data.project)
        // if (res.data.work !== [] && res.data.job_want !== []) {
        //   that.complete = 30/10
        // }
        // if (res.data.j)
      })
    },
    // 锚点实验
    jump (index) {
      let active = index.toString()
      // let that = this
      this.isActive = active
      this.navIndex = index
      // 判断导航高度
      // 用 class="d_jump" 添加锚点
      let jump = window.document.querySelectorAll('.d_jump')
      let total = jump[index].offsetTop

      let distance = document.documentElement.scrollTop || document.body.scrollTop

      let resume = window.document.querySelectorAll('.hk-person-resume')
      // let height = this.$refs.resume.offsetHeight;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50
      // 判断小导航距离顶部的位置
      this.navDistance = distance
      let newDistance = this.navDistance
      // if (index === 6 ) {
      //   this.navDistance = total - 200
      //   // this.navDistance = distance
      // } else if (index >= 1 && index < 6) {
      //   this.navDistance = distance
      // } else {
      //   this.navDistance = 212
      // }
      // 判断小导航到头部的滚动
      if (total > newDistance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 70
        smoothUp()
      }
      // 判断滚动条的滚动
      if (total > distance) {
        smoothDown()
      } else {
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
      }
      function smoothDown () {
        if (distance < total) {
          distance += step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothDown, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
      function smoothUp () {
        if (distance > total) {
          distance -= step
          document.body.scrollTop = distance
          document.documentElement.scrollTop = distance
          setTimeout(smoothUp, 10)
        } else {
          document.body.scrollTop = total
          document.documentElement.scrollTop = total
        }
      }
    },
    // 项目经历
    receiveProjectData(val){
      this.$set(this, 'projectList', val)
    },
    // 工作经历
    receiveWorkForData(val) {
      // console.log('工作经历')
      this.$set(this, 'workList', val)
    },
    // 教育经历
    receiveEduData(val) {
      // console.log('教育经历111',val)
      this.$set(this, 'educationList', val)
    },
    // 证书
    receiveCertData(val) {
      // console.log('证书1111',val)
      this.$set(this, 'certList', val)
    },
    infoData(){
      this.userInfoList()
    },
    onUpdate(){
      this.reload()
    }
  },
  //回调中移除监听
  destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('scroll', this.initHeight);
  },
  watch: {
    activeName: function () {
      // console.log(this.activeName)
    },
  }
}
</script>

<style lang="less">

@import "./resume.less";
</style>
