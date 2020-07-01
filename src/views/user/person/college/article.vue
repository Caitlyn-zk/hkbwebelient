<template>
  <div class="hk-college-answer">
    <h3 class="line-36">我的文章</h3>
    <ul class="hk-my-answer">
      <li class="hk-my-answer-list padding-tb-15" v-for="(item,index) in 3" :key="item">
        <h3 class="line-46">水土保持怎么做好？</h3>
        <div class="hk-answer-cont">
          <div class="block clearfix">
            <el-avatar class="fl" :size="60" :src="circleUrl"></el-avatar>
            <p class="line-60 fl margin-l-20 font-16">渣渣辉</p>
          </div>
          <p class="line-20">
            <span class="hk-introduce" :class="isShowAll === index ? 'open':'retract'">
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
              氛围好，榜样多，可以独立完成自己的项目
            </span>
            <el-button type="text" @click="Setread(index)">{{isShowAll === index ? '收起' : '阅读全文'}}<i class="el-icon-caret-bottom"></i></el-button>
          </p>
          <div class="hk-button-college">
            <el-button class="hk-coll-agree" round>赞同</el-button>
            <el-button type="text" class="hk-btn-text">
              <i class="el-icon-chat-dot-round"></i>
              <span>评论（300）</span>
            </el-button>
            <el-button type="text" class="hk-btn-text">
              <i class="el-icon-s-promotion"></i>
              <span>分享（300）</span>
            </el-button>
            <el-button type="text" class="hk-btn-text">
              <i class="el-icon-star-off"></i>
              <span>收藏（300）</span>
            </el-button>
            <el-dropdown>
              <el-button round class="hk-coll-btn-q">
                {{showindex === index ? question : operation}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="option in questionOption"
                  :key="option.value"
                  @click.native.prevent="onQuestion(index, option.label)"
                >{{option.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
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
      console.log("判断" + this.openArticle);
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
.hk-college-answer {
  .hk-my-answer {
    .hk-my-answer-list {
      border-top: 1px solid;
    }
    .hk-answer-cont {
      .hk-introduce {
        display: inline-block;
        // width: 80%;
        
      }
    }
  }
}

</style>