<template>
  <div class="hk-question-details">
    <!-- 等你来答问题详情页 -->
    <div class="hk-question-content text-l padding-t-20">
      <div class="clearfix">
        <div class="fr clearfix">
          <div class="fl">
            <span class="text-line">关注者</span>
            <p class="text-blacks">13839</p>
          </div>
          <div class="fl margin-l-30">
            <span class="text-line">被阅读</span>
            <p class="text-blacks">13839</p>
          </div>
        </div>
        <span class="fl hk-question-button">
          <el-button round>话题1</el-button>
          <el-button round>话题3</el-button>
          <el-button round>话题2</el-button>
        </span>
      </div>
      <h3 class="line-36 text-blacks font-16">19年环评注册师考试，你不关注一下生活？？？</h3>
      <div class="clearfix hk-question-paragraph-main">
        <p
          class="line-26 text-line font-12 hk-question-paragraph"
          :class="openArticle ? 'open':'retract'"
        >
          我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
          我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
          我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
          我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
        </p>
        <el-button type="text" class="hk-read-btn" @click="Setread">{{showAll}}</el-button>
      </div>
      <div class="hk-uestion-btn">
        <el-button>取消关注</el-button>
        <el-button @click="onWriteAnswers">写回答</el-button>
        <el-button @click="onInvitation">邀请回答</el-button>
        <el-button type="text" class="hk-operation-bar">
          <i class="el-icon-chat-dot-square"></i>
          317条评论
        </el-button>
        <el-button type="text" class="hk-operation-bar">
          <i class="el-icon-position"></i>
          分享
        </el-button>
        <el-button type="text" class="hk-operation-bar" @click="onReport">
          <i class="el-icon-warning-outline"></i>
          举报
        </el-button>
      </div>
    </div>
    <div class="clearfix">
      <!-- 右边相关话题内容 -->
      <ul class="fr hk-operatin-write-right">
        <li class="line-36 margin-b-10">
          <h3 class="hk-operatin-title">相关问题</h3>
        </li>
        <li class="clearfix line-26" v-for="item in 7" :key="item">
          <span class="fr">214回答</span>
          <span class="hk-operatin-list title-nowrap">如何成为优秀的环评报告师？</span>
        </li>
      </ul>
      <!-- 左边列表 -->
      <div class="fl hk-operatin-write-left">
        <div class="hk-write-answers text-l padding-10 clearfix" ref="writeAnswers">
          <div class="hk-querst clearfix">
            <div class="block fl">
              <el-avatar :size="70" :src="circleUrl"></el-avatar>
            </div>
            <span class="fl line-70 margin-l-20 font-20">张潇</span>
          </div>
          <!-- <hr class="hk-a-line" /> -->
          <div class="margin-t-10">
            <quill-editor v-model="desc" ref="myQuillEditor" :options="postDetail"></quill-editor>
          </div>
          <div class="hk-sbimet-but fr">
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-check">允许转载</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">禁止转载</el-dropdown-item>
                <hr class="hk-a-line" />
                <el-dropdown-item icon="el-icon-check">允许任何人评论</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">允许我关注的人评论</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">关闭评论</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button class="hk-submit-response" @click="onPreservation">提交回答</el-button>
          </div>
        </div>
        <div class="hk-quersion-answer">
          <h3 class="hk-uersion-title clearfix line-46">
            <el-button class="fr" type="text">
              按时间顺序
              <i class="el-icon-d-caret"></i>
            </el-button>
            <span class="fl">10个回答</span>
          </h3>
          <ul class="hk-left-list text-l">
            <li class="hk-left-list-bar" v-for="item in 3" :key="item">
              <div class="hk-querst clearfix">
                <div class="block fl">
                  <el-avatar :size="70" :src="circleUrl"></el-avatar>
                </div>
                <span class="fl line-70 margin-l-20 font-20">张潇</span>
              </div>
              <p>20人赞同了该回答</p>
              <p class="line-26 text-line font-12 open">
                我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
                我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
                我不是环评师，生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活生活
              </p>
              <p class="line-26 text-line font-12">发布时间于 2020-05-08</p>
              <div class="hk-uestion-btn">
                <el-button>赞同78</el-button>
                <el-button>不赞同</el-button>
                <el-button type="text" class="hk-operation-bar" @click="onComment(item)">
                  <i class="el-icon-chat-dot-square"></i>评论777
                </el-button>
                <el-button type="text" class="hk-operation-bar">
                  <i class="el-icon-position"></i>
                  分享
                </el-button>
                <el-button type="text" class="hk-operation-bar">
                  <i class="el-icon-star-on"></i>
                  收藏
                </el-button>
                <el-button type="text" class="hk-operation-bar">
                  <i class="iconfont icon-xihuan"></i>
                  喜欢
                </el-button>
              </div>
              <!-- <div class="hk-a-line"></div> -->
              <hr class="hk-a-line" />
              <!-- 评论的内容详情以及回复评论 -->
              <div class="hk-person-comment padding-5" :class="isActive === item ? 'is-active' : ''">
                <div class="font-16">2条评论</div>
                <ul class="padding-10">
                  <li class="">
                    <div class="hk-answers-bar">
                      <div class="hk-querst clearfix">
                        <span class="fr">12天前</span>
                        <div class="block fl">
                          <el-avatar :size="50" :src="circleUrl"></el-avatar>
                        </div>
                        <span class="fl line-50 margin-l-20 font-20">猫耳</span>
                      </div>
                      <p>思维导图赞</p>
                      <div class="hk-zan-bar clearfix">
                        <el-button class="fl" type="text">赞98</el-button>
                        <div class="fl hk-zan-operation margin-l-10">
                          <el-button class="fl" type="text">查看回复</el-button>
                          <el-button type="text">回复</el-button>
                          <el-button type="text">踩</el-button>
                          <el-button type="text" @click="onReport">举报</el-button>
                        </div>
                      </div>
                    </div>
                    <ul class="hk-hk-new-answers">
                      <li>
                        <div class="hk-answers-bar padding-l-20">
                          <div class="hk-querst clearfix">
                            <span class="fr">11天前</span>
                            <div class="block fl">
                              <el-avatar :size="50" :src="circleUrl"></el-avatar>
                            </div>
                            <span class="fl line-50 margin-l-20 font-20">匿名用户</span>
                          </div>
                          <p>太不可思议啦！！！！！！</p>
                          <div class="hk-zan-bar clearfix">
                            <el-button class="fl" type="text">赞98</el-button>
                            <el-button class="fl" type="text">查看回复</el-button>
                            <div class="fl hk-zan-operation margin-l-10">
                              <el-button type="text">回复</el-button>
                              <el-button type="text">踩</el-button>
                              <el-button type="text" @click="onReport">举报</el-button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div class="hk-comment-textarea padding-20">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 7}"
                    placeholder="请输入内容"
                    v-model="textarea"
                    class="hk-comment-textarea-inpt"
                  ></el-input>
                  <el-button @click="outComment">发布</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <invitationPopup :elasticFrame="invitaionpopup" @close="onCloseInvitaionPopup" ></invitationPopup>
    <reportPopup :report="report" @close="onCloseReportPopup"></reportPopup>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import invitationPopup from '@/components/popup/invitation-answer-popup'
