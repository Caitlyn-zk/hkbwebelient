<template>
    <div class="talent-pool">
      <div class="hk-addproject-title-mbar">
        人才库管理/人才收藏
      </div>
      <div class="tab-pane">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收藏简历" name="first">
            <div class="personnel-rec">
              <div class="hk-Invitation-select clearfix select">
                  <el-select class="hk-select" v-model="workForSelect" @change="onWorkFor" placeholder="工作经验" clearable>
                    <el-option
                      v-for="item in experienceData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-cascader
                    ref="myCascader"
                    class="hk-select"
                    placeholder="城市选择"
                    :options="optionsaddress"
                    v-model="addressSelect"
                    @change="getCityData"
                    :separator="' '"
                    clearable
                    >
                  </el-cascader>
                  <el-select class="hk-select" v-model="genderSelect" @change="onGender" placeholder="性别要求" clearable>
                    <el-option
                        v-for="item in genderList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="search-modular ">
                    <el-input v-model="inputValue" placeholder="输入搜索内容" style="width: 350px;height: 30px;">
                      <template slot="append">
                        <el-button class="search-button" style="padding: 0 20px;" @click="onSearchResume">搜索</el-button>
                      </template>
                    </el-input>
                  </div>
              </div>
              <div class="hk-resume-content" v-for="(item,index) in collectionResumeList" :key="index">
                <div class="hk-intention-post clearfix">
                  <span class="fr text-line font-12">邀请时间：{{item.add_time}}</span>
                  <span class="fl text-line font-12">求职意向：{{item.post_cate_name}}/{{item.area2_name}}/{{item.min_salary | onSalary}}{{item.max_salary === 0 ? '':'-'}}{{item.max_salary | onSalary}}</span>
                </div>
                <div class="hk-resume-content-bar clearfix">
                  <div class="hk-invitation-bar fr text-blacks font-18 org-collection">
                    <el-button @click="onCancelIntention(item.org_collection_id)">取消收藏</el-button>
                    <el-button @click="onPostInvitation(item.real_name)">职位邀请</el-button>
                  </div>
                  <div class="block fl"><el-avatar :size="80" :src="item.avatar == '' ? user_img:'http://cdn.65ph.com/'+ item.avatar"></el-avatar></div>
                  <div class="hk-resume-name-bar fl margin-l-20 line-36">
                    <div class="text-blacks font-18 hk-cursor" @click="onResumeDetails(item.resume_id,item.post_id,item.delivery_id)">{{item.real_name}}</div>
                    <p class="text-line">{{item.work_date | onWorkData}}/{{item.max_user_edu | onEdu}}/{{item.birthday+'岁'}}</p>
                  </div>
                </div>
              </div>
              <div class="pagination" >
                <el-button-group v-if="collectionResumeList.length == list_rows">
                  <el-button type="primary" icon="el-icon-arrow-left" @click="onResumePreviousPage">上一页</el-button>
                  <el-button type="primary" @click="onResumeNextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
              </div>
              <div class="no-data" v-if="collectionResumeList.length === 0">
                <img src="@/assets/image/no-data.png" alt="">
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="职位邀请" name="second">
            <div class="personnel-rec">
              <div class="hk-Invitation-time">
                <div class="hk-selectPost select">
                  <!-- <span>邀请时间</span> -->
                  <el-select v-model="invitationTimeSelect" @change="onPostName"  placeholder="到岗时间" clearable>
                    <el-option
                        v-for="item in invitationTimeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="search-modular ">
                  <el-input v-model="inputValue" placeholder="输入搜索内容" style="width: 350px;height: 30px;">
                    <template slot="append">
                      <el-button class="search-button" style="padding: 0 20px;" @click="onSearchResume">搜索</el-button>
                    </template>
                  </el-input>
                </div>
              </div>
              <!-- 简历列表 -->
              <div class="hk-resume-content">
                <div class="hk-intention-post clearfix">
                  <span class="fr text-line font-12">邀请时间：2020/05/08</span>
                  <span class="fl text-line font-12">求职意向：环评编写工程师/贵州/15k-20k</span>
                </div>
                <div class="hk-resume-content-bar clearfix">
                  <div class="hk-invitation-bar fr text-blacks font-18">已邀请</div>
                  <div class="block fl"><el-avatar :size="80" :src="circleUrl"></el-avatar></div>
                  <div class="hk-resume-name-bar fl margin-l-20 line-36">
                    <div class="text-blacks font-18">黎明</div>
                    <p class="text-line">7年工作经验/本科/30岁/有证书</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <PostInvitation :display="invitationPopup" :org_name="org_name" :name="real_name" @close="onClose"></PostInvitation>
    </div>
