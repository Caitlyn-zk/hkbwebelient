<template>
  <div>
      <!-- 轮播图 -->
    <!-- <img src="../../assets/image/banner01.jpg"/> -->
      <div class="block">
        <el-carousel
          height="160px"
          arrow="never"
          :interval="interval">
          <el-carousel-item v-for="item in 3" :key="item">
            <div>
              <!-- <img :src="item"/> -->
              <!-- <div>{{item}}</div> -->
              <img style="width=100%" src="../../assets/image/banner02.jpg"/>
              <!-- <img :src="'/static/img/banner0'+item+'.6d9b0a6.jpg'"/> -->
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 中间内容 -->
      <div class="content">
        <div class="hk-content-title">
          <!-- <input type="text" class="ht-search-box"/> -->
          <div style="">
            <el-input placeholder="请输入你想要的内容搜索" v-model="searchinput" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="工程">
                <el-option label="项目" value="1"></el-option>
                <el-option label="小红" value="2"></el-option>
                <el-option label="Tel" value="3"></el-option>
              </el-select>
              <el-button slot="append" class="hk-search-but">搜索</el-button>
            </el-input>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import banner from '../../assets/image/banner01.jpg'
export default {
  name: 'banner',
  data () {
    return {
      interval: 10000,
      searchinput: '',
      select: '',
      dataimage: ['../../assets/image/banner01.jpg', '../../assets/image/banner02.jpg', '../../assets/image/banner03.jpg']
    }
  }
  // components: {
  //   banner
  // }
}
</script>

<style lang="less">
 @import '../../css/public.less';
 @import './css/index.less';
</style>
