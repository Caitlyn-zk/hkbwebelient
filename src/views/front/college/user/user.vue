<template>
  <div class="content">
    <navigation></navigation>
    <div class="special-module clearfix">
      <div class="special-detail padding-20 margin-r-22">
        <div class="article-info">
          <el-avatar class="fl" :size="80" :src="userData.avatar | onImag"></el-avatar>
          <div class="block">
            <h3 class="font-20 text-blacks special-name padding-b-10">{{userData.real_name}}</h3>
            <ul class="special-stics padding-t-1">
              <li class="user-meun-item hk-cursor" @click="myConcerns(userData.uid)">
                <p class="statistics">{{userData.user_follow_count}}</p>
                <span class="user-item">关注></span>
              </li>
              <li class="user-meun-item hk-cursor" @click="myFans(userData.uid)">
                <p class="statistics">{{userData.follow_count}}</p>
                <span class="user-item">粉丝></span>
              </li>
              <li class="user-meun-item hk-cursor" @click="myArticle(userData.uid)">
                <p class="statistics">{{userData.aritcle_count}}</p>
                <span class="user-item">文章></span>
              </li>
              <li class="user-meun-item hk-cursor" @click="myFabulous(userData.uid)">
                <p class="statistics">{{userData.like_count}}</p>
                <span class="user-item">赞</span>
              </li>
            </ul>
          </div>
          <div class="button">
            <el-button
                v-show="userData.uid !== userId"
                :class="userData.is_follow === 1 ? 'is-active': ''"
                @click="onFollow(userData.is_follow,userData.uid)">
                {{userData.is_follow === 1 ? '已关注' : '+ 关注'}}
            </el-button>
          </div>
        </div>
        <!-- 最新 -->
        <router-view></router-view>
      </div>
      <div class="right-recommended">
        <!-- <div class="recommended-topics">
          <h3 class="margin-b-20 padding-l-5 recommended-main">他关注的专题</h3>
          <div class="recommended-list padding-l-8">
            <div class="block clearfix margin-b-20" v-for="(item,index) in 5" :key="index">
              <el-avatar class="fl" shape="square" :size="40" :src="squareUrl"></el-avatar>
              <div class="fl margin-l-10">
                <h3 class="recommended-name title-nowrap">成为优秀的环评工程师</h3>
                <span class="text-line recommended-name-title title-nowrap">收录了270篇文章 · 322人关注</span>
              </div>
            </div>
          </div>
          <div class="text-center recommended-button">
            <el-button @click="onFocusTopics(userData.uid)">查看更多</el-button>
          </div>
        </div> -->
        <div class="recommended-topics">
          <h3 class="margin-b-12 padding-l-5 recommended-main">个人介绍</h3>
          <p class="personal-profile line-30 padding-l-8">
            我不是环评师，我是环评技术人员。生
            活在环评食物链的最低端，工作中遇的
            所有人都是我的甲方，领导敦促趁年轻
            多干活，业主催着要报告。
          </p>
        </div>
        <div class="recommended-topics">
          <h3 class="margin-b-20 padding-l-5 recommended-main">他创建的专题</h3>
          <div class="recommended-list padding-l-10">
            <div class="block clearfix margin-b-20" v-for="(item,index) in userData.column_list" :key="index">
              <el-avatar class="fl" shape="square" :size="40" :src="item.cover_image | onImag"></el-avatar>
              <div class="fl margin-l-10">
                <h3 class="recommended-name title-nowrap" @click="onArticleDetails(item.id)">{{item.name}}</h3>
                <span class="text-line recommended-name-title title-nowrap">收录了270篇文章 · 322人关注</span>
              </div>
            </div>
          </div>
          <div class="text-center recommended-button">
            <el-button @click="myArticle(userData.uid)">查看更多</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navigation from "../common/navigation";
import { getCollegeUserDetail,addFollow,delFollow } from "@/api/college";

export default {
  filters: {
    onImag(value) {
      let circleUrl = require("../../../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    }
  },
  data() {
    return {
      uid: 0,
      userData: {},
     
      // columnList: [],
    };
  },
  created () {
    let that = this;
    if (that.$route.query.uid) {
      that.uid = parseInt(that.$route.query.uid);
    }
    this.userDetail()
  },
  components: {
    navigation,
    // articleItem
  },
   computed:{
    userId () {
      if (this.$store.state.app.userInfo) {
       return this.$store.state.app.userInfo.uid
      }
      return ''
    },
  },
  methods: {
    handleSelect(e) {
      // console.log("选择", e);
      this.activeIndex = e;
    },
    
    userDetail () {
      let key = ''
      let that = this
      getCollegeUserDetail(that.uid).then(res => {
        if (res.status === 200) {
          // console.log('请求成功呢')
          that.userData = res.data
          // console.log(res.data)
        }
      }).catch(res => {
        // console.log('请求报错')
      })
    },
    // 用户关注统计
    myConcerns (uid) {
      // console.log(uid)
      this.$router.push({path:'/front/college/user/followOrfans',query: {name: 'concerns',uid: uid}})
    },
    // 用户粉丝
    myFans (uid) {
      this.$router.push({path:'/front/college/user/followOrfans',query: {name: 'fans',uid: uid}})
    },
    // 用户文章
    myArticle (uid) {
      this.$router.push({path:'/front/college/user/newest',query: {uid: uid}})
      // console.log('文章列表')
    },
    myFabulous () {
      // console.log('赞')
    },
    // 关注按钮
    // 关注
    onFollow (isFollow,uid) {
      let data ={
        type: 10,
        business_id: uid
      }
      if (isFollow === 1) {
        this.onDelFollow(data)
      } else {
        this.onAddFollow(data)
      }
      
    },
    onAddFollow (data) {
      addFollow(data).then(res => {
        if (res.status === 200) {
          // console.log('请求成功')
          this.userDetail()
        }
      }).catch(res => {
        this.$message({
          message: res.message,
          type: 'error',
          duration: 1000,
          offset: 60,
        })
      })
    },
    // 取消关注
    onDelFollow(data) {
      delFollow(data)
        .then(res => {
          if (res.status === 200) {
            this.userDetail()
            this.$message({
              message: res.msg,
              type: "success",
              showClose: true,
              offset: 60,
              duration: 3000
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              showClose: true,
              offset: 60,
              duration: 3000
            });
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
    // 跳转文章详情
    onArticleDetails (id) {
      this.$router.push({path: '/front/college/articledetails', query: {id: id}})
    },
  }
};
</script>
<style lang="less" scoped>
@import "./user.less";
</style>