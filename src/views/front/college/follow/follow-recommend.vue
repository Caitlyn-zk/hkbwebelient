<template>
  <div class="special-detail">
    <div class="article-info padding-t-23 padding-b-15">
      <!-- <el-avatar shape="square" :size="80" :src="detailData.cover_image | onImag"></el-avatar> -->
      <img class="article-block-img"  v-if="loading" :src="detailData.cover_image | onImag">
      <img class="article-block-img bg"  :src="imgUrl" alt="" v-else>
      <div class="block">
        <p class="line-32 text-blacks special-name hk-cursor" v-if="loading" @click="onDetailSpecial(detailData.id)">{{detailData.name}}</p>
        <p class="line-32 text-blacks special-name hk-cursor bg name-loading" v-else></p>
        <p class="font-14 line-32 text-line special-stics" v-if="loading">收录了{{detailData.aritcle_count}}篇文章 · {{detailData.follow_count}}人关注</p>
        <p class="font-14 line-32 text-line special-stics bg margin-t-10 stics-loading" v-else></p>
      </div>
      <div class="button" v-if="loading">
        <el-button class=" margin-r-20" @click="onDelivery()">投稿</el-button>
        <el-button class="" @click="onUserDetail(detailData.from_uid)">个人首页 ></el-button>
      </div>
      <div class="button" v-else>
        <el-button class="deliver-button-loading margin-r-20"></el-button>
        <el-button class="person-button-loading" ></el-button>
      </div>
    </div>
    <!-- <div class="tabs-loading" v-else>
        <div></div>
        <div class="margin-l-20"></div>
    </div> -->
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="最新收录" name="concerns">
        <div v-if="specialList[0] !== 0">
          <div class="hk-my-answer-list padding-tb-22" v-for="(item,index) in specialList" :key="index">
            <articleItem :item="item" @details="onArticleDetails"></articleItem>
          </div>
        </div>
        <div class="margin-t-22" v-else>
          <Loading :id="1"></Loading>
        </div>
        <div class="no-data" v-if="specialList.length == 0">
          <img src="../../../../assets/image/null.png" alt="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="最新评论" name="fans">
        <div v-if="commentList[0] !== 0">
          <div class="hk-my-answer-list padding-tb-22" v-for="(item,index) in commentList" :key="index">
            <articleItem :item="item" @details="onArticleDetails"></articleItem>
          </div>
        </div>
        <div class="margin-t-22" v-else>
          <Loading :id="1"></Loading>
        </div>
        <div class="no-data" v-if="commentList.length == 0">
          <img src="../../../../assets/image/null.png" alt="">
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-if="delivery">
      <delivery :delivery="delivery" @close="onClose" @delivery="onDeliverArticle"></delivery>
    </div>
  </div>
</template>

<script>
import articleItem from "@/components/college/article-item";
import delivery from "@/components/popup/delivery";
import Loading from "@/components/loading/loading";
import {
  deliverArticle,
  getColumnArticleList,
  getColumnDetail,
} from "@/api/college";
export default {
  filters: {
    onImag(value) {
      let circleUrl =require("../../../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
    onAddTime (value) {
      var obj = utils.dateFormat(value*1000)
      return obj
    }
  },
  data() {
    return {
      activeIndex: "concerns",
      detailData: {},
      delivery: false,
      imgUrl: require("../../../../assets/image/loading.png"),
      column_id: 0,
      loading: false,
      page: 1,
      page_size: 10,
      specialList: [0],
      commentList: [0]
    };
  },
  created() {
    let that = this;
    if (that.$route.query.id) {
      that.column_id = parseInt(that.$route.query.id);
      this.get_column_detail()
      this.onArticleList()
    }
  },
  components: {
    articleItem,
    delivery,
    Loading
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    onArticleDetails(e) {
      this.$router.push({
        path: "/front/college/articledetails",
        query: { id: e }
      });
    },
    // 专题详情
    get_column_detail() {
      let that = this;
      getColumnDetail(that.column_id).then(res => {
        if (res.status == 200) {
          that.$set(that, "detailData", res.data);
          // console.log(res.data)
          if (Object.keys(that.detailData).length !== 0 && that.specialList[0] !== 0) {
            that.$set(that,'loading',true)
          }
        }
      });
    },
    onArticleList () {
      let that = this
      var parameter = {
          column_id: this.column_id,
          page: this.page,
          page_size: this.page_size
      }
      getColumnArticleList(parameter).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          that.specialList = res.data
          if (Object.keys(that.detailData).length !== 0 && that.specialList[0] !== 0) {
            that.$set(that,'loading',true)
          }
        }
      }).catch(res => {
        // console.log('请求报错')
      })
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
              offset: 60,
              duration: 1000
            });
            this.delivery = false;
            this.get_column_article_list();
          } else {
            this.$message({
              message: res.msg,
              type: "success",
              offset: 60,
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
            offset: 60,
            duration: 3000
          });
        });
    },
    // 投稿
    onDelivery() {
      // this.key = this.detailData.name
      this.delivery = true;
    },
    onClose() {
      this.delivery = false;
    },
    // 用户中心
    onUserDetail (uid) {
      this.$router.push({path: '/front/college/user', query: {uid: uid}})
    },
    // 专题详情
    onDetailSpecial (id) {
      this.$router.push({ path: "/front/college/specialdetails",query:{id: id}});
    }
  },
  watch: {
    $route: {
      handler (val, oldval) {
        let that = this;
        that.loading = false
        that.specialList = [0]
        that.detailData = {}
        // console.log('详情数据',Object.keys(that.detailData).length)
        if (val.query.id) {
          that.column_id = parseInt(val.query.id);
        }
        this.get_column_detail()
        this.onArticleList()
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "./follow-recommend.less";
</style>