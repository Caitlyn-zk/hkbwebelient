<template>
  <div class="hk-search-column">
    <ul class="hk-search-colum-list">
      <li class="hk-search-list clearfix" v-for="item in 3" :key="item">
        <el-button class="fr margin-t-16 hk-follow-btu" round>关注专题</el-button>
        <div class="fl">
          <img width="80" src="../../../../assets/image/hk-collegedetils.jpg" alt="">
        </div>
        <div class="hk-search-text fl text-l margin-l-22">
          <div class="font-18 text-blacks">环保</div>
          <p class="line-36 text-line font-14 title-nowrap hk-title-nowrap">如何做一名优秀的环评报告师？</p>
          <div class="text-line font-14">
            <span class="margin-r-15 hk-cursor">583回答</span>
            <span class="hk-cursor">583关注者</span>
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/college/search.less';
</style>