<template>
  <div class="clearfix">
    <!-- 专栏列表 -->
    <div class="hk-specialcolumn fl shows" v-for="item in specialColumnList" :key="item.id">
      <!-- <div class="hk-specialcolumn-img text-center">
        <img src="../../assets/image/colle_01.jpg" alt="0">
      </div>-->
      <div class="block">
        <el-avatar :size="99" :src="circleUrl"></el-avatar>
      </div>
      <h3 class="line-50 hk-item-title">{{item.title}}</h3>
      <p class="line-30 title-nowrap-tow hk-introduce">{{item.introduce}}</p>
      <p class="text-center line-50 text-line font-14">{{item.add_time}}天前更新 <span class="hk-follow-num title-nowrap">{{item.attention}}</span>关注</p>
      <router-link to="/front/college/find/specialdetails">
        <el-button round class="hk-see-speciakcolumn">查看专题</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specialColumnList: Array
  },
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  }
};
</script>

<style lang="less">
.hk-specialcolumn {
  background: #fff;
  width: 224px;
  height: 324px;
  padding: 25px 20px 8px;
  margin: 0 20px 17px 0;
  font-family:Microsoft YaHei;
  &:first-child {
    margin-left: 0px;
  }
  &:nth-child(5n) {
    margin-right: 0;
  }
  .hk-item-title {
    // width:76px;
    font-size:18px;
    font-weight:bold;
    color:rgba(51,51,51,1);
  }
  .hk-introduce {
    width: 100%;
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:23px;
  }
  .hk-see-speciakcolumn {
    width:128px;
    height:34px;
    border:1px solid rgba(5,215,151,1);
    padding: 0;
    line-height: 33px;
    text-align: center;
    color: #0BD094;
  }
  .hk-follow-num {
    display: inline-block;
    max-width: 72px;
    line-height: 1;
    margin-left: 5px;
    vertical-align: -3px;
  }
}
</style>