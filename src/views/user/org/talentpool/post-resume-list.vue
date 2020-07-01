<template>
  <div class="talent-pool" v-loading.fullscreen.lock="loading">
    <div class="hk-addproject-title-mbar">
      收件箱/{{post_name}}
      <span @click="onResume" class="select-post">选择其他职位</span>
    </div>
    <div class="tab-pane">
      <div class="personnel-rec">
        <div class="filter ">
          <ul class="classify-filter">
            <li
              v-for="(classify,classifyIndex) in classifyData"
              :key="classifyIndex"
              class="classify-name"
              :class="classifyId == classifyIndex ? 'classify-select':'classify-no-select'"
              @click="onSelectClassify(classifyIndex,classify.code)"
            >
              {{classify.label}}
              <span v-if="classifyIndex !==0">({{classify.status}})</span>
            </li>
          </ul>
          <div class="condition-filter select-style select">
            <!-- 学历 -->
            <!-- <el-select v-model="eduSelect" placeholder="请选择学历" @change="onEduSelect" clearable>
              <el-option
                v-for="(edu,eduIndex) in education"
                :key="eduIndex"
                :label="edu.label"
                :value="edu.value"
              ></el-option>
            </el-select> -->
            <!-- 工作经验 -->
            <el-select
              v-model="workLifeSelect"
              placeholder="工作经验"
              @change="onWorkLifeSelect"
              clearable
            >
              <el-option
                v-for="(workLife,workLifeIndex) in workLifeData"
                :key="workLifeIndex"
                :label="workLife.label"
                :value="workLife.value"
              ></el-option>
            </el-select>
            <!-- 城市选择 -->
            <el-cascader
              ref="myCascader"
              v-model="citySelect"
              placeholder="城市选择"
              :options="areaData"
              @change="onHandleChange"
              clearable
            ></el-cascader>
            <!-- 性别 -->
            <el-select
              v-model="genderSelect"
              @change="onGenderSelect"
              placeholder="性别要求"
              clearable
            >
              <el-option
                v-for="(gender,genderIndex) in genderData"
                :key="genderIndex"
                :label="gender.label"
                :value="gender.value"
              ></el-option>
            </el-select>
            <!-- 年龄 -->
            <el-select v-model="ageSelect" @change="onAgeSelect" placeholder="年龄要求" clearable>
              <el-option
                v-for="(age,ageIndex) in ageData"
                :key="ageIndex"
                :label="age.label"
                :value="age.value"
              ></el-option>
            </el-select>
            <!-- 投递时间 -->
            <!-- <div class="delivery-time">
              <div class="tips">投递时间</div>
              <el-date-picker
                v-model="deliveryTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="onDeliveryTime"
              ></el-date-picker>
            </div> -->
            <el-select
              v-model="deliveryTime"
              placeholder="投递时间"
              @change="onDeliveryTime"
              clearable
            >
              <el-option
                v-for="(deliveryTimeItem,index) in deliveryTimeList"
                :key="index"
                :label="deliveryTimeItem.label"
                :value="deliveryTimeItem.value"
              ></el-option>
            </el-select>
            <!-- 搜索 -->
            <div class="search-modular ">
              <el-input v-model="inputValue" placeholder="输入搜索内容" style="width: 350px;height: 30px;">
                <template slot="append">
                  <el-button class="search-button" style="padding: 0 20px;" @click="onSearch">搜索</el-button>
                </template>
              </el-input>
            </div>
          </div>
        </div>
        <orgResumeList :resumeList="resumeList" @resumeItem="onDeliveryStatus"></orgResumeList>
        <div class="block" v-if="resumeList.length == list_rows">
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" @click="onResumePreviousPage">上一页</el-button>
            <el-button type="primary" @click="onResumeNextPage">
              下一页
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
        </div>
        <div class="no-data" v-if="resumeList.length == 0">
          <img src="@/assets/image/no-data.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getRecruitPostPublicList,
  orgResumeState,
  getUserResumeDetail,
  orgPostReceiveList,
  getOrgPostList
} from "@/api/recruit";
import { minEdu, workLife, age ,timeList} from "@/config/constant";
import { provinceAndCityData } from "element-china-area-data";
import utils from "@/utils/index.js";
import orgResumeList from '@/components/common/org-resume-list'
export default {
  components:{orgResumeList},
  filters: {
    onWorkType(value) {
      var obj = utils.findObj(workLife, value);
      return obj.label;
    },
    onEdu(value) {
      var obj = utils.findObj(minEdu, value);
      return obj.label;
    }
  },
  data() {
    return {
      that: this,
      post_name: "",
      inputValue: "",
      resumeList: [],
      deliveryTimeList: timeList,
      // 学历
      eduSelect: null,
      education: minEdu,
      // 工作经验
      workLifeSelect: null,
      workLifeData: workLife,
      // 性别
      genderSelect: null,
      genderData: [
        {
          value: 0,
          label: "不限"
        },
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],
      // 年龄
      ageSelect: null,
      ageData: age,
      // 证书
      certificateSelect: null,
      certificateData: [
        { value: 1, label: "是" },
        { value: 2, label: "否" }
      ],
      start_time: "",
      post_id: null,
      currentPage: 1, // 当前页码
      list_rows: 10, // 每页的数据条数
      classifyData: [
        {
          code: 0,
          label: "全部简历",
          status: 0
        },
        {
          code: 10,
          label: "未查阅",
          status: 0
        },
        {
          code: 20,
          label: "已查询",
          status: 0
        },
        {
          code: 30,
          label: "感兴趣",
          status: 0
        },
        {
          code: 40,
          label: "邀面试",
          status: 0
        },
        {
          code: 50,
          label: "不合适",
          status: 0
        }
      ],
      classifyId: 0,
      // 城市
      citySelect: [],
      areaData: provinceAndCityData,
      // 投递时间
      deliveryTime: "",
      key: "",
      delivery_status: 0,
      end_time: "",
      live_in_area3: null,
      loading: false
    };
  },
  created() {
    if (this.$route.query.post_id) {
      this.post_id = this.$route.query.post_id;
      // console.log("获取职位id", this.post_id);
    }
    if (this.$route.query.post_name) {
      this.post_name = this.$route.query.post_name;
    }
    this.getOrgPostReceiveList();
  },
  methods: {
    state(val) {
      // console.log(val);
      orgResumeState(val)
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: res.msg,
              type: "success",
              showClose: true,
              duration: 3000
            });
            this.getOrgPostReceiveList();
          } else {
            this.$message({
              message: res.msg,
              type: "success",
              showClose: true,
              duration: 3000
            });
          }
        })
        .catch(res => {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
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
    // 按职位搜索
    onPostName(val) {
      // console.log("这里是职位搜索id");
      // console.log(val);
      this.getOrgPostList();
    },
    getOrgPostReceiveList() {
      //   this.loading = true
      let parameter = {
        post_id_new: this.post_id,
        delivery_status: this.delivery_status,
        // user_edu:
        //   this.eduSelect === null || this.eduSelect === ""
        //     ? 0
        //     : this.eduSelect, //学历
        work_date:
          this.workLifeSelect === null || this.workLifeSelect === ""
            ? 0
            : this.workLifeSelect, // 工作经验
        live_in_area3:
          this.live_in_area3 === null || this.live_in_area3 === ""
            ? 0
            : this.live_in_area3, // 地区
        gender:
          this.genderSelect === null || this.genderSelect === ""
            ? 0
            : this.genderSelect, // 性别
        user_age:
          this.ageSelect === null || this.ageSelect === "" ? 0 : this.ageSelect, // 年龄
        // user_cert:
        //   this.certificateSelect === null || this.certificateSelect === ""
        //     ? 0
        //     : this.certificateSelect, // 证书 1有，不传=不限
        start_time: this.start_time,
        end_time: this.end_time,
        page: this.currentPage,
        list_rows: this.list_rows,
        key_value: this.inputValue
      };
      orgPostReceiveList(parameter).then(res => {
        if (res.status === 200) {
          // console.log(JSON.stringify(res.data));
          // console.log("请求成功");
          for (let index = 0; index < this.classifyData.length; index++) {
            this.classifyData[index].status =
              res.data.resume_count["status_" + index * 10];
          }
          this.resumeList = res.data.resume_list;
        }
        // this.loading = false
      });
    },
    // 时间
    onDeliveryTime(val) {
      this.start_time = val[0];
      this.end_time = val[1];
    },
    // 选择分类
    onSelectClassify(index, code) {
      this.classifyId = index;
      this.delivery_status = code;
      this.getOrgPostReceiveList();
    },
    // 城市选择
    onHandleChange(val) {
      // console.log("城市选择", JSON.stringify(val[2]));
      if (val[2]) {
        this.live_in_area3 = val[2];
      }
      this.getOrgPostReceiveList();
    },
    // 搜索
    onSearch() {
      this.getOrgPostReceiveList();
    },
    // 学历选择
    onEduSelect(val) {
      this.getOrgPostReceiveList();
    },
    // 工作经验选择
    onWorkLifeSelect(val) {
      this.getOrgPostReceiveList();
    },
    // 性别选择
    onGenderSelect(val) {
      this.getOrgPostReceiveList();
    },
    // 选择年龄
    onAgeSelect(val) {
      this.getOrgPostReceiveList();
    },
    // 证书选择
    onCertificateSelect(val) {
      this.getOrgPostReceiveList();
    },
    onDeliveryStatus(e, item) {
      let state = {
        post_id: item.post_id,
        delivery_id: item.delivery_id,
        delivery_status: e
      };
      this.state(state);
    },
    // 简历上一页
    onResumePreviousPage() {
      if (this.currentPage.length > 0) {
        this.currentPage = this.currentPage - 1;
        this.getOrgPostReceiveList();
      }
    },
    // 简历下一页
    onResumeNextPage() {
      if (this.resumeList.length > 0) {
        this.currentPage = this.currentPage + 1;
        this.getOrgPostReceiveList();
      }
    },
    onResume() {
      this.$router.push({ path: "/user/org/talentpool/resumeInbox",query:{type:1}});
    },
    onResumeDetails(resume_id, post_id, delivery_id) {
      this.$router.push({
        path: "/user/org/talentpool/resumedetails",
        query: {
          resume_id: resume_id,
          post_id: post_id,
          delivery_id: delivery_id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./post-resume-list.less";
</style>