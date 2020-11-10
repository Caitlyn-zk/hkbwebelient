<template>
  <div class="project-home-page" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="content project">
      <!-- 搜索 -->
      <div class="search-module">
        <!-- <div class="hk-search-tips margin-r-60" >项目发布</div> -->
        <div class="search-module fr">
          <el-input placeholder="请输入想要的内容搜索" v-model="inputValue" @keyup.enter.native="onSearchEnterFun" class="search-input">
            <el-cascader
              slot="prepend"
              placeholder="项目类型"
              v-model="typeSelect"
              :options="proCate"
              :props="postData"
              @change="onTypeSelect"
              clearable >
            </el-cascader>
            <el-button slot="append" @click="onProjectSearch" class="hk-search-button">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="tiling search-rec text-l">
        <div class="search-rec-title">相关搜索：</div>
        <div
          class="search-rec-option"
          v-for="item in recommendData"
          :key="item"
          @click="onRelevant(item)"
        >{{item}}</div>
      </div>
      <div class="container">
        <!-- 职位目录 -->
        <div class="post-catalog" @mouseenter="onEnter" @mouseleave="onLeave">
          <div class="father-catalog">
            <div v-for="(item,index) in proCate" :key="index">
              <div
                class="catalog-name"
                :class="index == catalogIndex ? 'select' : ''"
                @mouseenter="onEnterPostClass(index)"
              >{{item.cate_name}}</div>
            </div>
          </div>
          <div class="post-catalog-list" v-if="selectClass">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span
                  class="post-class-title"
                  v-if="proCate[catalogIndex]"
                >{{proCate[catalogIndex].cate_name}}</span>
              </div>
              <div class="post-list">
                <!-- {{proCate[catalogIndex].children}} -->
                <span
                  class="post-name-list"
                  v-for="(item,index) in proCate[catalogIndex].children"
                  :key="index"
                  @click="onProjectClassSearch([proCate[catalogIndex].id,item.id])"
                >{{item.cate_name}}</span>
              </div>
            </el-card>
          </div>
        </div>
        <!-- 广告轮播图 -->
        <div class="ad-rotation-chart">
          <el-carousel height="253px" arrow="never" :interval="interval">
            <el-carousel-item v-for="item in banner" :key="item.id">
              <div>
                <img style="width=100%" :src="item.pic" :onerror="defaultImg" @click="onAD"/>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 登录 -->
        <div class="login-module">
          <div class="login-title" v-if="!isLogin">登录</div>
          <Login :login="login"></Login>
        </div>
      </div>
      <!-- 公司图片 -->
      <!-- <div class="company-pictures">
        <div v-for="item in companyPictures" :key="item.id">
          <img style="width=404px" :src="item" class="company-img" />
        </div>
      </div> -->
      <!-- 环评公示 -->
      <div class="notice-project margin-t-20">
        <div class="porject--title">
          <div>环评公示</div>
          <el-button type="text" @click="onViewMore('proEia')">查看更多<i class="el-icon-arrow-right"></i></el-button>
        </div>
        <ul class="notice-list padding-t-20 padding-b-12">
          <li class="notice-list-bar padding-b-8" v-for="(item,index) in projectNoticeList" :key="index">
            <span class="notice-name title-nowrap bg" v-if="item === 0">{{item.name}}</span>
            <el-tooltip v-else class="item" transition="el-fade-in-active" effect="dark" :content="item.name" placement="top-start">
              <span class="notice-name title-nowrap" @click="onProjectNoticeDetails(item)">
                [{{item.area1_name === '黑龙江省' || item.area1_name === '内蒙古自治区' ? item.area1_name.substring(0,3) : item.area1_name.substring(0,2)}}]{{item.name}}
              </span>
            </el-tooltip>
            <span class="notice-time text-r" v-if="item !== 0">{{item.add_time | ondateFormat}}</span>
            <span class="notice-time text-r" :class="item !== 0 ? '' : 'bg'" v-else>{{item.add_time}}</span>
          </li>
        </ul>
      </div>
      <div class="project-main clearfix">
        <!-- 招商项目 -->
        <div class="project-list-bar fl margin-b-20" v-for="(item,index) in cateProList" :key="index">
          <div class="porject--title">
            <div>{{item.cate_name}}</div>
            <el-button type="text" @click="onViewMore(item.cate_name)">查看更多<i class="el-icon-arrow-right"></i></el-button>
          </div>
          <ul class="project-list">
            <li class="project-list-item padding-b-8" v-for="(porp,index) in item.data_list" :key="index">
              <span class="project-name title-nowrap bg" v-if="porp === 0">{{porp.name}}</span>
              <el-tooltip transition="el-fade-in-active" v-else class="item" effect="dark" :content="porp.name" placement="top-start">
                <span class="project-name title-nowrap" @click="onProDetail(porp)">
                  [{{porp.area1_name === '黑龙江省' || porp.area1_name === '内蒙古自治区' ? porp.area1_name.substring(0,3) : porp.area1_name.substring(0,2)}}]{{porp.name}}
                </span>
              </el-tooltip>
              <span class="project-time text-r" v-if="porp !== 0">{{porp.last_time | ondateFormat}}</span>
              <span class="project-time text-r bg" v-else>{{porp.last_time}}</span>
              <span class="project-salary" :class="porp !== 0 ? '' : 'bg'">{{porp.fund_rang | onFundRang}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProjectData } from "@/api/project";
