<template>
  <div class="shield-company">
    <div class="title">屏蔽公司</div>
    <el-divider></el-divider>
    <div class="introduce-text">
      <div class="tips">1、输入想屏蔽的公司，支持公司全称、简称。</div>
      <div class="tips">2、屏蔽后，此公司下的所有HR将无法通过人才推荐、搜索等入口看见你。</div>
      <div class="tips">3、屏蔽后，此公司下的所有HR将无法通过人才推荐、搜索等入口看见你。</div>
    </div>
    <div class="comany-search">
      <el-input v-model="companyName" placeholder="请输入要屏蔽的公司全称或者简称"></el-input>
      <el-button class="search-button">搜索</el-button>
    </div>
    <div class="shield-company-list" v-for="(item,index) in companyData" :key="index">
      <!-- <div
        class="company-name"
        v-if="item.name !== ''"
        @mouseenter="enter(index)"
        @mouseleave="leave"
      >
        {{item.name}}&#12288;&#12288;
        <span v-if="id == index" class="delete" @click="onShieldCompany(item.id)">屏蔽</span>
      </div> -->
    </div>
    <div class="shield-company-list">
      <div class="shield-company-tips">已屏蔽的公司：</div>
      <div v-for="(item,index) in shieldCompanyLists" :key="index">
        <div
          class="company-name"
          v-if="item.name !== ''"
          @mouseenter="enter(index)"
          @mouseleave="leave"
        >
          {{item.name}}&#12288;&#12288;
          <span v-if="id == index" class="delete" @click="onDel(item.privacy_id)">删除</span>
        </div>
        <div class="company-name" v-else>暂无屏蔽公司</div>
      </div>
      <div class="block" style="margin-top:15px;" v-if="shieldCompanyLists.length == list_rows">
        <el-button-group class="button">
          <el-button type="primary" icon="el-icon-arrow-left" @click="onPreviousPage(2)">上一页</el-button>
          <el-button type="primary" @click="onNextPage(2)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </div>
      <!-- <div class="no-data" v-else>
        <img src="@/assets/image/no-data.png" alt="">
      </div> -->
    </div>
  </div>
</template>
<script>
import {shieldCompany, shieldCompanyList, delShieldCompany} from '@/api/recruit'
export default {
  inject: ['reload'],
  data() {
    return {
      companyName: "",
      shieldCompanyLists: [],
      companyData: [
        {
          id: 1,
          code: 0,
          name: "贵州活性源智控有限公司1"
        },
        {
          id: 2,
          code: 1,
          name: "贵州活性源智控有限公司2"
        },
        {
          id: 3,
          code: 2,
          name: "贵州活性源智控有限公司3"
        },
        {
          id: 4,
          code: 3,
          name: "贵州活性源智控有限公司4"
        },
        {
          id: 5,
          code: 0,
          name: "贵州活性源智控有限公司5"
        }
      ],
      id: null,
      // 一页几条
      currentPage: 1, // 当前页码
      list_rows: 5 // 每页的数据条数
    };
  },
  created () {
    this.onShieldCompanyList()
  },
  mounted () {
  },
  methods: {
    // 移入
    enter(e) {
      this.id = e;
    },
    // 移出
    leave() {
      this.id = null;
    },
    // 删除
    onDel(e) {
      this.companyData.splice(e, 1);
      let privacy_id = e.toString()
      delShieldCompany(privacy_id).then(res => {
        if (res.status == 200) {
          this.onShieldCompanyList()
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
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
    // 屏蔽公司列表
    onShieldCompanyList () {
      let that = this
      let RequestParameters = {
        page: that.currentPage,
        list_rows: that.list_rows
      }
      shieldCompanyList(RequestParameters).then(res => {
        if (res.status == 200) {
          that.shieldCompanyLists = res.data
          console.log('请求成功');
          console.log(res.data)
        }
      })
    },
    // 屏蔽公司
    onShieldCompany (e) {
      console.log(e)
      let org_uid = 6
      let org_id = 4
      shieldCompany(org_uid,org_id).then(res => {
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        }
        this.reload()
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
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
        this.onShieldCompanyList()
      }
    },
    // 下一页
    onNextPage(){
      if (this.shieldCompanyLists.length > 0) {
        this.currentPage = this.currentPage + 1
        this.onShieldCompanyList()
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./shield-company.less";
</style>