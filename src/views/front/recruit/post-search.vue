<template>
  <div class="postsearch">
    <div class="tiling post-number">
      <div class>招聘（500+）</div>
      <div class>公司（80+）</div>
    </div>
    <div class="search-module">
      <!-- <el-input placeholder="请输入想要搜索的项目" v-model="key" class="search-input">
        <el-button slot="append" @click="onPostSearch" class="hk-search-button">搜索</el-button>
      </el-input>-->
      <el-input
        placeholder="请输入想要搜索的招聘岗位"
        v-model="key"
        @keyup.enter.native="onSearchEnterFun"
        class="search-input"
      >
        <el-cascader
          slot="prepend"
          placeholder="职位类型"
          v-model="postSelect"
          :options="postCateList"
          :props="postData"
          @change="onPostList"
          clearable
        ></el-cascader>
        <el-button slot="append" class="hk-search-button" @click="onPostSearch">搜索</el-button>
      </el-input>
      <!-- <div class="hk-search-tips search-tips" >发布职位</div> -->
    </div>
    <div class="tiling search-rec">
      <div class="search-rec-title">相关搜索：</div>
      <div
        class="search-rec-option"
        v-for="(item,index) in recommendData"
        :key="index"
        @click="onRecommend(item)"
      >{{item}}</div>
    </div>
    <div class="ad" v-if="adDisplay">
      <img class="ad-img" title @click="onAD" src="../../../assets/image/project-search.png" />
    </div>

    <div class="content">
      <div class="tiling">
        <div class="content-left" id="select-list">
          <div class="post-list">
            <div class="select-list">
              <div class="tiling info">
                <div class="title">城市</div>
                <div class="hk-option">
                  <!-- 筛选城市 -->
                  <citySelect @onCity="onCity"></citySelect>
                </div>
              </div>
              <div class="tiling info">
                <div class="title">学历</div>
                <span
                  v-for="(item,index) in education"
                  :key="index"
                  class="option"
                  @click="onEducation(index,item)"
                  :class="index === educationId ? 'select':''"
                >{{item.label}}</span>
              </div>
              <div class="tiling info select">
                <div class="title">其它</div>
                <el-select v-model="min_salary" class="other-select" clearable placeholder="最小薪资">
                  <el-option
                    v-for="(item,index) in amountOfMoney"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="max_salary"
                  @change="onAmountOfMoney"
                  class="other-select"
                  clearable
                  placeholder="最大薪资"
                >
                  <el-option
                    v-for="(item,index) in amountOfMoney"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="experience"
                  @change="onExperience"
                  class="other-select"
                  clearable
                  placeholder="工作经验"
                >
                  <el-option
                    v-for="(item,index) in experienceData"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div class="other-select">
                  <el-select v-model="postType" @change="onPostType" clearable placeholder="职位类型">
                    <el-option
                      v-for="item in postTypeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <!-- <el-checkbox @change="onCheckBox" v-model="checked" class="checked">是否有资格证书</el-checkbox> -->
              </div>
            </div>

            <div class="tiling screen">
              <div class="sort-content">
                <div class="sort-order">
                  <div class="sort-order-title">排序</div>
                  <img
                    class="sort-order-icon"
                    @click="onDownArray()"
                    src="../../../assets/image/down-icon.png"
                  />
                  <img
                    class="sort-order-icon"
                    @click="onUpwardArray()"
                    src="../../../assets/image/upward-icon.png"
                  />
                </div>
                <div class="screen-type">
                  <div class="screen-type-option" v-for="(item,index) in sortTypeData" :key="index">
                    <div @click="onType(index)" :class="index === sortTypeId ? 'select':''">{{item}}</div>
                  </div>
                </div>
                <div class="paging">
                  <div class="project-sum">
                    共
                    <span class="sum">{{total_count}}</span>个职位
                  </div>
              
                </div>
              </div>
            </div>
            <div class="post-info-muster" v-for="(item,index) in postDataList" :key="index">
              <div class="post-info-left">
                <p class="post-name hk-cursor title-nowrap" @click="onPostDetail(item)">
                  
                  {{item.name}}
                </p>
                <div
                  class="post-salary"
                >{{item.min_salary | onSalary}}-{{item.max_salary | onSalary}}</div>
                <p
                  class="post-type-explain title-nowrap-tow line-26"
                >{{item.work_type| onWorkType}} {{item.good_staff}}</p>
              </div>
              <div class="post-info-center">
                <span
                  class="post-require-interval title-nowrap"
                >{{item.area2_name === "市辖区" ? item.area1_name: item.area2_name}}</span>
                <span class="post-require-interval title-nowrap">{{ item.work_life | onWorkLife}}</span>
                <span class="post-require-interval title-nowrap">{{item.min_edu | onMinEdu}}</span>
              </div>
              <div class="post-info-right">
                <div class="org-name title-nowrap">{{item.org_name}}</div>
                <el-button class="address margin-r-0" @click="onApplyPost(item.id)">申请职位</el-button>
              </div>
            </div>
            <div class="no-data" v-if="postDataList.length <= 0 && !isloading">
              <img src="@/assets/image/no-data.png" alt />
            </div>
            <div class="bg-white padding-20" v-if="isloading">
              <Loading :id="1" ></Loading>
            </div>
            <div class="text-center text-line font-12" v-else-if="postDataListLength != 0 && postDataListLength / 10 !== this.currentPage && !isloading">没有更多数据了</div>
          </div>
        </div>
        <div class="content-right">
          <div class="recently-browse">
            <div class="recently-browse-title">最近浏览</div>
            <ul class="padding-lr-20">
              <li v-for="(item,index) in postVistRecordList" :key="index" class="browse-history">
                <div class="recently-browse-post-name">
                  <router-link
                    class="post-jump"
                    :to="{path:'/front/recruit/post/detail',query:{post_id:item.post_id}}"
                  >{{item.post_name}}</router-link>
                </div>
                <div class="recently-browse-amount-of-money">{{item.salary}}</div>
                <div class="recently-browse-org-name">{{item.org_name}}</div>
              </li>
            </ul>
          </div>
          <img
            class="content-right-ad"
            src="../../../assets/image/post-search-ad.png"
            @click="onAD"
          />
        </div>
      </div>
    </div>
    <PopupLogin :isLogin="!login" @close="onClose" @login="onLoginSucceeded"></PopupLogin>
  </div>
