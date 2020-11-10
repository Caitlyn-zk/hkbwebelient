<template>
  <div class="project-search">
    <div class="tiling project-number fl">
      <div class>项目（500+）</div>
      <div class>公司（80+）</div>
    </div>
    <div class="search-module fr">
      <el-input
        placeholder="请输入想要的内容搜索"
        v-model="key"
        @keyup.enter.native="onSearchEnterFun"
        class="search-input"
        :class="activeName !== 'investmentPro' ?'border-left':''"
      >
        <el-cascader
          v-if="activeName == 'investmentPro'"
          slot="prepend"
          placeholder="项目类型"
          v-model="proSelect"
          :options="proCate"
          :props="proData"
          @change="onTypeSelect"
          clearable
        ></el-cascader>
        <el-button slot="append" @click="onSearch" class="hk-search-button">搜索</el-button>
      </el-input>
    </div>
    <div class="tiling search-rec fl">
      <div class="search-rec-title">相关搜索：</div>
      <div
        class="search-rec-option"
        v-for="(item,index) in recommendData"
        :key="index"
        @click="onRecommend(item)"
      >{{item}}</div>
    </div>
    <div class="ad" @click="onAdImg">
      <img
        title="点击隐藏图片"
        class="ad-img"
        src="../../../assets/image/project-search.png"
        @click="onAD"
      />
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="招商项目" name="investmentPro"></el-tab-pane>
        <el-tab-pane label="项目环评" name="proEia"></el-tab-pane>
      </el-tabs>
      <div class="tiling">
        <div class="content-left">
          <div v-if="activeName == 'investmentPro'">
            <div class="select-list">
              <div class="tiling info">
                <div class="title">城市</div>
                <div class="tiling city-option">
                  <div class="hk-option">
                    <!-- 筛选城市 -->
                    <citySelect @onCity="onCity"></citySelect>
                  </div>
                </div>
              </div>

              <div class="tiling info">
                <div class="title">金额</div>
                <div
                  v-for="(item,index) in fundRang"
                  :key="index"
                  class="option"
                  @click="onamountOfMoney(index,item)"
                  :class="index === fundRangId ? 'selection-color':''"
                >{{item.label}}</div>
              </div>
            </div>
            <div class="tiling screen">
              <div class="sort-content">
                <div class="sort-order">
                  <div class="sort-order-title">排序</div>
                  <img
                    class="sort-order-icon"
                    @click="onDownArray"
                    src="../../../assets/image/down-icon.png"
                  />
                  <img
                    class="sort-order-icon"
                    @click="onUpwardArray"
                    src="../../../assets/image/upward-icon.png"
                  />
                </div>
                <div class="screen-type">
                  <div class="screen-type-option" v-for="(item,index) in sortTypeData" :key="index">
                    <div
                      @click="onTypeSort(index)"
                      :class="index === sorttypeId ? 'selectSortType':''"
                    >{{item}}</div>
                  </div>
                </div>
                <div class="paging">
                  <div class="project-sum">
                    共
                    <span class="sum">{{total_count}}</span>个项目
                  </div>
                </div>
              </div>
            </div>
            <div class="project-list" v-for="(item,index) in projectList" :key="index">
              <ProjectItem :item="item" @details="onProjectDetails"></ProjectItem>
            </div>
            <div class="no-data" v-if="projectList.length <= 0 && !isloading">
              <img src="@/assets/image/no-data.png" alt />
            </div>
            <div class="text-center text-line font-12" v-else-if="projectListLength !== 0 && !isloading">没有更多数据了</div>
          </div>
          <div v-if="activeName == 'proEia'">
            <div class="select-list">
              <div class="tiling info">
                <div class="title">城市</div>
                <div class="tiling city-option">
                  <div class="hk-option">
                    <!-- 筛选城市 -->
                    <citySelectNotice @onCity="onCity"></citySelectNotice>
                  </div>
                </div>
              </div>
              <div class="tiling info">
                <div class="title">环评类型</div>
                <div
                  v-for="(item,index) in publiciTypelist"
                  :key="index"
                  class="option"
                  @click="onNoticeType(index,item.typeid)"
                  :class="index === typeId ? 'selection-color':''"
                >{{item.name}}</div>
              </div>
            </div>
            <div class="tiling screen">
              <div class="sort-content">
                <div class="sort-order">
                  <div class="sort-order-title">排序</div>
                  <img
                    class="sort-order-icon"
                    @click="onDownArray"
                    src="../../../assets/image/down-icon.png"
                  />
                  <img
                    class="sort-order-icon"
                    @click="onUpwardArray"
                    src="../../../assets/image/upward-icon.png"
                  />
                </div>
                <div class="screen-type">
                  <div class="screen-type-option" v-for="(item,index) in sortTypeData" :key="index">
                    <div
                      @click="onTypeSort(index)"
                      :class="index === sorttypeId ? 'selectSortType':''"
                      v-if="index != 1 && activeName !== 'investmentPro'"
                    >{{item}}</div>
                  </div>
                </div>
                <div class="paging">
                  <div class="project-sum">
                    共
                    <span class="sum">{{not_total_count}}</span>个项目
                  </div>
                </div>
              </div>
            </div>
            <div class="project-list" v-for="(item,index) in projectNoticeList" :key="index">
              <NoticeItem :item="item" @details="onProjectNoticeDetails"></NoticeItem>
            </div>
            <div class="no-data" v-if="projectNoticeList.length <= 0 && !isloading">
              <img src="@/assets/image/no-data.png" alt />
            </div>
          </div>
          <div class="bg-white padding-20" v-if="isloading">
            <Loading :id="1" ></Loading>
          </div>
          <div class="text-center text-line font-12" v-else-if="projectNoticeListLength !== 0 && !isloading">没有更多数据了</div>
        </div>
        <div class="content-right">
          <div class="recently-browse" v-if="proVistRecords.length !==0">
            <div class="recently-browse-title">最近浏览</div>
            <ul class="browse-history-bar">
              <li
                v-for="(item,index) in proVistRecords"
                :key="index"
                class="browse-history"
                @click="onRecentDetails(item.pro_id)"
              >
                <div class="title-nowrap recently-browse-project-name">{{item.pro_name}}</div>
                <div
                  class="recently-browse-amount-of-money title-nowrap"
                >{{item.fundRangValue | onFundRang}}</div>
                <div class="title-nowrap line-26">
                  <span
                    class="recently-browse-project-orgname text-line font-12 title-nowrap"
                  >{{item.org_name}}</span>
                  <span
                    class="text-blacks font-12 margin-l-10 recently-browse-project-address title-nowrap text-r"
                  >{{item.area1_name}}</span>
                </div>
              </li>
            </ul>
          </div>
          <img
            class="content-right-ad"
            src="../../../assets/image/source-of-water.png"
            @click="onAD"
          />
          <div class="sweep-code">
            <div class="official-account-muster">
              <img src="../../../assets/image/footer_QR_code.png" />
              <div class="sweep-code-tips">扫描关注公众号</div>
            </div>
            <div class="small-program-muster">
              <img src="../../../assets/image/footer_QR_code.png" />
              <div class="sweep-code-tips">扫描下载App</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getProjectProSearchList,
  getProjectNoticeList,
  getProjectCateTree,
} from "@/api/project";
import utils from "@/utils/index.js";
import { formatDate } from "@/utils/formatDate.js";
import { regionData } from "element-china-area-data";
import { fundRang } from "@/config/constant";
import citySelect from "@/components/common/province.vue";
import citySelectNotice from "@/components/common/province.vue";
import ProjectItem from "@/components/project/project-item";
import NoticeItem from "@/components/project/notice-item";
import { mapMutations, mapGetters } from "vuex";
import cookie from "@/utils/store/cookie";
import Loading from "@/components/loading/loading";
export default {
  filters: {
    onFundRang(value) {
      var obj = utils.findObj(fundRang, value);
      return obj.label;
    },
  },
  data() {
    const { key = "", id = 0, project_id = 0, type = 0 } = this.$route.query;
    return {
      activeName: "investmentPro",
      projectList: [],
      proData: {
        value: "id",
        label: "cate_name",
        children: "children",
      },
      proCate: [],
      projectNoticeList: [],
      key: key,
      history_id: 0,
      type: type,
      adDisplay: true,
      id: id,
      sorttypeId: 0,
      currentPage: 1,
      page: 0,
      total_count: 0,
      total_page: 0,
      fieldId: 0,
      typeId: 0,
      cate_id: project_id,
      noticeTypeId: 0,
      cityId: 0,
      area1: 0,
      provinceId: 0,
      fundRangId: 0,
      sortTypeData: ["默认", "价格"],
      field: ["不限", "污水", "大气", "噪音", "土壤", "生态"],
      // 最近浏览数据
      proVistRecords: [],
      isShow: true,
      city: [],
      proSelect: [],
      proClass: null,
      province: regionData,
      fundRangValue: null,
      fundRang: fundRang,
      recommendData: [
        "饮用水工程",
        "生态环境工程",
        "项目环评",
        "项目竣工验收",
        "环境监测",
      ],
      onFetching: false,
      projectNoticeListLength: 0,
      projectListLength: 0,
      // 环评项目
      publiciTypelist: [
        { typeid: 0, name: "不限" },
        { typeid: 1, name: "环评公示" },
        { typeid: 2, name: "验收公示" },
      ],
      notCurrentPage: 1,
      notPage: 0,
      not_total_count: 0,
      not_total_page: 0,
      isloading: true,
    };
  },
  created() {
    this.$set(this, "proSelect", [this.id, this.cate_id]);
    if (this.type == 1) {
      this.activeName = "proEia";
      this.get_project_notice_list();
    }
    this.getProjectList();
    this.projectCateTree();
    //初始化职位访问记录
    this.INIT_PRO_RECORD();
    // console.log(cookie.get('proVisitRecord'))
  },
  mounted() {
    // 获取最近浏览条数，截取前4条展示
    let arr = this.proVistRecord;
    if (arr.length > 5) {
      arr = arr.slice(0, 5);
    }
    this.proVistRecords = arr;
    document.addEventListener("scroll", this.scrollLoad);
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
      proVistRecord: "proVistRecord",
    }),
  },
  components: {
    citySelect,
    citySelectNotice,
    ProjectItem,
    NoticeItem,
    Loading
  },
  methods: {
    ...mapMutations(["INIT_PRO_RECORD", "ADD_PRO_RECORD"]),
    // 项目类型
    projectCateTree() {
      let that = this;
      getProjectCateTree().then((res) => {
        that.$set(that, "proCate", res.data);
      });
    },
    // 招商项目
    getProjectList() {
      var parameter = {
        key: this.key,
        area1: this.area1,
        cate_id: this.cate_id,
        fund_rang: this.fundRangValue == null ? 0 : this.fundRangValue,
        page: this.page,
      };
      this.isloading = true;
      // console.log(parameter)
      getProjectProSearchList(parameter)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              this.$set(
                this,
                "projectList",
                this.projectList.concat(res.data[0].data_list)
              );
              this.$set(this, "total_count", res.data[0].total_count);
              this.total_page = Math.ceil(this.total_count / 10);
              this.projectListLength = this.projectList.length / 10 -1;
            }
          }
          this.isloading = false;
        })
        .catch((res) => {
          this.isloading = false;
        });
    },
    // 项目环评
    get_project_notice_list() {
      var parameter = {
        key: this.key,
        area1: this.area1,
        type: this.noticeTypeId,
        page: this.notPage,
      };
      let that = this;
      this.isloading = true;
      getProjectNoticeList(parameter)
        .then((res) => {
          if (res.status === 200) {
            if (this.type !== 1) {
              this.$router.push({
                path: "/front/project/search",
                query: { key: this.key },
              });
            }
            this.$set(
              this,
              "projectNoticeList",
              this.projectNoticeList.concat(res.data.data_list)
            );
            this.$set(this, "not_total_count", res.data.total_count);
            this.not_total_page = Math.ceil(this.not_total_count / 10);
            this.projectNoticeListLength = this.projectNoticeList.length / 10;
          }
          this.isloading = false;
        })
        .catch((res) => {
          this.isloading = false;
        });
    },
    // 选择招商项目或环评项目
    handleClick(value) {
      this.currentPage = 1;
      this.page = 0;
      this.total_count = 0;
      this.total_page = 0;
      this.not_total_page = 0;
      this.typeId = 0;
      this.key = "";
      this.area1 = 0;
      this.cate_id = 0;
      this.fundRangValue = "";
      this.fundRangId = 0;
      this.$router.push({ path: "/front/project/search" });
      if (value.name == "investmentPro") {
        this.page = 1;
        this.getProjectList();
        this.proSelect = [];
      } else {
        this.notPage = 1;
        this.get_project_notice_list();
      }
      // console.log('职位tab')
      // console.log('职位tab',value.name)
    },
    // 广告图片
    onAdImg() {
      // this.adDisplay = false
    },
    // 搜索按钮
    onSearch() {
      if (this.$route.query.key || this.$route.query.key == "") {
        this.$router.push({ path: "/front/project/search" });
      }
      this.currentPage = 1;
      this.page = 0;
      if (this.activeName === "investmentPro") {
        this.getProjectList();
      } else {
        this.get_project_notice_list();
      }
    },
    // 回车键搜索
    onSearchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        if (this.$route.query.key || this.$route.query.key == "") {
          this.$router.push({ path: "/front/project/search" });
        }
        this.currentPage = 1;
        this.page = 0;
        if (this.activeName === "investmentPro") {
          this.getProjectList();
        } else {
          this.get_project_notice_list();
        }
      }
    },
    // 选择领域
    onField(index, e) {
      this.currentPage = 1;
      this.page = 0;
      this.fieldId = index;
    },
    // 项目类型
    onNoticeType(index, id) {
      this.currentPage = 1;
      this.page = 0;
      this.typeId = index;
      this.noticeTypeId = id;
      this.get_project_notice_list();
    },

    // 选择城市index, value
    onCity(area, code) {
      this.currentPage = 1;
      this.page = 0;
      this.area1 = code;
      // console.log('城市', area,code)
      if (this.activeName === "investmentPro") {
        this.getProjectList();
      } else {
      }
    },
    // 选择金额
    onamountOfMoney(index, e) {
      this.currentPage = 1;
      this.page = 0;
      this.fundRangId = index;
      // console.log('金额', e.value)
      this.fundRangValue = e.value;
      this.getProjectList();
    },
    // 查看项目详情
    onProjectDetails(val) {
      // console.log(val)
      this.ADD_PRO_RECORD({
        pro_id: val.proid,
        org_name: val.org_name,
        pro_name: val.name,
        fundRangValue: val.fund_rang,
        area1_name: val.area1_name,
      });
      this.$router.push({
        path: "/front/project/detail",
        query: { proid: val.proid },
      });
    },
    onProjectNoticeDetails(val) {
      this.$router.push({
        path: "/front/project/noticedetail",
        query: { id: val.id },
      });
    },
    onTypeSort(e) {
      if (this.activeName == "investmentPro") {
        if (e == 0) {
          this.getProjectList();
        } else {
          // this.projectList

          this.projectList = this.projectList.sort(
            (pre, cur) => pre.fund_rang - cur.fund_rang
          );
        }
      }
      // console.log(e)
      this.sorttypeId = e;
    },
    // 点击最近浏览项目名称，跳转项目详情
    onRecentDetails(id) {
      this.$router.push({
        path: "/front/project/detail",
        query: { proid: id },
      });
    },
    onUpwardArray() {
      // console.log('升序排列')
    },
    onDownArray() {
      // console.log('降序排列')
    },
    onRecommend(e) {
      if (this.$route.query.key || this.$route.query.key == "") {
        this.$router.push({ path: "/front/project/search" });
      }
      this.key = e;
      if (this.activeName == "investmentPro") {
        this.getProjectList();
      } else {
        this.get_project_notice_list();
      }
    },
    // 搜索 项目类型选择
    onTypeSelect(val) {
      if (this.$route.query.project_id || this.$route.query.key) {
        this.$router.push({ path: "/front/project/search" });
      }
      // console.log('项目类型id',val[1])
      if (val[1]) {
        this.cate_id = val[1];
      } else {
        this.cate_id = null;
      }
      this.getProjectList();
    },
    // 跳转广告
    onAD() {
      this.$router.push({ path: "/ad" });
    },
    scrollLoad() {
      let that = this
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if ( nowScotop >= scrollHeight - wheight - 300 && that.projectListLength === that.page  && that.activeName === "investmentPro") {
        // this.isloading = true;
        that.page = that.page + 1;
        that.getProjectList();
      }
      if ( nowScotop >= scrollHeight - wheight - 300 && that.projectNoticeListLength === that.notPage && that.activeName !== "investmentPro") {
        that.notPage = that.notPage + 1;
        that.get_project_notice_list();
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollLoad);
  },
};
</script>
<style lang="less" scoped>
@import "./project-search.less";
</style>
