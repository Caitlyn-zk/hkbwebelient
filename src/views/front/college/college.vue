<template>
  <div class>
    <div class="content college">
      <!-- 导航部分 -->
      <navigation></navigation>
      <div class="college-content margin-t-30">
        <div class="content-list">
          <ul class="hk-my-answer">
            <li
              class="hk-my-answer-list padding-b-15 margin-b-20"
              v-for="(item,index) in answerList"
              :key="index"
            >
              <articleItem :item="item" @details="onArticleDetails"></articleItem>
            </li>
            <li
              class="hk-my-answer-list padding-b-15 margin-b-20"
              style="margin-bottom: 20px;"
              v-show="loading"
            >
              <Loading :id="1"></Loading>
            </li>
          </ul>
          <div
            class="loading-tips line-40 text-line text-center"
            v-show="answerListLength / 10 !== page && loading === false"
          >已全部加载</div>
        </div>
        <div class="right-recommended">
          <div class="recommended-follow">
            <h3 class="margin-b-20 padding-l-5 recommended-main">作者推荐</h3>
            <div class="recommended-list">
              <div class="block clearfix margin-b-20" v-for="(item,index) in userList" :key="index">
                <el-button
                  type="text"
                  class="fr font-16 follow-but"
                  @click="onUserDetail(item.uid)"
                >
                  查看
                  <i class="el-icon-d-arrow-right"></i>
                </el-button>
                <el-avatar class="fl" :size="40" :src="item.avatar | onImag"></el-avatar>
                <div class="fl margin-l-10">
                  <h3 class="recommended-name title-nowrap">{{item.real_name}}</h3>
                  <span
                    class="text-line recommended-name-title title-nowrap"
                  >写了{{item.article_count}}篇文章 · {{item.like_count}}喜欢</span>
                </div>
              </div>
            </div>
            <div class="text-center recommended-button" v-show="userList.length > 0">
              <el-button @click="onRecommendAuthor">查看更多</el-button>
            </div>
          </div>
          <div class="recommended-topics">
            <h3 class="margin-b-20 padding-l-5 recommended-main">推荐专题</h3>
            <div class="recommended-list">
              <div
                class="block clearfix margin-b-20"
                v-for="(pops,index) in specialList"
                :key="index"
              >
                <el-button
                  type="text"
                  class="fr font-16 follow-but"
                  @click="onSpecialDetails(pops.id)"
                >
                  查看
                  <i class="el-icon-d-arrow-right"></i>
                </el-button>
                <el-avatar class="fl" shape="square" :size="40" :src="pops.cover_image | onImag"></el-avatar>
                <div class="fl margin-l-10">
                  <h3 class="recommended-name title-nowrap">{{pops.name}}</h3>
                  <span
                    class="text-line recommended-name-title title-nowrap"
                  >收录了{{pops.article_count}}篇文章 · {{pops.follow_count}}人关注</span>
                </div>
              </div>
            </div>
            <div class="text-center recommended-button" v-show="specialList.length > 0">
              <el-button @click="onRecommendSpecial">查看更多</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="loading flashing" v-if="loading">
      <div class="dot-collision"></div>
    </div>-->
    <!-- <div class="loading" v-show="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>-->
    <fontFooter v-show="answerListLength / 10 !== page && loading === false"></fontFooter>
  </div>
</template>

<script>
import {
  getCollegeRecomentList,
  geHomeRecomndColumnList,
  recommentUserList,
} from "@/api/college";
import navigation from "./common/navigation";
import articleItem from "@/components/college/article-item";
import utils from "@/utils/index.js";
import fontFooter from "@/components/fontfooter/fontfooter.vue";
import Loading from "@/components/loading/loading";
export default {
  filters: {
    // timestampToTime(timestamp) {
    //   var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //   let y = date.getFullYear();
    //   let MM = date.getMonth() + 1;
    //   MM = MM < 10 ? "0" + MM : MM;
    //   let d = date.getDate();
    //   d = d < 10 ? "0" + d : d;
    //   let h = date.getHours();
    //   h = h < 10 ? "0" + h : h;
    //   let m = date.getMinutes();
    //   m = m < 10 ? "0" + m : m;
    //   let s = date.getSeconds();
    //   s = s < 10 ? "0" + s : s;
    //   return y + "-" + MM + "-" + d;
    // }
    onImag(value) {
      let circleUrl = require("../../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
  },
  data() {
    return {
      imgUrl: "http://cdn.65ph.com/",
      answerList: [],
      answerListLength: 1,
      page: 1,
      specialList: [],
      page_size: 5,
      userList: [],
      userPage: 1,
      user_page_size: 5,
      onFetching: false,
      loading: true,
    };
  },
  created() {
    this.getComentList();
    this.getRecommentUserList();
    this.get_CollegeHomeColumnList();
  },
  components: {
    fontFooter,
    navigation,
    articleItem,
    Loading,
  },
  mounted() {
    document.addEventListener("scroll", this.scrollLoad);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollLoad);
  },
  methods: {
    getComentList() {
      let that = this;
      getCollegeRecomentList(this.page)
        .then((res) => {
          // console.log(res.data);
          if (res.status === 200) {
            if (this.page > 1) {
              this.$set(this, "answerList", this.answerList.concat(res.data));
              that.answerListLength = that.answerList.length;
            } else {
              that.answerList = res.data;
              that.answerListLength = that.answerList.length;
            }
          }
          that.loading = false;
        })
        .catch((res) => {
          that.loading = false;
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000,
          });
        });
    },
    get_CollegeHomeColumnList() {
      let parameter = {
        page: this.page,
        page_size: this.page_size,
      };
      geHomeRecomndColumnList(parameter).then((res) => {
        if (res.status == 200) {
          // console.log(res.data);
          this.$set(this, "specialList", res.data);
        }
      });
    },
    getRecommentUserList() {
      let parameter = {
        page: this.userPage,
        page_size: this.user_page_size,
      };
      recommentUserList(parameter)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data);
            // console.log("推荐用户");
            this.$set(this, "userList", res.data);
          }
        })
        .catch((res) => {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 1000,
            offset: 60,
          });
        });
      this.loadingUser = false;
    },

    // 跳转文章详情
    onArticleDetails(id) {
      this.$router.push({
        path: "/front/college/articledetails",
        query: { id: id },
      });
    },
    onRecommendAuthor() {
      this.$router.push({ path: "/front/college/recommend/author" });
    },
    onRecommendSpecial() {
      this.$router.push({ path: "/front/college/recommend/special" });
    },
    // 跳转专题详情
    onSpecialDetails(id) {
      this.$router.push({
        path: "/front/college/specialdetails",
        query: { id: id },
      });
    },
    // 跳转用户详情
    onUserDetail(uid) {
      this.$router.push({ path: "/front/college/user", query: { uid: uid } });
    },
    scrollLoad() {
      this.loading = true;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if (
        nowScotop >= scrollHeight - wheight &&
        this.answerListLength / 10 === this.page
      ) {
        this.onFetching = true;
        this.$set(this, "page", this.page + 1);
        this.getComentList();
        this.onFetching = false;
      } else if (this.answerListLength / 10 !== this.page) {
        this.loading = false;
      }
    },
    // 离开本页面销毁scrollLoad
    clear(path) {
      if (path != "/front/college/recommend") {
        document.removeEventListener("scroll", this.scrollLoad);
      } else {
        document.addEventListener("scroll", this.scrollLoad);
      }
    },
  },
  watch: {
    $route(to, from) {
      // console.log( to.path, from.path );
      this.clear(to.path);
      if (from.path==='/front/college/article/editor') {
        this.getComentList()
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./college.less";
</style>