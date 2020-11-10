<template>
  <div class="content">
    <navigation></navigation>
    <div class="special-module clearfix">
      <div class="special-detail">
        <div class="article-info">
          <img
            :src="detailData.cover_image | onImag"
          />
          <div class="block">
            <div
              class="text-blacks special-name"
              :class="length === 0 ? 'bg name-loading' : ''"
            >{{detailData.name}}</div>
            <div class="special-stics margin-t-10" :class="length === 0 ? 'bg stics-loading' : ''">
              <span
                v-if="length !== 0"
              >收录了{{detailData.aritcle_count}}篇文章 · {{detailData.follow_count}}人关注</span>
            </div>
          </div>
          <div class="button" v-if="length !== 0 ">
            <el-button 
              class="deliver margin-r-20"
              @click="onDelivery()" 
              :disabled="detailData.is_allow_deliver == -1 "
              v-if="detailData.from_uid !== userId">投稿</el-button>
            <el-button
              class="follow"
              :class="detailData.is_follow === 1 ? 'is-active': ''"
              @click="onFollow(detailData.is_follow,20, detailData.id)"
              :disabled="detailData.is_follow !== 0 "
              v-if="detailData.from_uid !== userId">
              <i class="el-icon-plus"></i>
              关注
            </el-button>
          </div>
          <div class="button" v-else>
            <el-button class="deliver-button-loading margin-r-20"></el-button>
            <el-button class="person-button-loading" ></el-button>
          </div>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">最新收录</el-menu-item>
          <el-menu-item index="2">最新评论</el-menu-item>
        </el-menu>
        <div class="article-content" v-if="activeIndex  == '1'">
          <div v-if="articleList[0] !== 0">
            <div class="article-list" v-for="(item,index) in articleList" :key="index">
              <articleItem :item="item" @details="onArticleDetails"></articleItem>
            </div>
          </div>
          <div class="margin-t-20" v-else>
            <Loading :id="1"></Loading>
          </div>
          <div class="no-data" v-if="articleList.length == 0">
            <img src="../../../assets/image/null.png" alt />
          </div>
        </div>
        <div class="article-content" v-else-if="activeIndex  == '2'">
          <div v-if="commentList[0] !==0">
            <div class="article-list" v-for="(item,index) in commentList" :key="index">
              <articleItem :item="item" @details="onArticleDetails"></articleItem>
            </div>
          </div>
          <div class="margin-t-20" v-else>
            <Loading :id="1"></Loading>
          </div>
          <div class="no-data" v-if="commentList.length == 0">
            <img src="../../../assets/image/null.png" alt />
          </div>
        </div>
      </div>
      <div class="special-info">
        <div class="content">
          <div class="title">专题信息</div>
          <div class="author-info">
            <img :src="detailData.avatar | onImag" alt />
            <div class="block">
              <div class="author-name" @click="onUserInfo">{{detailData.real_name}}</div>
              <div
                class="special-info-stics"
              >写了{{detailData.aritcle_count}}篇文章 · {{detailData.follow_count}}关注/赞</div>
            </div>
            <el-button
              v-show="detailData.from_uid !== userId"
              :class="detailData.is_follow_user === 1 ? 'is-active': ''"
              @click="onFollow(detailData.is_follow_user,10,detailData.from_uid)"
            >
              <i class="el-icon-plus"></i>
              关注
            </el-button>
          </div>
          <el-divider></el-divider>
          <div class="font-16 line-17 text-blacks margin-b-21">专题简介</div>
          <!-- <div class="special-text" v-html="detailData.desc"></div> -->
          <div class="special-text">{{detailData.desc}}</div>
        </div>
        <div class="share-block">
          <div class="tips">分享到</div>
          <el-popover placement="top" width="134" trigger="hover">
            <img src="../../../assets/image/footer_QR_code.png" alt />
            <i slot="reference" class="share-img iconfont icon-weibo" alt></i>
          </el-popover>
          <el-popover placement="top" width="128" trigger="hover">
            <img src="../../../assets/image/footer_QR_code.png" alt />
            <i slot="reference" class="share-img iconfont icon-gongzhonghao margin-b-1" alt />
          </el-popover>
        </div>
      </div>
      <div v-if="delivery">
        <delivery :delivery="delivery" @close="onClose" @delivery="onDeliverArticle"></delivery>
      </div>
    </div>
  </div>
