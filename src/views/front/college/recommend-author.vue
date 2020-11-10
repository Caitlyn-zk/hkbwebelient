<template>
  <div class="content recommend-author">
    <navigation></navigation>
    <div class="title">推荐作者</div>
    <div class="clearfix">
      <ul  class="author-content fl">
        <li  v-for="(item,index) in authorList" :key="index" class="author-list">
          <div class="author-info">
            <img :src="item.avatar | onImag" class="margin-b-16" :class="item === 0 ? 'bg' : ''" />
            <div class="author-name margin-b-8" :class="item === 0 ? 'bg' : ''">{{item.real_name}}</div>
            <div class="author-stics margin-b-14" :class="item === 0 ? 'bg' : ''"><span v-if="item !== 0">写了{{item.article_count}}篇文章 · {{item.like_count}}k赞</span></div>
            <el-button v-if="item !== 0" @click="onFollow(item.uid)">
              <i class="el-icon-plus"></i>
              关注
            </el-button>
            <el-button v-else class="no-data-button"></el-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="text-center">
        <el-button 
          type="text" 
          @click="onNextPage" 
          v-if="authorList.length == page_size "
        >
          <i class="el-icon-refresh-right"></i>
          <span>换一批</span>
        </el-button>
    </div>
  </div>
</template>
<script>
import navigation from "./common/navigation";
import { recommentUserList,addFollow } from "@/api/college";
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
      authorList: [0,0,0,0,0],
      page: 1,
      page_size: 15
    };
  },
  created () {
      this.getRecommentUserList()
  },
  components: {
    navigation
  },
  methods: {
    onNextPage(){

    },
    getRecommentUserList() {
      let parameter = {
        page: this.page,
        page_size: this.page_size
      };
      recommentUserList(parameter)
        .then(res => {
          if (res.status === 200) {
            // console.log(res.data);
            // console.log("推荐用户");
            this.$set(this, "authorList", res.data);
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "error",
            duration: 1000,
            offset: 60
          });
        });
      this.loadingUser = false;
    },
    onFollow(uid) {
      let data = {
        type: 10,
        business_id: uid
      };
      addFollow(data)
        .then(res => {
          if (res.status === 200) {
            this.getRecommentUserList()
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            duration: 1000,
            offset: 60
          });
        });
    },
  }
};
</script>
<style lang="less" scoped>
@import "./recommend-author.less";
</style>