<template>
  <div class="hk-cityselect-main clearfix">
    <ul class="clearfix hk-cityselect-list">
      <li
        class="hk-hot-city"
        v-for="(item, index) in hotCityList"
        :key="index"
        @click="onSelectHotCity(item.code, item.name)"
        :class="select === item.code ? 'selection-color':''"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { province } from "@/config/province";
export default {
  data() {
    return {
      select: '0',
      selected: {
        code: '0',
        area_name: "全国",
        tip: null,
        subLevelModelList: null,
        firstChar: null,
        pinyin: null,
        rank: 0
      },
      hotCityList: province.data
    };
  },
  mounted() {
  },
  methods: {

    onSelectHotCity(code, area_name) {
      // console.log(code, area_name);
      this.select = code
      this.$emit("onCity", area_name, code);
      this.selected.area_name = area_name;
    },
    onCityPop(data) {
      // console.log(data);
      this.$emit(
        "onCity",
        this.selected.area_name,
        this.selected.code
      );
    }
  },
  watch: {
    selected() {
    }
  }
};
</script>

<style lang="less" scoped>
.hk-cityselect-main {
  width: 100%;
  height: 100%;
  position: relative;
  .hk-cityselect-list {
    width: 100%;
    height: 46px;
    line-height: 46px;
    .hk-hot-city {
      display: inline-block;
      padding:0 20px;
      cursor: pointer;
      &:hover,
      &:focus {
        color: #0bd094;
      }
      &.selection-color{
        color: #06BE86;
      }
    }
    .hk-select-city-main {
      max-width: 100px;
      height: 100%;
      .hk-select-city {
        display: inline-block;
        max-width: 60px;
        height: 100%;
        color: #0bd094;
      }
      i {
        vertical-align: 13px;
      }
    }
  }
  // 全部城市按钮
  .hk-All-city-but {
    // color: #333;
    position: absolute;
    right: 10px;
    bottom: 0px;
    &:hover,
    &:focus {
      color: #0bd094;
    }
  }
}
</style>
