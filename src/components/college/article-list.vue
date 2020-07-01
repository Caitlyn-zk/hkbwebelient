<template>
  <ul>
    <!-- 文章列表 -->
    <li class="hk-college-con-main hk-cursor" v-for="(item, index) in articleList" :key="index">
      <div class="text-l">
        <span class="font-18 padding-r-10" @click="onDetails">{{item.title}}</span>
        <span class="font-16 text-line padding-r-10">{{item.subtitle}}</span>
        <span class="font-16 text-line" v-if="item.add_time !== undefined">{{item.add_time}}</span>
        <span class="font-16 text-line" v-else></span>
      </div>
      <div class="clearfix padding-t-25 hk-college-content">
        <!-- 左边图片以及按钮 渲染时需要判断是否有图片，若没有需要将img移除-->
        <div align="left" v-if="item.img === undefined">
          <img class="hk-colleage-left-bar" align="left" src="../../assets/image/colle_01.jpg" />
        </div>
        <!-- 右边内容 -->
        <div class="hk-college-bar-main" clearfix>
          <p
            id="hk-ocontent"
            class="hk-collega-text text-l line-28 font-14"
            :class="isShowAll === index ? 'open':'retract'"
            >{{item.paragraph}}
          </p>
          <el-button type="text" class="hk-read-btn fr" @click="Setread(index)">{{isShowAll === index ? '收起' : '阅读全文'}}</el-button>
        </div>
      </div>
      <!-- 按钮部分 -->
      <div class="hk-button-college text-l" v-if="isHot">
        <span class="text-line font-16">1933万热度</span>
        <el-button type="text" class="hk-btn-text margin-l-33">
          <i class="el-icon-s-promotion font-18"></i>
          <span class="font-16">分享</span>
        </el-button>
      </div>
      <!-- 按钮部分 -->
      <div class="hk-button-college font-16 text-l" v-else>
        <el-tooltip class="item" effect="dark" :content="'赞同' +item.fabulous" placement="top">
          <el-button class="hk-coll-agree title-nowrap" type round>赞同{{item.fabulous}}</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="'不赞同' +item.badly" placement="top">
          <el-button class="hk-coll-agree title-nowrap" type round>不赞同{{item.badly}}</el-button>
        </el-tooltip>
        <el-button type="text" class="hk-btn-text">
          <i class="el-icon-chat-dot-round font-18"></i>
          <span>评论（300）</span>
        </el-button>
        <el-button type="text" class="hk-btn-text">
          <i class="el-icon-s-promotion font-18"></i>
          <span>分享（300）</span>
        </el-button>
        <el-button type="text" class="hk-btn-text">
          <i class="el-icon-star-off font-18"></i>
          <span>收藏（300）</span>
        </el-button>
        <el-button type="text" class="hk-btn-text">
          <i class="el-icon-warning-outline font-18"></i>
          <span>举报</span>
        </el-button>
        <!-- <el-button type="text" class="hk-btn-text" >
          <i class="iconfont icon-xihuan font-18"></i>
          <span>喜欢</span>
        </el-button> -->
        <el-dropdown v-if="item.add_time !== undefined">
          <el-button round class="hk-coll-btn-q">
            {{operation}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="option in operationOption"
              :key="option.value"
              @click.native.prevent="onOption(option.value, option.label)"
            >{{option.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-else>
          <el-button round class="hk-coll-btn-q">
            {{question}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="option in questionOption"
              :key="option.value"
              @click.native.prevent="onQuestion(option.value, option.label)"
            >{{option.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    articleList: Array
  },
  data() {
    return {
      openArticle: false,
      isShowAll: null,
      active: "0",
      showindex: 1,
      isHot: false,
      operation: "其他操作",
      question: "其他操作",
      operationOption: [
        {
          value: 1,
          label: "其他操作"
        },
        {
          value: 2,
          label: "不感兴趣"
        }
      ],
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
    };
  },
  created () {
    let path =  this.$router.currentRoute.path
    if (path == '/front/college/home/hotlist') {
      this.isHot = true
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
    onOption(id, name) {
      this.operation = name;
    },
    onQuestion(id, name) {
      this.question = name;
    },
    onDetails() {
      // console.log('跳转详情')
      this.$router.push({ path: "/front/college/question/answer" });
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.hk-college-con-main {
  width: 862px;
  min-height: 345px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  // padding: 20px;
  padding: 20px 20px 0;
  position: relative;
  margin-bottom: 12px;
  margin-right: 0;
  .hk-button-college {
    // position: absolute;
    line-height: 70px;
    // bottom: 20px;
    .el-button {
      font-size: 16px;
      &.hk-coll-agree {
        overflow: hidden;
        width: 90px;
        padding: 0 10px;
      }
    }
  }
  .hk-college-bar-main {
    height: 100%;
  }
  .hk-btn-text {
    // margin-right: 10px;
    &.el-button--text {
      color: #333;
    }
    &.el-button--text:hover {
      color: #51d3aa;
    }
  }
  .el-tabs @{deep} .el-tabs__nav-wrap {
    background: transparent;
    margin-top: 7px;
  }
  .hk-coll-btn-q {
    height: 30px;
  }
  .hk-coll-btn-q.el-button.is-round {
    padding: 5px 20px;
    background: #f5f5f5;
  }
  .hk-coll-btn-q.el-button.is-round:hover {
    background: #e2e2e2;
    color: #51d3aa;
    border: 1px solid #e2e2e2;
  }
  .hk-collega-text {
    letter-spacing: 1px;
  }
  .collega-text {
    text-align: left;
  }
  .open {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 12;
    -webkit-box-orient: vertical;
  }
  .retract {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .hk-college-content {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .hk-colleage-left-bar {
    width: 200px;
    height: 200px;
    margin-right: 30px;
    border: 1px dashed #f7f7f7;
    background-color: #f7f7f7;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .hk-read-btn {
    padding: 0;
  }
}
</style>