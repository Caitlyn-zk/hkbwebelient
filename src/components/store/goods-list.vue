<template>
  <li class="recommend-goods-list hk-cursor" @click="goodsDetail">
    <div class="list-goods-img">
      <img src="../../assets/image/stoer-goods01.png" alt />
    </div>
    <p class="goods-name title-nowrap-tow margin-t-15 margin-b-10">
      沼气收集利用沼气工程配沼
      沼气收集利用沼气工程配沼
      沼气收集利用沼气工程配沼
      气工程图纸沼气沼
    </p>
    <p class="goods-money-cx">
      <span class="font-14 money title-nowrap">￥45.00</span>
      <span class="text-line sales-volume title-nowrap">
        销量：
        <span class="sales-volume-mun">123</span>
      </span>
    </p>
  </li>
</template>

<script>
export default {
  methods: {
    goodsDetail () {
      this.$router.push({
        path: '/front/goods/detail'
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import './goods-list.less';
</style>