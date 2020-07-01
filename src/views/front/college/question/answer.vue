<template>
  <div class="font-14 content padding-t-20 text-blacks">
    <!-- 问题详情页 -->
    <div class="hk-answerdetails-title clearfix padding-t-26 padding-l-25 padding-b-26 margin-b-15">
      <ul class="fr hk-answerdetails-right">
        <li class="hk-answerdetails-number margin-tb-10">
          <div class="font-16">关注数</div>
          <span class="font-24 hk-answerdetails-numberbar">89</span>
        </li>
        <span class="hk-answerdetails-right-bar"></span>
        <li class="hk-answerdetails-number margin-tb-10">
          <div class="font-16">浏览数</div>
          <span class="font-24 hk-answerdetails-numberbar">89</span>
        </li>
      </ul>
      <div class="fl hk-answerdetails-ask-main">
        <h4 class="font-20 hk-answerdetails-ask text-l">如何做一名优秀的环评报告师?</h4>
        <div class="text-l padding-t-29 clearfix">
          <div class="fr margin-l-42 hk-answerdetails-textbtn">
            <el-button type="text" class="hk-btn-text">
              <i class="font-18 el-icon-chat-dot-round"></i>
              <span class="font-16">评论（300）</span>
            </el-button>
            <el-button type="text" class="hk-btn-text">
              <i class="font-18 el-icon-s-promotion"></i>
              <span class="font-16">分享（300）</span>
            </el-button>
            <el-button type="text" class="hk-btn-text">
              <i class="font-18 iconfont icon-jubao"></i>
              <span class="font-16">举报</span>
            </el-button>
          </div>
          <!-- 切换按钮 -->
          <el-button v-for="(item, index) in askBtn" :key="index"  @click="onScreen(index)" round class="hk-answerdetails-ask-btn" :class="isIndex === index ? 'is-active-ask': ''">{{item.name}}</el-button>
        </div>
      </div>
    </div>
    <div class="hk-answerdetails-content-clearfix clearfix">
      <!-- 右边资料卡 -->
      <div class="fr">
        <div class="margin-l-9 margin-b-12 hk-answerdetails-box text-l">
          <div class="hk-answerderails-title">关于作者</div>
          <div class="hk-el-avater clearfix">
            <el-avatar class="fl">
              <img src="../../../../assets/image/hk-collegedetils.jpg" />
            </el-avatar>
            <div class="fl font-18 hk-author-name">张明明</div>
            <div class="fl hk-major">
              <span>贵州大学</span>
              <span class="padding-l-12">土木工程学院</span>
            </div>
          </div>
          <ul class="hk-group-bar">
            <li class="hk-group-list text-center">
              <div class="font-16">关注数</div>
              <span class="font-20 hk-group-numberbar">89</span>
            </li>
            <span class="hk-group-list-span"></span>
            <li class="hk-group-list text-center">
              <div class="font-16">浏览数</div>
              <span class="font-20 hk-group-numberbar">89</span>
            </li>
            <span class="hk-group-list-span"></span>
            <li class="hk-group-list text-center">
              <div class="font-16">浏览数</div>
              <span class="font-20 hk-group-numberbar">89</span>
            </li>
          </ul>
          <div class="hk-follow-ta">
            <el-button v-if="isShow" @click="onShow(false)">关注TA</el-button>
            <el-button class="hk-el-button" v-else @click="onShow(true)">取消关注</el-button>
          </div>
        </div>
        <div class="hk-display-map margin-l-9 margin-b-12">
          <img src="../../../../assets/image/hk-collegedetils.jpg" />
        </div>
        <div class="hk-answedetails-ask-bar margin-l-9 margin-b-12 font-16 text-l">
          <span>相关问题</span>
        </div>
      </div>
      <!-- 左边内容 -->
      <div class="fl">
        <FrontArticleList :articleList="articleList"></FrontArticleList>
      </div>
    </div>
  </div>
</template>

<script>
import FrontArticleList from "@/components/college/article-list.vue";
export default {
  data() {
    return {
      openArticle: false,
      showAll: "阅读全文",
      isShow: false,
      isIndex: 0,
      askBtn: [{
        value: 1,
        name: '写答案'
      }, {
        value: 2,
        name: '关注问题'
      }, {
        value: 3,
        name: '邀请回答'
      }],
      articleList: [
        {
          title: "探索盘州区环保事业发展",
          subtitle: "盘州区环保局发布了文章",
          add_time: "21小时前",
          fabulous: "78",
          badly: "3",
          paragraph:
            "我不是环评师，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活"
        }, {
          title: "探索盘州区环保事业发展",
          subtitle: "盘州区环保局发布了文章",
          add_time: "21小时前",
          fabulous: "78",
          badly: "3",
          paragraph:
            "我不是环评师，我是环评技术人员生活在环评食物链的最低端，工作中遇到的所有人都是我的甲方，领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活领导督促趁年轻多干活"
        }
      ]
    };
  },
  components: {
    FrontArticleList
  },
  created() {
    this.Setread();
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
    onShow(val) {
      this.isShow = val;
    },
    onScreen (index) {
      this.isIndex = index
    } 
  }
};
</script>

<style lang="less">
@import "./answer.less";
</style>
