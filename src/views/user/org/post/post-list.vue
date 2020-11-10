<template>
  <div class="post-mgt" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <div class="top-title"></div> -->
    <div class="hk-addproject-title-mbar ">
      职位管理/职位列表
    </div>
    <div class="post-content">
      <el-tabs v-model="active_name" @tab-click="handleClick" class="tabs">
        <el-tab-pane :label="'在线('+online_count+')'" name="onLine">
        </el-tab-pane>
        <el-tab-pane :label="'未上线职位('+offline_count+')'" name="notOnLine">
        </el-tab-pane>
      </el-tabs>
      <div class="scr-cond">
        <div class="time">
          <div class="label">发布时间</div>
          <el-date-picker
            v-model="start_time"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 141px;"
            placeholder="开始时间"
            :picker-options="pickerOptions0"
          ></el-date-picker>
          <div class="separate">-</div>
          <el-date-picker
            v-model="end_time"
            @change="onEndTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 141px;"
            placeholder="结束时间"
            :picker-options="pickerOptions1"
          ></el-date-picker>
        </div>
        <!-- <div class="searchInput">
          <el-input v-model="input_value" style="width: 401px;" placeholder="请输入内容">
            <div slot="suffix" class="search" @click="onSearch">搜索</div>
          </el-input>
        </div> -->
        <div class="search-modular">
          <el-input
            v-model="input_value"
            placeholder="输入搜索内容"
            style="width: 350px;height: 36px;"
          >
            <template slot="append">
              <el-button class="search-button" style="padding: 0 20px;height: 36px;" @click="onSearch">搜索</el-button>
            </template>
          </el-input>
        </div>
        <el-button class="release-button" @click="onReleasePosst">发布新职位</el-button>
      </div>
      <div class="post-list">
        <div class="post-muster" v-for="(item, index) in post_data" :key="item.id">
          <div class="post-info">
            <div class="tiling interval">
              <!-- <div class="post-name" @click="onPostDetail(item.id)">{{item.name}}</div> -->
              <router-link class="post-name" :to="{path:'/front/recruit/post/detail',query:{post_id:item.id}}" target="_blank">{{item.name}}</router-link>
              <div class="post-release-time">发布时间：{{item.last_time}}</div>
            </div>
            <div class="tiling interval">
              <!-- 薪资 -->
              <div class="wages">{{item.min_salary | onSalary}}-</div>
              <div class="wages">{{item.max_salary | onSalary}}</div>
              <div class="hk-cond-main">
                <span class="position cond title-nowrap">{{item.area2_name}}</span>
                <span class="experience cond">{{item.work_life | onWorkLife}}</span>
                <span class="education cond">{{item.min_edu | onEdu}}</span>
              </div>
            </div>
            <div class="effective-time">{{time_tips}}：{{item.valid_time}}</div>
          </div>
          <div class="post-data">
            <div class="new-add"  @click="onResumeLisr(10)">
              <div v-if="item.delivery_status_10 !== 0">
                <div class="number">{{item.delivery_status_10}}</div>
                <div class="post-data-title">新简历</div>
              </div>
            </div>
            <div class="candidate"  @click="onResumeLisr(30)">
              <div v-if="item.delivery_status_30 !== 0">
                <div class="number">{{item.delivery_status_30}}</div>
                <div class="post-data-title">候选</div>
              </div>
            </div>
          </div>
          <div class="select-button">
            <el-button class="search-talents button" @click="onSearchTalents">搜索人才</el-button>
            <el-button class="rcd-talents button" @click="onRecommendTalents">推荐人才</el-button>
          </div>
          <div class="operation">
            <div class="see operation-font-style">
              <router-link :to="{path:'/front/recruit/post/detail',query:{post_id:item.id}}" target="_blank">查看</router-link>
            </div>
            <div class="edit operation-font-style" @click="onHandleEdit(index)">编辑</div>
            <div class="lower-shelf operation-font-style" @click="onState(item)">{{state_name}}</div>
          </div>
        </div>
      </div>
      <div class="no-data" v-if="post_data.length < 1">
        <img src="@/assets/image/no-data.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import {getRecruitPostPublicList, getRecruitPostChangeState } from "@/api/recruit";
