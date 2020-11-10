<template>
  <div class="hk-newrecruit-post" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="content">
      <div class="search-module">
        <!-- <router-link to="/account/register">
          <el-button type="primary" class="hk-search-tips margin-r-60" round>人才注册</el-button>
        </router-link>-->
        <el-input placeholder="请输入想要搜索的职位" v-model="inputValue" @keyup.enter.native="onSearchEnterFun"  class="search-input">
          <el-button slot="append" @click="onSearch" class="hk-search-button">搜索</el-button>
        </el-input>
      </div>
      <div class="container">
        <!-- 职位目录 -->
        <div class="post-catalog" @mouseenter="onEnter" @mouseleave="onLeave">
          <ul class="post-catalog-ul">
            <li v-for="(item,index) in postCate" :key="index">
              <span
                class="catalog-name clearfix"
                :class="index == catalogIndex ? 'select' : ''"
                @mouseenter="onEnterPostClass(index)"
              >
                <i class="el-icon-arrow-right fr line-34 margin-r-20"></i>
                {{item.cate_name}}
              </span>
            </li>
          </ul>
          <div class="post-catalog-list" v-if="selectClass">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span class="text-bold">{{postCate[catalogIndex].cate_name}}</span>
              </div>
              <ul class="post-list">
                <li
                  class="hk-post-list fl"
                  v-for="(item,index) in postCate[catalogIndex].children"
                  :key="index"
                >
                  <span class="post-name-list" @click="onSearchPost(item.id)">{{item.cate_name}}</span>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
        <!-- 广告轮播图 -->
        <div class="ad-rotation-chart">
          <ul class="ad-rotaion-tu">
            <!--一共七张图片 第一张图和第六张图是长图 -->
            <li class="hk-advertising-map" v-for="item in adMap" :key="item.id">
              <a href="#">
                <img width="100%" :src="item.pic" alt="item.id" @click="onAD" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 公告 -->
      <div class="margin-t-20">
        <marquee></marquee>
      </div>
      <!-- 热招职位 -->
      <div class="hk-newrecruit-content">
        <div class="hk-newrecruit-title">热招职位</div>
        <div class="hk-new-recruit-nav">
          <ul class="el-menu--horizontal clearfix">
            <el-button type="text" class="hk-moer-but" @click="onSeeMore">
              更多职位
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <li
              class="el-menu-item"
              v-for="(item,index) in postCateNav"
              :key="index"
              @click="onScreen(index,item)"
              :class="selectPostIndex === index ? 'is-active' : ''"
            >{{item.cate_name}}</li>
          </ul>
        </div>
        <!-- 职位列表 -->
        <div class="post-list">
          <el-row class="clearfix">
            <div class="hk-list-recruit-bar fl" v-for="(item,index) in postList" :key="index">
              <div class="post-list-content shows">
                <div class="padding-tb-20 clearfix">
                  <!-- 环评工程师 -->
                  <span
                    class="fl hk-mall-completed public-title-bar title-nowrap hk-cursor"
                    :class="item !== 0 ? '' : 'bg'"
                    @click="onPostDetail(item)"
                  >{{item.name}}</span>
                  <span class="fr title-nowrap hk-salary-main" v-if="item !== 0">
                    <!-- 薪资 最低薪资---最高薪资-->
                    <span class="public-post-salary">{{item.min_salary | onSalary}} -</span>
                    <span class="public-post-salary">{{item.max_salary | onSalary}}</span>
                  </span>
                  <span class="fr hk-salary-main" v-else :class="item !== 0 ? '' : 'bg'"></span>
                </div>
                <div class="hk-requirement">
                  <!-- 贵阳 -->
                  <span
                    class="margin-r-15 title-nowrap hk-post-item-name"
                    :class="item !== 0 ? '' : 'bg'"
                  >{{item.area2_name }}</span>
                  <!-- 1-3年 -->
                  <span
                    class="margin-r-15 title-nowrap hk-post-item-name"
                    :class="item !== 0 ? '' : 'bg'"
                  >{{item.work_life | onWorkLife}}</span>
                  <!-- 本科 -->
                  <span
                    class="margin-r-15 title-nowrap hk-post-item-name"
                    :class="item !== 0 ? '' : 'bg'"
                  >{{item.min_edu | onMinEdu}}</span>
                  <!-- 全职 -->
                  <span
                    class="margin-r-15 title-nowrap hk-post-item-name"
                    :class="item !== 0 ? '' : 'bg'"
                  >{{item.work_type | onWorkType}}</span>
                </div>
                <div class="hk-company">
                  <!-- 贵阳活性源控有限公司 -->
                  <p class="title-nowrap" :class="item !== 0 ? '' : 'bg'">{{item.org_name}}</p>
                </div>
              </div>
              <!-- </router-link> -->
            </div>
          </el-row>
        </div>
      </div>
      <!-- 热门企业 -->
      <div class="hk-newrecruit-content enterprise">
        <div class="hk-newrecruit-title">热门企业</div>
        <!-- <div class="hk-new-recruit-nav">
          <ul class="el-menu--horizontal clearfix">
            <el-button type="text" class="fr hk-moer-but">
              更多企业
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <li
              class="el-menu-item"
              v-for="(item,index) in 6"
              :key="item"
              @click="onSelectPost(index)"
              :class="isIndex === index ? 'is-active' : ''"
            >环评注册工程师</li>
          </ul>
        </div>-->
        <!-- 企业列表 -->
        <div class="hot-company">
          <ul>
            <li class="hk-list-company-bar padding-t-26" v-for="item in 12" :key="item">
              <div class="hk-company-logo">
                <img height="60px" src="../../../assets/image/complogo01.jpg" alt />
              </div>
              <p class="font-16 text-blacks line-30 margin-t-10">安荣环保</p>
              <p class="font-12 text-line padding-b-17">
                <span>已上市</span>
                <span>|</span>
                <span>环保</span>
              </p>
              <el-button class="hk-hot-company-but">
                <span class="text-green">166</span>个热招职位
              </el-button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecruitData, searchPost } from "@/api/recruit";
