<template>
  <div class="submit-request">
    <div class="college-info-title">全部投稿请求</div>
    <div class="">
      <div class="whole hk-cursor" @click="onWhole">
        <span class="whole-icon">
          <i class="iconfont icon-tuihuiqingqiu font-22"></i>
        </span>
        <span class="whole-text">全部未处理请求</span>
      </div>
      <ul class="included">
        <li class="clearfix included-list" v-for="(pops,index) in containColumn" :key="index">
          <div class="included-list-bar">
            <img
              width="50"
              height="50"
              class="included-list-img"
              :src="pops.cover_image | onImag"
              alt
            />
            <div class="hk-included-cont">
              <h4 class="hk-included-cont-title padding-b-9 padding-t-3 hk-cursor"  @click="onColumnDetail(pops.column_id)">{{pops.name}}</h4>
              <p class="text-line hk-included-cont-contet title-nowrap">{{pops.desc}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    onImag(value) {
      let circleUrl =require("../../../../assets/image/loading.png");
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
  },
  data () {
    return {
      containColumn: [
        {
          column_id: 1,
          name: "怎么做一个合格的环评工程师？",
          cover_image: "cert/202007061200035198902683.jpg",
          desc:
            "有1个投稿未处理，请尽快处理"
        },
        {
          column_id: 3,
          name: "物镜系统",
          cover_image: "cert/202007061200035198902683.jpg",
          desc:
            "有1个投稿未处理，请尽快处理"
        }
      ],
    }
  },
  created () {},
  methods: {
     // 跳转专题详情
    onWhole (id) {
      this.$router.push({path: '/front/college/info/submitrequest/manage'})
    },
    onColumnDetail() {
      console.log('点击了一下')
      this.$router.push({path: '/front/college/info/submitrequest/manage'})
    }
  }
}
</script>

<style lang="less" scoped>
@import './submit-request.less';
</style>