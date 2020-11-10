<template>
  <div
    class="hk-recommended-list clearfix padding-b-26" >
    <el-button round class="fr font-16 follow-but margin-tb-11"
      v-if="item !== 0" @click="onFollow(item.id)"
      :class="item.is_follow === 1 ? 'is-active' : ''">{{item.is_follow === 1 ? '已关注' : '+ 关注'}}</el-button>
    <el-button round class="fr font-16 follow-but margin-tb-11" v-else :class="item === 0 ? 'no-data-button bg' : ''"></el-button>
    <el-avatar class="fl" shape="square" :size="60" :src="item.cover_image | onImag"></el-avatar>
    <div class="fl margin-l-10 focus-main-list">
      <h3 class="recommended-name title-nowrap line-32" :class="item === 0 ? 'bg title-loading margin-t-10': ''">{{item.name}}</h3>
      <span class="text-line recommended-name-title title-nowrap line-22" v-if="item !== 0">收录了{{item.article_count}}篇文章 · {{item.follow_count}}人关注</span>
      <span class="text-line recommended-name-title title-nowrap line-22" v-else :class="item === 0 ? 'bg margin-t-5' : ''" style="height:10px"></span>
    </div>
  </div>
</template>

<script>
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
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    }
  },
  methods: {
    onFollow(id) {
      this.$emit("topicsFollow", id);
    }
  }
};
</script>

<style lang="less" scoped>
@import './focus-topics.less';
</style>