<template>
  <div>
    <!-- 问题列表 -->
    <div v-for="item in questionLists" :key="item.id">
      <div class="question-list-cotent">
        <div class="list-content">
          <div class="tiling">
            <div class="question-name" @click="onDetails">{{item.title}}</div>
          </div>
          <div class="tiling">
            <div class="question-details">
              <span class="margin-r-20">{{item.update_time}}天前更新</span>
              <span>{{item.views}}浏览数</span>
            </div>
          </div>
          <div class="select-button clearfix">
            <div class="question-answer-details fr">
              <span class="margin-r-20">{{item.answer}}个回答</span>
              <span>{{item.answer_views}}浏览数</span>
            </div>
            <router-link to="/front/college/question/details">
              <el-button class="button answer">写回答</el-button>
            </router-link>
            <span v-if="item.ignore">
              <el-button class="button hk-ignore margin-r-20">忽略</el-button>
              <router-link to="/front/college/question/answerLater">
                <el-button class="button hk-ignore margin-r-20">稍后答</el-button>
              </router-link>
            </span>
            <el-button class="button hk-remove margin-r-20" v-else>移除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionLists: Array
  },
  data() {
    return {};
  },
  methods: {
    onDetails() {
      // console.log('跳转详情')
      this.$router.push({ path: "/front/college/question/details" });
    }
  }
};
</script>

<style lang="less">
.question-list-cotent {
  width: 100%;
  height: 193px;
  background: #ffffff;
  margin-bottom: 15px;
  padding: 0 30px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .list-content {
    width: 100%;
    .tiling {
      display: flex;
      width: 100%;
      margin-bottom: 25px;
    }
    .question-name {
      font-size: 20px;
      line-height: 20px;
      font-weight: 400;
      color: rgba(34, 34, 34, 1);
    }
    .question-details {
      font-size: 16px;
      line-height: 16px;
      color: rgba(153, 153, 153, 1);
    }
    .question-answer-details {
      font-size: 16px;
      line-height: 16px;
      color: rgba(153, 153, 153, 1);
      margin-left: auto;
      margin-right: 0;
    }
    .select-button {
      text-align: left;
      .button {
        cursor: pointer;
        width: 95px;
        height: 34px;
        padding: 0;
        background: rgba(243, 243, 243, 1);
        border-radius: 17px;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        &:hover {
          color: #05d797;
        }
      }
    }
    .answer {
      margin-right: 15px;
    }
  }
}
</style>