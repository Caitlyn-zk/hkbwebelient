<template>
  <div class="special-detail">
    <div class="article-info padding-t-23 padding-b-15">
      <el-avatar :size="80" :src="detailData.avatar | onImag"></el-avatar>
      <div class="block">
        <p class="font-16 line-32 text-blacks special-name" v-if="detailData.real_name !== '0'" @click="onUserDetail(detailData.uid)">{{detailData.real_name}}</p>
        <p class="font-16 line-32 text-blacks special-name bg name-loading" v-else></p>
        <p class="font-14 line-32 text-line special-stics" v-if="detailData.real_name !== '0'">写了{{detailData.aritcle_count}}篇文章 · {{detailData.like_count}}赞</p>
        <p class="font-14 line-32 text-line special-stics bg margin-t-10 stics-loading" v-else></p>
      </div>
      <div class="button" v-if="detailData.real_name !== '0'">
        <el-button class="deliver" @click="onUserDetail(detailData.uid)">个人首页 ></el-button>
      </div>
      <div class="button" v-else>
        <el-button class="person-button-loading"></el-button>
      </div>
    </div>
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="最新发布" name="concerns">
        <div v-if="articleList[0] !== 0">
          <div class="hk-my-answer-list padding-tb-22" v-for="(item,index) in articleList" :key="index">
            <articleItem :item="item" @details="onArticleDetails"></articleItem>
          </div>
        </div>
        <div class="margin-t-22" v-else>
          <Loading :id="1"></Loading>
        </div>
        <div class="no-data" v-if="articleList.length == 0">
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
  </div>
</template>

<script>
import articleItem from "@/components/college/article-item";
import { getCollegeUserDetail,geUserArticleList } from "@/api/college";
import Loading from "@/components/loading/loading";
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
      detailData: {
        // avatar: "http://cdn.65ph.com/cert/202007071015245392893553.jpg",
        real_name: "0",
        aritcle_count: "123",
        like_count: "123"
      },
      uid: 0,
      articleList: [0],
      commentList: [0]
    };
  },
  created() {
    let that = this;
    if (that.$route.query.id) {
      that.uid = parseInt(that.$route.query.id);
    }
    // console.log(this.uid)
    this.userDetail()
    this.onArticleList()
  },
  components: {
    articleItem,
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
    userDetail () {
      let key = ''
      let that = this
      getCollegeUserDetail(that.uid).then(res => {
        if (res.status === 200) {
          // console.log('请求成功呢')
          that.detailData = res.data
          // console.log(res.data)
        }
      }).catch(res => {
        // console.log('请求报错')
      })
    },
    onArticleList () {
      let that = this
      let parameter = {
        key: '',
        from_uid: that.uid,
        page: 1,
        page_size: 10
      }
      geUserArticleList(parameter).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          that.articleList = res.data
        }
      }).catch(res => {
        // console.log('请求报错')
      })
    },
    // 跳转用户详情
    onUserDetail (uid) {
      this.$router.push({path: '/front/college/user', query: {uid: uid}})
    },
  },
  watch: {
    $route: {
      handler (val, oldval) {
        // console.log('路径')
        // console.log(val.query)
        let that = this;
        if (val.query.id) {
          that.uid = parseInt(val.query.id);
          this.userDetail()
          this.onArticleList()
        }
        
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "./follow-user.less";
</style>