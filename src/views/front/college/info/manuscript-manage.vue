<template>
  <div class="manuscript-manage">
    <div class="college-info-title hk-cursor" @click="onBack">
      <i class="iconfont icon-fanhui margin-r-5"></i>返回投稿请求列表
    </div>
    <ul class="hk-my-answer padding-tb-22">
      <li
        class="hk-my-answer-list padding-b-22 margin-b-20"
        v-for="(item,index) in answerList"
        :key="index"
      >
        <div class="hk-querst clearfix padding-b-9">
          <el-avatar class="fl" :size="40" :src="circleUrl"></el-avatar>
          <p class="font-16 user-name fl padding-l-13 line-40">小华</p>
        </div>
        <div class="padding-l-51">
          <div class="title">
            <p
              class="margin-b-15 answer-title title-nowrap hk-cursor"
              :class="item === 0 ? 'bg animation' : ''"
              @click="onDetails(item.id)"
            >{{item.tittle}}</p>
          </div>
          <div class="hk-answer-cont">
            <p class="margin-b-20 p-content" :class="item === 0 ? 'bg' : ''">
              <span class="hk-introduce">{{item.brief}}</span>
            </p>
            <div class="hk-button-college">
              <el-button type="text" class="hk-btn-text" :class="item === 0 ? 'bg' : ''">
                <img
                  v-show="item !== 0"
                  style="vertical-align: -5px;"
                  src="../../../../assets/image/icon/pinglun.png"
                />
                <span>{{item !== 0 ? '评论': ''}} {{item.comment_count}}</span>
              </el-button>
              <el-button type="text" class="hk-btn-text" :class="item === 0 ? 'bg' : ''">
                <i v-show="item !== 0" class="el-icon-star-off font-16"></i>
                <span>{{item !== 0 ? '收藏': ''}}</span>
              </el-button>
              <el-button type="text" class="hk-btn-text" :class="item === 0 ? 'bg' : ''">
                <i v-show="item !== 0" class="iconfont icon-good font-16"></i>
                <span>{{item !== 0 ? '赞': ''}} {{item.like_count}}</span>
              </el-button>
            </div>
            <div class="manuscript-bommon">
              <el-button round class="accept margin-r-22" v-show="isShow === 0">接受</el-button>
              <el-button round class="refuse margin-r-22" v-show="isShow === 0">拒绝</el-button>
              <span class="button-news margin-r-5" v-show="isShow === -1">已收录</span>
              <el-button class="button-del margin-r-5" type="text" v-show="isShow === -1">移除</el-button>
              <span class="button-news margin-r-5" v-show="isShow === 1">已拒绝</span>
              <span>2020-06-23&nbsp;投稿</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {articleAuditDelivery} from "@/api/college";
export default {
  data() {
    return {
      circleUrl:require("../../../../assets/image/loading.png"),
      commentList: [],
      isShow: 0,
      answerList: [
        {
          id: 45,
          uid: 27,
          tittle: "2004生物工程环境治理实验教案",
          like_count: "9",
          comment_count: "0",
          brief:
            "2004生物工程环境治理实验教案,\n一、目的\n  1.了解SBR法系统的特点\n  2.加深对SBR法工艺及运行过程的认识\n  3.掌握微生物接种、驯化过程\n  4.掌握MLSS、MLVSS、SV%、S",
          cover_image: "cert/202007091952383033355801.jpg",
          add_time: 1594295576,
          real_name: "蝶子",
          avatar: "avatar/202007031652563681151484.jpg"
        },
        {
          id: 44,
          uid: 37,
          tittle: "不怕高温消毒的嗜热微生物",
          like_count: "24",
          comment_count: "0",
          brief:
            "每个生物体内都有细菌，杀死细菌的最简单方法就是高温。而高温消毒也成了我们日常烹饪的常识，这一观点来自现代微生物学及病原菌学说的创始人路易·巴斯德，所以我们也常称巴氏消毒。但寄生于像庞贝蠕虫这些生活在极",
          cover_image:"avatar/202007031652563681151484.jpg",
          add_time: 1594120726,
          real_name: "张文芳6",
          avatar: "avatar/202007061111077415431443.jpg"
        }
      ]
    };
  },
  created() {},
  methods: {
    onBack() {
      this.$router.push({path: '/front/college/info/submitrequest'})
    },
    onJe() {

    }
  }
};
</script>

<style lang="less" scoped>
@import "./manuscript-manage.less";
</style>