</template>
<script>
import navigation from "./common/navigation";
import articleItem from "@/components/college/article-item";
import Delivery from "@/components/popup/delivery";
import Loading from "@/components/loading/loading";
import {
  deliverArticle,
  geUserArticleList,
  getColumnDetail,
  getColumnArticleList,
  addFollow,
  delFollow
} from "@/api/college";
export default {
  filters: {
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
      activeIndex: "1",
      articleList: [0],
      specialList: [0],
      userArticleList: [],
      delivery: false,
      key: "",
      column_id: null,
      detailData: {},
      page_size: 10,
      page: 1,
      length: 0,
      commentList: [],
      imgUrl: require("../../../assets/image/loading.png")
    };
  },
  components: {
    navigation,
    articleItem,
    Delivery,
    Loading
  },
   computed:{
    userId () {
      if (this.$store.state.app.userInfo) {
       return this.$store.state.app.userInfo.uid
      }
      return ''
    },
  },
  mounted() {
    // console.log("专题id");
    if (this.$route.query.id) {
      this.column_id = this.$route.query.id;
      this.get_column_detail();
      this.get_column_article_list();
    }
  },
  methods: {
    // 专题详情
    get_column_detail() {
      let that = this;
      getColumnDetail(that.column_id).then(res => {
        if (res.status == 200) {
          that.$set(that, "detailData", res.data);
          that.length = Object.keys(that.detailData).length;
          // console.log(res.data);
          // console.log("专题详情", JSON.stringify(that.detailData.desc));
        }
      });
    },
    // 投递文章
    onDeliverArticle(id) {
      var parameter = {
        column_id: this.column_id,
        article_id: parseInt(id)
      };
      deliverArticle(parameter)
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1000
            });
            this.delivery = false;
            this.get_column_article_list();
          } else {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1000
            });
          }
        })
        .catch(res => {
          // console.log(res);
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
        });
    },
    // 专题文章列表
    get_column_article_list() {
      var parameter = {
        column_id: this.column_id,
        page: this.page,
        page_size: this.page_size
      };
      getColumnArticleList(parameter).then(res => {
        // console.log("文章列表1111111", res);
        this.$set(this, "articleList", res.data);
      });
    },
    handleSelect(e) {
      // console.log("选择", e);
      this.activeIndex = e;
    },
    // 投稿
    onDelivery() {
      // this.key = this.detailData.name
      this.delivery = true;
    },
    onFollow(isFollow, type, id) {
      // console.log("点击了关注按钮");
      // console.log(id);
      let data = {
        type: type,
        business_id: parseInt(id)
      };
      if (isFollow === 1) {
        this.onDelFollow(data);
      } else {
        this.onAddFollow(data);
      }
    },
    onDelFollow(data) {
      delFollow(data)
        .then(res => {
          if (res.status === 200) {
            // console.log("请求成功");
            this.get_column_detail();
            // this.$message({
            //   message: res.msg,
            //   type: "success",
            //   showClose: true,
            //   offset: 60,
            //   duration: 3000
            // });
          } else {
            // this.$message({
            //   message: res.msg,
            //   type: "error",
            //   showClose: true,
            //   offset: 60,
            //   duration: 3000
            // });
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            offset: 60,
            duration: 3000
          });
        });
    },
    onAddFollow(data) {
      addFollow(data)
        .then(res => {
          if (res.status === 200) {
            // console.log("请求成功");
            this.get_column_detail();
            // this.$message({
            //   message: res.msg,
            //   type: "success",
            //   showClose: true,
            //   offset: 60,
            //   duration: 3000
            // });
          } else {
            // this.$message({
            //   message: res.msg,
            //   type: "error",
            //   showClose: true,
            //   offset: 60,
            //   duration: 3000
            // });
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            offset: 60,
            duration: 3000
          });
        });
    },
    onClose() {
      this.delivery = false;
    },
    onArticleDetails(e) {
      this.$router.push({
        path: "/front/college/articledetails",
        query: { id: e }
      });
    },
    onUserInfo() {
      this.$router.push({
        path: "/front/college/user/newest",
        query: { uid: this.detailData.from_uid }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./special-detail.less";
</style>