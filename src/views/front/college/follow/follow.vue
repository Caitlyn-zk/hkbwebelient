<template>
  <div class="content">
    <!-- 导航部分 -->
    <navigation></navigation>
    <div class="follow padding-t-30 margin-b-20 clearfix">
      <div class="follow-menu-left margin-r-26">
        <div class="follow-menu-title">
          <h3 class="title-main"><span></span>全部关注</h3>
          <el-button class="add-attention" type="text" v-show="isShow=== true" @click="onRecommended">
            <i class="iconfont icon-tianjiayonghu font-12"></i>
            <span>添加关注</span>
          </el-button>
        </div>
        <div class="recommended-list padding-t-7" v-if="isShow === true">
          <div class="block-list clearfix hk-cursor" v-for="(item,index) in followLists" :key="index" :class="followAcitve === item.business_id && item.type === isType ? 'is-active' : ''" @click="onUserDetail(index,item)">
            <el-avatar class="fl" :size="40" v-show="item.type === 10" :src="item.avatar | onImag"></el-avatar>
            <el-avatar class="fl" shape="square" v-show="item.type === 20" :size="40" :src="item.cover_image | onImag"></el-avatar>
            <span class="recommended-name title-nowrap padding-l-11 line-40" v-show="item.type === 10">{{item.real_name}}</span>
            <span class="recommended-name title-nowrap padding-l-11 line-40" v-show="item.type === 20">{{item.name}}</span>
          </div>
        </div>
        <div class="add-attention-but  block-list padding-t-23" v-else @click="onRecommended">
          <span class="add-attention-img">
            <i class="iconfont icon-tianjiayonghu font-22"></i>
          </span>
          <el-button class="margin-l-10" type="text"> 添加关注</el-button>
        </div>
      </div>
      <div class="follow-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../common/navigation";
import { addFollowList } from "@/api/college";
export default {
   filters: {
    onImag(value) {
      let circleUrl =require("../../../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
    onAddTime (value) {
      var obj = utils.dateFormat(value*1000)
      return obj
    }
  },
  data() {
    return {
      activeIndex: '1',
      isShow: false,
      followAcitve: -1,
      followLists: [],
      isType: 10,
    };
  },
  created() {
    this.followList()
    let that = this;
    if (that.$route.query.id) {
      that.followAcitve = parseInt(that.$route.query.id);
      that.isType = parseInt(that.$route.query.type)
    }
  },

  components: {
    navigation,
  },
  methods: {
    handleSelect(e){
        // console.log('选择',e)
        this.activeIndex = e
    },
    onUserDetail (index,val) {
      this.isType = val.type
      // console.log(val)
      this.followAcitve = val.business_id
      if (val.type === 10) {
        this.$router.push({path:'/front/college/follow/user', query: {id: val.business_id,type: val.type,}})
      } else {
        this.$router.push({path:'/front/college/follow/recommend', query: {id: val.business_id,type: val.type,}})
      }
    },
    // 推荐
    onRecommended () {
      this.followAcitve = -1
      this.$router.push({path:'/front/college/follow/list'})
    },
    followList () {
      let that = this
      addFollowList().then(res => {
        if(res.status === 200) {
          // console.log('关注成功')
          // console.log(res.data)
          if (res.data.length !== 0) {
            that.isShow = true
          } else {
            that.isShow = false
          }
          that.followLists = res.data
        }
      }).catch(res => {
        // console.log("关注列表获取失败")
      })
    }
  },
  watch: {
    $route: {
      handler (val, oldval) {
        let path = val.path
        let that = this
        this.followAcitve = parseInt(val.query.id)
        this.isType = parseInt(val.query.type)
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./follow.less";
</style>