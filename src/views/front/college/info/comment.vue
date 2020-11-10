<template>
  <div>
    <div class="college-info-title">收到评论</div>
    <ul class="hk-comment padding-l-25 text-l padding-t-20">
      <li class="hk-left-list-bar line" v-for="item in 2" :key="item">
        <div class="hk-querst clearfix">
          <el-avatar class="fl" :size="40" :src="circleUrl"></el-avatar>
          <div class="margin-l-11 fl">
            <h4 class="font-14 user-name">小华评论了你的文章<span class="text-green">《关于土壤保护》</span></h4>
            <p class="userfu-time padding-t-6">2020-07-07</p>
          </div>
        </div>
        <div class="">
          <p class="line-30 padding-t-19 padding-b-21 font-14 hk-open">
            最近也有这种感悟，大多数人的压力来自把目标放在一个离现实很远的目标上，
            却忽略了当下的风景，人生的路没有尽头。
          </p>
          <div class="hk-button-college clearfix">
            <el-button type="text" class="hk-btn-text fr">
              <span class="font-14">举报</span>
            </el-button>
            <el-button type="text" class="hk-btn-text" @click="onReply(item)">
              <i class="iconfont icon-xinxi font-16"></i>
              <span class="font-14">回复 0</span>
            </el-button>
            <el-button type="text" class="hk-btn-text">
              <i class="iconfont icon-fenxiang font-14"></i>
              <span class="font-14">查看对话</span>
            </el-button>
          </div>
        </div>
        <div class="comment-title" v-if="replyId == item">
          <div class="hk-comment-textarea padding-t-20">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 7}"
              :placeholder="'@小华'"
              v-model="reply"
              class="hk-comment-textarea-inpt "
              style="width:770px;"
            ></el-input>
            <div class="button">
              <el-button @click="onReplyCancel" type="text" class="cancel">取消</el-button>
              <el-button @click="onReplyComment" class="comment" :disabled="reply ==''">发布</el-button>
              
            </div>
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
      circleUrl:require("../../../../assets/image/loading.png"),
      commentList: [],
      pid: 0,
      text: '',
      reply: '',
      replyId: 0,
    };
  },
  created () {},
  methods: {
    // 文章评论
    onComment(){
      // console.log('文章评论')
      this.pid = 0
      this.text = this.comment
      // this.addArticleComment()
    },
    // 回复评论
    onReply(id){
      this.pid  = id
      this.replyId = id
    },
    // 评论回复
    onReplyComment(){
      this.text = this.reply
      this.replyId = 0
    },
     // 取消发布评论
    onCancel(){
      this.replyId = 0
    },
    // 取消回复评论
    onReplyCancel(){
      this.replyId = null
      this.reply = ''
    },
  }
};
</script>

<style lang="less" scoped>
@import "./comment.less";
</style>