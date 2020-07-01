<template>
  <div class="hk-right-module">
    <ul class="hk-right-module-list">
      <li class="hk-right-module-title">
        <div class="hk-browse-bar hk-cursor" v-for="item in college" :key="item.id">
          <p class="hk-borwse-title">{{item.title}}</p>
          <span class="hk-brouse-number">{{item.views}}</span>
        </div>
      </li>
      <li class="hk-right-module-lists">
        <div class="hk-topic-list clearfix" v-for="item in 3" :key="item">
          <span class="fr hk-topic-record title-nowrap text-r">341</span>
          <span class="hk-topoc-title title-nowrap">关注的话题</span>
        </div>
        <div class="hk-person-vews">
          个人主页被浏览98次
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      college: [{
        id: 1,
        title: '关注了',
        views: 98
      }, {
        id: 2,
        title: '关注着',
        views: 98
      }],
    }
  }
}
</script>

<style lang="less" scoped>
.hk-right-module {
  border: 1px solid #ccc;
  .hk-right-module-list {
    width: 300px;
    .hk-right-module-title {
      // height: 100px;
      padding: 20px 0;
      .hk-browse-bar {
        display: inline-block;
        width: 50%;
        letter-spacing: 2px;
        font-size:18px;
        font-weight:400;
        text-align: center;
        color:rgba(51,51,51,1);
        // padding-bottom: 32px;
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: none;
        }
        &:hover {
          .hk-borwse-title {
            color: #0BD094;
          }
          .hk-brouse-number {
            color: #0BD094;
          }
        }
        .hk-borwse-title {
          font-size:16px;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .hk-brouse-number {
          font-size:24px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height: 50px;
        }
      }
    }
    .hk-right-module-lists {
      background: #E9E9E9;
      padding: 0 20px;
      color: #333;
      border-top: 1px solid #ccc;
      .hk-topic-list {
        width: 100%;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        .hk-topic-record  {
          display: inline-block;
          width: 20%;
        }
        .hk-topoc-title {
          display: inline-block;
          width: 80%;
        }
      }
      .hk-person-vews {
        height: 50px;
        color: #999;
        font-size: 16px;
        line-height: 50px;
      }
    }
  }
  
}
</style>