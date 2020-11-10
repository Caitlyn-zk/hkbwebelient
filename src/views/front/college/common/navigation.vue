<template>
  <div class="hk-new-recruit-nav padding-t-10 margin-t-20 clearfix">
    <div class="el-menu--horizontal  ">
      <div
        class="el-menu-item"
        v-for="(item,index) in collegeNav"
        :key="index"
        @click="onSelectPost(item.id)"
        :class="item.id ===  isIndex ? 'is-active' : ''"
        v-show="index < 2 || isLogin"
      >
        <router-link class="hk-menu-a" :to="item.url" >{{item.name}}</router-link>
      </div>
    </div>
    <div class="search">
      <div class="hk-collega-input">
        <el-input placeholder="请输入想要搜索学院内容" v-model="inputcoll" @keyup.enter.native="onSearchEnterFun" class="search-input">
          <el-button slot="append" class="hk-search-button" @click="onSearch">搜索</el-button>
        </el-input>
      </div>
      <!-- 按钮 -->
      <el-button
        round
        class="hk-collega-round margin-l-20"
        @click="onWriteArticle"
      >写文章</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      inputcoll: "",
      isIndex: 0,
      collegeNav: [
        {
          id: 1,
          url: "/front/college/recommend",
          name: "推荐"
        },
        {
          id: 2,
          url: "/front/college/special",
          name: "专题"
        },
        {
          id: 3,
          url: "/front/college/follow",
          name: "关注"
        },
        {
          id: 4,
          url: "/front/college/info",
          name: "消息"
        }
      ]
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  mounted () {
    this.onRouterPathChanged()
  },
  methods: {
    onRouterPathChanged(val, oldval) {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      if (pathrouter.indexOf('front/college/recommend') !== -1) {
        that.isIndex = 1;
      } else if (pathrouter.indexOf("college/special") !== -1) {
        that.isIndex = 2;
      }else if (pathrouter.indexOf('front/college/follow') !== -1) {
        that.isIndex = 3
      } else if (pathrouter.indexOf('/front/college/info') !== -1) {
        that.isIndex = 4;
      } else {
        that.isIndex = 0;
      }
    },
    onSelectPost(id) {
      this.isIndex = id;
    },
    onSearch() {
      // console.log("搜索");
    },
    onSearchEnterFun(e){
      var keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){
        // console.log("搜索");
      }
    },
    onWriteArticle() {
      // console.log("写文章");
      this.$router.push({
        path: "/front/college/article/editor"
      });
    }
  },
  watch: {
    $route: {
      handler (val, oldval) {
        let path = val.path
        let that = this
        this.collegeNav.forEach(item => {
          if (item.url == path) {
            that.isIndex = item.id
          }
        });
        this.onRouterPathChanged(val, oldval)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.hk-new-recruit-nav {
  display: flex;
  // justify-content: left;
  height: 60px;
  width: 100%;
  background-color: transparent;
  .search{
    display: flex;
  }
  .search-input {
    width: 695px;
  }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
    background: transparent;
  }
  .hk-collega-round {
    width:120px;
    height:50px;
    background:rgba(255,179,72,1);
    box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.06);
    border-radius:26px;
    padding: 0;
    font-size:16px;
    color:rgba(255,255,255,1);
    line-height:50px;
    &:focus {
      border-color: rgba(255,179,72,1);
    }
  }
  .el-menu--horizontal {
    border: none;
    height: 50px;
    position: relative;
    overflow: hidden;
    .el-menu-item {
      margin-right: 50px;
      padding: 0;
      height: 50px;
      color: #666;
      font-size: 18px;
      // font-weight:bold;
      max-width: 145px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 3px solid #f6f6f8;
      .hk-menu-a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      &.is-active {
        color: #0bd094;
        border-bottom: 3px solid #0BD094;
      }
      &:hover{
        color: #0bd094;
      }
    }

    .hk-moer-but {
      // float: right;
      position: absolute;
      right: 10px;
      // margin-right: 10px;
      line-height: 26px;
      color: #999;
      font-size: 16px;

      &:hover,
      &:focus {
        color: #0bd094;
      }
    }
  }
}
</style>