<template>
  <div class="fl hk-list-add">
    <div class="hk-right-list shows" v-for="(item, index) in zbxm" :key="index">
        <div class="hk-title-bar public-title-bar title-nowrap" :class="item !== 0 ? '' : 'bg'" @click="onProDetail(item)">{{item.name}}</div>
        <div class="clearfix">
          <div class="fr hk-list-location">
            <span class="margin-r-10 hk-list-area-name title-nowrap" :class="item !== 0 ? '' : 'bg'">{{item.area2_name === "市辖区" ? item.area1_name: item.area2_name}}</span>
            <span class="hk-list-time" :class="item !== 0 ? '' : 'bg'">{{item.last_time}}</span>
          </div>
          <span class="fl hk-salary public-post-salary" :class="item !== 0 ? '' : 'bg'">{{item.fund_rang | onFundRang}}</span>
        </div>
      <!-- <router-link :to="{path:'/front/project/detail',query:{proid:item.proid}}"></router-link> -->
    </div>
  </div>
</template>

<script>
import { fundRang } from "@/config/constant";
import utils from "@/utils/index.js";
import {formatDate} from '@/utils/formatDate.js'
import { mapMutations, mapGetters } from "vuex";
import cookie from '@/utils/store/cookie'
export default {
  filters: {
    onFundRang (value) {
      var obj = utils.findObj(fundRang, value)
      return obj.label
    },
  },
  data () {
    return {

    }
  },
  props:{zbxm:Array},
  created () {
    //初始化职位访问记录
    this.INIT_PRO_RECORD();
  },
  computed: {
    // ...mapGetters({
    //   proVistRecord: "proVistRecord"
    // })
  },
  methods: {
    ...mapMutations(["INIT_PRO_RECORD", "ADD_PRO_RECORD"]),
    // 项目 跳转项目详情
    onProDetail (val) {
      if(val !== 0)
      {
          // console.log(val)
          this.ADD_PRO_RECORD({
            pro_id: val.proid,
            org_name: val.org_name,
            pro_name: val.name,
            fundRangValue: val.fund_rang,
            area1_name: val.area1_name
          });
          this.$router.push({ path: "/front/project/detail",query: {proid: val.proid}});
      }
      
    },
  }
}
</script>

<style lang="less" scoped>

.hk-list-add {
    width: 1046px;
    height: 327px;
    overflow: hidden;
    .hk-right-list {
        display: inline-block;
        width: 33%;
        margin-bottom: 10px;
        width:342px;
        display: inline-block;
        height:101px;
        background:rgba(255,255,255,1);
        border-radius:4px;
        margin-right: 10px;
        padding: 0 20px;
        &:nth-child(3n) {
            margin-right: 0;
        }
        .hk-title-bar {
            width:302px;
            height: 20px;
            margin: 20px 0;
            // line-height: 60px;
            cursor: pointer;
        }
        .hk-list-location {
            display: flex;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            // line-height: 45px;
            color:rgba(102,102,102,1);
            .hk-list-area-name {
              display: inline-block;
              min-width: 100px;
              height: 18px;
              max-width: 100px;
              // height: 45px;
            }
            .hk-list-time {
              min-width: 60px;
              height: 18px;
            }
        }
        .hk-salary {
          min-width: 70px;
          height: 18px;
        }
    }
}

</style>