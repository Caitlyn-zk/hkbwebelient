<template>
  <div class="hk-reportPopup">
    <!-- 城市弹框 -->
    <el-dialog :visible.sync="citySelect.eject" title="请选择城市" width="786px">
      <div class="hk-cityselect-popup">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">热门城市</el-menu-item>
          <el-menu-item index="2">ABCDE</el-menu-item>
          <el-menu-item index="3">FGHJ</el-menu-item>
          <el-menu-item index="4">KLMN</el-menu-item>
          <el-menu-item index="5">PQRST</el-menu-item>
          <el-menu-item index="6">WXYZ</el-menu-item>
        </el-menu>
      </div>
      <div class="hk-city-body" v-if="index !== '1'" >
        <div class="clearfix hk-city-main" v-for="(item,index) in rewriteCity" :key="index">
          <div class="hk-firstchar fl">{{item.firstChar}}</div>
          <div class="fl hk-option-city">
            <span
              v-for="pops in item.cityList" :key="pops.code"
              class="hk-option fl title-nowrap"
              @click="onCity(pops.code, pops.area_name)"
            >{{pops.area_name}}
            </span>
          </div>
        </div>
      </div>
      <div class="hk-city-body" v-else>
        <span
          v-for="(item,index) in hotCityList"
          :key="index"
          class="hk-option"
          @click="onCity(item.code, item.area_name)"
        >{{item.area_name}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { cityList } from '@/config/city'
export default {
  props: {
    citySelect: {}
  },
  data() {
    return {
      city: cityList,
      activeIndex: "1",
      rewriteCity: [],
      cityGroup: [],
      index: "1",
      hotCityList: []
    };
  },
  created() {
    this.loopCity();
  },
  mounted() {},
  methods: {
    loopCity() {
      // console.log(this.city)
      this.hotCityList = this.city.hotCityList
      this.cityGroup = this.city.cityGroup
      // console.log(this.cityGroup)
    },
    handleSelect(val) {
      this.index = val
      let renderCity = [];

      if (val === '2') {
        console.log(this.cityGroup.A)
        this.rewriteCity = []
        this.rewriteCity.push(
          this.cityGroup.A,this.cityGroup.B,this.cityGroup.C,this.cityGroup.D, this.cityGroup.E
        )
      } else if (val === '3') {
        this.rewriteCity = []
        this.rewriteCity.push(
          this.cityGroup.F,this.cityGroup.G,this.cityGroup.H,this.cityGroup.J
        )
      } else if (val === '4') {
        this.rewriteCity = []
        this.rewriteCity.push(
          this.cityGroup.K,this.cityGroup.L,this.cityGroup.M,this.cityGroup.N
        )
      }  else if (val === '5') {
        this.rewriteCity = []
        this.rewriteCity.push(
          this.cityGroup.P,this.cityGroup.Q,this.cityGroup.L,this.cityGroup.S,this.cityGroup.T
        )
      } else if (val === '6') {
        this.rewriteCity = []
        this.rewriteCity.push(
          this.cityGroup.W,this.cityGroup.X,this.cityGroup.Y,this.cityGroup.Z
        )
      }
    },

    // 弹框传值
    toggleContent(event) {
      this.$emit(this.cityGroup);
    },
    onselect(e) {
    },
    onCity(code, area_name) {
      console.log(code, area_name);
      this.citySelect.selected = {area_name,code};
      this.citySelect.eject = false;
      this.$emit("citySelect", this.citySelect);
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.hk-reportPopup {
  @{deep}.el-dialog__body {
    padding: 0 !important;
  }
  .hk-report-content {
    padding: 30px 20px;
    @{deep}.el-checkbox {
      display: block;
      text-align: left;
      height: 40px;
      line-height: 40px;
      margin-right: 0;
      border-bottom: 1px solid #ccc;
    }
  }
  .hk-cityselect-popup {
    .el-menu-demo {
      background: #f7f7f7;
      color: #333;
    }
    .el-menu--horizontal .el-menu-item {
      color: #333;
      margin: 0 29px;
      &.is-active {
        color: #0bd094;
      }
    }
    .el-menu--horizontal > .el-menu-item:not(.is-disabled):focus {
      background: transparent;
      color: #0bd094;
    }
  }
  // 城市
  .hk-city-body {
    height: 450px;
    overflow-y: scroll;
    .hk-option {
        cursor: pointer;
        width: 20%;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        &:hover,
        &:focus {
          color: #0bd094;
        }
      }
    .hk-city-main {
      position: relative;
      .hk-firstchar {
        width: 11.2%;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .hk-option-city {
        width: 88.8%;
      }
      .hk-option {
        cursor: pointer;
        width: 17%;
        height: 50px;
        line-height: 50px;
        text-align: left;
        // margin-left: 11px;
        margin-right: 20px;
        &:hover,
        &:focus {
          color: #0bd094;
        }
      }
    }
  }
}
</style>