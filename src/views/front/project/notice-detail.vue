<template>
  <div class="hk-noticedetail">
    <!-- 内容部分 -->
    <div class="content hk-postdetail-bar">
      <!-- 搜索框 -->
      <!-- <div class="hk-postdetail-title">
        <div class="tiling notice-number">
          <span class="">项目（500+）</span>
          <span class="margin-l-30">公司（80+）</span>
        </div>
        <div class="search-module">
          <el-input placeholder="请输入想要的内容搜索" v-model="inputValue" class="search-input">
            <el-cascader
              slot="prepend"
              placeholder="项目类型"
              v-model="typeSelect"
              :options="proCate"
              :props="postData"
              @change="onTypeSelect"
              clearable >
            </el-cascader>
            <el-button slot="append" @click="onSearch" class="hk-search-button">搜索</el-button>
          </el-input>
        </div>
        <div class="tiling search-rec">
          <span class="search-rec-title">相关搜索：</span>
          <span class="search-rec-option" v-for="item in 4" :key="item" @click="onRelatedSearch('饮用水工程')">饮用水工程</span>
        </div>
      </div> -->
      <!-- 图 -->
      <!-- <div class="hk-el-carousel">
        <img style="width=100%" :src="'/static/img/project-search.png'"/>
      </div> -->
      <!-- 详情明细 -->
      <div class="hk-postdetail-content clearfix">
        <div class="hk-postdetail-title font-16">
          项目分类：{{detailContent.type == 1 ? '环评公示':'验收公示'}}
        </div>
        <div>
          <!-- 详情 注：后台自己写的详情 -->
          <div class="hk-postdetail-text clearfix">
            <!-- 推荐相关项目 -->
            <div class="fr hk-postdetail-right-box" v-if="attach_list.length > 0">
              <div class="recently-browse">
                <div class="recently-browse-title">附件下载</div>
                <ul>
                  <li class="browse-history" v-for="(item,index) in attach_list" :key="index">
                    <span class="recently-browse-project-name title-nowrap">{{item.name}} </span>
                    <span class="recently-browse-amount-of-money title-nowrap">
                      <a name="download" @click="downloadfile(item.url,item.name)" class="file-download ">
                        <i class="el-icon-bottom"></i>下载
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              
            </div>
            <div class="fr hk-postdetail-right-box" v-else>
              <div class="recently-browse">
                <div class="recently-browse-title">推荐项目</div>
              </div>
            </div>
            <!-- 详情内容 -->
            <div class="hk-postdetail-text-bar fl" v-if="JSON.stringify(detailContent) !=='{}'">
              <div class="hk-postdetail-table">
                <h4 class="hk-postdetail-titlr-m text-blacks font-18 padding-b-12">{{detailContent.name}}</h4>
                <ul class="hk-postdetail-table-tr">
                  <!-- <li class="text-blacks">
                    <span class="padding-r-5 text-blacks">报名开始时间：</span>
                    <span class="text-blacks">{{detailContent.online_time}}至{{detailContent.offline_time}}</span>
                  </li> -->
                  <li class="text-line">
                    <span class="padding-r-5 text-blacks">发布机构：</span>
                    <!-- <span class="public-post-salary padding-r-20">{{detailContent.fund_rang | onFundRang(detailContent.fund_rang)}}</span> -->
                    <!-- <span class="padding-l-20 padding-r-10 text-blacks">{{detailContent.area1_name}}</span> -->
                    <span class=" padding-r-10 text-blacks">{{detailContent.org_name}}</span>
                  </li>
                </ul>
                <div class="hk-postdetail-right text-r">
                  <!-- <el-button class="hk-share line-22 margin-b-20 margin-r-12" type="text">分享</el-button> -->
                  <!-- <el-button class="hk-report line-22 margin-b-20" type="text">举报</el-button> -->
                  <div class="hk-operation-btn margin-t-53">
                    <el-popover
                      placement="bottom"
                      width="125"
                      trigger="manual"
                      >
                      <qrCode :data="qRCode"></qrCode>
                      <el-button type="primary" slot="reference" round @click="onSharePro(true)">分享</el-button>
                    </el-popover>
                    <!-- <el-button type="primary" round @click="onSharePro(true)">分享</el-button> -->
                    <el-button type="danger text-white" class="margin-l-16" round @click="onReport(true)">举报</el-button>
                  </div>
                </div>
              </div>
              <quill-editor
                class="text-blacks line-46"
                v-model="detailContent.detail"
                ref="myQuillEditor"
                :options="editoroption"
                :disabled="true">
              </quill-editor>
            </div>
          </div>
        </div>
      </div>
      <PopupLogin :isLogin="!login" @close="onClose" @login="onLoginSucceeded"></PopupLogin>
      <reportPopup :report="report" @close="onCloseReportPopup"></reportPopup>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {getProjectNoticeDetail} from '@/api/project'
