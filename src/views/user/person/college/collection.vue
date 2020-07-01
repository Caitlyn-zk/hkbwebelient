<template>
  <div class="hk-collection">
    <el-tabs class="hk-collection-title" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章" name="first"></el-tab-pane>
      <el-tab-pane label="专栏" name="second">专栏</el-tab-pane>
    </el-tabs>
    <ul class="">
      <li class="clearfix hk-collection-list margin-b-10" v-for="item in 3" :key="item">
        <div class="fl">
          <img width="100" src="../../../../assets/image/colle_01.jpg" alt="">
        </div>
        <div class="hk-collection-text margin-l-20 fl">
          <h3 class="line-36">水土保持怎么做才好？</h3>
          <p class="retract line-20">水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？</p>
          <div>
            <el-button type="text">
              <i class="el-icon-chat-dot-square"></i>
              <span>添加评论</span>
            </el-button>
            <el-button type="text">
              <i class="el-icon-position"></i>
              <span>分享</span>
            </el-button>
            <el-button type="text">
              <i class="el-icon-star-off"></i>
              <span>取消收藏</span>
            </el-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="less" scoped>
  .hk-collection {
    padding: 10px 20px;
    /deep/.hk-collection-title {
      .el-tabs__nav-wrap::after {
        // background-color: transparent;
      }
      .el-tabs__header {
        // margin: 0;
      }
    }
    .hk-collection-list {
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      .retract {
        height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .hk-collection-text {
        display: block;
        width: 80%;
      }
    }
    
  }
  
</style>