<template>
  <div id="root">
    <div class="ant-row">
      <el-row style="width: 100%;height: 100vh;">
        <el-col :span="4" style="height: 100vh">
          <div class="content">
            <div class="return-button">
              <el-button class="return-home-page" @click="onHomePage">回首页</el-button>
            </div>
            <div class="padding-b-10 hk-cursor padding-l-15 line-20" @click="onAnthology(0)">
              <span class="iconfont icon-jia1 font-12"></span>
              <span class="font-14">新增文集</span>
            </div>
            <div class="type-select">
              <div
                v-for="(item,index) in articleType"
                :key="index"
                class="option"
                @click="onSelectType(index,item.id)"
                :class="articleTypeId == index ? 'select':'no'"
              >
                <div class="article-type">{{item.name}}</div>
                <div
                  class="shezhi-button"
                  :class="articleTypeId == index ? 'is-active':'no'"
                  @click="onOpenMenu(index,item.id,item.name)"
                >
                  <i class="el-icon-setting icon"></i>
                  <ul class="shezhi-item" v-if="openMenu && articleTypeId == index">
                    <li class="edit-item" @click="onAnthology(item.id)">
                      <span>
                        <i class="iconfont icon-xiugai1"></i>
                        修改文集
                      </span>
                    </li>
                    <li class="edit-item" @click="onDeleteCollected(item.id)">
                      <span>
                        <i class="el-icon-delete"></i>
                        删除文集
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bottom-select">
              <span class="ant-dropdown-trigger">
                <i class="el-icon-s-fold"></i>
                <span>设置</span>
              </span>
              <span class="help">
                <span>遇到问题</span>
                <i class="el-icon-question"></i>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="20" style="height: 100vh">
          <el-row style="height: 100%;">
            <el-col :span="8" style="height: 100%;">
              <div class="article-add">
                <div class="top-add-article" @click="onTopAddArticle">
                  <i class="el-icon-circle-plus"></i>
                  新建文章
                </div>
                <div class="articl-list">
                  <div
                    v-for="(item,index) in articleList"
                    :key="index"
                    class="article-info"
                    @click="onSelectArticle(index,item.id)"
                    :class="articleIndex == index ? 'articleSelect':'' "
                  >
                    <i class="el-icon-document"></i>
                    <div class="article-block">
                      <div class="article-muster">
                        <div class="title">{{item.tittle}}</div>
                        <div
                          class="text"
                          v-html="articleIndex == index ? detail:''"
                        >{{articleIndex == index ? detail:''}}</div>
                      </div>
                      <!-- <div class="article-edit"
                      :class="articleIndex == index ? 'is-active':'no'"
                      @click="onArticleEditMenu(index,item.id,item.name)">
                        <i class="el-icon-setting icon"></i>
                        <ul class="article-item-bar" v-if="articleEditMenu && articleIndex == index">
                          <li class="edit-item">
                              <span>
                                  <i class="iconfont icon-xiugai1"></i>
                                  修改文集
                              </span>
                          </li>
                          <li class="edit-item">
                              <span>
                                  <i class="el-icon-delete"></i>
                                  删除文集
                              </span>
                          </li>
                        </ul>
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="bottom-add-article" @click="onBottomAddArticle">
                  <i class="el-icon-plus"></i>
                  在下方新建文章
                </div>
              </div>
            </el-col>
            <el-col :span="16" style="height: 100%;">
              <div class="editor">
                <div v-if="articleList.length !== 0">
                  <el-input
                    v-model="articleList[articleIndex].tittle"
                    placeholder="请输入标题"
                    class="title"
                  ></el-input>
                  <div class="publish-articles" @click="onPublishArticles(articleList[articleIndex].id)">发布文章</div>
                  <editor-bar
                    v-model="detail"
                    :isClear="isClear"
                    @change="change"
                    @close="onClose"
                  ></editor-bar>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="add-anthology-box">
      <el-dialog title="请输入新文集名" :visible.sync="centerDialogVisible" width="312px">
        <el-input v-model="anthology_name" placeholder="请输入新文集名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type class="button-add" @click="onCollectedCreate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import EditorBar from "@/components/common/editor-item";