</template>
<script>
import {
  salary,
  workLife,
  minEdu,
  workType,
  mainSalary,
} from "@/config/constant";
import { regionData } from "element-china-area-data";
import { getPostCateTree, searchPost } from "@/api/recruit";
import { applyForPost, collectPost } from "@/api/recruit";
import utils from "@/utils/index.js";
import PopupLogin from "@/components/popup/login";
import { mapMutations, mapGetters } from "vuex";
import citySelect from "@/components/common/cityselect.vue";
import Loading from "@/components/loading/loading";
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
    },
  },
  data() {
    const { key = "", id = 0, post_id = 0 } = this.$route.query;
    return {
      RecentBrowsingSalary: mainSalary,
      min_salary: null,
      max_salary: null,
      login: true,
      adDisplay: true,
      key: key,
      experience: "",
      postSelect: [],
      id: id,
      post_id: post_id,
      educationName: "",
      work_type: "",
      area2: "",
      postType: null,
      prostData: {
        value: "id",
        label: "cate_name",
        children: "children",
      },
      checked: false,
      total_count: 0,
      currentPage: 1,
      total_page: 0,
      sortTypeId: 0,
      fieldId: 0,
      postId: 0,
      educationId: 0,
      cityId: -1,
      sortTypeData: ["默认", "价格"],
      field: ["不限", "污水", "大气", "噪音", "土壤", "生态"],
      post: ["不限", "项目环评师", "项目环评师", "项目环评师"],
      education: minEdu,
      postCateList: [],
      postDataList: [],
      postData: {
        value: "id",
        label: "cate_name",
        children: "children",
      },
      city: regionData,
      experienceData: workLife,
      amountOfMoney: mainSalary,
      postTypeData: workType,
      recommendData: [
        "饮用水工程",
        "饮用水工程",
        "饮用水工程",
        "饮用水工程",
        "饮用水工程",
      ],
      isloading: false,
      postVistRecordList: [],
      postDataListLength: 0,
    };
  },
  created() {
    this.$set(this, "postSelect", [this.id, this.post_id]);
    this.postList();
    this.getSearchPost();
    //初始化职位访问记录
    this.INIT_POST_RECORD();
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
      postVistRecord: "postVistRecord",
    }),
    resume_id() {
      if (this.$store.state.app.userInfo.resume_id) {
        return this.$store.state.app.userInfo.resume_id;
      }
      return null;
    },
  },
  mounted() {
    // 判断最近浏览数，大于5条择显示5条
    // console.log(this.postVistRecord)
    let arr = this.postVistRecord;
    if (arr.length > 5) {
      arr = arr.slice(0, 5);
    }
    this.postVistRecordList = arr;
    document.addEventListener("scroll", this.scrollLoad);
  },
  components: {
    PopupLogin,
    citySelect,
    Loading
  },
  methods: {
    ...mapMutations(["INIT_POST_RECORD", "ADD_POST_RECORD"]),
    // 回车键事件
    onSearchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        if (this.$route.query.key || this.$route.query.key == "") {
          this.$router.push({ path: "/front/recruit/post/search" });
        }
        this.getSearchPost();
      }
    },
    /**
     * 用于获取职位分类
     */
    postList(addressFrame) {
      getPostCateTree().then((res) => {
        this.$set(this, "postCateList", res.data);
      });
    },
    onPostList(value) {
      if (this.$route.query.post_id || this.$route.query.key) {
        this.$router.push({ path: "/front/recruit/post/search" });
      }
      if (value[1]) {
        this.post_id = value[1];
      } else {
        this.post_id = null;
      }
      this.getSearchPost();
      // console.log('获取类别', value[1])
    },
    /**
     * 获取职位列表
     */
    getSearchPost() {
      this.isloading = true
      if (this.min_salary > this.max_salary) {
        return this.$message({
          message: "最小薪资不得大于最大薪资",
          type: "warning",
        });
      }
      var parameter = {
        key: this.key,
        edu: this.educationName,
        area2: this.area2,
        work_type: this.postType,
        work_life: this.experience,
        min_salary: this.min_salary,
        max_salary: this.max_salary,
        postcateid: this.post_id,
        page: this.currentPage,
      };
      searchPost(parameter).then((res) => {
        if (res.status === 200) {
          this.$set(
            this,
            "postDataList",
            this.postDataList.concat(res.data.data_list)
          );
          this.$set(this, "total_count", res.data.total_count);
          this.total_page = Math.ceil(this.total_count / 10);
          this.postDataListLength = this.postDataList.length
          this.isloading = false
        }
        this.isloading = false
      }).catch((res) => {
        this.isloading = false
      });
    },
    onPostSearch() {
      if (this.$route.query.key || this.$route.query.key == "") {
        this.$router.push({ path: "/front/recruit/post/search" });
      }
      this.getSearchPost();
    },
    onType(e) {
      this.sortTypeId = e;
      if (e == 0) {
        this.getSearchPost();
      } else if (e == 1) {
        this.postDataList = this.postDataList.sort(
          (pre, cur) => pre.max_salary - cur.max_salary
        );
      } else if (e == 2) {
      }
    },
    // 登录弹框
    onLoginSucceeded() {
      this.login = true;
    },
    onClose() {
      this.login = true;
    },
    //  范围
    onField(index, e) {
      this.fieldId = index;
    },
    // 职位
    onPost(index, e) {
      this.postId = index;
      if (e == "不限") {
        this.post_id = "";
      } else {
        this.post_id = e;
      }
      this.getSearchPost();
    },
    // 城市
    onCity(name, code) {
      // this.cityId = index;
      this.area2 = code;
      // console.log('城市', name, code)
      this.getSearchPost();
    },
    // 学历
    onEducation(index, e) {
      this.educationId = index;
      this.educationName = e.value;
      // console.log('学历', index, e)
      this.getSearchPost();
    },
    // 选择薪资
    onAmountOfMoney(val) {
      // console.log('选择金额', val)
      this.getSearchPost();
    },
    // 选择工作经验
    onExperience(val) {
      // console.log('选择', val)
      this.getSearchPost();
    },
    // 职位类型
    onPostType(val) {
      this.getSearchPost();
    },
    // 是否有资格证书
    onCheckBox(val) {
      // console.log('选择', val)
      this.getSearchPost();
    },
    // 申请职位
    onApplyPost(id) {
      let postId = id.toString();
      if (this.isLogin) {
        applyForPost(postId, this.resume_id)
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                message: res.msg,
                type: "success",
                showClose: true,
                duration: 3000,
              });
            } else {
              this.$message({
                message: res.msg,
                type: "success",
                showClose: true,
                duration: 3000,
              });
            }
          })
          .catch((res) => {
            this.$message({
              message: res.msg,
              type: "error",
              showClose: true,
              duration: 3000,
            });
          });
      } else {
        this.login = false;
      }
    },
    // 排列
    onDownArray(e) {},
    onUpwardArray() {},
    // 跳转职位详情
    onPostDetail(val) {
      // console.log(val);
      let max_salary = null,
        min_salary = null;
      this.RecentBrowsingSalary.forEach((item) => {
        if (item.value === val.min_salary) {
          return (min_salary = item.label);
        }
        if (item.value === val.max_salary) {
          return (max_salary = item.label);
        }
      });
      // console.log(min_salary +'-' + max_salary)
      this.ADD_POST_RECORD({
        post_id: val.id,
        org_name: val.org_name,
        post_name: val.name,
        salary: min_salary + "-" + max_salary,
      });
      this.$router.push({
        path: "/front/recruit/post/detail",
        query: { post_id: val.id },
      });
    },
    onRecommend(e) {
      if (this.$route.query.key || this.$route.query.key == "") {
        this.$router.push({ path: "/front/recruit/post/search" });
      }
      this.key = e;
      this.getSearchPost();
    },
    // 跳转广告
    onAD() {
      this.$router.push({ path: "/ad" });
    },
    scrollLoad() {
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if (nowScotop >= scrollHeight - wheight - 300 && this.postDataListLength / 10 === this.currentPage) {
        this.currentPage = this.currentPage + 1;
        this.getSearchPost();
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollLoad);
  },
};
</script>
<style lang="less" scoped>
@import "./post-search.less";
</style>
