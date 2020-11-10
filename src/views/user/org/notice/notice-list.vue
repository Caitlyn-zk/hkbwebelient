<template>
  <div class="notice" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="hk-addproject-title-mbar">
      项目中心/环评公示
    </div>
    <div class="top-pcreen">
      <el-form ref="form" :model="pcreenForm" class="top-pcreen-muster select"  >
          <el-form-item label="">
              <el-select
              v-model="pcreenForm.placeholder"
              placeholder="项目类型"
              @change="onSelectType" clearable >
                  <el-option label="环评公示" value="1"></el-option>
                  <el-option label="验收公示" value="0"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="" label-width="0">
              <el-cascader
              ref="myCascader"
              v-model="pcreenForm.region"
              placeholder="选择城市"
              :options="areaData"
              @change="onHandleChange"
              clearable>
              </el-cascader>
          </el-form-item>
          <el-form-item >
            <el-select
              v-model="pcreenForm.time"
              placeholder="发布时间"
              @change="onTime"
              clearable
            >
              <el-option
                v-for="(timeItem,index) in timeList"
                :key="index"
                :label="timeItem.label"
                :value="timeItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" label-width="0" class="search">
              <el-input v-model="searchValue" placeholder="输入搜索内容" style="width: 400px;">
                  <template slot="append"><div class="search-button" @click="onSearch">搜索</div></template>
              </el-input>
          </el-form-item>
          <el-form-item label="" label-width="0">
              <el-button class="pelease-project" @click="onPeleasePublicity">发布公示</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div style="height:530px">
       <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        highlight-current-row
        :header-cell-style="{background:'#fff', color:'#333333', fontSize:'14px'}">
            <el-table-column
            prop="date"
            label="序号"
            align="center"
            width="50"
            >
            <template slot-scope="scope">
              <span>{{(currentPage-1) * 10 + scope.$index + 1}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="type"
            label="项目类型"
            align="center"
            :formatter="typeJudge"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="项目名称"
            align="center"
            :show-overflow-tooltip="true"
            width="300"
            >
            <template slot-scope="scope">
              <!-- <a href="#" target="_blank" class="table-name">{{scope.row.name}}</a> -->
              <span class="table-name"> {{scope.row.name}}</span>
            </template>
            </el-table-column>
            <el-table-column
            v-for="(item,index) in noticeList" :key="index"
            :prop="item.value"
            :label="item.name"
            align="center"
            :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="date" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <div class="operation">
                        <div class="option edit" @click="onHandleEdit(scope.$index, scope.row)">编辑</div>
                        <div class="option delete" @click="onHandleDelete(scope.$index, scope.row)">删除</div>
                    </div>
                </template>
            </el-table-column>
    </el-table>
    </div>
    <div class="pagination">
      <el-pagination
          @current-change="onCurrentChange"
          :current-page="currentPage"
          hide-on-single-page
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total_count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getProjectUserNoticeList, getProjectData} from '@/api/project'
// import { getSystemAreaTreeData } from '@/api/system'
/* eslint-disable */
import {publicityTypeJudge, timeList} from '@/config/constant'
import { provinceAndCityData } from 'element-china-area-data'
import utils from '@/utils/index.js'
export default {
  data () {
    return {
      tableData: [],
      projectId: null,
      fullscreenLoading: true,
      timeList: timeList,
      proidData: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      pcreenForm: {
        id: null,
        type: '',
        name: '',
        area1_name: '',
        area2_name: '',
        last_time: '',
        startTime: '',
        endTime: '',
        time:''
      },
      pickerOptions0: {
      },
      pickerOptions1: {
        disabledDate: (time) => {
          var time1 = new Date(this.pcreenForm.startTime).getTime()
          return time.getTime() < time1
        }
      },
      noticeList: [
        {
          name: '省份',
          value: 'area1_name'
        },
        {
          name: '市',
          value: 'area2_name'
        }
        // {
        //   name: '金额',
        //   value: 'fund_rang'
        // }
      ],
      currentPage: 1,
      total_count: 0,
      searchValue: '',
      proCate: [],
      areaData: provinceAndCityData,
      position: '贵州/遵义',
      area1_code: '',
      area1_name: '',
      area2_code: '',
      area2_name: '',
      area3_code: '',
      area3_name: ''
    }
  },
  created () {
    this.getNoticeListData()
    this.getProjectData()
  },
  methods: {
    onHandleEdit (index, row) {
      // console.log('编辑', index, row.id)
      this.projectId = row.id
      this.$router.push({path: '/user/org/notice/add', query: {id: row.id}})
      // console.log('编辑', JSON.stringify(row))
    },
    onHandleLowerShelf (index, row) {
      // console.log('下架', index, row.id)
      this.projectId = row.id
    },
    onHandleClone (index, row) {
      // console.log('克隆', index, row.id)
      this.projectId = row.id
    },
    onHandleDelete (index, row) {
      // console.log('删除', index, row.id)
      this.projectId = row.id
    },
    // 分页
    onCurrentChange (val) {
      this.currentPage = val
      this.getNoticeListData()
      // this.$emit('add-post-page-change', {curPage: this.currentPage, limit_begin: 10 * ((val - 1))})
    },
    // 获取列表数据
    getNoticeListData () {
      this.fullscreenLoading = true
      let that = this
      var parameter = {
        area1: that.area1_code,
	      area2: that.area2_code,
	      key: that.searchValue,
	      type: that.pcreenForm.placeholder,
	      page: that.currentPage,
	      limit: 10
      }
      // console.log('参数', parameter)
      getProjectUserNoticeList(parameter).then(res => {
        // console.log(JSON.stringify(res.data))
        that.$set(that, 'tableData', res.data.data_list)
        that.$set(that, 'total_count', res.data.total_count)
        this.fullscreenLoading = false
      })
    },
    // 跳转发布项目
    onPeleasePublicity () {
      // 跳转发布项目
      this.$router.push({path: '/user/org/notice/add', query: {id: 0}})
    },
    // 获取项目类型
    getProjectData () {
      let that = this
      getProjectData().then(res => {
        // console.log(JSON.stringify(res.data))
        that.$set(that, 'proCate', res.data.pro_cate)
      })
    },
    // 选择类型
    onSelectType (val) {
      // console.log('选择类型', val)
      this.currentPage = 1
      this.getNoticeListData()
    },
    // 选择地区
    onHandleChange (val) {
      // console.log('地区', val)
      if (val.length !== 0) {
        this.$set(this, 'area1_code', this.pcreenForm.region[0])
        this.$set(this, 'area2_code', this.pcreenForm.region[1])
        this.$set(this, 'area3_code', this.pcreenForm.region[2])
        this.$set(this, 'area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
        this.$set(this, 'area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
        this.$set(this, 'area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
      } else {
        this.$set(this, 'area1_code', '')
        this.$set(this, 'area2_code', '')
        this.$set(this, 'area3_code', '')
        this.$set(this, 'area1_name', '')
        this.$set(this, 'area2_name', '')
        this.$set(this, 'area3_name', '')
      }
      this.currentPage = 1
      this.getNoticeListData()
    },
    // 输入框搜索
    onSearch () {
      this.currentPage = 1
      this.getNoticeListData()
    },
    typeJudge (row) {
      return utils.findObj(publicityTypeJudge, row.type).label
    },
    onTime(){
      this.currentPage = 1
      this.getNoticeListData()
    }
  }
}
</script>
<style lang="less" scoped>
  
  @import './notice-list.less';
</style>
