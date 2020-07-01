<template>
  <ul class="hk-special-list">
    <!-- 推荐专题列表 shows-->
    <div class="hk-list-of-topics clearfix " v-for="item in topicsList" :key="item.id">
      <div class="fr">
        <el-button round class="hk-special-button">关注</el-button>
      </div>
      <div class="fl hk-list-of-topics-left">
        <img src="../../assets/image/special_img.jpg" alt="0" />
      </div>
      <div class="fl hk-list-of-topics-right text-l">
        <h4 class="text-blacks font-20 hk-special-title title-nowrap">{{item.title}}</h4>
        <p class="text-line line-36 font-14">{{item.update_time}}天前更新 {{item.browse}}浏览</p>
        <ul>
          <li v-for="(porp, index) in item.labelList" :key="index" class="clearfix line-40 hk-label-main">
            <span class="fl hk-sepcial-label">{{porp.label}}</span>
            <p class="fl margin-l-12 hk-topic-text title-nowrap">{{porp.topic}}</p>
          </li>
        </ul>
      </div>
    </div>
  </ul>
</template>

<script>
export default {
  props: {
    topicsList: Array
  },
  data () {
    return {}
  },
  created () {
    // console.log(this.topicsList)
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.hk-special-list {
  padding: 0px 34px 0px 54px;
  background: #fff;
  font-family:Microsoft YaHei;
}
.hk-list-of-topics {
  padding-top: 35px;
  padding-bottom: 40px;
  border-bottom: 1px solid #F0F0F0;
  &:last-child {
    border-bottom: none;
  }
  .hk-list-of-topics-left {
    min-width: 200px;
    max-width: 325px;
    max-height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hk-list-of-topics-right {
    padding-left: 37px;
    width: 650px;
    .hk-special-title {
      font-weight:bold;
      width: 100%;
    }
    .hk-label-main {
      width: 100%;
    }
    .hk-sepcial-label {
      display: inline-block;
      width:65px;
      height:25px;
      margin-top: 10px;
      line-height: 24px;
      text-align: center;
      border:1px solid #05d797;
      border-radius:13px;
      color: #05d797;
    }
    .hk-topic-text {
      width: 536px;
      font-size:16px;
      font-weight:400;
      color:#666666;
    }
  }
  .hk-special-button {
    width:87px;
    height:34px;
    line-height: 33px;
    text-align: center;
    padding: 0;
    color: #05d797;
    border:1px solid #05d797;
  }
}
</style>