</template>
<script>
import {getOrgCollectionUserResumeList, orgResumeState,delOrgCollectionUserResume} from "@/api/recruit";
import { regionData } from 'element-china-area-data'
import {minEdu,workLife,salaryNumber,inTime} from "@/config/constant"
import PostInvitation from "components/popup/Post-invitation"
import utils from '@/utils/index.js'
export default {
  components:{PostInvitation},
  filters:{
    onSalary(value){
      var obj = utils.findObj(salaryNumber, value)
      return obj.label
    },
    onEdu(value) {
      var obj = utils.findObj(minEdu, value)
      return obj.label
    },
    onWorkData(value) {
      var obj = utils.findObj(workLife, value)
      return obj.label
    }
  },
  computed:{
    org_name () {
      if (this.$store.state.app.userInfo.org_list && this.$store.state.app.userInfo) {
        if (this.$store.state.app.userInfo.org_list.length>0) {
          return this.$store.state.app.userInfo.org_list[0].org_name
        }
      }
      return '新企业'
    },
  },
  data () {
    return {
      activeName: 'first',
      real_name: '',
      user_img:require('@/assets/image/user_img.png'),
      invitationPopup: false,
      endTime: '',
      collectionResumeList: [],
      inviteResumeList:[],
      invitationTimeSelect: null,
      inputValue: '',
      invitationTimeList: inTime,
      genderSelect: null,
      genderList: [{
        value: 0,
        label: '不限'
      }, {
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }],
      ageSelect: null,
      // 工作经验
      workForSelect: null,
      experienceData: workLife,
      // 地区
      addressSelect: null,
      optionsaddress: regionData, // 存放城市数据
      selectPostStatus: '',
      start_time: '',
      endTime: '',
      post_id: 1,
      currentPage: 1, // 当前页码
      total: 10, // 总条数
      list_rows: 5, // 每页的数据条数
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      area1_code: null,
      area1_name: '',
      area2_code: null,
      area2_name: '',
      area3_code: null,
      area3_name: '',
    }
  },
  created () {
    this.getOrgCollectionUserResumeList()
  },
  methods: {
    handleClick(row) {
      this.inputValue = ''
      // console.log(row)
    },
    // 获取省份
    getCityData (val) {
      if(this.$refs.myCascader.getCheckedNodes()[0]){
        this.$set(this, 'area1_code', val[0])
        this.$set(this, 'area2_code', val[1])
        this.$set(this, 'area3_code', val[2])
        this.$set(this, 'area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
        this.$set(this, 'area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
        this.$set(this, 'area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
        // console.log('地区选择' + this.area1_name, this.area2_name, this.area3_name)
      } else {
        this.$set(this, 'area1_code', null)
        this.$set(this, 'area2_code', null)
        this.$set(this, 'area3_code', null)
        this.$set(this, 'area1_name', '')
        this.$set(this, 'area2_name', '')
        this.$set(this, 'area3_name', '')
      }
      this.getOrgCollectionUserResumeList()
      
    },
    // 按职位搜索
    onPostName(val) {
      // console.log('这里是职位搜索id')
      // console.log(val)
    },
    // 点击查看简历按钮事件
    onViewResume () {
      let that = this
      let state = {
        post_id: this.post_id,
        delivery_id: 1,
        delivery_status: 10
      }
      orgResumeState(state).then(res => {
        if (res.status == 200) {
          that.$router.push({
            path: '/user/org/talentpool/resumedetails',
            query: {
              resume_id: 1,
              post_id: that.post_id
            }
          })
          that.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        } else {
          that.$message({
            message: res.msg,
            type: 'error',
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
    onSearch() {
      // console.log('搜索')
      this.getOrgCollectionUserResumeList()
    },
    // 工作经验
    onWorkFor (val)  {
      // console.log("工作经验",val)
      this.getOrgCollectionUserResumeList()
    },
    // 收藏时间
    onInvitationTime (val) {
      // console.log("收藏时间",val)
    },
    // 性别
    onGender (val) {
      // console.log("性别",val)
      this.getOrgCollectionUserResumeList()
    },
    // 收藏列表
    getOrgCollectionUserResumeList () {
      let parameter = {
        key_value: this.inputValue,
        work_date: this.workForSelect === '' ? 0 : this.workForSelect, //int 工作经验
        area3_code: this.area3_code, // int 区代码
        gender: this.genderSelect === '' ? 0 : this.genderSelect,  //性别
        user_age: 0, // int 年龄
        page: this.currentPage, //第几页
        list_rows: 10 //int 一页几条
      }
      getOrgCollectionUserResumeList(parameter).then(res => {
        if (res.status === 200) {
          // console.log('请求成功',JSON.stringify(res.data))
          this.collectionResumeList = res.data.data
        }
      })
    },
    // 取消收藏
    onCancelIntention (id) {
      delOrgCollectionUserResume(id).then(res=>{
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
          this.getOrgCollectionUserResumeList()
        } else {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        }
      })
    },
     // 简历上一页
    onResumePreviousPage () {
      if(this.currentPage > 1){
        this.currentPage = this.currentPage - 1
        this.getOrgCollectionUserResumeList()
      }
    },
    // 简历下一页
    onResumeNextPage () {
      if(this.collectionResumeList.length > 0){
        this.currentPage = this.currentPage + 1
        this.getOrgCollectionUserResumeList()
      }
    },
    onPostInvitation(real_name){
      this.real_name = real_name
      this.invitationPopup = true
    },
    // 关闭职位弹框
    onClose(){
      this.invitationPopup = false
    },
    onSearchResume(){
      if (this.activeName =="first") {
        this.getOrgCollectionUserResumeList()
      } else {

      }
    },
    // 职位邀请
    onResumeDetails(resume_id, post_id, delivery_id) {
      this.$router.push({
        path: "/user/org/talentpool/resumedetails",
        query: {
          resume_id: resume_id,
          post_id: post_id,
          delivery_id: delivery_id
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import './collection.less';
</style>
