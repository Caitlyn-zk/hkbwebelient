<template>
  <div class="clearfix hk-main-item hk-cursor" @click="onDetails(item.id)">
    <div class="title">
      <h3 class="margin-b-15 answer-title title-nowrap hk-cursor">{{item.tittle}}</h3>
    </div>
    <div class="clearfix answer-list-bar">
      <div class="hk-answer-cont">
        <p class="margin-b-34 p-content">
          <span class="hk-introduce">{{item.brief | onEllipsis}}</span>
        </p>
        <div class="hk-button-college">
          <el-button type="text" class="hk-btn-text">
            <img  style="vertical-align: -5px;" src="../../assets/image/icon/pinglun.png" />
            <span>评论 {{item.comment_count}}</span>
          </el-button>
          <!-- <el-button type="text" class="hk-btn-text" :class="item === 0 ? 'bg' : ''">
            <i v-show="item !== 0" class="el-icon-star-off font-16"></i>
            <span>{{item !== 0 ? '收藏': ''}} </span>
          </el-button> -->
          <el-button type="text" class="hk-btn-text" >
            <i  class="iconfont icon-good font-16"></i>
            <span>赞 {{item.like_count}}</span>
          </el-button>
        </div>
      </div>
      <div class="hk-icon-img margin-l-30" v-show="item.cover_image !== null">
        <img width="125" height="100"  :src="item.cover_image" alt />
      </div>
    </div>
  </div>
  <!-- <Loading :id="1" v-else></Loading> --> 
</template>
<script>
import Loading from "@/components/loading/loading";
export default {
  filters: {
    onImag(value) {
      let circleUrl =require("../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
    onEllipsis (value) {
      if (!value) return ''
      if (value.length > 99) {
        return value.slice(0,100) + '...'
      }
      return value
    }
  },
  data() {
    return {};
  },
  props: { item: {} },
  components:{Loading},
  methods: {
    onDetails(id) {
      this.$emit("details", id);
    }
  }
  
};
</script>
<style lang="less" scoped>
@import "./article-item.less";
</style>