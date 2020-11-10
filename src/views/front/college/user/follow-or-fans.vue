<template>
  <div class="hk-menu">
    <el-tabs v-model="activeIndex" @tab-click="handleClick">
      <el-tab-pane label="关注989" name="concerns"></el-tab-pane>
      <el-tab-pane label="粉丝4987" name="fans"></el-tab-pane>
      <el-tab-pane label="关注专题" name="special"></el-tab-pane>
    </el-tabs>
    <div class="recommended-list padding-t-20" v-if="activeIndex !== 'special'">
      <authorList v-for="(item,index) in 1" :key="index" :item="item" @onFollow="onFollow"></authorList>
    </div>
    <div class="recommended-list padding-t-26" v-else>
      <focusTopics v-for="(item,index) in 1" :key="index" :item="item" @topicsFollow="topicsFollow"></focusTopics>
    </div>
  </div>
</template>

<script>
import articleItem from "@/components/college/article-item";
import focusTopics from "@/components/college/focus-topics";
import { geUserArticleList,getCollegeUserArticleList,addFollow,delFollow} from "@/api/college";
import authorList from '@/components/college/author'
export default {
  data () {
    return {
      activeIndex: 'concerns',
      specialList: [0,0,0],
    }
  },
  created () {
    let that = this;
    // console.log(that.$route.query)
    if (that.$route.query.name) {
      that.activeIndex = that.$route.query.name;
    }
    // this.articleList()
  },
  mounted () {
    let that = this;
    // console.log(that.$route.query)
    if (that.$route.query.name) {
      that.activeIndex = that.$route.query.name;
    }
  },
  components: {
    articleItem,
    focusTopics,
    authorList
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
      let key = ''
      let that = this
      geUserArticleList(key).then(res => {
        if (res.status === 200) {
          // console.log('请求成功呢')
          that.specialList = res.data
        }
      }).catch(res => {
        // console.log('请求报错')
      })
    },
    onAddFollow(data) {
      addFollow(data)
        .then(res => {
          if (res.status === 200) {
            if (data.type === 10) {
              this.articleList();
            } else {
              this.articleList();
            }
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1000,
              offset: 60
            });
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
     // 取消关注
    onDelFollow(data) {
      delFollow(data)
        .then(res => {
          if (res.status === 200) {
            this.articleList()
            // this.$message({
            //   message: res.msg,
            //   type: "success",
            //   showClose: true,
            //   offset: 60,
            //   duration: 3000
            // });
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
    // 关注
    onFollow(uid) {
      let data = {
        type: 10,
        business_id: uid
      };
      this.onAddFollow(data);
    },
    topicsFollow(id) {
      let data = {
        type: 20,
        business_id: id
      };
      this.onAddFollow(data);
    }
  },
   watch: {
    $route: {
      handler (val, oldval) {
        this.activeIndex = val.query.name;
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import './follow-or-fans.less';
</style>