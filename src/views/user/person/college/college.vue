<template>
  <div class="hk-college">
    <div class="hk-college-person-info">
        <img src="../../../../assets/image/user_img.png" alt="">
        <div class="info-muster">
          <div class="name">Katelinna</div>
          <div class="tiling">
            <div class="stics">
              <div class="number">927</div>
              <div class="name">关注<i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="stics">
              <div class="number">4987</div>
              <div class="name">粉丝<i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="stics">
              <div class="number">227</div>
              <div class="name" @click="onCollection">收藏<i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="stics">
              <div class="number">7847</div>
              <div class="name">赞<i class="el-icon-arrow-right"></i></div>
            </div>
          </div>
        </div>
        <div class="button">
            <el-button class="create-special" @click="onCreateSpecial">创建专题</el-button>
            <el-button class="write-article" @click="onWriteArticle">写文章</el-button>
        </div>
    </div>
    <!-- 内容部分 -->
    <div class="clearfix hk-college-content">
      <div class="hk-college-content-left fl">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      imgUrl:'../../../assets/image/user_img.png'
    };
  },
  components: {
    
  },
  mounted () {
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    onCollection(){
      this.$router.push({path:'/user/person/my/college/collection'})
    },
    onWriteArticle(){
      this.$router.push({path: "/front/college/article/editor"});
    },
    onCreateSpecial(){
      this.$router.push({ path: "/front/college/createspecial"});
    },
  }
}
</script>

<style lang="less" scoped>
@import './college.less';
</style>