import { mainSalary, workLife, minEdu, workType } from "@/config/constant";
import { postCate } from "@/config/post-type";
import Login from "@/components/person/login.vue";
import marquee from "@/components/common/marquee.vue";
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
      that: this,
      utils: utils,
      fullscreenLoading: false,
      salary: "",
      workLife: "",
      minEdu: "",
      workType: "",
      // validDay: "",
      // postState: "",
      inputValue: "",
      selectClass: false,
      catalogIndex: null,
      postCate: postCate,
      postCateNav: [
        {
          id: 0,
          cate_name: "全部"
        }
      ],
      postCateId: null,
      postList: [0, 0, 0, 0, 0, 0, 0, 0],
      // 2020.6.5新增
      selectPostIndex: 0,
      // isIndex: 0,

      adMap: [
        {
          id: 4,
          pic: require("../../../assets/image/new-recuri-img03.png")
        },
        {
          id: 5,
          pic: require("../../../assets/image/new-recuri-img01.png")
        },
        {
          id: 1,
          pic: require("../../../assets/image/new-recuri-img06.png")
        },
        {
          id: 2,
          pic: require("../../../assets/image/new-recuri-img04.png")
        },
        {
          id: 3,
          pic: require("../../../assets/image/new-recuri-img05.png")
        }
      ],
      RecentBrowsingSalary: mainSalary
    };
  },
  components: {
    Login,
    marquee
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
    // 职位搜索接口
    this.getSearchPost();
  },
  methods: {
    ...mapMutations(["INIT_POST_RECORD", "ADD_POST_RECORD"]),
    getRecruitPostData() {
      let that = this;
      this.postCate.forEach(item => {
        that.postCateNav.push({
          id: item.id,
          cate_name: item.cate_name
        });
      });
      // that.fullscreenLoading = true
      // getRecruitData().then(res => {
        // 目录
        // console.log('数据')
        // console.info(res.data);
        // that.$set(that, "postCate", res.data.post_cate);
        // console.log(JSON.stringify(this.postCate));
        // let cateTree = res.data.post_cate;
        // var postCates = ;
        // cateTree.forEach(item => {
        //   that.postCateNav.push({
        //     id: item.id,
        //     cate_name: item.cate_name
        //   });
        // });
        // console.log("数据树123");
        // console.log(this.postCateNav);
        // let postLists = [];
        // let postListbar = [];
        // postListbar = res.data.cate_post_list;
        // postListbar.forEach(item => {
        //   item.data_list.forEach(pop => {
        //     postLists.push({
        //       id: pop.id,
        //       name: pop.name,
        //       min_salary: pop.min_salary,
        //       max_salary: pop.max_salary,
        //       min_edu: pop.min_edu,
        //       work_type: pop.work_type,
        //       work_life: pop.work_life,
        //       org_name: pop.org_name,
        //       area2_name: pop.area2_name
        //     });
        //   });
        // });
        // that.$set(that, "postList", postLists);
        // console.log(this.postList)
        // that.fullscreenLoading = false;
      // });
    },
    // 鼠标移入
    onEnter() {
      this.selectClass = true;
      this.catalogIndex = 0;
    },
    // 鼠标移出
    onLeave() {
      //   console.log('移出')
      this.selectClass = false;
      this.catalogIndex = null;
    },
    onEnterPostClass(e) {
      //   console.log('选择职位类' + e)
      this.catalogIndex = e;
    },
    // 按职位搜索
    onSearchPost(id) {
      // console.log("职位搜索",id,this.postCate[this.catalogIndex].id)
      this.$router.push({
        path: "/front/recruit/post/search",
        query: { id: this.postCate[this.catalogIndex].id, post_id: id }
      });
    },
    // 输入框搜索
    onSearch() {
      this.$router.push({
        path: "/front/recruit/post/search",
        query: { key: this.inputValue }
      });
    },
    // 回车键搜索
    onSearchEnterFun(e){
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        this.$router.push({
          path: "/front/recruit/post/search",
          query: { key: this.inputValue }
        });
      }
    },
    // 职位导航搜索
    getSearchPost() {
      var parameter = {
        // edu: '',
        // area2: '',
        // work_type: '',
        // work_life: '',
        // min_salary: '',
        // max_salary: '',
        list_rows: 30,
        postcateid: this.postCateId,
        page: 1
      };
      searchPost(parameter).then(res => {
        // this.$set(this, "postDataList", res.data.data_list);
        // this.$set(this, "total_count", res.data.total_count);
        // this.total_page = Math.ceil(this.total_count / 10);
        // console.log('搜索出来的结果')
        // console.log(res.data)
        this.postList = res.data.data_list.slice(0, 8);
      });
    },
    // 查看更多
    onSeeMore() {
      this.postCateId = null;
      this.getSearchPost();
      this.selectPostIndex = -1;
    },
    // 选中导航项
    onScreen(index, val) {
      // console.log(index);

      this.postCateId = val.id;
      this.getSearchPost();
      this.selectPostIndex = index;
    },
    // onSelectPost(index) {
    //   this.isIndex = index;
    // },
    // 跳转职位详情
    onPostDetail(val) {
      if (val !== 0) {
        let max_salary = null,
          min_salary = null;
        this.RecentBrowsingSalary.forEach(item => {
          if (item.value === val.min_salary) {
            return (min_salary = item.label);
          }
          if (item.value === val.max_salary) {
            return (max_salary = item.label);
          }
        });
        // console.log(min_salary + "-" + max_salary);
        this.ADD_POST_RECORD({
          post_id: val.id,
          org_name: val.org_name,
          post_name: val.name,
          salary: min_salary + "-" + max_salary
        });
        this.$router.push({
          path: "/front/recruit/post/detail",
          query: { post_id: val.id }
        });
      }
    },
    // 跳转广告
    onAD() {
      this.$router.push({ path: "/ad" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./new-recruit.less";
</style>
