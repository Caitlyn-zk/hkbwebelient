<template>
  <div class="question">
    <!-- 等你来答列表页 -->
    <div class="content">
      <div class="question-title" id="boxFixed" :class="isFixed ? 'is-top' :''">
        <div class="title">等你来答</div>
        <div class="triangle"></div>
      </div>
      <div v-for="(item, index) in 6" :key="item">
        <div class="question-list-cotent">
          <div class="list-content">
            <div class="tiling">
              <div class="question-name" @click="onDetails">19年环评注册师考试，你怎么成了炮灰？</div>
              <div class="select">
                <el-checkbox
                  v-model="selectArrCloth"
                  :label="index"
                  @change="checked = checked"
                  class="checkbox clearfix"
                  fill="red"
                >不感兴趣</el-checkbox>
              </div>
            </div>
            <div class="tiling">
              <div class="question-details">4天前更新&#12288;&#12288;9999浏览数</div>
              <div class="question-answer-details">84个回答&#12288;&#12288;9999浏览数</div>
            </div>
            <div class="select-button">
              <router-link to="/front/college/question/details">
                <el-button class="button answer">写回答</el-button>
              </router-link>
              <router-link to="/front/college/question/concerns">
                <el-button class="button">关注问题</el-button>
              </router-link>
              <el-button @click="onAnswerLater" class="button margin-l-20">稍后答</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      selectArrCloth: [],
      color: "#FE1717",
      isFixed: false,
      offsetTop: 0
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector("#boxFixed").offsetTop;
    });
  },
  methods: {
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    onDetails() {
      // console.log('跳转详情')
      this.$router.push({ path: "/front/college/question/details" });
    },
    // 稍后答
    onAnswerLater() {
      this.$router.push({ path: "/front/college/question/answerLater" });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight);
  }
};
</script>

<style lang="less" scoped>
@import "./question.less";
</style>
