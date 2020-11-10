<template>
  <div class="hk-cityselect-main clearfix">
    <el-button type="text" class="line-30 hk-All-city-but" @click="onReport">全部城市</el-button>
    <ul class="clearfix hk-cityselect-list">
      <div class="fl hk-select-city-main margin-r-10">
        <span class="hk-select-city title-nowrap">{{citySelectPop.selected.area_name}}</span>
        <i class="el-icon-arrow-right padding-l-10"></i>
      </div>
      <span>热门城市：</span>
      <li
        class="hk-hot-city"
        v-for="(item, index) in hotCityList"
        :key="index"
        @click="onSelectHotCity(item.code, item.area_name)"
      >{{item.area_name}}</li>
    </ul>
    <citySelectPopup
      :citySelect="citySelectPop"
      @close="onCloseReportPopup"
      @citySelect="onCityPop"
    ></citySelectPopup>
  </div>
</template>

<script>
import citySelectPopup from "@/components/popup/cityselect-popup";
import { cityList } from "@/config/city";
export default {
  data() {
    return {
      citySelectPop: {
        eject: false,
        selected: {
          code: 0,
          area_name: "全国",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0
        }
      },
      hotCityList: cityList.hotCityList
    };
  },
  components: {
    citySelectPopup
  },
  mounted() {
    // console.log("选择" +this.citySelectPop.selected.name)
    // this.$emit('onCity',this.citySelectPop.selected)
  },
  methods: {
    onSelectHotCity(code, area_name) {
      this.$emit("onCity", area_name, code);
      this.citySelectPop.selected.area_name = area_name;
    },
    // 打开弹框
    onReport(e) {
      this.citySelectPop.eject = true;
    },
    onCloseReportPopup(e) {
      this.citySelectPop.eject = false;
    },
    onCityPop(data) {
      this.$emit(
        "onCity",
        this.citySelectPop.selected.area_name,
        this.citySelectPop.selected.code
      );
    }
  },
  watch: {
    selected() {
      // console.log("选择" +this.citySelectPop.selected.name)
      // this.$emit('onCity',this.citySelectPop.selected)
    }
  }
};
</script>

<style lang="less" scoped>
.hk-cityselect-main {
  // border-bottom: 1px solid #999;
  width: 100%;
  height: 100%;
  position: relative;
  .hk-cityselect-list {
    width: 100%;
    height: 58px;
    line-height: 58px;
    .hk-hot-city {
      display: inline-block;
      padding: 0 12px;
      cursor: pointer;
      &:hover,
      &:focus {
        color: #0bd094;
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
        vertical-align: 24px;
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
