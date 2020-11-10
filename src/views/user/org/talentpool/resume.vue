<template>
  <div class="talent-pool" v-loading.fullscreen.lock="loading">
    <div class="hk-addproject-title-mbar">人才库管理/收件箱</div>
    <div class="tab-pane">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部简历" name="first">
          <div class="personnel-rec">
            <div class="filter">
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
              <div class="condition-filter select-style select clearfix">
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
                  placeholder="选择地区"
                  :options="areaData"
                  @change="onHandleChange"
                  clearable
                ></el-cascader>
                <!-- 投递时间 -->
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
                <!-- 搜索 -->
                <div class="search-modular fr">
                  <el-input v-model="key" placeholder="输入搜索内容" style="width: 350px;height: 30px;">
                    <template slot="append">
                      <el-button
                        class="search-button"
                        style="padding: 0 20px;"
                        @click="onSearchResume"
                      >搜索</el-button>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
            <orgResumeList :resumeList="resumeList" @resumeItem="onDeliveryStatus"></orgResumeList>
            <div class="block" v-if="resumeList.length == list_rows">
              <el-button-group>
                <el-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  @click="onResumePreviousPage"
                >上一页</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="按职位查看" name="second">
          <div class="scr-cond">
            <div class="hk-selectPost select">
              <el-select
                class="hk-select"
                v-model="selectPostStatus"
                @change="onPostName"
                clearable
                placeholder="职位状态"
              >
                <el-option
                  v-for="(post,postIndex) in postStatus"
                  :key="postIndex"
                  :label="post.label"
                  :value="post.value"
                ></el-option>
              </el-select>
            </div>
            <div class="search-modular">
              <el-input
                v-model="inputValue"
                placeholder="输入搜索内容"
                style="width: 350px;height: 30px;"
              >
                <template slot="append">
                  <el-button class="search-button" style="padding: 0 20px;" @click="onSearchPost">搜索</el-button>
                </template>
              </el-input>
            </div>
          </div>
          <div class="personnel-rec">
            <div class="post-list">
              <div v-for="(item,index) in postList" :key="index" class="post-content" @click="onPostResume(item.post_id,item.name)">
                <div class="post-info">
                  <div class="post-name" >{{item.name}}</div>
                  <div
                    class="post-working-location"
                  >工作地点：{{item.area1_name}}/{{item.area2_name}}/{{item.area3_name}}</div>
                </div>
                <div class="post-resurm-number">简历数：{{item.resume_count}}</div>
                <div class="post-release">
                  <div class="post-release-time">发布时间：{{item.add_time.slice(0,10)}}</div>
                  <div class="post-release-state" :class="item.state == 10 ? 'text-green':'text-red'">{{item.state == 10 ? '发布中':'已下线'}}</div>
                </div>
              </div>
            </div>
            <div class="block" v-if="postList.length == list_rows">
              <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="onPostPreviousPage">上一页</el-button>
                <el-button type="primary" @click="onPostNextPage">
                  下一页
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </el-button-group>
            </div>
            <div class="no-data" v-if="postList.length == 0">
              <img src="@/assets/image/no-data.png" alt />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {
  orgResumeState,
  getUserResumeDetail,
  orgPostReceiveList,
  getOrgPostList
} from "@/api/recruit";
import { minEdu, workLife, age, timeList } from "@/config/constant";
import { regionData } from "element-china-area-data";
import utils from "@/utils/index.js";
import orgResumeList from "@/components/common/org-resume-list";
export default {
  data() {
    return {
      that: this,
      activeName: "first",
      resumeList: [],
      user_img: require("@/assets/image/user_img.png"),
      postStatus: [
        {
          value: 10,
          label: "上线"
        },
        {
          value: 20,
          label: "下线"
        }
      ],
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
        {
          value: 0,
          label: "不限"
        },
        {
          value: 1,
          label: "有证书"
        },
        {
          value: 2,
          label: "无证书"
        }
      ],
      selectPostStatus: null,
      start_time: "",
      post_id: 1,
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
      areaData: regionData,
      // 投递时间
      deliveryTime: "",
      deliveryTimeList: timeList,
      key: "",
      delivery_status: 0,
      start_time: "",
      end_time: "",
      area3_code: null,
      postList: [],
      postCurrentPage: 1,
      inputValue: "",
      loading: false
    };
  },
  created() {
    if (this.$route.query.type) {
      this.activeName = "second";
    }
    if (this.$route.query.state) {
      this.delivery_status = this.$route.query.state
      if (this.$route.query.state == 10) {
        this.classifyId = 1
      } else {
        this.classifyId = 3
      }
    }
    this.getorgPostReceiveList();
    this.getOrgPostList();
  },
  components: {
    orgResumeList
  },
  methods: {
    state(val) {
      // console.log(val)
      orgResumeState(val)
        .then(res => {
          if (res.status == 200) {
            // this.$message({
            //   message: res.msg,
            //   type: "success",
            //   showClose: true,
            //   duration: 3000
            // });
            this.getorgPostReceiveList();
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
      // console.log('这里是职位搜索id')
      // console.log(val)
      this.getOrgPostList();
    },
    getorgPostReceiveList() {
      // this.loading = true
      // console.log("性别",JSON.stringify(this.genderSelect))
      let parameter = {
        post_id_new: 0,
        delivery_status: this.delivery_status,
        work_date:
          this.workLifeSelect === null || this.workLifeSelect === ""
            ? 0
            : this.workLifeSelect, // 工作经验
        area3_code:
          this.area3_code === null || this.area3_code === ""
            ? 0
            : this.area3_code, // 地区
        gender:
          this.genderSelect === null || this.genderSelect === ""
            ? 0
            : this.genderSelect, // 性别
        user_age:
          this.ageSelect === null || this.ageSelect === "" ? 0 : this.ageSelect, // 年龄
        // start_time: this.start_time,
        // end_time: this.end_time,
        page: this.currentPage,
        list_rows: this.list_rows,
        key_value: this.key
      };
      orgPostReceiveList(parameter).then(res => {
        if (res.status === 200) {
          // console.log(JSON.stringify(res.data))
          // console.log('请求成功')
          for (let index = 0; index < this.classifyData.length; index++) {
            this.classifyData[index].status =
              res.data.resume_count["status_" + index * 10];
          }
          this.$set(this,'resumeList',res.data.resume_list)
          // console.log(this.resumeList);
        }
      });
    },
    // 职位列表
    getOrgPostList() {
      // this.loading = true
      var parameter = {
        state: this.selectPostStatus == null ? 0 : this.selectPostStatus,
        key_value: this.inputValue,
        page: this.postCurrentPage,
        list_rows: this.list_rows
      };
      getOrgPostList(parameter).then(res => {
        // console.log("职位列表",JSON.stringify(res.data))
        this.postList = res.data;
        // this.loading = false
      });
    },
    // 时间
    onDeliveryTime(val) {
      // console.log("时间",JSON.stringify(val))
      // if (val) {
      //   this.start_time = val[0];
      //   this.end_time = val[1];
      // } else {
      //   this.start_time = "";
      //   this.end_time = "";
      // }
      this.getorgPostReceiveList();
    },
    // 选择分类
    onSelectClassify(index, code) {
      this.currentPage = 1;
      this.classifyId = index;
      this.delivery_status = code;
      this.getorgPostReceiveList();
    },
    // 城市选择
    onHandleChange(val) {
      // console.log('城市选择',JSON.stringify(val[2]))
      if (val[2]) {
        this.area3_code = parseInt(val[2]);
      } else {
        this.area3_code = null
      }
      this.getorgPostReceiveList();
    },
    // 简历搜索
    onSearchResume() {
      this.getorgPostReceiveList();
    },
    // 职位搜索
    onSearchPost() {
      this.getOrgPostList();
    },
    // 工作经验选择
    onWorkLifeSelect(val) {
      this.getorgPostReceiveList();
    },
    // 性别选择
    onGenderSelect(val) {
      this.getorgPostReceiveList();
    },
    // 选择年龄
    onAgeSelect(val) {
      this.getorgPostReceiveList();
    },
    onDeliveryStatus(e, item) {
      // console.log('状态修改22222222222')
      let state = {
        post_id: item.post_id,
        delivery_id: item.delivery_id,
        delivery_status: e
      };
      this.state(state);
    },
    // 简历上一页
    onResumePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.getorgPostReceiveList();
      }
    },
    // 简历下一页
    onResumeNextPage() {
      if (this.resumeList.length > 0) {
        this.currentPage = this.currentPage + 1;
        this.getorgPostReceiveList();
      }
    },
    // 职位上一页
    onPostPreviousPage() {
      if (this.postCurrentPage > 1) {
        this.postCurrentPage = this.postCurrentPage - 1;
        this.getOrgPostList();
      }
    },
    // 职位下一页
    onPostNextPage() {
      if (this.postList.length > 0) {
        this.postCurrentPage = this.postCurrentPage + 1;
        this.getOrgPostList();
      }
    },
    // 跳转到职位简历列表
    onPostResume(id, name) {
      this.$router.push({
        path: "/user/org/talentpool/postresumelist",
        query: {
          post_id: id,
          post_name: name
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./resume.less";
</style>
