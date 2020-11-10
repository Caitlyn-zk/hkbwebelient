<template>
  <div class="content">
    <!-- 导航部分 -->
    <navigation></navigation>
    <div class="article-detail margin-b-20">
      <div class="article-detail-main">
        <div class="article-detail-bar">
          <div class="hk-my-answer-list">
            <h3 class="margin-b-20 answer-title hk-cursor" :class="arrayLength === 0 ? 'width bg' : ''">{{articleDetails.tittle}}</h3>
            <div class="clearfix answer-list-bar">
              <div class="hk-answer-cont">
                <div class="block clearfix">
                  <el-avatar class="fl" :size="40" :src="articleDetails.avatar | onImag" :class="arrayLength === 0 ? 'bg' : ''"></el-avatar>
                  <div class="fl margin-l-11 font-16 authors-name">
                    <span class="authors-main-text hk-cursor" :class="arrayLength === 0 ? 'text' : ''" @click="onUserDetail(articleDetails.uid)">
                      {{articleDetails.real_name}}
                    </span>
                    <div class="statistics" :class="arrayLength === 0 ? 'text animation-delay' : ''">{{articleDetails.add_time | timestampToTime}} <span v-if="arrayLength !==0">· 阅读</span> {{articleDetails.read_count}}</div>
                  </div>
                </div>
                <div :class="arrayLength === 0 ? ' bg' : ''" class="replace" v-if="arrayLength === 0"></div>
                <quill-editor
                  class="margin-t-16 margin-b-39 hk-introduce"
                  v-model="articleDetails.text"
                  ref="myQuillEditor"
                  :options="editoroption"
                  :disabled="true">
                </quill-editor>
                <div class="hk-button-college clearfix">
                  <el-button round class="hk-btn-text" :class="isLike === 0 ? '': 'zan-button'" @click="onLike(isLike, fabulous)" v-if="arrayLength !==0">
                    <div v-if="isLike === 0">
                      <i class="iconfont icon-good font-16"></i><span>赞{{fabulous}}</span>
                    </div>
                    <div v-else-if="isLike === 1">
                      <i class="iconfont icon-dianzan font-16"></i><span>赞{{fabulous}}</span>
                    </div>
                  </el-button>
                  <div class="fr drop-downmenu-main" v-if="arrayLength !==0">
                    <el-button class="drop-down-menu">···</el-button>
                    <ul class="hk-dropdown">
                      <li class="hk-dropdown-item">
                        <span>分享文章</span>
                        <ul class="hk-dropdown">
                          <li class="hk-dropdown-item">分享到微信</li>
                          <li class="hk-dropdown-item">分享到微博</li>
                        </ul>
                      </li>
                      <!-- <li class="hk-dropdown-item">收藏文章</li> -->
                      <li class="hk-dropdown-item" @click="onIncluded">收录文章</li>
                      <li class="hk-dropdown-item" @click="onReport">举报文章</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="hk-article-list" v-show="containColumn.length !== 0">
                <h3 class="hk-title">文章被以下专题收录</h3>
                <ul class="included">
                  <li class="clearfix included-list" v-for="(pops,index) in containColumn" :key="index">
                    <div class="article-button fr margin-t-7">
                      <!-- <el-button round :class="index === 2 ? 'is-active': ''">{{index === 2 ? '已关注' : '+关注'}}</el-button> -->
                    </div>
                    <div class="included-list-bar">
                      <img
                        width="48"
                        height="48"
                        class="included-list-img"
                        :src="pops.cover_image | onImag"
                        alt
                      />
                      <div class="hk-included-cont">
                        <h4 class="hk-included-cont-title padding-b-9 padding-t-3 hk-cursor"  @click="onColumnDetail(pops.column_id)">{{pops.name}}</h4>
                        <p class="text-line hk-included-cont-contet title-nowrap">{{pops.desc}}</p>
                      </div>
                    </div>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment-now margin-b-22" v-if="arrayLength !==0">
          <div class="comment-title">
            <!-- 头像 -->
            <div>
              <el-avatar :size="40" :src="userAvatar"></el-avatar>
            </div>
            <div class="hk-comment-textarea padding-l-24">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 7}"
                placeholder="写下你的评论"
                v-model="comment"
                class="hk-comment-textarea-inpt"
                @focus="onFocus"
              ></el-input>
              <div class="button" v-if="commentSelect">
                <el-button @click="onComment" class="comment" :disabled="comment ==''">发布</el-button>
                <el-button @click="onCancel" class="cancel">取消</el-button>
              </div>
            </div>
          </div>
          <div class="hk-quersion-answer margin-t-22" v-if="commentList !== 0">
            <h3 class="hk-uersion-title">
              <span>全部评论（{{commentList.length}}）</span>
            </h3>
            <ul class="hk-left-list padding-l-46 text-l padding-t-20">
              <li class="hk-left-list-bar line" v-for="(item,index) in commentList" :key="index">
                <div class="hk-querst clearfix">
                  <el-avatar class :size="40" :src="item.avatar | onImag"></el-avatar>
                  <div class="margin-l-11">
                    <h4 class="font-14 user-name">{{item.real_name}}</h4>
                    <p class="userfu-time margin-t-6">{{item.add_time | timestampToTime}}</p>
                  </div>
                </div>
                <div class="padding-l-51">
                  <p class="line-30 padding-tb-15 font-16 hk-open">{{item.text}}</p>
                  <div class="hk-button-college">
                    <el-button type="text" class="hk-btn-text" @click="onArticleCommentLike(item.id)">
                      <i class="iconfont icon-good font-16"></i>
                      <span>赞 {{item.like_count}}</span>
                    </el-button>
                    <el-button type="text" class="hk-btn-text" @click="onReply(item.id)">
                      <img
                        style="vertical-align: -5px;"
                        src="../../../assets/image/icon/pinglun.png"
                      />
                      <span>回复</span>
                    </el-button>
                  </div>
                  <ul class="hk-left-list text-l padding-t-20" v-if="item.children.length !== 0">
                    <li class="hk-left-list-bar" v-for="(child,childIndex) in item.children" :key="childIndex">
                      <div class="hk-querst clearfix">
                        <el-avatar class :size="40" :src="child.avatar | onImag"></el-avatar>
                        <div class="margin-l-11">
                          <h4 class="font-14 user-name">{{child.real_name}}</h4>
                          <p class="userfu-time margin-t-6">{{child.add_time | timestampToTime}}</p>
                        </div>
                      </div>
                      <div class="padding-l-51">
                        <p class="line-30 padding-tb-15 font-16 hk-open">{{child.text}}</p>
                      </div>
                      <div class="hk-button-college padding-l-51">
                        <el-button type="text" class="hk-btn-text" @click="onArticleCommentLike(child.id)">
                          <i class="iconfont icon-good font-16"></i>
                          <span>赞 {{child.like_count}}</span>
                        </el-button>
                        <el-button type="text" class="hk-btn-text" @click="onReply(item.id,child.real_name)">
                          <img
                            style="vertical-align: -5px;"
                            src="../../../assets/image/icon/pinglun.png"
                          />
                          <span>回复</span>
                        </el-button>
                        <!-- <el-button type="text" class="hk-btn-text">
                          <i class="el-icon-delete-solid font-16"></i>
                          <span>删除</span>
                        </el-button>
                        <el-button type="text" class="hk-btn-text">
                          <i class="iconfont icon-jubao_huaban font-16"></i>
                          <span>举报</span>
                        </el-button> -->
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="comment-title" v-if="replyId == item.id">
                  <div class="hk-comment-textarea padding-l-24">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 7}"
                      placeholder="写下你的评论"
                      v-model="reply"
                      class="hk-comment-textarea-inpt margin-l-30 margin-t-22"
                      style="width:680px;"
                    ></el-input>
                    <div class="button" >
                      <el-button @click="onReplyComment" class="comment" :disabled="reply ==''">发布</el-button>
                      <el-button @click="onReplyCancel" class="cancel">取消</el-button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right-recommended">
        <div class="recommended-follow">
          <div class="margin-b-20 padding-l-5 recommended-main">作者信息</div>
          <div class="recommended-list">
            <div class="block clearfix margin-b-20">
              <el-button type="primary"
                round
                class="fr font-16 follow-but"
                v-show="articleDetails.uid !== userId"
                :class="articleDetails.is_follow === 1 ? 'is-active': ''"
                @click="onFollow(articleDetails.is_follow,articleDetails.uid)">
                {{articleDetails.is_follow === 1 ? '已关注' : '+ 关注'}}
              </el-button>
              <el-avatar class="fl" :size="40" :src="articleDetails.avatar | onImag"></el-avatar>
              <div class="fl margin-l-10">
                <h3 class="recommended-name title-nowrap hk-cursor" @click="onUserDetail(articleDetails.uid)">{{articleDetails.real_name}}</h3>
                <span class="text-line recommended-name-title title-nowrap margin-b-2">写了423篇文章 · 4.1k赞</span>
              </div>
            </div>
            <!-- 他的创作 -->
            <div class="personal-profile padding-t-20">
              <div class="create margin-b-15 hk-cursor" v-for="(item,index) in newArticles" :key="index" @click="onArticleDetail(item.id)">
                <p class="title-nowrap personal-profile-title">{{item.tittle}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="recommended-topics">
          <div class="margin-b-20 padding-l-5 recommended-main">推荐阅读</div>
          <div class="recommended-list recommended-reading margin-b-19" v-for="(element,index) in recommendedReadingList" :key="index">
            <h3 class="recommended-wemzhang title-nowrap hk-cursor" @click="onArticleDetail(element.id)">{{element.tittle}}</h3>
            <p class="text-line recommended-name-title title-nowrap">阅读 {{element.read_count | NumFormat}}</p>
          </div>
        </div>
      </div>
    </div>
    <reportPopup :report="report" @close="onCloseReportPopup" @report="onArticleReport"></reportPopup>
    <includedTopics :included="included" @close="onCloseIncluded"></includedTopics>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import navigation from "./common/navigation";
import utils from "@/utils/index.js";
import reportPopup from '@/components/popup/report-articles'
import includedTopics from '@/components/popup/included-topics'
import { mapGetters } from 'vuex'
import { getCollegeArticletDetail, articleComment, getArticleCommentList, getLikeArticle, addFollow, recommendedReading, delFollow, articleCommentLike, articleReport} from "@/api/college";

export default {
  filters: {
    timestampToTime(timestamp) {
      if (timestamp !== undefined && timestamp !== '' && timestamp !== null) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + MM + "-" + d;
      }
      return ''
    },
    onImag(value) {
      let circleUrl = require("../../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
    onAddTime (value) {
      var obj = utils.dateFormat(value*1000)
      return obj
    },
    NumFormat(value) {

      if (!value) return ' '

      var intPart = Number(value).toFixed(0) // 获取整数部分

      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

      return intPartFormat
    }
  },
  data() {
    return {
      // imgUrl: "http://cdn.65ph.com/",
      article_id: 0,
      pid: 0,
      // 评论
      comment: '',
      commentSelect: false,
      editoroption: {
        theme: 'bubble',
        modules: {
          toolbar: []
        },
        placeholder: ''
      },
      articleDetails: {},
      newArticles: [],
      containColumn: [],
      recommendedReadingList: [],
      // 赞
      fabulous: 0,
      isLike: 0,
      // 关注
      isFollow: false,
      page_size: 10,
      page: 1,
      commentList: [],
      report:{
        eject:false
      },
      included:{
        eject:false
      },
      replyId: null,
      reply:'',
      arrayLength: 0,
    };
  },
  created() {
    // console.log(this.$route.query.id);
    let that = this;
    if (that.$route.query.id) {
      that.article_id = parseInt(that.$route.query.id);
    }
    this.getArticletDetail();
    this.getCommentList()
    this.onRecommendedReading()
    // console.log('用户id'+this.userId)
    // console.log('判断是否登录')
    // console.log(this.isLogin)
  },
  
  components: {
    navigation,
    quillEditor,
    reportPopup,
    includedTopics
  },
  computed:{
    ...mapGetters({
      isLogin: 'isLogin'
    }),
    userId () {
      if (this.$store.state.app.userInfo) {
       return this.$store.state.app.userInfo.uid
      }
      return ''
    },
    userAvatar () {
      if (this.$store.state.app.userInfo) {
       return 'http://cdn.65ph.com/' + this.$store.state.app.userInfo.avatar
      }
      return require("../../../assets/image/user_img.png");
    },
  },
  methods: {
    // 文章详情
    getArticletDetail() {
      let that = this;
      // console.log(that.article_id);
      getCollegeArticletDetail(that.article_id)
        .then(res => {
          // console.log('文章详情')
          // console.log(res.data);
          if (res.status === 200) {
            // console.log(res.data);
            that.articleDetails = res.data.article
            that.newArticles = res.data.new_articles
            that.containColumn = res.data.contain_column
            // 赞
            that.arrayLength = Object.keys(that.articleDetails).length
            // console.log('详情111',that.length)
            // articleDetails.like_count
            that.fabulous= res.data.article.like_count
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
        });
    },
    // 文章评论列表
    getCommentList(){
      let that = this
      var parameter = {
        article_id: that.article_id,
        page: that.page,
        page_size: that.page_size
      }
      getArticleCommentList(parameter).then(res=>{
        if (res.status == 200) {
          // console.log('评论列表',JSON.stringify(res))
          // console.log('评论列表')
          that.$set(that,'commentList',res.data)
        }
      })
    },
    // 点赞
    onLike (isLike, val) {
      // console.log(val)
      // if (isLike === 0) {
      //   this.isLike = 1
      //   this.fabulous = parseInt(val) + 3
      //   this.getLike()
      // } else if (isLike === 1) {
      //   this.isLike = 0
      //   this.fabulous = parseInt(val) - 3
      // }
      this.fabulous = parseInt(val) + 3
      this.getLike()
    },
    getLike () {
      let that = this
      getLikeArticle(that.article_id).then(res => {
        // console.log(res.data)
      }).catch(res => {
        // console.log('请求报错')
      })
    },
    // 关注
    onFollow (isFollow,uid) {
      let data ={
        type: 10,
        business_id: uid
      }
      if (isFollow === 1) {
        this.onDelFollow(data)
      } else {
        this.onAddFollow(data)
      }
      
    },
    onAddFollow (data) {
      addFollow(data).then(res => {
        if (res.status === 200) {
          // console.log('请求成功')
          this.getArticletDetail()
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          duration: 1000,
          offset: 60,
        })
      })
    },
    // 取消关注
    onDelFollow(data) {
      delFollow(data)
        .then(res => {
          if (res.status === 200) {
            this.getArticletDetail()
            this.$message({
              message: res.msg,
              type: "success",
              showClose: true,
              offset: 60,
              duration: 3000
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              showClose: true,
              offset: 60,
              duration: 3000
            });
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            offset: 60,
            duration: 3000
          });
        });
    },
    onArticleDetail (id) {
      this.$router.push({path: '/front/college/articledetails', query: {id: id}})
      this.article_id = id
      this.getArticletDetail()
    },
    // 跳转专题详情
    onColumnDetail (id) {
      this.$router.push({path: '/front/college/specialdetails', query: {id: id}})
    },
    // 跳转用户详情
    onUserDetail (uid) {
      this.$router.push({path: '/front/college/user', query: {uid: uid}})
    },
    // 文章评论
    onComment(){
      // console.log('文章评论')
      this.pid = 0
      this.text = this.comment
      this.addArticleComment()
    },
    // 评论回复
    onReplyComment(){
      this.text = this.reply
      this.addArticleComment()
    },
    // 添加文章评论
    addArticleComment(){
      var parameter = {
        pid: this.pid,
        article_id: this.article_id,
        text: this.text
      }
      articleComment(parameter).then(res=>{
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000,
            offset: 60,
          })
          this.comment = '',
          this.replyId = null,
          this.reply = ''
          this.getCommentList()
          // console.log('到这里啦没有')
        }
      })
    },
    // 取消发布评论
    onCancel(){
      this.commentSelect = false
    },
    // 取消回复评论
    onReplyCancel(){
      this.replyId = null
      this.reply = ''
    },
    onFocus(){
      // console.log('获取焦点')
      this.commentSelect = true
    },
    // 举报弹框
    onReport (e) {
      this.report.eject = true
    },
    onCloseReportPopup (e) {
      this.report.eject = false
    },
    // 收录文章弹框
    onIncluded (e) {
      // console.log(this.included.eject )
      this.included.eject = true
    },
    onCloseIncluded (e) {
      this.included.eject = false
    },
    // 回复评论
    onReply(id,name){
      this.pid  = id
      this.replyId = id
      console.log('点击回复评论得到的id')
      console.log(id)
      if (name) {
        this.reply = '@'+name
      } else {
        this.reply = ''
      }
    },
    // 点赞评论
    onArticleCommentLike (id) {
      articleCommentLike(id).then(res => {
        if (res.status === 200) {
          console.log('点赞评论请求成功')
          this.getCommentList()
        }
      })
    },
    // 推荐阅读
    onRecommendedReading () {
      let that = this
      recommendedReading().then(res => {
        if(res.status === 200) {
          that.recommendedReadingList = res.data
          // console.log(res.data)
        }
      }).catch(res => {
        // console.log('请求失败')
      })
    },
    // 举报
    onArticleReport(e){
      console.log('参数',e)
      var parameter = {
        article_id: this.article_id,
        inform_reason: e.inform_reason,
        inform_content: e.inform_content
      }
      this.report.eject = false
      articleReport(parameter).then(res=>{
        if (res.status == 200) {
          console.log('举报',res)
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      }).catch((res) => {
        this.$message({
          message: res.msg,
          type: "error",
        });
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import "./article-detail.less";
</style>