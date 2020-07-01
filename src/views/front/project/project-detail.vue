<template>
  <div class="hk-projectdetail">
    <!-- 内容部分 -->
    <div class="content hk-postdetail-bar">
      <!-- 搜索框 -->
      <div class="hk-postdetail-title">
        <div class="tiling project-number">
          <span class>项目（500+）</span>
          <span class="margin-l-30">公司（80+）</span>
        </div>
        <div class="search-module">
          <el-input placeholder="请输入想要搜索的项目" v-model="inputValue" class="search-input">
            <el-button slot="append" @click="onSearch" class="hk-search-button">搜索</el-button>
          </el-input>
          <!-- <div class="hk-search-tips search-tips" >项目发布</div> -->
        </div>
        <div class="tiling search-rec">
          <span class="search-rec-title">相关搜索：</span>
          <span
            class="search-rec-option"
            v-for="item in RelatedSearchList"
            :key="item"
            @click="RelatedSearch(item)"
          >{{item}}</span>
        </div>
      </div>
      <!-- 图 -->
      <div class="hk-el-carousel">
        <img style="width=100%" :src="'/static/img/project-search.png'" />
      </div>
      <!-- 详情明细 -->
      <div class="hk-postdetail-content clearfix">
        <div
          class="hk-postdetail-title font-16"
        >当前项目：{{proCateName}}类项目-->项目详情</div>
        <div>
          <!-- 详情 注：后台自己写的详情 -->
          <div class="hk-postdetail-text clearfix">
            <!-- 推荐相关项目 -->
            <div class="fr hk-postdetail-right-box">
              <div class="recently-browse">
                <img src="../../../assets/image/source-of-water.png"/>
              </div>
            </div>
            <!-- 详情内容 -->
            <div class="hk-postdetail-text-bar fl" v-if="JSON.stringify(detailContent) !=='{}'">
              <div class="hk-postdetail-table">
                <!-- title-nowrap -->
                <h4
                  class="hk-postdetail-titlr-m text-blacks font-18 padding-b-12"
                >{{detailContent.name}}</h4>
                <ul class="hk-postdetail-table-tr">
                  <li class="text-blacks">
                    <span class="padding-r-5 text-blacks">报名开始时间：</span>
                    <span
                      class="text-blacks"
                    >{{detailContent.online_time}}至{{detailContent.offline_time}}</span>
                  </li>
                  <li class="text-line">
                    <span class="padding-r-5 text-blacks">金额：</span>
                    <span
                      class="public-post-salary padding-r-20"
                    >{{detailContent.fund_rang | onFundRang(detailContent.fund_rang)}}</span>
                    <span class="padding-l-20 padding-r-10 text-blacks">{{detailContent.area1_name}}</span>
                  </li>
                </ul>
                <div class="hk-postdetail-right text-r">
                  <!-- <el-button class="hk-share line-22 margin-b-20 margin-r-12" type="text">分享</el-button> -->
                  <!-- <el-button class="hk-report line-22 margin-b-20" type="text">举报</el-button> -->
                  <div class="hk-operation-btn margin-t-40">
                    <el-button type="primary" round @click="onSharePro(true)">分享</el-button>
                    <el-button
                      type="danger text-white"
                      class="margin-l-16"
                      round
                      @click="onReport(true)"
                    >举报</el-button>
                  </div>
                </div>
              </div>
              <quill-editor
                class="text-blacks line-46"
                v-model="detailContent.detail"
                ref="myQuillEditor"
                :options="editoroption"
                :disabled="true"
              ></quill-editor>
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
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { getProjectDetail } from "@/api/project";
import PopupLogin from "@/components/popup/login";
import { mapGetters } from "vuex";
import { fundRang, proCate } from "@/config/constant";
import utils from "@/utils/index.js";
import reportPopup from "@/components/popup/report-popup";
export default {
  filters: {
    onFundRang(value, that) {
      // console.log(value);
      var obj = utils.findObj(fundRang, value);
      // console.log(obj);
      return obj.label;
    },
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  data() {
    return {
      inputValue: "",
      proid: null,
      login: true,
      isShow: false,
      // 多选框绑定事件
      selectArr: false,
      // postCheckall: false,
      postTable: [],
      ischackbox: false,
      selectArrCloth: [],
      editoroption: {
        theme: "bubble",
        modules: {
          toolbar: []
        },
        placeholder: ""
      },
      detailContent: {},
      report: {
        eject: false
      },
      proCate: proCate,
      proCateName: null,
      RelatedSearchList: [
        "饮用水工程",
        "生态环境工程",
        "项目环评",
        "项目竣工验收",
        "环境监测"
      ]
    };
  },
  created() {
    this.proid = this.$route.query.proid;
    this.onProjectDetail();
  },
  components: {
    quillEditor,
    reportPopup,
    PopupLogin
  },
  mounted() {
    let that = this;
    if (that.isLogin) {
      that.isShow = true;
    } else {
      that.isShow = false;
    }
  },
  methods: {
    // 搜索按钮
    onSearch() {
      this.$router.push({
        path: "/front/project/search",
        query: { key: this.inputValue }
      });
    },
    RelatedSearch(val) {
      this.$router.push({ path: "/front/project/search", query: { key: val } });
    },
    // 请求详情数据
    onProjectDetail() {
      let that = this
      getProjectDetail(this.proid).then(res => {
        this.detailContent = res.data;
        // console.log('详情列表' + res.data.good_staff)
        // this.good_staff = res.data.good_staff.split(',')
        // console.log(res.data.cate_id)
        var value = String(res.data.cate_id).substring(0, 2);
        var id = parseInt(value);
        proCate.forEach(item => {
          if (item.id === id) {
            that.proCateName = item.cate_name
            return
          }
        })
        // proCate
      });
    },
    onLogin() {
      this.login = false;
    },
    // 分享项目
    onSharePro(val) {
      console.log('分享项目')
      if (this.isLogin) {
        let collectData = {
          type: 1,
          proid: this.proid
        };
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
        this.login = false;
      }
    },
    // 举报弹框
    onReport(e) {
      this.report.eject = true;
    },
    onCloseReportPopup(e) {
      this.report.eject = false;
    },
    onLoginSucceeded() {
      this.login = true;
    },
    onClose() {
      this.login = true;
    }
  },
  watch: {
    isLogin() {
      // console.log(this.isLogin)
      let that = this;
      if (that.isLogin) {
        that.isShow = true;
      } else {
        that.isShow = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./project-detail.less";
</style>
