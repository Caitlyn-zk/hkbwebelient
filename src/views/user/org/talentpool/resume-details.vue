<template>
  <div class="hk-org-resume" ref="resume">
    <div class="hk-details-bar content" id="state" ref="myMenu">
      <div class="hk-details-title-conten" id="boxFixed" >
          <div>快速反馈</div>
          <el-button  class="margin-l-20" @click="onCollection" :disabled="is_collection == 1">{{is_collection == 1 ? '已收藏': '收藏'}}</el-button>
          <el-button @click="onSelectState(40)" :disabled="delivery_status == 40" v-if="delivery_status">邀面试</el-button>
          <el-button @click="onSelectState(30)" :disabled="delivery_status == 30" v-if="delivery_status">感兴趣</el-button>
          <el-button @click="onSelectState(50)" class="improper" :disabled="delivery_status ==50" v-if="delivery_status ">不合适</el-button>
      </div>
      <div id="resumes" class="hk-details-title"  >
        <div class="invitation-button" v-if="delivery_status == 40 || delivery_status == 30" @click="onInterviewInvitation">面试邀请</div>
        <!-- 头像以及基本资料 -->
        <userInfo class="org-resume-details" ref="d_jump" :userInfo="userInfoLists"></userInfo>
        <!-- 求职意向 -->
        <jwIntention class="org-resume-details" ref="d_jump" :jwList="jwList"></jwIntention>
        <!-- 求职状态 -->
        <workState class="org-resume-details" ref="d_jump" :jobWantState="jobWantState"></workState>
        <!-- 教育经历 -->
        <education class="org-resume-details" ref="d_jump" :eduLists="educationList" @educontent="receiveEduData"></education>
        <!-- 工作经历 -->
        <workFor class="org-resume-details" ref="d_jump" :workList="workList" @workcontent="receiveWorkForData"></workFor>
        <!-- 项目经历 -->
        <myProject class="org-resume-details" ref="d_jump" :projectList="projectList" @project="receiveProjectData"></myProject>
        <!-- 我的证书 -->
        <myCert class="org-resume-details" ref="d_jump" :certList="certList" @cert="receiveCertData"></myCert>
      </div>
    </div>
    <interviewInvitation :display="interviewInvitationSelect" :name="real_name" @close="onClose"></interviewInvitation>
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
import interviewInvitation from 'components/popup/interview-invitation'
import {getOrgUserResumeDetail,orgResumeState,orgCollectionUserResume} from '@/api/recruit'
export default {
  inject: ['reload'],
  data () {
    return {
      // 个人信息
      offsetTop: 0,
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
      post_id: null,
      resume_id: null,
      update_time: null,
      privacy_state: null,
      delivery_id: null,
      delivery_status: null,
      is_collection: null,
      interviewInvitationSelect:false,
      real_name:'',
      resume_name:''
    }
  },
  created () {
    if(this.$route.query.post_id){
      this.post_id = this.$route.query.post_id
    }
    if(this.$route.query.delivery_id){
      this.delivery_id = this.$route.query.delivery_id
    }
    if(this.$route.query.resume_id){
      this.resume_id = this.$route.query.resume_id
    }
    if (this.$route.query.delivery_status) {
      this.delivery_status = this.$route.query.delivery_status
    }
    // 请求用户信息列表
    this.userInfoList()
    this.onSelectState(20)
  },
  components: {
    jwIntention,
    workState,
    education,
    workFor,
    myProject,
    myCert,
    userInfo,
    interviewInvitation
  },
  mounted: function () {
  },
  methods: {
    // 请求用户信息
    userInfoList () {
      let that = this
      getOrgUserResumeDetail(this.resume_id).then(res => {
        // console.log("用户信息",JSON.stringify(res.data))
        that.real_name = res.data.user_info.real_name
        // that.update_time = res.data.resume_user.update_time
        that.privacy_state = res.data.resume_user.privacy_state
        that.userInfoLists = res.data
        that.is_collection = res.data.is_collection
        // console.log('delivery_status',res.data.delivery_status)
        // that.$set(that, 'delivery_status', res.data.delivery_status)
        // 教育背景赋值
        // console.log("用户信息111",JSON.stringify(that.userInfoLists))
        that.$set(that, 'educationList', res.data.edu)
        that.$set(that, 'workList', res.data.work)
        that.$set(that, 'jwList', res.data.resume_user)
        that.$set(that, 'certList', res.data.cert)
        that.$set(that, 'jobWantState', res.data.resume_user)
        that.$set(that, 'projectList', res.data.project)
      })
    },
    onSelectState(state){
      let data = {
        post_id: this.post_id,
        delivery_id: this.delivery_id,
        delivery_status: state
      }
      if (state == 20){
        if (this.delivery_status == 10) {
          console.log("状态",this.delivery_status)
          this.state(data)
          this.delivery_status = 20
        }
      } else {
        this.state(data)
      }
    },
    // 请求数据
    state (val) {
      // console.log(val)
      orgResumeState(val).then(res => {
        if (res.status == 200) {
          this.delivery_status = val.delivery_status
          this.userInfoList()
          // this.reload()
        } else {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
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
    // 收藏
    onCollection () {
      orgCollectionUserResume(this.resume_id).then(res=>{
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
          // this.userInfoList()
          this.reload()
        } else {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
    },
    // 面试邀请
    onInterviewInvitation () {
      this.interviewInvitationSelect = true
    },
    // 关闭弹窗
    onClose(){
      this.interviewInvitationSelect = false
    }
  },
  // 回调中移除监听
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import './resume-details.less';
</style>