import { mainSalary, workLife, minEdu } from "@/config/constant";
import utils from '@/utils/index.js'
/* eslint-disable */
export default {
  inject: ["reload"],
  filters: {
    onSalary (value) {
      var obj = utils.findObj(mainSalary, value)
      return obj.label
    },
    onEdu (value) {
      var obj = utils.findObj(minEdu, value)
      return obj.label
    },
    onWorkLife (value) {
      var obj = utils.findObj(workLife, value)
      return obj.label
    }
  },
  data() {
    return {
      salary: mainSalary,
      work_life: workLife,
      min_edu: minEdu,
      total_count: 0,
      fullscreenLoading: true,
      post_data: [],
      active_name: "onLine",
      online_count: 0,
      offline_count: 0,
      state_name: "下架",
      time_tips: "职位有效时间",
      state: "10",
      end_time: "",
      start_time: "",
      input_value: "",
      pickerOptions0: {
      },
      // pickerOptions1: {},
      pickerOptions1: {
        disabledDate: time => {
          var time1 = new Date(this.start_time).getTime();
          return time.getTime() < time1;
        }
      }
    };
  },
  created() {
    this.getPostList("10");
  },
  methods: {
    // 切换
    handleClick(val) {
      // console.log("切换", val.name);
      if (val.name == "notOnLine") {
        this.getPostList("20");
        this.state_name = "上架";
        this.time_tips = "职位下线时间";
        // this.reload();
      } else {
        this.getPostList("10");
        this.state_name = "下架";
        this.time_tips = "职位有效时间";
        // this.reload();
      }
      this.active_name = val.name
    },
    // 获取列表数据
    getPostList(e) {
      // console.log('职位列表')
      this.fullscreenLoading = true;
      let that = this;
      getRecruitPostPublicList({
        state: e,
        from_dt: that.start_time,
        to_dt: that.end_time,
        key: that.input_value
      }).then(res => {
        // console.log(JSON.stringify(res.data), that.start_time, that.end_time);
        // console.log(res.data)
        that.$set(that, "post_data", res.data.data_list);
        that.$set(that, "online_count", res.data.online_count);
        that.$set(that, "offline_count", res.data.offline_count);
        that.fullscreenLoading = false;
      });
    },
    // 下架点击事件
    onState(e) {
      if (this.state_name === "下架") {
        this.getChangeState(e.id, "20");
        this.getPostList('10')
        this.reload();
      } else {
        this.getChangeState(e.id, "10");
        this.getPostList('20')
        this.reload();
      }
    },
    // 上下架事件
    getChangeState(id, e) {
      var parameter = {
        id: id,
        state: e,
        from_dt: "",
        to_dt: "",
        key: ""
      };
      getRecruitPostChangeState(parameter).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.msg,
            type: "success",
            showClose: true,
            duration: 500
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 500
          });
        }
      });
    },
    // 跳转新增职位
    onReleasePosst() {
      this.$router.push({
        path: "/user/org/post/public",
        query: {
          id: 0
        }
      });
    },
    // 编辑按钮 暂无数据
    onHandleEdit(index) {
      let postDatalist = this.post_data[index];
      this.$router.push({
        path: "/user/org/post/public",
        query: {
          id: postDatalist.id
        }
      });
    },
    // 搜索
    onSearch() {
      if (this.state_name === "下架") {
          this.getPostList('10')
        } else {
          this.getPostList('20')
        }
    },
    onEndTime(val) {
      // console.log("时间", val);
      if (this.start_time !== "" && this.start_time !== null) {
        // console.log("选择时间段" + val, this.start_time);
        if (this.state_name === "下架") {
          this.getPostList('10')
        } else {
          this.getPostList('20')
        }
      }
    },
    onSearchTalents () {
      this.$router.push({path: "/user/org/talentpool"});
    },
    onRecommendTalents () {
      this.$router.push({path: "/user/org/talentpool/collection"});
    },
    onPostDetail(post_id){
      // console.log('职位id',post_id)
      this.$router.push({path: "/front/recruit/post/detail",query:{post_id:post_id}})
    },
    onResumeLisr(state){
      this.$router.push({path: "/user/org/talentpool/resumeInbox",query:{state:state}})
    }
  }
};
</script>
<style lang="less" scoped>
@import "./post-list.less";
</style>
