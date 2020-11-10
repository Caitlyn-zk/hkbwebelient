<template>
  <div class="basic-info" :style="{ minHeight:domHeight-50+ 'px' }">
    <!-- <img src="" class="user-img" alt=""> -->
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div class="basic-info-title">请填写基本信息</div>
        <!-- <img v-if="imageUrl !== ''" :src="imageUrl" class="image-url" /> -->
        <!-- <div v-if="imageUrl == ''" class="avatar-uploader-icon" @click="consoleFL"></div> -->
        <div class="text-center avatar-uploader-icon">
          <img width="94px" height="94px" :src="imageUrl == '' ? require('@/assets/image/user_img.png') : imageUrl " @click="consoleFL">
        </div>
      <el-form-item label prop="name">
        <!-- show-word-limit -->
        <el-input v-model="form.name" placeholder="请输入你的姓名"></el-input>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="请选择出生日期"
          format="yyyy 年 MM 月 dd 日"
          style="width:612px"
          value-format="yyyy-MM-dd"
          :picker-options="onBirthday"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label class="gender" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label class="region" prop="region">
        <el-cascader
          ref="myCascader"
          v-model="form.region"
          placeholder="选择居住地区"
          :options="areaData"
          @change="onHandleChange"
          style="width:612px"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label prop="email" class="hk-email-bar">
        <el-input v-model="form.email" placeholder="请输入你的邮箱" type="email"></el-input>
        <span class="hk-right-email">0-36字符</span>
      </el-form-item>
      <el-form-item label prop="work_life" class="work-life">
        <el-date-picker
          v-model="form.work_life"
          type="date"
          @change="onWorkLife"
          placeholder="参加工作时间"
          format="yyyy 年 MM 月"
          style="width:399px;margin-right:30px;"
          value-format="yyyy-MM-dd"
          :picker-options="maxWorkLlifeDate"
        ></el-date-picker>
        <el-checkbox v-model="checked" @change="onChecked" class="work-experience">暂无工作经验</el-checkbox>
      </el-form-item>
      <el-form-item class="hk-button-bar">
        <el-button @click="submitForm('form')" class="next-step">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="cropperModel" width="600px" :before-close="beforeClose" title="编辑">
      <Cropper  @close='onClose' @confirm="onConfirm"></Cropper>
    </el-dialog>
  </div>
