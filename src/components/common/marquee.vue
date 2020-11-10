<template>
  <div class="marquee">
    <div class="marquee_title">
      <span class="iconfont icon-gonggao notice-rec-title"></span>
      <span class="notice-rec-option"> 公告：</span>
    </div>
    <div class="marquee_box">
      <ul class="marquee_list" :class="{marquee_top:animate}">
        <li v-for="(item,index) in marqueeList" :key="index" @click="onNotice" class="notice-name">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 上下滚动
      animate: false,
      marqueeList: [
        {
          value: 1,
          name: '恭喜华源科技入驻环科宝'
        },{
          value: 2,
          name: '恭喜艾玛入驻环科宝'
        },{
          value: 3,
          name: '恭喜广州行度人工智能入驻环科宝'
        }, {
          value: 4,
          name: '恭喜环能环保入驻环科宝'
        }
      ],
    }
  },
  created () {
    // 滚动定时器
    setInterval(this.showMarquee, 3000);
  },
  methods: {
    showMarquee: function() {
      this.animate = true;
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0]);
        this.marqueeList.shift();
        this.animate = false;
      }, 500);
    },
    onNotice(){
      // this.$router.push({path:'/ad'})
    }
  }
}
</script>

<style lang="less" scoped>
 // 滚动
  .marquee {
    width: 100%;
    min-height: 30px;
    align-items: center;
    border: 1px solid #fc8c3d;
    background: #fff7dd;
    color:rgba(102,102,102,1);
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    .marquee_title {
      padding-left: 20px;
      height: 21px;
      font-size: 14px;
      // border-right: 1px solid #d8d8d8;
      align-items: center;
      .notice-rec-title{
        color: #fbb72e;
      }
      .notice-rec-option {
        display: inline-block;
        width: 60px;
        font-size: 16px;
        margin-left: 10px;
        color:#333;
      }
    }
    .marquee_box {
      display: block;
      position: relative;
      width: 60%;
      height: 30px;
      overflow: hidden;
      .marquee_list {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        &.marquee_top {
          transition: all 0.5s;
          margin-top: -30px;
        }
        li {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          cursor: pointer;
          width: 100%;
          // border: 1px solid red;
        }
        li span {
          padding: 0 2px;
        }
      }
    }
  }
</style>
