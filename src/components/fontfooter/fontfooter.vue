<template>
  <div class="clearfix">
    <div class="hk-footer-main">
      <div class="content clearfix">
        <!-- 二维码 -->
        <div class="fl padding-t-25 text-center">
          <h3 class="line-48 hk-cursor">环科宝</h3>
          <img class="" src="../../assets/image/footer_QR_code.png"/>
          <div class="font-16 text-gray line-46">扫描关注官方微信</div>
        </div>
        <!-- 底部导航 -->
        <ul class="fl padding-t-25 text-center">
          <li class="hk-nav-bar">
            <h4 class="line-48 hk-foooter-title hk-cursor">关于我们</h4>
            <ul class="hk-footer-content text-gray">
              <li class="line-36 hk-cursor">联系我们</li>
              <li class="line-36 hk-cursor">关于我们</li>
              <li class="line-36 hk-cursor">隐私政策</li>
            </ul>
          </li>
          <li class="hk-nav-bar">
            <h4 class="line-48 hk-foooter-title hk-cursor">使用帮助</h4>
            <ul class="hk-footer-content text-gray">
              <li class="line-36 hk-cursor">使用帮助</li>
              <li class="line-36 hk-cursor">网站协议</li>
              <li class="line-36 hk-cursor">网站地图</li>
            </ul>
          </li>
          <li class="hk-nav-bar">
            <h4 class="line-48 hk-foooter-title hk-cursor">使用帮助</h4>
            <ul class="hk-footer-content text-gray">
              <li class="line-36 hk-cursor">免责申明</li>
              <li class="line-36 hk-cursor">版权申明</li>
              <li class="line-36 hk-cursor">版权投诉</li>
            </ul>
          </li>
          <li class="hk-nav-bar">
            <h4 class="line-48 hk-foooter-title hk-cursor">商务合作</h4>
            <ul class="hk-footer-content text-gray">
              <li class="line-36 hk-cursor">广告中心</li>
              <li class="line-36 hk-cursor">商业中心</li>
            </ul>
          </li>
          <li class="hk-nav-bar text-l">
            <h4 class="line-48 hk-foooter-title hk-cursor">联系我们</h4>
            <ul class="hk-footer-content text-gray">
              <li class="line-36 hk-cursor">电话：0851-88888888</li>
              <li class="line-36 hk-cursor">邮箱：471182971@qq.com</li>
              <li class="line-24 font-12 hk-cursor">地址：广东省广州市番禺区市桥街道大北路金悦大厦502室</li>
            </ul>
          </li>
        </ul>
      </div> 
      <div class="hk-footer-main-bar clearfix">
        <div class="content clearfix">
          <div class="fl  padding-l-30 padding-r-100">
            <a class="text-black hk-frides hk-cursor" href="#">友情链接</a>
          </div>
          <span class="hk-footer-foot text-gray  hk-cursor" v-for="item in 5" :key="item">贵州环保局</span>
        </div>
      </div>
    </div>
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

<style lang="less">
  
  @import './fontfooter.less';
</style>
