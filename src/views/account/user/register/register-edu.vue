<template>
  <div class="experience" :style="{minHeight:domHeight -50+ 'px'}">
    <!-- <img src="" class="user-img" alt=""> -->
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div class="experience-title">请填写教育经历</div>
      <el-form-item label prop="name">
        <!-- <el-input v-model="form.school" placeholder="请输入最高学历学校名称" style="width:612px"></el-input> -->
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="form.school"
          @input="changeInput"
          :fetch-suggestions="querySearch"
          placeholder="请输入你的学校名称"
          @select="handleSelect"
          
        > 
          <template slot-scope="{ item }">
            <div class="name">{{ item.school_name }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          value-format="yyyy-MM"
          type="month"
          format="yyyy 年 MM 月"
          style="width:612px"
          placeholder="请选择入学时间"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          value-format="yyyy-MM"
          type="month"
          format="yyyy 年 MM 月"
          placeholder="请选择毕业时间"
          style="width:612px"
          :picker-options="pickerOptions1"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label class="major" prop="major">
        <el-cascader
          ref="myCascader"
          :options="majorList"
          :props="prostData"
          class="other-select"
          v-model="form.major"
          placeholder="请输入所学专业"
          :show-all-levels="false"
          @change="onMajor"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label prop="edu">
        <el-select v-model="form.edu" placeholder="请选择学历" style="width:612px" clearable>
          <el-option
            v-for="(item,index) in minEdu"
            :key="index"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="edu-type" prop="radio" v-if="form.edu == 2">
        <el-radio v-model="form.radio" label="0">统招</el-radio>
        <el-radio v-model="form.radio" label="1">非统招</el-radio>
      </el-form-item>
      <div class="hk-button-bar select-button hk-button-bar">
        <el-button class="button previous-step" @click="onPreviousStep">上一步</el-button>
        <el-button class="button next-step" @click="submitForm('form')">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { minEdu, tzList } from "@/config/constant";
import { recruitUserEduAu, getPostCateTree } from "@/api/recruit";
import { getSchoolNameList } from "@/api/public";
import { getUserregisterEduList } from "@/api/user";
export default {
  data() {
    return {
      domHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      minEdu: [{
        value: 0,
        label: '高中及以下'
      }, {
          value: 10,
          label: '大专'
      }, {
          value: 20,
          label: '本科'
      }, {
          value: 30,
          label: '硕士'
      }, {
          value: 40,
          label: '博士'
      }],
      majorName: "",
      form: {
        id: 0,
        school: "",
        startTime: "",
        endTime: "",
        region: "",
        major_id: "",
        major: "",
        edu: "",
        radio: ""
      },
      tzList_list: tzList,
      majorList: [],
      prostData: {
        value: "id",
        label: "cate_name",
        children: "children"
      },
      // 简历id
      resume_id: 0,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now()-8.64e7
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          var time1 = new Date(this.form.startTime).getTime();
          var endTime = time.getTime() < time1 || time.getTime() > Date.now()-8.64e7
          return endTime;
        }
      },
      // 搜索学校字段
      restaurants: [],
      timeout: null,
      schollList: [],
      rules: {
        school: [
          { required: true, message: "请输入最高学历学校名称", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "请选择入学时间", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请选择毕业时间", trigger: "change" }
        ],
        major: [
          { required: true, message: "请输入所学专业", trigger: "change" }
        ],
        edu: [{ required: true, message: "请选择学历", trigger: "change" }],
        radio: [
          { required: true, message: "请选择学历类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getMajorList();
    this.getEduList();
  },
  methods: {
    onPreviousStep() {
      this.$router.push({ path: "/account/user/register/basicinfo" });
    },
    userEduAu() {
      console.log(this.resume_id)
      let that = this;
      var parameter = {
        id: that.form.id,
        person_reg_state: 20,
        resume_id: that.resume_id,
        school: that.form.school,
        edu: that.form.edu,
        begin_dt: that.form.startTime,
        end_dt: that.form.endTime,
        major_id: that.form.major_id,
        major: that.majorName,
        is_tz: that.form.radio
      };
      console.log("参数", parameter);
      recruitUserEduAu(parameter).then(res => {
        console.log("保存信息", res);
        if (res.status === 200) {
          this.$router.push({ name: "PATH_ACCOUNT_USER_REGISTER_SETP_3" });
          this.$message({
            message: res.msg,
            type: "success",
            showClose: true,
            duration: 3000
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
        }
      });
    },
    // 获取专业类别
    getMajorList() {
      getPostCateTree().then(res => {
        this.$set(this, "majorList", res.data);
      });
    },
    // 专业选择
    onMajor(val) {
      // console.log("专业", JSON.stringify(val));
      this.$set(this.form, "major_id", val[1]);
      this.$set(
        this,
        "majorName",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
      );
      // console.log("专业选择", this.form.major_id, this.majorName);
    },
    submitForm(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          this.userEduAu();
        }
      });
    },
    // 拉取教育经历
    getEduList() {
      let person_reg_state = 20;
      let that = this;
      getUserregisterEduList(person_reg_state)
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.resume_id)
            if(res.data.data_list.length>0){
              let data = res.data.data_list[0];
              that.form.id = data.id;
              that.form.school = data.school;
              that.form.edu = data.edu;
              that.form.startTime = data.begin_dt;
              that.form.endTime = data.end_dt;
              that.form.major_id = data.major_id;
              that.form.major = [parseInt(data.major_id / 100), data.major_id];
              that.majorName = data.major;
              that.form.radio = String(data.is_tz);
            }
            that.resume_id = res.data.resume_id
          } else {
            // this.$message({
            //   message: res.message,
            //   type: 'error',
            //   showClose: true,
            //   duration: 3000
            // })
          }
        })
        .catch(res => {
          // this.$message({
          //   message: res.msg,
          //   type: 'error',
          //   showClose: true,
          //   duration: 3000
          // })
        });
    },
    // 请求学校数据
    onSchoolNameList(school_name) {
      getSchoolNameList(this.form.school).then(res => {
        if (res.status === 200) {
          this.schollList = res.data;
        } else {
          this.schollList = [];
        }
      }).catch(res => {
        console.log("when status code other")
        this.schollList = [];
      });
    },
    // 搜索
    querySearch(queryString, cb) {
      // console.log(queryString)
      // 调用 callback 返回建议列表的数据
      // cb(results);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let restaurants = this.restaurants;
        // console.log(restaurants)
        let results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        cb(results);
      }, 3000 * Math.random());
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.school_name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    // 选择搜索内容
    handleSelect(item) {
      this.form.school = item.school_name
    },
    changeInput() {
      this.onSchoolNameList(this.form.school);
    }
  },
  watch: {
    schollList () {
      this.restaurants = this.schollList
      // console.log(this.restaurants)
    }
  }
};
</script>
<style lang="less" scoped>
@import "./register-edu.less";
</style>
