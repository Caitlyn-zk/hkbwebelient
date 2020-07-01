<template>
  <div class="apply">
    <div class="tiling">
      <div class="title">我的申请</div>
    </div>
    <div class="content">
       <el-tabs v-model="activeName" @tab-click="onState">
          <el-tab-pane v-for="(item,index) in tabData" :key="index" :label="item.label" :name="item.label"></el-tab-pane>
        </el-tabs>
        <div class="post_list">
          <div v-for="(item,index) in post_list" :key="index">
              <div class="tiling post_content">
                <div class="post_info">
                  <div class="tiling">
                    <div class="post_name title-nowrap" @click="onPostDetails">{{item.post_name}}</div>
                    <div class="post_salary font-16">{{item.min_salary | onSalary}}-{{item.max_salary | onSalary}}</div>
                  </div>
                  <div class="org_name title-nowrap">{{item.org_name}}</div>
                </div>
                <div class="address">{{item.area1_name}}{{item.area2_name}}</div>
                <div class="apply-infon">
                  <div class="apply_time">申请时间：{{item.add_time}}</div>
                  <el-tooltip class="item" effect="dark" :content="item.apply_resume" placement="top">
                    <div class="apply_resume">申请简历：{{item.resume_name}}</div>
                  </el-tooltip>
                </div>
                <div class="state-indo">
                  <div class="tips">状态</div>
                  <div class="state" :class="item.delivery_status == 0 ? 'not' : item.delivery_status == 10 ? 'already': item.delivery_status == 10 ? 'be-interested': 'yaomainshi'">{{item.delivery_status | onDeLivery}}</div>
                </div>
              </div>
          </div>
        </div>
    </div>
    <div class="block" style="margin-top:15px;" v-if="post_list.length == requestParameters.list_rows">
      <el-button-group class="button">
        <el-button type="primary" icon="el-icon-arrow-left" @click="onPreviousPage">上一页</el-button>
        <el-button type="primary" @click="onNextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
    <div class="no-data" v-if="post_list.length == 0">
      <img src="@/assets/image/no-data.png" alt="">
    </div>
  </div>
</template>

<script>
import {getPostDeliveryList,resumeCenterList} from '@/api/recruit.js'
import utils from '@/utils/index.js'
import {mainSalary, delivery_status} from '@/config/constant'
export default {
  data(){
    return{
      activeName: '全部',
      checked: false,
      salary: mainSalary,
      that: this,
      tabData:[
        {
          value: '0',
          label:'全部'
        },
        {
          value: 10,
          label:'未查询'
        },
        {
          value: 20,
          label:'已查询'
        },
        {
          value: 30,
          label:'感兴趣'
        },
        {
          value: 40,
          label:'邀面试'
        },
        {
          value: 50,
          label:'不合适'
        }
      ],
      post_list:[],
      // stateClass:['already','not','be-interested'],
      resumeLists: [],
      // 一页几条
      currentPage: 1, // 当前页码
      list_rows: 5, // 每页的数据条数
      requestParameters: {
        delivery_status: 1,
        page: 1, // currentPage 当前页码
        list_rows: 5, // list_rows 每页的数据条数
      }
    }
  },
  filters: {
    onDeLivery (value) {
      var obj = utils.findObj(delivery_status, value)
      return obj.label
    },
    onSalary (value) {
      var obj = utils.findObj(mainSalary, value)
      return obj.label
    }
  },
  created () {
    this.postDeliveryList(this.requestParameters)
  },
  methods:{
    onState(val){
      this.requestParameters.page = 1
      console.log(val.index)
      let index = val.index
      if (index == 1) {
        this.requestParameters.delivery_status = 10
        this.postDeliveryList(this.requestParameters)
      } else if (index == 2) {
        this.requestParameters.delivery_status = 20
        this.postDeliveryList(this.requestParameters)
      } else if (index == 3) {
        this.requestParameters.delivery_status = 30
        this.postDeliveryList(this.requestParameters)
      } else if (index == 4) {
        this.requestParameters.delivery_status = 40
        this.postDeliveryList(this.requestParameters)
      } else if (index == 5) {
        this.requestParameters.delivery_status = 50
        this.postDeliveryList(this.requestParameters)
      } else {
        this.requestParameters.delivery_status = 1
        this.postDeliveryList(this.requestParameters)
      } 
    },
    // 职位详情
    onPostDetails(){
      console.log('跳转职位详情页')
    },
    /*
 * 获取用户职位申请列表
 * @param delivery_status int 1全部（默认），10已查阅 ，20感兴趣 ，30邀面试
 * @param page int 第几页
 * @param list_rows int 一页几条
 */
    // 申请职位列表
    postDeliveryList (data) {
      let that = this
      console.log(this.requestParameters)
      getPostDeliveryList(data).then(res => {
        if (res.status == 200) {
          that.post_list = res.data
          console.log("申请列表",JSON.stringify(res))
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
    },
    // 上一页
    onPreviousPage(){
      if (this.currentPage >1) {
        this.requestParameters.page = this.requestParameters.page - 1
        this.postDeliveryList(this.requestParameters)
      }
    },
    // 下一页
    onNextPage(){
      if (this.post_list.length > 0) {
        this.requestParameters.page = this.requestParameters.page + 1
        this.postDeliveryList(this.requestParameters)
      }
    }
  }
}
</script>

<style lang="less">
@import './apply-for.less';
</style>