</template>
<script>
import { regionData } from "element-china-area-data";
import { authUserInfoAu, getUserInfo } from "@/api/user";
import {uploadImage,getUpToken} from "@/api/public"
import $store from '@/store'
import Cropper from 'components/popup/cropper'
export default {
  data() {
    return {
      domHeight:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
      workLife: [
        {
          value: 1,
          label: "1年以下"
        },
        {
          value: 2,
          label: "1-3年"
        },
        {
          value: 3,
          label: "3-5年"
        },
        {
          value: 4,
          label: "5-10年"
        },
        {
          value: 6,
          label: "10年以上"
        }
      ],
      checked: false,
      cropperModel: false,
      fileValue:'',
      fixedNumber:[1.5, 1],
      areaData: regionData,
      area1_code: "",
      area1_name: "",
      area2_code: "",
      area2_name: "",
      area3_code: "",
      area3_name: "",
      imageUrl: "",
      image_name:'',
      form: {
        name: "",
        birthday: "",
        gender: "",
        region: [],
        email: "",
        work_life: "",
        student: ""
      },
      uploadImage:{},
      headers: {
        Authorization: $store.state.app.token  
      },
      onBirthday: {
        disabledDate: time => {
          return time.getTime() > Date.now()-8.64e7
        }
      },
      // 工作时间限制
      maxWorkLlifeDate: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
      resume_id: 0,
      rules: {
        name: [{ required: true, message: "请输入你的姓名", trigger: "blur" }],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        student: [
          { required: true, message: "请选择是否是学生", trigger: "change" }
        ],
        region: [{ required: true, message: "请选择地区", trigger: "change" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 0,
            max: 36,
            message: "长度在 0 到 36 个字符",
            trigger: "blur"
          },
          { type: "email", message: "必须为邮箱格式" }
        ]
      }
    };
  },
  components:{
    Cropper
  },
  created() {
    document.querySelector('body').setAttribute('style', 'background-color:#fff')
    // console.log("获取 页面高度", this.height);
    this.getInfo();
  },
  methods: {
    onHandleChange(val) {
      // console.log("地区11", JSON.stringify(val));
      if (val.length !== 0) {
        this.$set(this, "area1_code", this.form.region[0]);
        this.$set(this, "area2_code", this.form.region[1]);
        this.$set(this, "area3_code", this.form.region[2]);
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
        // console.log('地区', this.area1_name, this.area2_name, this.area3_name)
      } else {
        this.$set(this, "area1_code", "");
        this.$set(this, "area2_code", "");
        this.$set(this, "area3_code", "");
        this.$set(this, "area1_name", "");
        this.$set(this, "area2_name", "");
        this.$set(this, "area3_name", "");
      }
    },
    getUpToken(){
      getUpToken().then(res=>{
        // console.log("获取图片",JSON.stringify(res))
      })
    },
    onWorkLife(val) {
      // console.log("选择工作时间", val);
      if (val !== "") {
        this.checked = false;
      }
    },
    onChecked(val) {
      // console.log("选择是否有经验", val);
      if (val) {
        this.form.work_life = "";
      }
    },
    add() {
      let that = this;
      var parameter = {
        person_reg_state: 10,
        resume_id: that.resume_id,
        real_name: that.form.name,
        avatar: that.image_name,
        gender: that.form.gender,
        birthday: that.form.birthday,
        student: that.form.student,
        email: that.form.email,
        work_date: that.form.work_life === "" ? "0" : that.form.work_life,
        live_in_area1: that.area1_code,
        live_in_area2: that.area2_code,
        live_in_area3: that.area3_code,
        live_in_area1_name: that.area1_name,
        live_in_area2_name: that.area2_name,
        live_in_area3_name: that.area3_name
      };
      // console.log("参数", parameter);
      authUserInfoAu(parameter)
        .then(res => {
          // console.log("保存信息", res);
          if (res.status === 200) {
            that.$router.push({ name: "PATH_ACCOUNT_USER_REGISTER_SETP_2" });
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
        })
        .catch(res => {
          this.$message({
            message: res.message,
            type: "error",
            showClose: true,
            duration: 3000
          });
        });
    },
    submitForm(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          this.add();
        }
      });
    },
    getInfo() {
      let person_reg_state = 10;
      let that = this;
      getUserInfo(person_reg_state).then(res => {
        // console.log("基本信息渲染", JSON.stringify(res.data));
        if (res.status == 200) {
          // 成功便将名字传给右侧导航
          // Bus.$emit('name',res.data.real_name)
          that.resume_id = res.data.resume_id
          that.form.name = res.data.real_name;
          // avatar: '',
          that.form.gender = String(res.data.gender);
          that.form.birthday = res.data.birthday;
          that.form.student = res.data.student;
          that.form.email = res.data.email;
          that.form.work_life = res.data.work_date;
          that.imageUrl = res.data.avatar == undefined ? '': 'http://cdn.65ph.com/'+ res.data.avatar
          that.area1_code = res.data.live_in_area1;
          that.area2_code = res.data.live_in_area2;
          that.area3_code = res.data.live_in_area3;
          that.area1_name = res.data.live_in_area1_name;
          that.area2_name = res.data.live_in_area2_name;
          that.area3_name = res.data.live_in_area3_name;
          that.form.region = [
            String(res.data.live_in_area1),
            String(res.data.live_in_area2),
            String(res.data.live_in_area3)
          ];
        }
        // console.log("地区 渲染", JSON.stringify(that.form.region));
      });
    },
    consoleFL () {
      // 弹出剪裁框，将当前文件设置为文件
      this.cropperModel = true
    },
    beforeClose (done) {
      this.cropperModel = false
    },
    onClose(){
      this.cropperModel = false
    },
    onConfirm(imageUrl,image_name){
      this.cropperModel = false
      this.imageUrl = imageUrl
      this.image_name = image_name
    }
  },
   beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
};
</script>
<style lang="less" scoped>
@import "./register-basicinfo.less";
</style>
