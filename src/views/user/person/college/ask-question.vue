<template>
  <div class="hk-college-ask-question">
    <h3 class="line-36">我的提问</h3>
    <ul class="hk-my-answer">
      <li class="hk-my-answer-list padding-tb-15" v-for="(item,index) in 3" :key="index">
        <h3 class="line-46">水土保持怎么做好？</h3>
       <div class="">
         <span class="font-12 text-line">2020-05-19</span>
         <span class="margin-lr-20 text-line">1个回答</span>
         <span class="text-line">2个关注</span>
       </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      openArticle: false,
      isShowAll: null,
      showindex: 1,
      operation: "其他操作",
      question: "其他操作",
      questionOption: [
        {
          value: 1,
          label: "其他操作"
        },
        {
          value: 2,
          label: "没有帮助"
        },
        {
          value: 3,
          label: "不感兴趣"
        }
      ]
    }
  },
  methods: {
    Setread(index) {
      // console.log("判断" + this.openArticle);
      if (this.openArticle) {
        this.openArticle = false;
        this.isShowAll = null;
        // this.showAll = '阅读全文'
      } else {
        this.openArticle = true;
        this.isShowAll = index;
        // this.showAll = '收起'
      }
    },
    onQuestion(index, name) {
      console.log(index)
      let that = this
      that.showindex = index
      that.question = name;
      
    },
  }
}
</script>

<style lang="less" scoped>
.hk-college-ask-question {
  .hk-my-answer-list {
    border-top: 1px solid #ccc;
  }
}

</style>