import {
  collegeArticlePublic,
  collectedList,
  createCollected,
  deleteCollected,
  collectedArticleList,
} from "@/api/college";
import { formatDate } from "@/utils/formatDate.js";
export default {
  components: { EditorBar },
  data() {
    return {
      articleTypeId: 0,
      articleIndex: 0,
      articleValue: "",
      isClear: false,
      detail: "",
      // tittle: "",
      brief: "",
      articleList: [],
      cover_image: "",
      screenHeight: document.body.clientHeight,
      articleType: [
        {
          id: 0,
          name: "日记本",
        },
        {
          id: 1,
          name: "随笔",
        },
      ],
      centerDialogVisible: false,
      anthology_name: "",
      openMenu: false,
      collected_id: 0,
      articleEditMenu: false,
      articleId: 0,
      page: 1,
      list_rows: 10,
      articleListLength: 0,
    };
  },
  created() {
    this.getCollectedList();
    this.scrollLoad()
  },
  mounted() {
    // document.addEventListener("scroll", this.scrollLoad);
    this.$nextTick(function () {
      window.addEventListener('scroll', this.scrollLoad)
    })
  },
  
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollLoad);
  },
  methods: {
    // 选择文集
    onSelectType(e, id) {
      this.articleTypeId = e;
      this.collected_id = id;
      this.getCollectedArticleList();
    },
    onSelectArticle(e,id) {
      // console.log('文章列表点击事件')
      // console.log(e,id)
      this.articleIndex = e;
      this.articleId = id
      this.detail = this.articleList[e].text;
    },
    change(html, cover_image, brief) {
      this.cover_image = cover_image;
      this.articleList[this.articleIndex].text = html;
      this.brief = brief;
    },
    onPublishArticles(id) {
      this.articleId = id
      var parameter = {
        id: this.articleId,
        collected_id: this.collected_id,
        tittle: this.articleList[this.articleIndex].tittle,
        text: this.articleList[this.articleIndex].text,
        topic_name: this.articleType[this.articleTypeId].name,
        cover_image: this.cover_image,
        brief: this.brief,
      };
      var date = this.currentDate();
      if (parameter.tittle == date) {
        this.$message({
          message: "请填写文章标题",
          type: "warning",
        });
      } else if (this.brief.length < 100) {
        this.$message({
          message: "文章文本内容个数必须大于或等于100",
          type: "warning",
        });
      } else {
        collegeArticlePublic(parameter).then((res) => {
          if (res.status == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.$router.push({
              path: "/front/college/recommend",
            });
          }
        });
      }
    },
    currentDate() {
      let date = new Date();
      return formatDate(date, "yyyy-MM-dd");
    },
    // 头部新增文章
    onTopAddArticle() {
      var data = {
        id: 0,
        tittle: this.currentDate(),
        text: "",
        topic_name: this.articleType[this.articleTypeId].name,
      };
      this.collected_id = 0
      this.detail = ''
      this.articleList.unshift(data);
      this.$set(this, "isClear", !this.isClear);
    },
    // 底部新增文章
    onBottomAddArticle() {
      var data = {
        id: 0,
        tittle: this.currentDate(),
        text: "",
        topic_name: this.articleType[this.articleTypeId].name,
      };
      this.collected_id = 0
      this.detail = ''
      this.articleList.push(data);
      this.articleIndex = this.articleList.length - 1;
      this.$set(this, "isClear", !this.isClear);
    },
    onClose(e) {
      this.isClear = false;
    },
    onHomePage() {
      this.$router.push({ path: "/front/college/recommend" });
    },
    // 新增or编辑文集按钮
    onAnthology(val) {
      this.collected_id = val;
      this.centerDialogVisible = true;
    },
    // 编辑文集
    onOpenMenu(index, id, name) {
      console.log(index);
      this.collected_id = id;
      this.anthology_name = name;
      if (index == this.articleTypeId) {
        this.openMenu = !this.openMenu;
      }
    },
    // 编辑文章
    // onArticleEditMenu(index, id, name) {
    //   console.log(index);
    //   if (index == this.articleIndex) {
    //     this.articleEditMenu = !this.articleEditMenu;
    //   }
    // },
    // 获取合集列表
    getCollectedList() {
      collectedList().then((res) => {
        if (res.status === 200) {
          console.log("请求成功");
          console.log(res.data);
          this.articleType = res.data;
          this.collected_id = res.data[0].id;
          this.getCollectedArticleList();
        }
      });
    },
    // 新增文集or编辑文集
    onCollectedCreate() {
      let data = {
        id: this.collected_id,
        name: this.anthology_name,
      };
      createCollected(data)
        .then((res) => {
          if (res.status === 200) {
            console.log("新增合集成功！");
            this.getCollectedList();
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.anthology_name = "";
          }
        })
        .catch((res) => {
          this.$message({
            message: res.msg,
            type: "error",
          });
        });
      this.centerDialogVisible = false;
    },
    onDeleteCollected(id) {
      deleteCollected(id)
        .then((res) => {
          if (res.status === 200) {
            console.log("删除成功");
            this.getCollectedList();
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
        })
        .catch((res) => {
          this.$message({
            message: res.msg,
            type: "error",
          });
        });
    },
    getCollectedArticleList() {
      let that = this
      let data = {
        collected_id: this.collected_id,
        page: this.page,
        list_rows: this.list_rows,
      };
      collectedArticleList(data).then((res) => {
        if (res.status === 200) {
          if (that.page > 1) {
            that.$set(that, "articleList", that.articleList.concat(res.data));
            that.articleListLength = that.articleList.length;
          } else {
            that.articleList = res.data;
            that.articleListLength = that.articleList.length
          }
          if (res.data.length > 0) {
            this.detail = this.articleList[this.articleIndex].text;
          }
        }
      });
    },
    scrollLoad() {
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop = document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if ( nowScotop >= scrollHeight - wheight && this.articleListLength / 10 === this.page ) {
        this.$set(this, "page", this.page + 1);
        this.getCollectedArticleList()
      } else if (this.articleListLength / 10 !== this.page) {
        console.log('没有更多数据了')
      }
    },
    // 离开本页面销毁scrollLoad
    clear(path) {
      if (path != "/front/college/article/editor") {
        document.removeEventListener("scroll", this.scrollLoad);
      } else {
        document.addEventListener("scroll", this.scrollLoad);
      }
    },
  },
  watch: {
    $route(to, from) {
      this.clear(to.path);
    },
  },
};
</script>
<style lang="less" scoped>
@import "./editor.less";
</style>