<template>
  <div class="home-page">
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
        >
        <el-menu-item index="1">
            我的文章
        </el-menu-item>
        <el-menu-item index="2">
            我的专题
        </el-menu-item>
    </el-menu>
    <div class="el-menu-pane">
      <div class="content" v-if="activeIndex  == '1'">
        <div class="no-data" v-if="articleData.length == 0">
          <img src="../../../../assets/image/null.png" alt="">
        </div>
        <div v-if="articleData[0] !== 0">
          <div class="article-list" v-for="(item,index) in articleData" :key="index">
            <articleItem :item="item" @details="onArticleDetails" ></articleItem>
          </div>
        </div>
        <div class="margin-t-20" v-if="articleData[0] == 0">
          <Loading :id="1" ></Loading>
        </div>
      </div>
      <div class="content" v-else>
        <!-- <div class="no-data" v-if="specialData.length == 0">
          <img src="../../../../assets/image/null.png" alt="">
        </div> -->
        <div class="special-list" v-for="(item,index) in 4" :key="index" :class="index !== 4-1 ? 'border-bottom': '' ">
            <img src="../../../../assets/image/special.jpg" alt="">
            <div class="special-info">
              <div class="special-name">成为优秀的环评报告师</div>
              <div class="special-stics">收录了 91927 篇文章 · 2902984 人关注</div>
              <div class="special-text">每周五我们在简书会议室放电影，欢迎将与电影有关的文章投稿到此专题，作为我
们的选片依据。本专题不审核。</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleItem from '@/components/college/article-item'
import { geUserArticleList } from "@/api/college";
import Loading from "@/components/loading/loading";
export default {
  data(){
    return{
      activeIndex: '1',
      articleData: [0],
      specialData: []
    }
  },
  computed:{
    uid () {
      if (this.$store.state.app.userInfo) {
        if (this.$store.state.app.userInfo.uid) {
          return this.$store.state.app.userInfo.uid
        }
      }
      return null
    },
  },
  created(){
    this.articleList()
  },
  components:{
    articleItem,
    Loading
  },
  methods:{
    handleSelect(val){
      // console.log("选择",this.activeIndex)
      this.activeIndex = val
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
          that.articleData = res.data
        }
      }).catch(res => {
        // console.log('请求报错')
      })
    },
    onArticleDetails(e){
      this.$router.push({path:'/front/college/articledetails',query:{id:e}})
    },
  }
}
</script>

<style lang="less" scoped>
@import './home-page.less';
</style>