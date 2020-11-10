<template>
  <div class="hk-menu">
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="最新发布" name="first">
        <div v-if="specialList[0] !== 0">
          <div class="special-list" v-for="(item,index) in specialList" :key="index">
            <articleItem :item="item" @details="onArticleDetails"></articleItem>
          </div>
        </div>
        <div class="margin-t-22" v-else >
          <Loading :id="1"></Loading>
        </div>
        <div class="no-data" v-if="specialList.length == 0">
          <img src="../../../../assets/image/null.png" alt="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="最新评论" name="second">
        <div v-if="commentList[0] !==0">
          <div class="special-list" v-for="(item,index) in commentList" :key="index">
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
import Loading from "@/components/loading/loading";
import { geUserArticleList } from "@/api/college";
export default {
  data () {
    return {
      activeIndex: 'first',
      specialList: [0],
      uid: 0,
      commentList: [0],
    }
  },
  created () {
    let that = this;
    // console.log('用户id')
    // console.log(that.$route.query.uid)
    if (that.$route.query.uid) {
      that.uid = parseInt(that.$route.query.uid);
    }
    this.articleList()
  },
  components: {
    // navigation,
    Loading,
    articleItem
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 跳转文章详情
    onArticleDetails(id) {
      this.$router.push({
        path: "/front/college/articledetails",
        query: { id: id }
      });
    },
    articleList () {
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
          that.specialList = res.data
        }
      }).catch(res => {
        // console.log('请求报错')
      })
    },
  }
}
</script>

<style lang="less" scoped>
@import './newest.less';
</style>