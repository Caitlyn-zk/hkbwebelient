<template>
  <div class="environmental-protection-content">
    <div class="environmental-protection-ad">
      <div class="env-prot-ad">
        <img :src="conetnData.imgUrl" alt />
      </div>
      <div class="protection-menu">
        <h3 class="text-center protec-menu-title">
          <i class="el-icon-minus"></i>
          <span>{{conetnData.name}}</span>
          <i class="el-icon-minus"></i>
        </h3>
        <ul class="protection-main padding-lr-10 margin-t-8">
          <li class="protection-item title-nowrap" v-for="item in 8" :key="item">空气净化</li>
        </ul>
      </div>
    </div>
    <!-- 中间商品 -->
    <div class="protection-goods-list">
      <div class="goods-top-list">
        <!-- <div class="content-right-goods content-left-goods">
          <div class="goods-img">
            <img src="../../assets/image/stoer-goods01.png" alt />
          </div>
          <div class="protection-goods-title padding-l-27">
            <div class="center-bar">
              <p class="goods-name title-nowrap-tow">沼气收集利用厂家介绍沼气工程配套施工方案图纸</p>
              <p class="goods-money-cx">
                <span class="font-14 text-bold line-26">￥45.00</span>
              </p>
            </div>
          </div>
        </div> -->
        <div class="content-right-goods" v-for="(item,index) in 5" :key="item" :class="index === 0 ? 'content-left-goods': ''">
          <div class="goods-img">
            <img src="../../assets/image/stoer-goods-02.png" alt />
          </div>
          <div v-if="index !== 0">
            <p class="goods-name title-nowrap">沼气收集利用厂家介绍沼气工程配套施工方案图纸</p>
            <p class="goods-money-cx">
              <span class="font-14 text-bold line-26">￥45.00</span>
            </p>
          </div>
          <div class="protection-goods-title padding-l-27" v-else>
            <div class="center-bar">
              <p class="goods-name title-nowrap-tow">沼气收集利用厂家介绍沼气工程配套施工方案图纸</p>
              <p class="goods-money-cx">
                <span class="font-14 text-bold line-26">￥45.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="protection-right">
      <h3 class="text-center protec-menu-title">
        <i class="el-icon-minus"></i>
        <span>热卖单品</span>
        <i class="el-icon-minus"></i>
      </h3>
      <ul class="protection-list padding-t-30">
        <li class="list-bar margin-b-30" v-for="item in 5" :key="item">
          <span class="list-goods-img">
            <img :src="hotGoodImg" alt />
          </span>
          <div class="list-goods-title padding-l-9">
            <p class="goods-name title-nowrap">沼气收集利用厂家介绍沼气工程配套施工方案图纸</p>
            <p class="goods-money-cx">
              <span class="font-14 text-bold">￥45.00</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conetnData: {}
  },
  data () {
    return {
      hotGoodImg: require("../../assets/image/loading.png"),
    }
  }
};
</script>

<style lang="less" scoped>
@import './environment.less';
</style>