<template>
  <div>
    <div class="follow-content-list padding-t-8">
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <!-- <el-tab-pane label="全部推荐" name="concerns"></el-tab-pane> -->
        <el-tab-pane label="推荐作者" name="author">
          <div class="padding-t-26">
            <authorList v-for="(item,index) in userList" :key="index" :item="item" @onFollow="onFollow"></authorList>
          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐专题" name="special">
          <div class="padding-t-26">
            <focusTopics
              class="margin-b-26"
              v-for="(item,index) in specialList"
              :key="index"
              :item="item"
              @topicsFollow="topicsFollow"
            ></focusTopics>
          </div>
          <!-- <p v-show="busy" style="margin-top:10px;" class="loading">
            <span></span>
          </p>
          <p v-show="noMore" style="margin-top:10px;font-size:13px;color:#ccc">没有更多了</p>-->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import authorList from "@/components/college/author";
import focusTopics from "@/components/college/focus-topics";
import {
  geHomeRecomndColumnList,
  recommentUserList,
  addFollow
} from "@/api/college";
export default {
  data() {
    return {
      activeIndex: "author",
      specialList: [0],
      userList: [0],
      page: 1,
      page_size: 6,
      // busy: false,
      onFetching: false,
      // loading: false,
      loading: false,
      loadingUser: false
    };
  },
  created() {
    this.getRecommentUserList();
  },
  components: {
    authorList,
    focusTopics
  },
  mounted() {
    document.addEventListener("scroll", this.scrollLoad);
  }, 
  beforeDestroy(){
    document.removeEventListener("scroll", this.scrollLoad);
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab);
      this.page = 1;
      if (tab.name === "author") {
        this.getRecommentUserList();
      } else if (tab.name === "special") {
        this.getRecommendedTopics();
      }
    },
    getRecommendedTopics() {
      let parameter = {
        page: this.page,
        page_size: this.page_size
      };
      geHomeRecomndColumnList(parameter)
        .then(res => {
          if (res.status == 200) {
            if (this.page > 1) {
              this.$set(this, "specialList", this.specialList.concat(res.data));
            } else {
              this.$set(this, "specialList", res.data);
            }
      
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
      this.loading = false;
    },
    getRecommentUserList() {
      let parameter = {
        page: this.page,
        page_size: this.page_size
      };
      recommentUserList(parameter)
        .then(res => {
          if (res.status === 200) {
            if (this.page > 1) {
              this.$set(this, "userList", this.userList.concat(res.data));
            } else {
              this.$set(this, "userList", res.data);
            }
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
    scrollLoad() {
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if (this.onFetching) {
        // do nothing
      } else {
        if (nowScotop >= scrollHeight - wheight - 5 - 220) {
          this.onFetching = true;
          // console.log("触底",this.page);
          // console.log('判断',this.specialList.length / this.page_size === this.page)
          setTimeout(() => {
            if (
              this.activeIndex == "author" && 
              this.userList.length > 0 &&
              this.userList.length / this.page_size === this.page
            ) {
              // console.log("加载更多");
              this.$set(this,'page',this.page +1)
              this.getRecommentUserList();
            } else if (
              this.activeIndex == "special" && 
              this.specialList.length > 0 &&
              this.specialList.length / this.page_size === this.page
            ) {
              // console.log("加载更多");
              this.$set(this,'page',this.page + 1)
              this.getRecommendedTopics();
            }
            this.onFetching = false;
          }, 500);
        }
      }
    },
    onAddFollow(data) {
      addFollow(data)
        .then(res => {
          if (res.status === 200) {
            if (data.type === 10) {
              this.getRecommentUserList();
            } else {
              this.getRecommendedTopics();
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
  }
};
</script>

<style lang="less" scoped>
@import "./follow-list.less";
</style>