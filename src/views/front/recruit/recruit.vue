<template>
  <div class="project-post" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="content">
      <div class="search-module">
        <!-- <div class="hk-search-tips margin-r-60" >人才注册</div> -->
        <el-input placeholder="请输入想要搜索的招聘岗位" v-model="inputValue" class="search-input">
          <el-cascader
            slot="prepend"
            placeholder="职位类型"
            v-model="typeSelect"
            :options="postCate"
            :props="postData"
            @change="onTypeSelect"
            clearable >
          </el-cascader>
          <el-button slot="append" class="hk-search-button" @click="onSearch">搜索</el-button>
        </el-input>
      </div>
      <div class="tiling search-rec">
        <div class="search-rec-title">相关搜索：</div>
        <div class="search-rec-option" v-for="item in 4" :key="item" @click="onRelevant">饮用水工程</div>
      </div>
      <div class="container">
        <!-- 职位目录 -->
        <div class="post-catalog" @mouseenter="onEnter" @mouseleave="onLeave">
          <div v-for="(item,index) in postCate" :key="index">
            <div
              class="catalog-name"
              :class="index == catalogIndex ? 'select' : ''"
              @mouseenter="onEnterPostClass(index)"
            >{{item.cate_name}}</div>
          </div>
          <div class="post-catalog-list" v-if="selectClass">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span class="post-class-title">{{postCate[catalogIndex].cate_name}}</span>
              </div>
              <ul class="post-list">
                <li
                  class="hk-post-list fl"
                  v-for="(item,index) in postCate[catalogIndex].children"
                  :key="index"
                >
                  <span
                    class="post-name-list"
                    @click="onSearchPost([postCate[catalogIndex].id,item.id])"
                  >{{item.cate_name}}</span>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
        <!-- 广告轮播图 -->
        <div class="ad-rotation-chart">
          <el-carousel height="253px" arrow="never" :interval="interval">
            <el-carousel-item v-for="(item,index) in banner" :key="index">
              <div>
                <img style="width=100%" :src="item.pic" :onerror="defaultImg" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 登录 -->
        <div class="login-module">
          <div class="login-title">
            <div class="person-login" v-if="!isLogin">个人登录</div>
            <div @click="onOrgLogin" class="org-login" v-if="!isLogin">企业登录</div>
          </div>
          <Login :login="login"></Login>
        </div>
      </div>
      <!-- 公司图片 -->
      <div class="company-pictures">
        <div v-for="(item,index) in companyPictures" :key="index" style>
          <img style="width=404px" :src="item" class="company-img" />
        </div>
      </div>
      <!-- 招聘职位 -->
      <!-- <div>{{catePostList}}</div> -->
      <div class="recruit-post">
        <div v-for="(item,index) in catePostList" :key="index">
          <div class="recruit-post-content">
            <ul class="fl hk-list-left padding-t-68 padding-lr-20">
              <li class="hk-list-title">{{item.cate_name}}</li>
              <!-- <li class="hk-list-newbar text-white-2 text-center">项目公示最新最全</li> -->
              <li>
                <el-button type class @click="onViewMore">查看更多</el-button>
              </li>
            </ul>
            <div class="recruit-post-list">
              <el-row :gutter="20" style="width:100%;">
                <el-col :span="8" v-for="(i,iIndex) in item.data_list" :key="iIndex">
                    <div class="recruit-post-information shows">
                      <div class="recruit-post-muster clearfix">
                        <span class="public-post-salary fr">
                          {{i.min_salary | onSalary}}
                          -{{i.max_salary | onSalary}}
                        </span>
                          <span class="recruit-post-name fl public-title-bar title-nowrap hk-cursor" @click="onPostDetail(i)">{{i.name}}</span>
                        <!-- </router-link> -->
                      </div>
                      <div class="recruit-post-req-muster">
                        <span class="title-nowrap hk-post-item-name">{{i.area2_name }}</span>
                        <span class="title-nowrap hk-post-item-name">{{i.min_edu | onMinEdu}}</span>
                        <span class="title-nowrap hk-post-item-name">{{i.work_type | onWorkType}}</span>
                        <span class="title-nowrap hk-post-item-name">{{i.work_life | onWorkLife}}</span>
                      </div>
                      <div class="recruit-post-company-name line-50 title-nowrap">{{i.org_name}}</div>
                    </div>
                  
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecruitData } from "@/api/recruit";
import { mainSalary, workLife, minEdu, workType } from "@/config/constant";
import Login from "@/components/person/login.vue";
import utils from "@/utils/index.js";
import { mapMutations, mapGetters } from "vuex";
export default {
  filters: {
    onSalary(value) {
      var obj = utils.findObj(mainSalary, value);
      return obj.label;
    },
    onMinEdu(value) {
      var obj = utils.findObj(minEdu, value);
      return obj.label;
    },
    onWorkType(value) {
      var obj = utils.findObj(workType, value);
      return obj.label;
    },
    onWorkLife(value) {
      var obj = utils.findObj(workLife, value);
      return obj.label;
    }
  },
  data() {
    return {
      login: {
        type: 2,
        reception: "找工作",
        backstage: "发布职位"
      },
      typeSelect:'',
      postData: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      checked: false,
      that: this,
      utils: utils,
      fullscreenLoading: false,
      salary: "",
      workLife: "",
      minEdu: "",
      workType: "",
      validDay: "",
      postState: "",
      inputValue: "",
      defaultImg:
        'this,src="' + require("../../../assets/image/post-seek.png") + '"',
      selectClass: false,
      catalogIndex: null,
      interval: 10000,

      banner: [{
        id: 10,
        name: 'banner',
        pic: '/static/img/post-seek.png'
      }],
      postCate: [],
      catePostList: [],
      companyPictures: [
        require("../../../assets/image/china-can-build.png"),
        require("../../../assets/image/china-can-build.png"),
        require("../../../assets/image/china-can-build.png"),
        require("../../../assets/image/huaqi.png"),
        require("../../../assets/image/huaqi.png"),
        require("../../../assets/image/huaqi.png")
      ],
      activeName: "personal",
      RecentBrowsingSalary: mainSalary,
    };
  },
  components: {
    Login,
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
      postVistRecord: "postVistRecord"
    })
  },
  beforeCreate() {
    this.fullscreenLoading = true;
  },
  created() {
    this.getRecruitPostData();
    this.fullscreenLoading = false;
    //初始化职位访问记录
    this.INIT_POST_RECORD();
  },
  methods: {
    ...mapMutations(["INIT_POST_RECORD", "ADD_POST_RECORD"]),
    onHandleClick(e) {
      // console.log(e)
    },
    getRecruitPostData() {
      let that = this;
      // that.fullscreenLoading = true
      getRecruitData().then(res => {
        // 轮播图片
        if (res.data.banner.length > 0) {
          that.$set(that, 'banner', res.data.banner)
        }
        // 目录
        // console.log("职位类型",JSON.stringify(res.data.post_cate))
        that.$set(that, "postCate", res.data.post_cate);
        that.$set(that, "catePostList", res.data.cate_post_list);
        that.fullscreenLoading = false;
      });
    },
    onEnter() {
      this.selectClass = true;
      this.catalogIndex = 0;
    },
    onLeave() {
      //   console.log('移出')
      this.selectClass = false;
      this.catalogIndex = null;
    },
    onEnterPostClass(e) {
      //   console.log('选择职位类' + e)
      this.catalogIndex = e;
    },
    onSearchPost(val) {
      this.$router.push({
        path: "/front/recruit/post/search",
        query: { id: val[0],post_id:val[1] }
      });
    },
    onSearch() {
      this.$router.push({
        path: "/front/recruit/post/search",
        query: { key: this.inputValue }
      });
    },
    onRelevant() {
      this.$router.push({
        path: "/front/recruit/post/search",
        query: { key: "饮用水工程" }
      });
    },
    // 跳转职位详情
    onPostDetail(val) {
      console.log(val);
      let max_salary = null, min_salary = null
      this.RecentBrowsingSalary.forEach(item => {
        if (item.value === val.min_salary) {
          return min_salary = item.label
        }
        if (item.value === val.max_salary) {
          return max_salary = item.label
        }
      })
      console.log(min_salary +'-' + max_salary)
      this.ADD_POST_RECORD({
        post_id: val.id,
        org_name: val.org_name,
        post_name: val.name,
        salary: min_salary +'-' + max_salary
      });
      this.$router.push({path:'/front/recruit/post/detail',query:{post_id:val.id}});
    },
    // 查看更多跳转
    onViewMore() {
      this.$router.push({ path: "/front/recruit/post/search" });
    },
    onOrgLogin() {
      this.$router.push({ path: "/account/org/login" });
    },
    onTypeSelect(val){
      console.log('职位类型',val)
      this.$router.push({ path: "/front/recruit/post/search",query:{id:val[0],post_id:val[1]}});
    }
  }
};
</script>
<style lang="less" scoped >
@import "./recruit.less";
</style>