import PopupLogin from "@/components/popup/login"
import { mapGetters } from 'vuex'
import { fundRang, proCate } from "@/config/constant";
import utils from '@/utils/index.js'
import reportPopup from '@/components/popup/report-popup'
import qrCode from '@/components/qrcode/qrcode'
import axios from 'axios'
export default {
  filters: {
    onFundRang (value, that) {
      var obj = utils.findObj(fundRang, value)
      return obj.label
    },
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  data () {
    return {
      inputValue: '',
      noticeId: null,
      login: true,
      isShow: false,
      // 多选框绑定事件
      selectArr: false,
      // postCheckall: false,
      postTable: [],
      ischackbox: false,
      selectArrCloth: [],
      editoroption: {
        theme: 'bubble',
        modules: {
          toolbar: []
        },
        placeholder: ''
      },
      detailContent: {},
      attach_list: [],
      report:{
        eject:false
      },
      proCate: proCate,
      postData: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      noticeName: '项目公示详情',
      typeSelect: [],
      qRCode:{
        text: 'http://www.baidu.com', 
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
      }
    }
  },
  created () {
    this.noticeId = this.$route.query.id
    this.onnoticeDetail()
    
  },
  components: {
    quillEditor,
    reportPopup,
    PopupLogin,
    qrCode
  },
 
  mounted () {
    let that = this
    if (that.isLogin) {
      that.isShow = true
    } else {
      that.isShow = false
    }
  },
  methods: {
    onSearch () {
      this.$router.push({path: '/front/project/search', query: {key: this.inputValue}})
    },
    onRelatedSearch (val) {
      this.$router.push({path: '/front/project/search', query: {key: val}})
    },
    // 请求详情数据
    onnoticeDetail () {
      getProjectNoticeDetail(this.noticeId).then(res => {
        this.detailContent = res.data
        // console.log(res.data)
        this.noticeName = res.data.name
        document.title = '环评公示|'+this.noticeName
        var contact = JSON.parse(res.data.attach_list)
        this.attach_list = contact
        // console.log('详情列表' + res.data.good_staff)
        // this.good_staff = res.data.good_staff.split(',')
      })
    },
    onLogin () {
      this.login = false
    },
    // 分享项目
    onSharePro (val) {
      if (this.isLogin) {
        let collectData = {
          type: 1,
          noticeId: this.noticeId
        }
        // collectPost(collectData).then(res => {
        //   if (res.status == 200) {
        //     this.$message({
        //       message: res.msg,
        //       type: 'success',
        //       showClose: true,
        //       duration: 3000
        //     })
        //   } else {
        //     this.$message({
        //       message: res.msg,
        //       type: 'success',
        //       showClose: true,
        //       duration: 3000
        //     })
        //   }
        // }).catch(res => {
        //   this.$message({
        //     message: res.msg,
        //     type: 'error',
        //     showClose: true,
        //     duration: 3000
        //   })
        // })
      } else {
        this.login = false
      }
    },
    // 举报弹框
    onReport (e) {
      this.report.eject = true
    },
    onCloseReportPopup (e) {
      this.report.eject = false
    },
    onLoginSucceeded(){
      this.login = true
    },
    onClose(){
      this.login = true
    },
    onTypeSelect(val){
      this.$router.push({ path: "/front/project/search", query: { id: val[0],project_id:val[1] } });
    },
    downloadfile(url,name){
      axios({
        method: 'get',
        url: 'http://cdn.65ph.com/'+url,
        responseType: "blob"
      }).then(res => {
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([res.data])
            window.navigator.msSaveOrOpenBlob(blob, name)
          } else {
            /* 火狐谷歌的文件下载方式 */
            var blob = new Blob([res.data])
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob)//创建下载的链接
            downloadElement.href = href
            downloadElement.download = name//下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click()//点击下载
            document.body.removeChild(downloadElement)//下载完成移除元素
            window.URL.revokeObjectURL(href)//释放掉blob对象
          }
      }).catch((res)=>{
        // console.log(res);
      })
    }
  },
  watch: {
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

<style lang="less" scoped>
@import './notice-detail.less';
</style>
