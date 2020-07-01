<template>
  <div class="intention" :style="{minHeight:domHeight -50+ 'px'}">
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div class="intention-title">你想要什么工作</div>
      <el-form-item label prop="post">
        <el-cascader
          ref="myPost"
          :options="postCateTree"
          :props="postData"
          class="other-select"
          v-model="form.post"
          placeholder="请选择职位"
          :show-all-levels="false"
          @change="onPostSelect"
          style="width:100%;"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="min_salary">
        <div class="salary">
          <el-select v-model="form.min_salary" placeholder="最低薪资" class="min-salary" clearable>
            <el-option
              v-for="(item,index) in salary"
              :key="index"
              :label="item.label"
              :value="item.value"
            >{{item.label}}</el-option>
          </el-select>
          <el-select v-model="form.max_salary" placeholder="最高薪资" class="max-salary" clearable>
            <el-option
              v-for="(item,index) in salary"
              :key="index"
              :label="item.label"
              :value="item.value"
            >{{item.label}}</el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label prop="city">
        <el-cascader
          ref="myCascader"
          v-model="form.city"
          placeholder="请选择期望城市"
          :options="areaData"
          @change="onHandleChange"
          style="width:612px"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label prop="work_type">
        <el-select v-model="form.work_type" placeholder="请选择职位类型" style="width:612px" clearable>
          <el-option
            v-for="(item,index) in workTypeData"
            :key="index"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label class="state" prop="state">
        <el-select v-model="form.state" placeholder="请选择当前状态" style="width:612px" clearable>
          <el-option
            v-for="(item,index) in stateData"
            :key="index"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label prop="in_time">
        <el-select v-model="form.in_time" placeholder="请选择到岗时间" style="width:612px" clearable>
          <el-option
            v-for="(item,index) in inTime"
            :key="index"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <div class="select-button">
        <el-button @click="onPreviousStep" class="button previous-step">上一步</el-button>
        <el-button @click="submitForm('form')" class="button next-step">完成</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { salaryNumber } from "@/config/constant";
