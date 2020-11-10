<template>
  <div class="hk-recommended-list clearfix margin-b-20 padding-b-20">
    <el-button round class="fr font-16 follow-but margin-tb-11" v-if="item !== 0"
      :class="item.is_follow === 1 ? 'is-active': ''"
      @click="onFollow(isFollow, item.uid)">
      {{item.is_follow === 1 ? '已关注' : '+ 关注'}}
    </el-button>
    <el-button round class="fr font-16 follow-but margin-tb-11"
      :class="item === 0 ? 'no-data-button bg ': ''"
      v-else>
    </el-button>
    <el-avatar class="fl" :size="60" :src="item.avatar | onImag"></el-avatar>
    <div class="fl margin-l-10" style="min-width:200px">
      <h3 class="recommended-name title-nowrap line-32" :class="item === 0 ? 'bg title-loading margin-t-10': ''">{{item.real_name}}</h3>
      <span class="text-line recommended-name-title title-nowrap line-22" v-if="item !== 0">关注 {{item.follow_count}} · 粉丝{{item.like_count}} · 文章 {{item.article_count}}</span>
      <span class="text-line recommended-name-title title-nowrap" v-else :class="item === 0 ? 'bg animation margin-t-10 ': ''" style="height:10px"></span>
    </div>
  </div>
</template>

<script>
import { addFollow } from "@/api/college";
export default {
  props: {
    item: {}
  },
  filters: {
    onImag (value) {
       let circleUrl =require("../../assets/image/loading.png");
      if (value !== undefined && value !== '' && value !== null) {
        let imgUrl = 'http://cdn.65ph.com/' + value
        return imgUrl
      }else {
        return circleUrl
      }
      return circleUrl
    }
  },
  data () {
    return {
      isFollow: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    // 关注
    onFollow (isFollow,uid) {
       if (isFollow) {
        this.isFollow = false
      } else {
        this.isFollow = true
        this.$emit("onFollow", uid);
      }
      
    },
  }
}
</script>

<style lang="less" scoped>
@import './author.less';
</style>