import reportPopup from '@/components/popup/report-popup'
export default {
  data() {
    return {
      openArticle: false,
      showAll: "显示全部",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      desc: "",
      postDetail: {
        theme: "snow"
      },
      textarea: "",
      isActive: 0,
      invitaionpopup:{
        eject:false
      },
      report: {
        eject:false
      }
    };
  },
  components: {
    quillEditor,
    invitationPopup,
    reportPopup
  },
  methods: {
    Setread() {
      if (this.openArticle) {
        this.openArticle = false;
        this.showAll = "阅读全文";
      } else {
        this.openArticle = true;
        this.showAll = "收起";
      }
    },
    // 写回答
    onWriteAnswers() {
      console.log(this.$refs.writeAnswers);
      let writer = document.querySelector(".hk-write-answers");
      writer.style.display = "block";
    },
    // 保存
    onPreservation() {
      let writer = document.querySelector(".hk-write-answers");
      writer.style.display = "none";
    },
    onComment(index) {
      this.isActive = index;
    },
    outComment() {
      this.isActive = 0;
    },
    // 邀请弹框的一些操作
    onInvitation (e) {
      this.invitaionpopup.eject = true
    },
    onCloseInvitaionPopup (e) {
      this.invitaionpopup.eject = false
    },
    // 举报弹框
    onReport (e) {
      this.report.eject = true
    },
    onCloseReportPopup (e) {
      this.report.eject = false
    },
  }
};
</script>

<style lang="less">
@import "./question-details.less";
</style>
