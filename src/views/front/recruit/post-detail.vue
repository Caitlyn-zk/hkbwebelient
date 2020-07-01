<template>
  <div class="hk-postdetail">
    <!-- 内容部分 -->
    <div class="content hk-postdetail-bar">
      <!-- 搜索框 -->
      <div class="hk-postdetail-title">
        <div class="tiling project-number">
          <span class="">项目（500+）</span>
          <span class="margin-l-30">公司（80+）</span>
        </div>
        <div class="search-module">
          <el-input placeholder="请输入想要搜索的项目" v-model="inputValue" class="search-input">
            <el-button slot="append" @click="onSearch" class="hk-search-button">搜索</el-button>
          </el-input>
        </div>
        <div class="tiling search-rec">
          <span class="search-rec-title">相关搜索：</span>
          <span class="search-rec-option" v-for="item in 4" :key="item" @click="onRelatedSearch('饮用水工程')">饮用水工程</span>
        </div>
      </div>
      <!-- 图 -->
      <div class="hk-el-carousel">
        <img style="width=100%" :src="'/static/img/project-search.png'"/>
      </div>
      <!-- 详情明细 -->
      <div class="hk-postdetail-content clearfix">
        <div class="hk-postdetail-title font-16">
          当前职位：人才需求职位列表-职位详情
        </div>
        <div >
          <!-- 详情 注：后台自己写的详情 -->
          <div class="hk-postdetail-text clearfix">
            <!-- 推荐相关职位 -->
            <div class="fr hk-postdetail-right-box">
              <div class="hk-postdetail-box-top">
                <p class="font-16 text-blacks line-56 ">{{org_name}}</p>
                <div class="hk-postdetail-box-border">
                  <span class="text-gray">{{org_scale|onCompayScale}}</span>
                  <span class="text-gray padding-l-10">{{org_type}}</span>
                  <!-- <div class="padding-tb-18"><span class="text-gray">官网:<a class="padding-l-10 hk-addres-hyperlink">www.xxx.com</a></span></div> -->
                  <!-- <div class="padding-tb-18"><span class="text-gray"></span></div> -->
                </div>
                <div class="text-center">
                  <el-button type="text" @click="onPostSearch">查看所有职位</el-button>
                </div>
              </div>
              <div class="hk-recruitment-information">
                <div class="hk-recruit-ad">
                  <img src="@/assets/image/hk-recruit.png"/>
                </div>
                <div class="hk-recruit-apply">
                  <div class="hk-recruit-title">
                    <span class="font-16 text-blacks hk-recruit-title-bar padding-r-25">相似职位</span>
                    <el-checkbox class="hk-checkbox-all"
                      v-model="ischackbox" @change="onCheckboxChange" >全选</el-checkbox>
                    <el-button type="text" class="margin-l-10" @click="applyFor(false)">一键申请</el-button>
                  </div>
                  <ul class="hk-recruit-table-box" v-for="(item, index) in similarPost" :key="index"
                   :class="selectArr === true ? 'is-active' : ''">
                    <li>
                      <span class="font-14 text-blacks post_name" @click="onPostDetaol(item.post_id)">{{item.post_name}}{{item.id}}</span>
                      <!-- <span class="font-14 padding-l-10 text-blacks">({{item.goodstaff}})</span> -->
                    </li>
                    <li class="padding-t-9 padding-b-11">
                      <span class="text-red font-12">{{item.min_salary | onSalary}}-{{item.max_salary | onSalary}}</span>
                    </li>
                    <li class="org-info">
                      <div class="font-12 text-line org_name">{{item.org_name}}</div>
                      <div class="padding-l-20 font-12 text-blacks address">{{item.area2_name}}-{{item.area3_name}}</div>
                    </li>
                    <li class="hk-checked-btn">
                      <!-- <Checkbox v-model="selectArrCloth" label="adfs">dsacsd</Checkbox> -->
                      <el-checkbox-button 
                        v-model="selectArrCloth" :label="item.post_id"
                        @change="item.checked = item.checked">
                        <i class="hk-checked-btn-icon iconfont icon-duigou"></i>
                      </el-checkbox-button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 详情内容 -->
            <div class="hk-postdetail-text-bar fl" v-if="JSON.stringify(detaillist) !=='{}'">
              <div class="hk-postdetail-table">
                <h4 class="hk-postdetail-titlr-m text-blacks font-18 padding-b-12">{{detaillist.post_name}}</h4>
                <ul class="hk-postdetail-table-tr">
                  <li class="text-blacks">
                    <span class="public-post-salary padding-r-20">{{detaillist.min_salary | onSalary }}-{{detaillist.max_salary | onSalary}}</span>
                    <span class="text-blacks">{{detaillist.work_type | onWorkType}}</span>
                    <span class="padding-lr-10 text-blacks">{{address}}</span>
                    <!-- <span class="padding-l-20 padding-r-10 text-blacks">{{detaillist.address.length == 0 ? '' : detaillist.address[0].area1_name}}</span> -->
                    <span class="padding-lr-10 text-blacks">{{detaillist.work_life | onWorkLife}}</span>
                    <span>{{detaillist.min_edu | onMinEdu}} </span>
                  </li>
                  <li class="text-line">
                    <span class="padding-r-20" v-for="(porp, index) in good_staff" :key="index">{{good_staff[index]}}</span>
                    <!-- <span>五险一金</span> -->
                    <!-- <span class="padding-lr-10">五险一金</span> -->
                    <!-- <span class="padding-lr-10">绩效奖励</span> -->
                    <!-- <span class="">绩效奖励</span> -->
                  </li>
                </ul>
                <div class="hk-postdetail-right text-r">
                  <el-button class="hk-share line-22 margin-b-20 margin-r-12" type="text">分享</el-button>
                  <el-button class="hk-report line-22 margin-b-20" type="text" @click="onReport">举报</el-button>
                  <div class="hk-operation-btn" v-if="isShow === true">
                    <el-button round @click="onCollectPost(true)" :disabled="is_collection > 0"> {{ is_collection >0 ?'已收藏':'收藏'}}</el-button>
                    <el-button class="hk-button-zhu margin-l-16" round @click="applyFor(true)" :disabled="delivery_status > 0">{{delivery_status > 0 ? '职位已申请':'申请职位'}}</el-button>
                  </div>
                  <div class="hk-operation-btn" v-else>
                    <el-button round @click="onLogin">登录后收藏</el-button>
                    <el-button class="hk-button-zhu margin-l-16" round @click="onLogin">登录后申请职位</el-button>
                  </div>
                </div>
              </div>
              <quill-editor
                class="text-blacks line-46"
                v-model="detaillist.post_desc"
                ref="myQuillEditor"
                :options="editoroption"
                :disabled="true">
              </quill-editor>
            </div>
          </div>
        </div>
      </div>
      <PopupLogin :isLogin="!login" @close="onClose" @login="onLoginSucceeded"></PopupLogin>
      <el-dialog
        title="请选择投递的简历和求职信"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-form :model="myfrom">
        <!-- <el-form-item label="简历名称" :label-width="formLabelWidth"> -->
          <!-- <div class="fl">
            <el-input class="fl" v-model="myfrom.resume_name" autocomplete="off" placeholder="请填写简历新的简历名称"></el-input>
          </div> -->
        <!-- </el-form-item> -->
          <el-form-item label="请选择简历" :label-width="formLabelWidth">
            <el-select v-model="myfrom.resume_name" @change="chooseResume" placeholder="请选择你的简历">
              <el-option
                  v-for="item in resumeLists"
                  :key="item.resume_id"
                  :label="item.resume_name"
                  :value="item.resume_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onApplyForPost(true)">立即申请</el-button>
        </span>
      </el-dialog>
    </div>
    <reportPopup :report="report" @close="onCloseReportPopup"></reportPopup>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {getUserPostDetail, applyForPost, collectPost,resumeCenterList} from '@/api/recruit'