import { regionData } from "element-china-area-data";
import {
  editUserResume,
  getPostCateTree,
  getUserResumeList  
} from "@/api/recruit";
export default {
  data() {
    return {
      workTypeData: [
        {
          value: 10,
          label: "全职"
        },
        {
          value: 20,
          label: "兼职"
        },
        {
          value: 30,
          label: "实习"
        }
      ],
      domHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      salary: salaryNumber,
      jW_id: 0,
      postData: {
        value: "id",
        label: "cate_name",
        children: "children"
      },
      postCateTree: [],
      area1_code: "",
      area1_name: "",
      area2_code: "",
      area2_name: "",
      area3_code: "",
      area3_name: "",
      areaData: regionData,
      stateData: [
        {
          value: 10,
          label: "正在找工作"
        },
        {
          value: 20,
          label: "观望中"
        },
        {
          value: 30,
          label: "不想找工作"
        }
      ],
      inTime: [
        {
          value: 10,
          label: "随时到岗"
        },
        {
          value: 20,
          label: "1星期内到岗"
        },
        {
          value: 30,
          label: "1个月内到岗"
        },
        {
          value: 40,
          label: "3个月内到岗"
        }
      ],
      city: "",
      form: {
        id: 0,
        post: [],
        post_cate: "",
        post_cate_name: "",
        area2_code: "",
        area2_name: "",
        min_salary: "",
        max_salary: "",
        work_type: "",
        state: "",
        city: "",
        in_time: ""
      },
      resume_id: 0,
      resume_name:'',
      privacy_state: null,
      rules: {
        post: [
          { required: true, message: "请输入期望职位", trigger: "change" }
        ],
        min_salary: [
          { required: true, message: "请选择最低薪资", trigger: "change" }
        ],
        max_salary: [
          { required: true, message: "请选择最高薪资", trigger: "change" }
        ],
        city: [
          { required: true, message: "请输入期望职位", trigger: "change" }
        ],
        work_type: [
          { required: true, message: "请选择职位类型", trigger: "change" }
        ],
        state: [
          { required: true, message: "请选择当前状态", trigger: "change" }
        ],
        in_time: [
          { required: true, message: "请选择到岗时间", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getPostClassData();
    this.getJwList();
  },
  methods: {
    onPreviousStep() {
      this.$router.push({ name: "PATH_ACCOUNT_USER_REGISTER_SETP_2" });
    },
    getPostClassData() {
      getPostCateTree().then(res => {
        this.$set(this, "postCateTree", res.data);
      });
    },
    add() {
      let that = this;
      var parameter = {
          person_reg_state: 30,
          resume_id: that.resume_id,
          resume_name: that.resume_name,
          privacy_state: that.privacy_state,
        // jw_id: that.jW_id,
          post_cate: that.form.post_cate,
          area1_code: that.area1_code,
          area1_name: that.area1_name,
          area2_code: that.form.area2_code,
          area2_name: that.form.area2_name,
          area3_code: that.area3_code,
          area3_name: that.area3_name,
          post_cate_name: that.form.post_cate_name,
          min_salary: that.form.min_salary,
          max_salary: that.form.max_salary,
          work_type: that.form.work_type,
          jobwant_state: that.form.state,
          in_time: that.form.in_time
      };
      editUserResume(parameter).then(res => {
        if (res.status === 200) {
          that.$message({
            message: res.msg,
            type: "success",
            showClose: true,
            duration: 3000
          });
          // const backUrl = cookie.get(BACK_URL) || '/user/person/index'
          // cookie.remove(BACK_URL)
          // router.push({ path: backUrl })
          this.$router.push({ path: "/user/person/index" });
        } else {
          that.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
        }
      });
    },
    // 拉取工作经历
    getJwList() {
      console.log(12143);
      let person_reg_state = 30;
      let that = this;
      getUserResumeList(person_reg_state)
        .then(res => {
          if (res.status == 200) {
            that.resume_id = res.data.resume_list[0].resume_id
            that.resume_name = res.data.resume_list[0].resume_name
            that.privacy_state = res.data.resume_list[0].privacy_state
            console.log(res.data.resume_list[0].resume_id)
            console.log("数据渲染");
            console.log([res.data].length);
            if ([res.data].length > 0) {
              // console.log(res.data);
              // that.jW_id = res.data.id;
              // that.form.post_cate = res.data.post_cate;
              // that.form.post = [
              //   parseInt(res.data.post_cate / 100),
              //   res.data.post_cate
              // ];

              // // 城市
              // let mycode = String(res.data.area2_code);
              // console.log(mycode.substring(0, 2));
              // let area1_code = mycode.substring(0, 2) + "0000";
              // that.form.city = [area1_code, String(res.data.area2_code)];

              // that.form.min_salary = res.data.min_salary;
              // that.form.max_salary = res.data.max_salary;
              // that.form.work_type = res.data.work_type;
              // that.form.state = res.data.state;
              // that.form.in_time = res.data.in_time;
            } else {
              that.jW_id = 0;
            }
          }
        })
        .catch(res => {
          console.log(res);
          this.$message({
            message: res.message,
            type: "error",
            showClose: true,
            duration: 3000
          });
        });
    },
    // 验证
    submitForm(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          this.add();
        }
      });
    },
    // 选择职位
    onPostSelect(val) {
      console.log("职位", JSON.stringify(val));
      this.$set(this.form, "post_cate", val[1]);
      this.$set(
        this.form,
        "post_cate_name",
        this.$refs.myPost.getCheckedNodes()[0].pathLabels[1]
      );
    },
    onHandleChange(val) {
      this.$set(this, "area1_code", this.form.city[0]);
      this.$set(this.form, "area2_code", this.form.city[1]);
      this.$set(this,'area3_code',this.form.city[2])
      this.$set(
        this,
        "area1_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]
      );
      this.$set(
        this.form,
        "area2_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
      );
      this.$set(
        this,
        "area3_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]
      );
      console.log("地区", this.area1_name, this.area2_name,this.area3_name);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./register-jw.less";
</style>
