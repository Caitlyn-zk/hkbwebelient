<template>
  <div class="hk-college-dynamic">
    <ul class="hk-college-dynamic-content">
      <li class="hk-mechanism">
        <div class="clearfix">
          <span class="fr">2019.9</span>
          <h3 class="fl">关注了机构</h3>
        </div>
        <p class="line-36 font-14">播州区环保局</p>
      </li>
      <li class="hk-topic-list" v-for="item in 4" :key="item">
       <h3 class="">关注了话题</h3>
        <div class="hk-topic-cont clearfix padding-t-10">
          <div class="fr margin-t-15">2020.2</div>
          <img class="fl" width="80px" src="../../../../assets/image/colle_01.jpg" alt="">
          <p class="fl margin-l-20 font-16">水土保持怎么做</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.hk-college-dynamic {
  .hk-college-dynamic-content {
    .hk-mechanism {
      border: 1px solid #ccc;
      padding: 10px 20px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .hk-topic-list {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px 20px;
      margin-bottom: 10px;
    }
  }
}
</style>