import { fundRang } from "@/config/constant";
import utils from "@/utils/index.js";
import { mapMutations, mapGetters } from "vuex";
import Login from "@/components/person/login.vue";
import ProjectList from "@/components/project/project-list";
/* eslint-disable */
export default {
  name: "Project",
  filters: {
    onFundRang (value) {
      var obj = utils.findObj(fundRang, value)
      return obj.label
    },
    ondateFormat (value) {
      var obj = utils.dateFormat(value)
      return obj
    }
  },
  data() {
    var validateMobilePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不可为空"));
      } else {
        if (value !== "") {
          var reg = /^1[3456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的手机号码"));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      that: this,
      checked: false,
      postData: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      typeSelect: [],
      login: {
        type: 1,
        reception: "公示项目",
        backstage: "免费发布项目"
      },
      //   fundRang: fundRang,
      defaultImg:
        'this,src="' +
        require("../../../assets/image/protection-day.png") +
        '"',
      inputValue: "",
      fullscreenLoading: true,
      userPwd: "",
      userName: "",
      interval: 10000,
      selectClass: false,
      catalogIndex: null,
      proCate: [{ children: [{}] }],
      banner: [
        {
          id: 10,
          name: "banner",
          pic: "/static/img/post-seek.png"
        }
      ],
      cateProList: [{data_list: [0,0,0,0,0,0,0,0,0]}],
      recommendData: [
        "饮用水工程",
        "生态环境工程",
        "项目环评",
        "项目竣工验收",
        "环境监测"
      ],
      companyPictures: [
        require("../../../assets/image/china-can-build.png"),
        require("../../../assets/image/china-can-build.png"),
        require("../../../assets/image/china-can-build.png"),
        require("../../../assets/image/huaqi.png"),
        require("../../../assets/image/huaqi.png"),
        require("../../../assets/image/huaqi.png")
      ],
      projectNoticeList: [0,0,0,0,0,0,0,0,0],
      projectType: [
        {id:20, project_id: 2003, cate_name: "饮用水工程" },
        {id:20, project_id: 2001, cate_name: "生态环境工程" },
        {id:10, project_id: 1006, cate_name: "项目环评" },
        {id:10, project_id: 1005, cate_name: "项目竣工验收" },
        {id:10, project_id: 1004, cate_name: "环保应急工程" },
        {id:10, project_id: 1002, cate_name: "环境监测" },
        {id:10, project_id: 1001, cate_name: "咨询" }
      ],
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  components: {
    Login,
    ProjectList
  },
  beforeCreate() {
    this.fullscreenLoading = true;
  },
  created() {
    //初始化职位访问记录
    this.INIT_PRO_RECORD();
    this.getProjectData();
    this.fullscreenLoading = false;
  },
  methods: {
    ...mapMutations(["INIT_PRO_RECORD", "ADD_PRO_RECORD"]),
    // 获取数据
    getProjectData() {
      this.fullscreenLoading = true;
      let that = this;
      getProjectData().then(res => {
        // console.log("获取数据");
        // console.log(res.data);
        if (res.data.banner.length > 0) {
          that.$set(that, "banner", res.data.banner);
        }
        that.$set(that, "proCate", res.data.pro_cate);
        // console.log(JSON.stringify(res.data.pro_cate));
        that.$set(that, "cateProList", res.data.cate_pro_list);
        that.fullscreenLoading = false;
        // 环评公示
        this.$set(this,'projectNoticeList',res.data.gsxm_list.data_list)
      });
    },
    onEnter() {
      this.selectClass = true;
      this.catalogIndex = 0;
    },
    onLeave() {
      this.selectClass = false;
      this.catalogIndex = null;
    },
    onEnterPostClass(e) {
      this.catalogIndex = e;
    },
    // 项目分类选择搜索
    onProjectClassSearch(val) {
      this.$router.push({ path: "/front/project/search", query: { id: val[0],project_id:val[1] } });
    },
    onTypeSelect(val){
      this.$router.push({ path: "/front/project/search", query: { id: val[0],project_id:val[1] } });
    },
    // input 搜索
    onProjectSearch() {
      this.$router.push({
        path: "/front/project/search",
        query: { key: this.inputValue }
      });
    },
    // 回车键搜索 
    onSearchEnterFun(e){
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.$router.push({
          path: "/front/project/search",
          query: { key: this.inputValue }
        });
      }
    },
    // 热搜搜索
    onRelevant(val) {
      this.$router.push({
        path: "/front/project/search",
        query: { key:val } 
      });
    },
    // 查看更多
    onViewMore(e) {
      if (e == 'proEia') {
        this.$router.push({ path: "/front/project/search", query: { type: 1} });
      } else{
        var data = this.projectType.find(function (obj) {
        return obj.cate_name === e
      })
      // console.log("参数",data)
      this.$router.push({ path: "/front/project/search", query: { id: data.id,project_id: data.project_id } });
      }
    },
    onProDetail (val) {
      if(val !== 0)
      {
          // console.log(val)
          this.ADD_PRO_RECORD({
            pro_id: val.proid,
            org_name: val.org_name,
            pro_name: val.name,
            fundRangValue: val.fund_rang,
            area1_name: val.area1_name
          });
          // console.log(this.proVistRecord);
          this.$router.push({ path: "/front/project/detail",query: {proid: val.proid}});
      }
      
    },
    // 跳转环评公示详情
    onProjectNoticeDetails(val){
      this.$router.push({ path: "/front/project/noticedetail",query: {id: val.id}});
    },
    // 跳转广告
    onAD(){
      this.$router.push({path:'/ad'})
    }
  }
};
</script>
<style lang="less" scoped>
@import "./new-project.less";
</style>
