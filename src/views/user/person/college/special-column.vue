<template>
  <div class="hk-special-column">
    <div class="hk-special-column-title">
      <span>我的专栏</span>
    </div>
    <ul class="hk-special-column-list">
      <li class="hk-special-column-lists clearfix" v-for="item in 3" :key="item">
        <el-button class="fr">16篇观点</el-button>
        <div class="fl">
          <img width="200" src="../../../../assets/image/colle_01.jpg" alt="">
        </div>
        <div class="fl hk-special-column-text margin-l-20">
          <div class="font-18 line-36">水土保持怎么做才好？</div>
          <p class="retract line-20 font-14 line-36">水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？水土保持怎么做才好？</p>
          <div class="font-12 text-line">
            <span>已有2547人关注</span>
          </div>
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
  .hk-special-column {
    .hk-special-column-title {
      line-height: 46px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid #ccc;
    }
    .hk-special-column-list {
      .hk-special-column-lists {
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
        .retract {
          height: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .hk-special-column-text {
          width: 54%;
        }
      }
    }
  }
</style>