import PopupLogin from "@/components/popup/login"
import {mapMutations, mapGetters } from 'vuex'
import {workLife, minEdu, mainSalary, workType,compayScale} from '@/config/constant'
import utils from '@/utils/index.js'
import reportPopup from '@/components/popup/report-popup'
export default {
  inject: ['reload'],
  filters: {
    onCompayScale(value){
      var obj = utils.findObj(compayScale, value)
      return obj.label
    },
    onWorkLife (value) {
      var obj = utils.findObj(workLife, value)
      return obj.label
    },
    onMinEdu (value) {
      var obj = utils.findObj(minEdu, value)
      return obj.label
    },
    onSalary (value) {
      var obj = utils.findObj(mainSalary, value)
      return obj.label
    },
    onWorkType (value, that) {
      var obj = utils.findObj(workType, value)
      return obj.label
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  data () {
    return {
      inputValue: '',
      post_id: 0,
      login: true,
      isShow: false,
      // 多选框绑定事件
      selectArr: false,
      // postCheckall: false,
      similarPost: [],
      ischackbox: false,
      selectArrCloth: [],
      editoroption: {
        theme: 'bubble',
        modules: {
          toolbar: []
        },
        placeholder: ''
      },
      report:{
        eject:false
      },
      detaillist: {},
      good_staff: [],
      isGroup: false,
      // 简历id
      resume_id: 0,
      // 选择简历弹框
      centerDialogVisible: false,
      formLabelWidth: '100',
      myfrom:{
        resume_name: '',
      },
      resumeLists: [{
        resume_id: 1,
        resume_name: '我的简历1'
      }],
      org_name:'',
      org_type:null,
      is_collection: null,
      delivery_status: null,
      org_scale:null,
      address:'',
    }
  },
  created () {
    if (this.$route.query.post_id) {
      this.post_id = parseInt(this.$route.query.post_id)
    }
    this.getPostDetail()
    // this.getTuijian()
  },
  components: {
    quillEditor,
    reportPopup,
    PopupLogin
  },
  mounted () {
    // console.log(this.isLogin)
    let that = this
    if (that.isLogin) {
      that.isShow = true
    } else {
      that.isShow = false
    }
  },
  methods: {
      ...mapMutations(['INIT_POST_RECORD','ADD_POST_RECORD']),
    onSearch () {
      this.$router.push({path: '/front/recruit/post/search', query: {key: this.inputValue}})
    },
    onRelatedSearch(val){
      this.$router.push({path: '/front/recruit/post/search', query: {key: val}})
    },
    onPostSearch(){
      this.$router.push({path: '/front/recruit/post/search'})
    },
    // 请求详情数据
    getPostDetail () {
      getUserPostDetail(this.post_id).then(res => {
        this.detaillist = res.data
        // console.log('详情列表',JSON.stringify())
        this.good_staff = res.data.good_staff.split(',')
        // console.log(this.good_staff)
        this.org_name = res.data.org_name
        this.org_type = res.data.org_type
        this.is_collection = res.data.is_collection
        this.delivery_status = res.data.delivery_status
        this.org_scale = res.data.org_scale
        this.similarPost = res.data.resemble_post
        this.address = this.detaillist.post_address[0].area1_name+'-'+this.detaillist.post_address[0].area2_name+'-'+this.detaillist.post_address[0].area3_name
        
        //添加浏览记录
        // this.ADD_POST_RECORD({post_id: this.detaillist[0].id,org_name: this.detaillist[0].org_id, post_name:  this.detaillist[0].name, salary: this.detaillist[0].min_salary+"K-"+ this.detaillist[0].max_salary+"K"})
      })
    },
    // 请求推荐职位数据
    getTuijian () {
      var arr = [{
        id: 1,
        name: '贵州活性炭有限公司',
        postname: '销售-白云',
        goodstaff: '朝九晚五',
        salarys: '4k-5k',
        address: '广州-番禺'
      }, {
        id: 2,
        name: '贵州活性炭有限公司',
        postname: '销售-白云',
        goodstaff: '朝九晚五',
        salarys: '4k-5k',
        address: '广州-番禺'
      }]
      arr.forEach(item => {
        item.checkbed = false
      })
      this.similarPost = arr
    },
    // 多选框
    onCheckboxChange (val) {
      if (val) {
        let selectArrCloths = []
        this.similarPost.forEach( item => {
          selectArrCloths.push(item.post_id)
        })
        this.selectArrCloth = selectArrCloths
      } else {
        this.selectArrCloth = []
      }
    },
    onLogin () {
      this.login = false
    },
    // 收藏职位
    onCollectPost (val) {
      let postId = this.post_id.toString()
      if (val) {
        postId = this.post_id.toString()
      } else {
        postId = this.selectArrCloth.toString()
      }
      if (this.isLogin) {
        let collectData = {
          type: 1,
          post_id: postId
        }
        collectPost(collectData).then(res => {
          if (res.status == 200) {
            this.$message({
              message: res.msg,
              type: 'success',
              showClose: true,
              duration: 3000
            })
            this.getPostDetail()
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
      } else {
        this.login = false
      }
    },
    // 立即申请职位
    onApplyForPost(){
      let postId = this.post_id.toString()
      if (this.isGroup) {
        postId = this.post_id.toString()
      } else {
        postId = this.selectArrCloth.toString()
      }
      if (this.isLogin) {
        applyForPost(postId, this.resume_id).then(res => {
          if (res.status == 200) {
            this.$message({
              message: res.msg,
              type: 'success',
              showClose: true,
              duration: 3000
            })
            this.getPostDetail()
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
        this.centerDialogVisible = false
      } else {
        this.login = false
      }
    },
    // 申请职位按钮，点击弹出弹框
    applyFor(val) {
      this.centerDialogVisible = true
      this.$set(this, 'isGroup', val)
      this.resumeList()
    },
    onLoginSucceeded () {
      this.login = true
    },
    onClose(){
      this.login = true
    },
    // 获取简历列表
    resumeList () {
      let that = this
      resumeCenterList().then(res => {
        if (res.status === 200) {
          // console.log(res.data.resume_list)
          this.resumeLists = res.data.resume_list
        }
      });
    },
    chooseResume(val) {
      this.resume_id = val
    },
    // 举报弹框
    onReport (e) {
      this.report.eject = true
    },
    onCloseReportPopup (e) {
      this.report.eject = false
    },
    onPostDetaol(id){
      this.post_id = id
      this.$router.push({path:"/front/recruit/post/detail",query:{post_id:id}})
      this.reload()
    }
  },
  watch: {
    selectArrCloth() {
      if (this.selectArrCloth.length == this.similarPost.length) {
        this.ischackbox = true
      } else {
        this.ischackbox = false
      }
      let selectArr = 0
      if (this.selectArrCloth.length > 0) {
        for (let item in this.selectArrCloth) {
          selectArr = item
        }
        this.selectArr = true
      } else {
        this.selectArr = false
      }
    },
    isLogin() {
      // console.log(this.isLogin)
      let that = this
      if (that.isLogin) {
        that.isShow = true
      } else {
        that.isShow = false
      }
    }
  }
}
</script>

<style lang="less">
@import './post-detail.less';
</style>
