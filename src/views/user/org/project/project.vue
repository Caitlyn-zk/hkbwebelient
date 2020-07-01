<template>
  <div class="project" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="hk-addproject-title-mbar">
      项目中心/项目管理
    </div>
    <div class="top-pcreen">
      <el-form ref="form" :model="pcreenForm" class="top-pcreen-muster select">
        <el-form-item label>
          <el-select
            v-model="pcreenForm.state"
            placeholder="项目状态"
            clearable
            @change="selectState"
          >
            <el-option
              v-for="(item,index) in stateSelect"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label label-width="0">
          <el-cascader
            ref="myCascader"
            v-model="pcreenForm.region"
            placeholder="选择城市"
            :options="areaData"
            @change="onHandleChange"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item >
          <el-select
            v-model="pcreenForm.startTime"
            placeholder="发布时间"
            @change="onTime"
            clearable
          >
            <el-option
              v-for="(deliveryTimeItem,index) in deliveryTimeList"
              :key="index"
              :label="deliveryTimeItem.label"
              :value="deliveryTimeItem.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label label-width="0" class="search">
          <el-input v-model="searchValue" placeholder="输入搜索内容" style="width: 400px;">
            <template slot="append">
              <div class="search-button" @click="onSearch">搜索</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label label-width="0">
          <el-button class="pelease-project" @click="onPeleaseProject">发布项目</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="height:536px">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        highlight-current-row
        :header-cell-style="{background:'#fff',color:'#333333',fontSize:'14px'}"
      >
        <el-table-column prop="date" label="序号" align="center" width="50">
          <template slot-scope="scope">
            <span>{{(currentPage-1) * 10 + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="area1_name"
          label="所在城市"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.area1_name }},{{scope.row.area2_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" align="center" :show-overflow-tooltip="true">
          <!-- <template slot-scope="scope">
            <router-link :to="{path:'/front/recruit/post/detail',query:{proid:scope.row.proid}}" target="_blank" class="table-name">{{scope.row.name}}</router-link>
          </template> -->
        </el-table-column>
        <el-table-column prop="fund_rang" label="金额" align="center" :formatter="fundRangFormat"></el-table-column>
        <el-table-column  label="状态" align="center" >
          <template slot-scope="scope">
            <span :style="{'color':scope.row.is_online == 0 ? 'red':''}">{{scope.row.is_online |onState}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="last_time" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="date" label="操作" width="220" align="center">
          <template slot-scope="scope">
            <div class="operation">
              <div class="option edit" @click="onHandleEdit(scope.$index, scope.row)">编辑</div>
              <div
                class="option lower-shelf"
                @click="onHandleLowerShelf(scope.$index, scope.row)"
              >{{scope.row.is_online== 1 ? '下架':'上架'}}</div>
              <div class="option clone" @click="onHandleClone(scope.$index, scope.row)">克隆</div>
              <div class="option delete" @click="onHandleDelete(scope.$index, scope.row)">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="currentChange"
        :current-page="currentPage"
        hide-on-single-page
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total_count"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getUserProjectListData,
  getProjectCateTree,
  getProjectUserProChangeState,
  proDelete
} from "@/api/project";
import { provinceAndCityData } from "element-china-area-data";
import { fundRang, timeList} from "@/config/constant";
import utils from "@/utils/index.js";
/* eslint-disable */
export default {
  inject: ["reload"],
  filters:{
    onState(value){
      if (value === 1) {
        return "上线";
      } else if (value === 0) {
        return "已下线";
      } else if (value === -1) {
        return "不限";
      }
    }
  },
  data() {
    return {
      tableData: [],
      deliveryTimeList: timeList,
      fundRang: fundRang,
      stateSelect: [
        {
          value: -1,
          name: "全部"
        },
        {
          value: 0,
          name: "下线"
        },
        {
          value: 1,
          name: "上线"
        }
      ],
      fullscreenLoading: true,
      loading: true,
      projectId: null,
      proidData: {
        value: "id",
        label: "cate_name",
        children: "children"
      },
      pcreenForm: {
        projectType: "",
        state: null,
        region: [],
        startTime: "",
        endTime: "",
        search: ""
      },
      // pickerOptions1: {
      //   disabledDate: time => {
      //     var time1 = new Date(this.pcreenForm.startTime).getTime();
      //     return time.getTime() < time1;
      //   }
      // },
      currentPage: 1,
      total_count: 0,
      is_online: -1,
      searchValue: "",
      proCate: [],
      areaData: provinceAndCityData,
      position: "贵州/遵义",
      area1_code: 0,
      area1_name: '',
      area2_code: 0,
      area2_name: "",
      area3_code: 0,
      area3_name: ""
    };
  },
  created() {
    this.getProjectListData();
    this.getProjectData();
  },
  mounted() {
    this.$nextTick(() => {
      // 确保dom异步加载完毕
      this.fullscreenLoading = false;
    });
  },
  methods: {
    onHandleEdit(index, row) {
      // console.log("编辑", index, row.proid);
      this.projectId = row.proid;
      // console.log(row.proid);
      this.$router.push({
        name: "CmpOrgAddProject",
        query: {
          proid: row.proid
        }
      });
    },
    onHandleLowerShelf(index, row) {
      // console.log("下架", row.is_online, row.proid);
      // this.projectId = row.id
      if (row.is_online === 1) {
        // console.log("状态");
        this.getChangeState(row.proid,0);
      } else {
        this.getChangeState(row.proid,1);
      }
    },
    onHandleClone(index, row) {
      // console.log("克隆", index, JSON.stringify(row));
      this.projectId = row.id;
      this.$router.push({
        name: "CmpOrgAddProject",
        query: {
          proid: row.proid,
          type: 1
        }
      });
    },
    onHandleDelete(index, row) {
      // console.log("删除", index, row.proid);
      this.projectId = row.proid;
      proDelete(row.proid).then(res=>{
        if(res.status == 200){
          this.$message({
            message: res.msg,
            type: "success",
            showClose: true,
            duration: 500
          });
          this.getProjectListData()
        }
      })
    },
    // 分页
    currentChange(val) {
      this.currentPage = val;
      this.getProjectListData();
    },
    // 触发筛选事件
    pcreen(str) {
      // console.log("触发筛选事件", str);
    },
    // 获取列表数据
    getProjectListData() {
      this.fullscreenLoading = true;
      let that = this;
      // parseInt
      // console.log(that.area1_code);
      var parameter = {
        area1: that.area1_code,
        area2: that.area2_code,
        key: that.searchValue,
        cate_id: that.pcreenForm.state,
        is_online: that.is_online,
        page: that.currentPage
      };

      getUserProjectListData(parameter).then(res => {
        // console.log("列表数据" +JSON.stringify(res.data));
        // console.log("列表数据11", JSON.stringify(res.data));
        that.$set(that, "tableData", res.data.data_list);
        that.$set(that, "total_count", res.data.total_count);
        that.fullscreenLoading = false;
      });
    },
    // 跳转发布项目
    onPeleaseProject() {
      this.$router.push({
        name: "CmpOrgAddProject",
        query: {
          proid: 0
        }
      });
    },
    // 获取项目类型
    getProjectData() {
      let that = this;
      getProjectCateTree().then(res => {
        that.$set(that, "proCate", res.data.pro_cate);
      });
    },
    // 选择状态
    selectState(val) {
      // console.log("选项", val);
      this.pcreenForm.state = val;
      this.currentPage = 1;
      this.getProjectListData();
    },
    // 选择地区
    onHandleChange(val) {
      // console.log("地区职位" + val);
      if (val.length !== 0) {
        this.$set(this, "area1_code", parseInt(this.pcreenForm.region[0]));
        this.$set(this, "area2_code", parseInt(this.pcreenForm.region[1]));
        this.$set(this, "area3_code", parseInt(this.pcreenForm.region[2]));
        this.$set(
          this,
          "area1_name",
          this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]
        );
        this.$set(
          this,
          "area2_name",
          this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
        );
        this.$set(
          this,
          "area3_name",
          this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]
        );
      } else {
        this.$set(this, "area1_code", 0);
        this.$set(this, "area2_code", 0);
        this.$set(this, "area3_code", 0);
        this.$set(this, "area1_name", "");
        this.$set(this, "area2_name", "");
        this.$set(this, "area3_name", "");
      }
      this.currentPage = 1;
      this.getProjectListData();
    },
    // 输入框搜索
    onSearch() {
      this.currentPage = 1;
      this.getProjectListData();
    },
    getcataIddata() {},
    // 判断返回资金范围
    fundRangFormat(row, column) {
      return utils.findObj(fundRang, row.fund_rang).label;
    },
    // 上下架方法
    getChangeState(id,is_online) {
      getProjectUserProChangeState({
        proid: id,
        is_online: is_online
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.msg,
            type: "success",
            showClose: true,
            duration: 500
          });
          this.reload();
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
    timeOption() {
    },
    onTime(){
      this.currentPage = 1
      this.getProjectListData()
    }
  }
};
</script>
<style lang="less" scoped>
@import "./project.less";
</style>
