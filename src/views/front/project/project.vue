<template>
  <div class="project-home-page" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="content project">
      <!-- 搜索 -->
      <div class="search-module">
        <!-- <div class="hk-search-tips margin-r-60" >项目发布</div> -->
        <div class="search-module fr">
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
                <img style="width=100%" :src="item.pic" :onerror="defaultImg" />
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
      <div class="company-pictures">
        <div v-for="item in companyPictures" :key="item.id">
          <img style="width=404px" :src="item" class="company-img" />
        </div>
      </div>
      <!-- 项目列表 -->
      <div class="recruit-post">
        <div v-for="(item,index) in cateProList" :key="index">
          <div class="recruit-post-content">
            <ul class="fl hk-list-left padding-t-68 padding-lr-20">
              <li class="hk-list-title">{{item.cate_name}}</li>
              <li>
                <el-button type="button" class @click="onViewMore">查看更多</el-button>
              </li>
            </ul>
            <ProjectList :zbxm="item.data_list.slice(0, 9)"></ProjectList>
            <!-- <div class="recruit-post-list">
                          <el-row :gutter="20">
                            <el-col :span="8" v-for="(i, index) in item.data_list" :key="index" >
                              <div class="recruit-post-information shows" @click="onPostJump(i)">
                                  <div class="recruit-post-name public-title-bar title-nowrap">{{i.name}}</div>
                                  <div class="recruit-post-details">
                                      <div class="public-post-salary">{{ i.fund_rang | onfundRang}}</div>
                                      <div class="recruit-post-address-muster">
                                        <div class="recruit-post-address">{{i.area2_name === "市辖区" ? i.area1_name: i.area2_name}}</div>
                                        <div class="recruit-post-release-date">{{i.last_time}}</div>
                                      </div>
                                  </div>
                              </div>
                            </el-col>
                          </el-row>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProjectData } from "@/api/project";
import { fundRang } from "@/config/constant";
import utils from "@/utils/index.js";
import { mapGetters } from "vuex";
import Login from "@/components/person/login.vue";
import ProjectList from "@/components/project/project-list";
/* eslint-disable */
export default {
  name: "project",
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
      cateProList: [],
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
      ]
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
    // console.log('方法引用', this.constantPMethod.constant(fundRang,20))
    this.getProjectData();
    this.fullscreenLoading = false;
  },
  methods: {
    // 获取数据
    getProjectData() {
      this.fullscreenLoading = true;
      let that = this;
      getProjectData().then(res => {
        console.log("获取数据");
        console.log(res.data);
        if (res.data.banner.length > 0) {
          that.$set(that, "banner", res.data.banner);
        }
        that.$set(that, "proCate", res.data.pro_cate);
        console.log(JSON.stringify(res.data.pro_cate));
        that.$set(that, "cateProList", res.data.cate_pro_list);
        that.fullscreenLoading = false;
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
    // 热搜搜索
    onRelevant(val) {
      this.$router.push({
        path: "/front/project/search",
        query: { key:val } 
      });
    },
    // 查看更多
    onViewMore() {
      this.$router.push({ path: "/front/project/search" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./project.less";
</style>
