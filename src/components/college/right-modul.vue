<template>
  <div class="hk-college-draft">
    <div class="hk-coll-draft-bar padding-25">
      <div class="text-center">
        <router-link to="/front/college/question/details">
          <el-button class="hk-coll-btn-main font-16" round>写回答</el-button>
        </router-link>
        <router-link to="/front/college/home/writeanarticle">
          <el-button class="hk-coll-btn-main font-16" round>写文章</el-button>
        </router-link>
        <router-link to="/front/college/find/specialcolumn">
          <el-button class="hk-coll-btn-main font-16" round>专栏</el-button>
        </router-link>
      </div>
      <ul class="hk-college-huida">
        <li class="hk-con-lenet clearfix hk-cursor" @click="onAnswerLater">
          <span class="fl font-16">稍后答</span>
          <i class="fr line-50 text-line el-icon-caret-right"></i>
        </li>
        <li class="hk-con-lenet clearfix hk-cursor" @click="onDrafts">
          <span class="fl font-16">我的草稿</span>
          <i class="fr line-50 text-line el-icon-caret-right"></i>
        </li>
      </ul>
    </div>
    <div class="hk-coll-draft-bar padding-lr-25">
      <ul accordion class="hk-college-huida margin-t-20 text-l">
        <li class="hk-con-lenet">
          <router-link class="text-blacks" to="/front/college/home/collect">我的收藏</router-link>
        </li>
        <li class="hk-con-lenet">
          <router-link class="text-blacks" to="/front/college/question/concerns">我关注的问题</router-link>
        </li>
        <li class="hk-con-lenet">
          <router-link class="text-blacks" to="/front/college/question/invitation">我的邀请</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
   data() {
    return {
    };
  },
  created() {
  },
  methods: {
    // 稍后答
    onAnswerLater() {
      this.$router.push({ path: "/front/college/question/answerLater" });
    },
    // 我的草稿箱
    onDrafts() {
      this.$router.push({ path: "/front/college/home/drafts" });
    }
  }
}
</script>

<style lang="less" scoped>
// 右边写作发帖
  .hk-college-draft {
      height: 100%;
      .hk-coll-draft-bar {
          background: #fff;
          height: 345px;
          width: 320px;
          overflow: hidden;
          margin-bottom: 10px;
      }
      .hk-coll-btn-main.el-button.is-round {
          height:35px;
          padding: 10px 20px;
          background:rgba(243,243,243,1);
          border-radius:22px;
      }
      .hk-coll-btn-main.el-button.is-round:hover {
          color: #49c49d;
          border-color: #f5f5f5;
      }
      .hk-college-huida {
          &.el-collapse {
              border: none;
              .el-collapse-item__arrow {
                  display: none;
              }
          }
          .hk-con-lenet {
              height: 57px;
              width: 100%;
              display: inline-block;
              line-height: 57px;
              font-size: 16px;
              color: #333;
              letter-spacing: 2px;
              height: 57px;
              line-height: 57px;
              border-bottom: 1px solid #E2E2E2;
          }
      }
  }
  
</style>