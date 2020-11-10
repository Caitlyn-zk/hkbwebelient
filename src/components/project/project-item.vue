<template>
  <div class="project-info-muster" @click="onProjectDetails(item)">
    <div class="project-info-left">
      <div class="project-name">{{item.name}}</div>
      <div class="org-name">发布机构：{{item.org_name}}</div>
      <div class="release-time">{{item.last_time | formatDate}}</div>
    </div>
    <div class="project-info-center">{{item.cate_name}}</div>
    <div class="project-info-right">
      <div class="amount-of-money">{{item.fund_rang | onFundRang}}</div>
      <div class="address">{{item.area1_name}}</div>
    </div>
  </div>
</template>
<script>
import { fundRang } from "@/config/constant";
import utils from "@/utils/index.js";
import { formatDate } from "@/utils/formatDate.js";
export default {
  filters: {
    onFundRang(value) {
      var obj = utils.findObj(fundRang, value);
      return obj.label;
    },
    formatDate(value) {
      var value = value * 1000;
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  data() {
    return {};
  },
  props: { item: Object },
  methods: {
    onProjectDetails(item) {
      this.$emit("details", item);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./project-item.less";
</style>