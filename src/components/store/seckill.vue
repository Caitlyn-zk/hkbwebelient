<template>
  <div class="group-main content">
    <div class="stoer-title">
      <h3 class="title-name">
        <span class="margin-r-15">限时秒杀</span>
        <span class="seckill-time">
          <countDown v-if="endTime.length > 0" :endTime="endTime"></countDown>
        </span>
      </h3>
      <el-button class="title-see-more" type="text">
        查看更多
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <div class="group-conetent">
      <div class="group-image">
        <img width="100%" src="../../assets/image/ad-banner-c04.jpg" alt />
      </div>
      <!-- v-on:mouseover="stopmove()" -->
      <div class="rotation-main">
        <!-- 左边按钮 -->
        <div class="group-goods-next margin-l-22" @click="onNext">
          <i class="next el-icon-arrow-left"></i>
        </div>
        <div class="containt-list">
          <!-- v-on:mouseout="move()" v-on:mouseover="stopmove()"-->
          <ul
            class="group-goods-list"
            :style="{'left':calleft + 'px', 'width': timeList.length * 185 + 'px'}"
            style="transition: all 1.3s ease 0.15s;"
            
          >
            <li class="content-right-goods" v-for="item in timeList" :key="item" @click="onGoodsDetails">
              <div class="goods-img">
                <img src="../../assets/image/stoer-goods01.png" alt />
                <!-- 小图标 -->
                <div class="min-img-icon">
                  <img src="../../assets/image/seckill.png" alt />
                </div>
              </div>
              <p
                class="goods-name title-nowrap text-center margin-t-6"
              >{{item}}沼气收集利用厂家介绍沼气工程配套施工方案图纸</p>
              <p class="goods-money-cx line-26 text-center">
                <span class="font-14">￥45.00</span>
                <span class="be-overdue">￥69.99</span>
              </p>
            </li>
          </ul>
        </div>
        <!-- 右边按钮 -->
        <div class="group-goods-next margin-r-20" @click="onPrev">
          <i class="next el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countDown from "@/components/store/count-down.vue";
export default {
  data() {
    return {
      timeList: [1,2,3,4,5,6,7,8,9],
      endTime: "1599858600000",
      calleft: 0
    };
  },
  created() {
    // this.move();
  },
  components: {
    countDown
  },
  methods: {
    //移动
    // move() {
    //   this.timer = setInterval(this.starmove, 5000);
    // },
    //开始移动
    // starmove() {
    //   this.calleft -= 185;
    //   if (this.calleft <= -740) {
    //     this.calleft = 0;
    //   }
    // },
    //鼠标悬停时停止移动
    // stopmove() {
    //   clearInterval(this.timer);
    // },
    //点击按钮左移
    onNext() {
      let width = this.timeList.length * 185 
      // console.log(width)
      let sped = width - 925 + this.calleft
      if ( sped > 0) {
        this.calleft -= 185;
      } else {
        this.calleft = this.calleft;
      }
      // console.log(this.calleft)
      // if (this.calleft < -740) {
      //   this.calleft = 0;
      // }
    },
    //点击按钮右移
    onPrev() {
      let width = this.timeList.length * 185 
      // console.log(width)
      let sped = width - 925 + this.calleft
      if ( this.calleft < 0) {
        this.calleft += 185;
      } else {
        this.calleft = this.calleft;
      }
      // if (this.calleft > 0) {
      //   this.calleft = -740;
      // }
    },
    // 跳转详情
    onGoodsDetails(){
      this.$router.push({path:'/front/goods/detail'})
    }
  }
};
</script>

<style lang="less" scoped>
@import './seckill.less';
</style>