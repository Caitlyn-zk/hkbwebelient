<template>
  <div class="hk-follow">
    <el-tabs class="hk-follow-title" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我关注的人" name="first"></el-tab-pane>
      <el-tab-pane label="我关注的专栏" name="second">我关注的专栏</el-tab-pane>
    </el-tabs>
    <ul class="">
      <li class="clearfix hk-follow-list margin-b-10" v-for="item in 3" :key="item">
        <el-button class="fr margin-t-20">已关注</el-button>
        <div class="block fl">
          <el-avatar :size="70" :src="circleUrl"></el-avatar>
        </div>
        <div class="margin-l-20 fl  hk--follw-text-p">
          <h4 class="line-30">李勋</h4>
          <p class="line-20 title-nowrap">喜欢写写东西，希望写的东西有人喜欢,多多支持</p>
          <p class="text-line line-20">
            <span>4008回答</span>
            <span>3 文章</span>
            <span>77711关注者</span>
          </p>
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
  .hk-follow {
    padding: 10px 20px;
    /deep/.hk-follow-title {
      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }
      .el-tabs__header {
        margin: 0;
      }
    }
    .hk-follow-list {
      padding-top: 10px;
      border-top: 1px solid #ccc;
      .hk--follw-text-p {
        width: 73%;
      }
    }
  }
</style>