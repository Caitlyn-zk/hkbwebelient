<template>
<!-- 搜索综合页 -->
  <div class="hk-comprehensive">
    <ul class="hk-comprehensive-list">
      <li class="hk-comrehensive-list-bar" v-for="(item,index) in comprehensiveList" :key="item.id">
        <div class="hk-title">
          <span>{{item.title}}</span>
          <span class="text-line margin-l-32 font-14">{{item.releaseTime}}</span>
        </div>
        <div class="clearfix">
          <p class="line-28 font-14" :class="isShowAll === index ? 'open':'retract'">{{item.describe}}</p>
          <el-button
            type="text"
            class="hk-read-btn fr"
            @click="Setread(index)"
          >{{isShowAll === index ? '收起' : '阅读全文'}}</el-button>
        </div>
        <div class="hk-button-college">
          <el-button class="hk-coll-agree" type round>赞同{{item.fabulous}}</el-button>
          <el-button class="hk-coll-agree" type round>不赞同{{item.badly}}</el-button>
          <el-button type="text" class="hk-btn-text">
            <i class="el-icon-chat-dot-round font-18"></i>
            <span class="font-16">评论(300)</span>
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAll: null,
      comprehensiveList: [
        {
          id: 1,
          title: "如何做一名优秀的环评报告师？",
          releaseTime: "2020-05-28",
          fabulous: '88',
          badly: '',
          describe:
            "我不是环评师，我是环评技术人员。生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，领导敦促趁年轻多干活，业主催着要报告，专家动不动就劈头盖脸熊一顿，审批部门一个不高兴就给你来个截杀，唯一的乙方监测单位还对你爱搭不理，连哄带骗的催他赶紧监测出报告，人家稳若泰山，让你以一己之力撑起整个天空。我时常告诫自己，这是自己选的，不能退缩，跨过这个坎，终究自己也会是甲方的，虽然漫漫长路，总觉得遥遥无期，生活嘛，总得给自己点希望..."
        },{
          id: 2,
          title: "如何做一名优秀的环评报告师？",
          releaseTime: "2020-05-28",
          fabulous: '88',
          badly: '',
          describe:
            "我不是环评师，我是环评技术人员。生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，领导敦促趁年轻多干活，业主催着要报告，专家动不动就劈头盖脸熊一顿，审批部门一个不高兴就给你来个截杀，唯一的乙方监测单位还对你爱搭不理，连哄带骗的催他赶紧监测出报告，人家稳若泰山，让你以一己之力撑起整个天空。我时常告诫自己，这是自己选的，不能退缩，跨过这个坎，终究自己也会是甲方的，虽然漫漫长路，总觉得遥遥无期，生活嘛，总得给自己点希望..."
        }
      ]
    };
  },
  methods: {
    Setread(index) {
      if (this.openArticle) {
        this.openArticle = false;
        this.isShowAll = null;
        // this.showAll = '阅读全文'
      } else {
        this.openArticle = true;
        this.isShowAll = index;
        // this.showAll = '收起'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hk-comprehensive {
  .hk-comprehensive-list {
    text-align: left;
    font-family: Microsoft YaHei;
    .hk-comrehensive-list-bar {
      width: 100%;
      padding: 0 27px 25px;
      background: #fff;
      margin-bottom: 21px;
      .hk-title {
        font-size: 18px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 70px;
      }
      .hk-read-btn {
        padding: 0;
      }
      .hk-button-college {
        color: #333;
        .hk-btn-text {
          color: #333;
          &:hover {
            color: #0BD094;
          }
        }
        .el-button {
          margin: 0;
          margin-right: 16px;
          font-size: 16px;
          padding: 0;
          &:last-child {
            margin-left: 39px;
          }
        }
      }
    }
  }
}

</style>