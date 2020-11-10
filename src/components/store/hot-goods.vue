<template>
  <li class="items-main">
    <div class="hot-good-img">
      <img :src="hotGoodImg" alt="">
    </div>
    <p class="items-goods-name margin-b-10 title-nowrap-tow">
      沼气收集利用沼气工程配套施工方案图纸dfgsdfg俺回来的泛滥的
    </p>
    <p class="items-goods-money">
      <span class="money">￥45.00</span>
    </p>
  </li>
</template>

<script>
export default {
  data() {
    return {
      hotGoodImg: require("../../assets/image/loading.png"),
    }
  },
  created() {},
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import 'hot-goods';
</style>