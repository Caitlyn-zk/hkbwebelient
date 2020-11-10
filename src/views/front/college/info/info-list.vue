<template>
  <div class="info-list">
    <div class="college-info-title">全部消息</div>
    <ul class="meun-item">
      <li class="info-list-list" v-for="item in 3" :key="item">
        <h3 class="news-title">你的文章<span class="title">《土壤保护》</span>未能入选专题<span class="title">《ios开发》</span>,继续加油~</h3>
        <p class="padding-t-16 news-time">2020-07-07</p>
      </li>
    </ul>
  </div>
</template>

<script>
// import { addFollowList } from "@/api/college";
export default {
   filters: {
    timestampToTime(timestamp) {
      if (timestamp !== undefined && timestamp !== '' && timestamp !== null) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + MM + "-" + d;
      }
      return ''
    },
  },
  data() {
    return {
      infoAcitve: -1,
    };
  },
  created() {
    
  },
  components: {
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
@import "./info-list.less";
</style>