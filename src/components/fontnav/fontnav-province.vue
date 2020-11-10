<template>
  <div class="hk-province text-green fl" style="outline: none">
    <i class="el-icon-location-outline text-green font-16"></i>
    <span class="text-white hk-top-adds clearfix">
        <ul class="hk-province-bar fr" @mouseenter="enter" @mouseleave="leave">
            <li><span class="text-green" :data-id="selectedProvinces.provinceCode">{{selectedProvinces.provinceName}}<span class="text-white">[切换]</span><i class="el-icon-arrow-down"></i></span></li>
            <li class="hk-province-muie" v-if="display">
                <span class="hk-province-list"
                 v-for="item in provincedata"
                 :key="item.code" index="item"
                 @click="Province(item.code,item.name)">{{item.name}}</span>
            </li>
        </ul>
    </span>
  </div>
</template>

<script>
import { province } from '@/config/province'
// import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      
      provincedata: province.data,
      display: false,
      selectedProvinces: {
        provinceCode: '1',
        provinceName: '全国',
      }
      // provinceas: regionData
    }
  },
  created () {
      let LocalStorageProvince = localStorage.getItem('locationProvince')
      // console.log(LocalStorageProvince)
      if (LocalStorageProvince !== null) {
        this.selectedProvinces = JSON.parse(LocalStorageProvince)
      }
  },

  methods: {
    Province (code, name) {
      // console.log('选中城市')
      // console.log(code,name)
    
      this.selectedProvinces.provinceCode = code
      this.selectedProvinces.provinceName = name
      // console.log(JSON.stringify(this.selectedProvinces))
      // 存入localStorage
      localStorage.setItem('locationProvince', JSON.stringify(this.selectedProvinces))
      // 取出
      let LocalStorageProvince = localStorage.getItem('locationProvince')
      this.selectedProvinces = JSON.parse(LocalStorageProvince)
      this.display = false
    },
    enter(){
      this.display = true
    },
    leave(){
      this.display = false
    }
  }
}
</script>

<style lang="less" spend>
.hk-province {
    font-family:Microsoft YaHei;
    // padding-right: 25px;
    height: 50px;
    color: #fff;
    position: relative;
    z-index: 1000;
    .text-green{
      line-height: 50px;
      margin-top: auto;
      margin-bottom: auto;
    }
    .el-icon-location-outline {
        vertical-align: -1px;
    }
    .hk-province-bar {
      cursor: pointer;
    }
    .hk-province-muie {
        text-align: left;
        padding-left: 4px;
        position: absolute;
        top: 50px;
        left: 20px;
        padding: 10px 10px;
        width: 301px;
        background: #ffffff;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 18px 0px rgba(45,152,119,0.34);
        border-radius:8px;
        .hk-province-list {
            height:14px;
            font-size:14px;
            color:rgba(51,51,51,1);
            display: inline-block;
            line-height: 30px;
            margin-bottom: 15px;
            min-width: 58px;
            padding: 0 10px;
            cursor: pointer;
            &:hover {
                color: #08B681;
            }
            &:focus {
                background: #EAF8F4;
                color: #08B681;
            }
        }
    }
}
</style>
