<template>
  <div class="talent-pool">
    <div class="hk-addproject-title-mbar">
      人才库管理/平台人才库
    </div>
    <div class="content">
      <div class="search-module">
        <el-input placeholder="请输入想要搜索的简历" v-model="inputValue" class="search-input">
          <el-cascader
            slot="prepend"
            placeholder="职位类型"
            v-model="typeSelect"
            :options="postCate"
            :props="postData"
            @change="onTypeSelect"
            clearable >
          </el-cascader>
          <template slot="append">
            <div class="hk-search-button" @click="onSearch">搜索</div>
          </template>
        </el-input>
      </div>
      <div v-if="!display" class="tips">
        <div class="tips-text">发布职位，招纳更多人才吧~</div>
        <div @click="onReleasePost" class="release-post">发布职位>></div>
      </div>
      <div class="tab-pane" v-else>
        <div class="condition-filter select-style select">
          <!-- 学历要求 -->
          <el-select v-model="eduSelect" placeholder="学历要求" @change="onEdufeSelect" clearable>
            <el-option
              v-for="(eduItem,eduIndex) in eduData"
              :key="eduIndex"
              :label="eduItem.label"
              :value="eduItem.value"
            ></el-option>
          </el-select>
          <!-- 工作经验 -->
          <el-select v-model="workLifeSelect" placeholder="工作经验" @change="onWorkLifeSelect" clearable>
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
          <!-- 证书 -->
          <el-select
            v-model="certSelect"
            @change="oncertSelect"
            placeholder="证书要求"
            clearable
          >
            <el-option
              v-for="(cert,certIndex) in certData"
              :key="certIndex"
              :label="cert.label"
              :value="cert.value"
            ></el-option>
          </el-select>
          <!-- 性别 -->
          <el-select v-model="genderSelect" @change="onGenderSelect" placeholder="性别要求" clearable>
            <el-option
              v-for="(gender,genderIndex) in genderData"
              :key="genderIndex"
              :label="gender.label"
              :value="gender.value"
            ></el-option>
          </el-select>
          <!-- 期望薪资 -->
          <!-- <el-select v-model="salary" @change="onSalary" placeholder="行业领域" clearable>
            <el-option
              v-for="(salaryItem,salaryIndex) in salaryData"
              :key="salaryIndex"
              :label="salaryItem.label"
              :value="salaryItem.value"
            ></el-option>
          </el-select> -->
          <el-select v-model="min_salary" placeholder="最低薪资"  clearable @change="onMinSalary">
            <el-option v-for="(salary,index) in salaryData" :key="index" :label="salary.label" :value="salary.value">{{salary.label}}</el-option>
          </el-select>
          <el-select v-model="max_salary" placeholder="最高薪资" class="max-salary" @change="onMaxSalary" clearable>
              <el-option v-for="(salary,index) in salaryData" :key="index" :label="salary.label" :value="salary.value">{{salary.label}}</el-option>
          </el-select>
          <!-- 投递时间 -->
          <!-- <el-select v-model="deliveryTime" placeholder="投递时间" @change="onDeliveryTime" clearable>
            <el-option
              v-for="(deliveryTimeItem,index) in deliveryTimeList"
              :key="index"
              :label="deliveryTimeItem.label"
              :value="deliveryTimeItem.value"
            ></el-option>
          </el-select> -->
          <span class="line-34 margin-l-8 text-line hk-cursor" @click="onReset"><i class="iconfont icon-lajixiang font-14"></i>清除筛选条件</span>
        </div>
        <ul class="resurm-list">
          <li v-for="(resume,resumeIndex) in resumeList" :key="resumeIndex" class="resurm-content">
            <div class="box">
              <div class="post-name">求职意向：{{resume.post_cate_name}}</div>
              <div class="delivery-time">
                14小时前来过
                <!-- {{resume.add_time}} -->
              </div>
            </div>
            <div class="box">
              <div class="resurm-info">
                <div class="block">
                  <el-avatar
                    :size="68"
                    :src="resume.avatar === '' ? require('@/assets/image/user_img.png') : user_img + resume.avatar"
                  ></el-avatar>
                </div>
                <div class="hk-resurm-text">
                  <div
                    class="name"
                    @click="onResumeDetails(resume.resume_id,resume.post_id,resume.delivery_id)"
                  >
                    <span class="name-text">{{resume.real_name}}</span>
                    <span class="last_login_time">{{resume.last_login_time}}</span>
                  </div>
                  <div
                    class="details"
                  >{{resume.work_date | onWorkType}}/{{resume.max_user_edu | onEdu}}/{{resume.birthday}}岁</div>
                </div>
              </div>
              <div class="tiling select">
                <el-button
                  @click="onCollection(resume.resume_id)"
                  class="select-button"
                  :disabled="resume.is_collection == 1"
                  :class="resume.is_collection == 1 ? 'selections':'no'"
                >{{resume.is_collection == 1 ? '已收藏':'收藏'}}</el-button>
                <el-button
                  @click="onResumeDetails(resume.resume_id,resume.post_id,resume.delivery_id)"
                  class="select-button see"
                >查看</el-button>
              </div>
            </div>
          </li>
        </ul>
        <div class="hk-block" v-if="resumeList.length == list_rows">
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
  getResumeUserPool,
  orgCollectionUserResume,
  getPostCateTree
} from "@/api/recruit";
import { minEdu, workLife, age,salaryNumber} from "@/config/constant";
import { regionData } from "element-china-area-data";
import utils from "@/utils/index.js";
export default {
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
      resumeList: [],
      // user_img: require("@/assets/image/user_img.png"),
      user_img:'http://cdn.65ph.com/',
      typeSelect: '',
      postCate: [],
      postData: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      // 学历
      eduSelect: null,
      eduData: minEdu,
      // 薪资
      salaryData:salaryNumber,
      min_salary: null,
      max_salary: null,
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
      certSelect: null,
      certData: [
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
      deliveryTime: null,
      deliveryTimeList: [
        {
          value: 1,
          label: "一天内"
        },
        {
          value: 2,
          label: "三天内"
        },
        {
          value: 3,
          label: "一周前"
        },
        {
          value: 4,
          label: "一个月前"
        },
        {
          value: 5,
          label: "三个月内"
        }
      ],
      key: "",
      delivery_status: 0,
      start_time: "",
      end_time: "",
      area3_code: null,
      inputValue: "",
      loading: false,
      display: false
    };
  },
  created() {
    this.get_ResumeUserPool()
    this.get_PostCateTree()
  },
  methods: {
    get_ResumeUserPool() {
      let that = this
      let parameter = {
        key_value: that.inputValue,
        user_edu: that.eduSelect == '' ? 0 : that.eduSelect,
        work_date: that.workLifeSelect == '' ? 0 : that.workLifeSelect,
        area3_code: that.area3_code == '' ? 0 : that.area3_code,
        gender: that.genderSelect == '' ? 0 : that.genderSelect,  //性别
        user_age: that.ageSelect == '' ? 0 : that.ageSelect, //年龄
        user_cert: that.certSelect == '' ? 0 : that.certSelect,
        min_salary: that.min_salary == '' ? 0 : that.min_salary,
        max_salary: that.max_salary == '' ? 0 : that.max_salary,
        post_cate: that.typeSelect == '' ? 0 : that.typeSelect[1],
        page: that.currentPage,
        list_rows: that.list_rows
      };
      getResumeUserPool(parameter).then(res => {
        if (res.status === 200) {
          that.display = true
          that.$set(that,'resumeList',res.data.resume_list)
        } else {
          that.display = false
        }
      });
    },
    get_PostCateTree () {
      getPostCateTree().then(res => {
        this.postCate = res.data
      })
    },
    // 时间
    onDeliveryTime(val) {
      // console.log("时间",JSON.stringify(val))
      this.start_time = this.deliveryTime
    },
    // 城市选择
    onHandleChange(val) {
      console.log("城市选择",val)
      if (val[2]) {
        this.area3_code = parseInt(val[2]);
      }
      this.get_ResumeUserPool()
    },
    // 学历要求
    onEdufeSelect(val) {
      this.get_ResumeUserPool()
    },
    // 工作经验选择
    onWorkLifeSelect(val) {
      this.get_ResumeUserPool()
    },
    // 性别选择
    onGenderSelect(val) {
      this.get_ResumeUserPool()
    },
    // 证书
    oncertSelect(val) {
      this.get_ResumeUserPool()
    },
    onSalary(val) {
      this.get_ResumeUserPool()
    },
    // 简历上一页
    onResumePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.get_ResumeUserPool()
      }
    },
    // 简历下一页
    onResumeNextPage() {
      if (this.resumeList.length == this.list_rows) {
        this.currentPage = this.currentPage + 1;
        this.get_ResumeUserPool()
      }
    },
    // 查看简历
    onResumeDetails(resume_id, post_id, delivery_id) {
      this.$router.push({
        path: "/user/org/talentpool/resumedetails",
        query: {
          resume_id: resume_id,
          post_id: post_id,
          delivery_id: delivery_id
        }
      });
    },
    // 收藏简历
    onCollection (resume_id) {
      orgCollectionUserResume(resume_id).then(res=>{
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
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
    },
    // 搜索
    onSearch() {
      // console.log('搜索')
    },
    onReleasePost() {
      this.$router.push({
        path: "/user/org/post/public",
        query: {
          id: 0
        }
      });
    },
    // 重置筛选条件
    onReset(){
      this.min_salary = null
      this.max_salary = null
      this.eduSelect = null
      this.workLifeSelect = null
      this.certSelect = null
      this.citySelect = [] 
      this.genderSelect = null
      this.deliveryTime = null
      this.get_ResumeUserPool()
    },
    onMaxSalary(){
      if (this.min_salary > this.max_salary) {
        this.$message({
          showClose: true,
          message: '最小薪资不得订阅最大薪资',
          type: 'warning'
        });
      } else {
        this.get_ResumeUserPool()
      }
    },
    onMinSalary(){
      this.get_ResumeUserPool()
    },
    onTypeSelect(){
      this.get_ResumeUserPool()
    }
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f6f6f8");
  }
};
</script>
<style lang="less" scoped>
@import "./talentpool.less";
</style>
