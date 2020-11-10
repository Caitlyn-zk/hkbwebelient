<template>
  <div class="content">
    <navigation></navigation>
    <div class="create-special padding-tb-20">
      <h3 class="create-title">
        <span></span>新建专题
      </h3>
      <div class="padding-t-20 padding-l-32">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="170px"
          class="demo-ruleForm"
        >
          <el-form-item label="上传专题封面" prop="cover_image">
            <el-upload
              class="avatar-uploader"
              action="string"
              :show-file-list="false"
              v-model="ruleForm.cover_image"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :http-request="httpRequest"
            >
              <img v-if="cover_image" :src="cover_image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="填写名称，不超过50个字"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc" class="textarea">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="ruleForm.desc"
              maxlength="60"
              @input="textareaInputs"
              placeholder="请填写描述，不超过60个字"
            ></el-input>
            <span class="maxlength">{{currentWordNumber}}/60</span>
          </el-form-item>
          <el-form-item label="是否允许投稿" prop="is_allow_deliver">
            <el-radio-group
              class="margin-l-104"
              v-model="ruleForm.is_allow_deliver"
              @change="onAllowDeliver"
            >
              <el-radio value="1" :label="1">允许</el-radio>
              <el-radio value="-1" :label="-1">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="投稿是否需要审核" prop="is_need_check">
            <el-radio-group class="margin-l-104" v-model="ruleForm.is_need_check">
              <el-radio :disabled="ruleForm.is_allow_deliver === 1 ? false : true" :label="1">需要</el-radio>
              <el-radio :disabled="ruleForm.is_allow_deliver === 1 ? false : true" :label="-1">不需要</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item class="primary-button">
            <el-button round type="primary" @click="submitForm('ruleForm')">创建专题</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "./common/navigation";
import { uploadImage } from "@/api/public";
import { collegeCreateSpecial } from "@/api/college";
export default {
  data() {
    return {
      limit: 1,
      cover_image: "",
      dialogVisible: false,
      ruleForm: {
        cover_image: "",
        name: "",
        is_allow_deliver: 1,
        is_need_check: -1,
        desc: "",
      },

      rules: {
        name: [
          { required: true, message: "请输入专题名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度不得超过 50 个字符",
            trigger: "blur",
          },
        ],
        cover_image: [
          { required: true, message: "请上传图片", trigger: "blur" },
        ],
        is_allow_deliver: [
          { required: true, message: "请选择是否允许投稿", trigger: "change" },
        ],
        is_need_check: [
          {
            required: true,
            message: "请选择投稿是否需要审核",
            trigger: "change",
          },
        ],
        desc: [{ required: true, message: "请填写专题描述", trigger: "blur" }],
      },
      currentWordNumber: 0,
    };
  },
  components: {
    navigation,
  },
  methods: {
    // 上传图片（点击上传按钮）
    httpRequest(file) {
      // console.log("finish", this.type);
      let that = this;
      let formData = new FormData();
      formData.append("image", file.file);
      formData.append("type", "column");
      uploadImage(formData)
        .then((res) => {
          if (res.status == 200) {
            this.ruleForm.cover_image = res.data.image_name;
            this.cover_image = "http://cdn.65ph.com/" + res.data.image_name;
            // this.imageData.push(res.data.image_name);
            // console.log('上传图片成功')
            // console.log(res.data)
            // console.log("上传图片", JSON.stringify(res.data.image_name));
            this.dialogVisible = true;
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
        })
        .catch((res) => {
          // console.log(res);
          this.$message({
            message: "图片上传失败",
            type: "error",
          });
        });
    },
    handleAvatarSuccess(res, file) {
      // console.log("图片上传成功");
      // this.cover_image = URL.createObjectURL(file.raw);
      this.cover_image = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // console.log(file.type);
      this.cover_image = "";
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    submitForm(formName) {
      let that = this;
      var data = {
        id: 0,
        cover_image: this.ruleForm.cover_image,
        name: this.ruleForm.name,
        is_allow_deliver: this.ruleForm.is_allow_deliver,
        is_need_check: this.ruleForm.is_need_check,
        desc: this.ruleForm.desc,
      };
      // console.log(data);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          collegeCreateSpecial(data)
            .then((res) => {
              if (res.status === 200) {
                // console.log("创建成功");
                that.$message({
                  message: res.msg,
                  type: "success",
                  showClose: true,
                  duration: 3000,
                });
                this.$router.push({ path: "/front/college/special" });
              }
            })
            .catch((res) => {
              that.$message({
                message: res.msg,
                type: "error",
                showClose: true,
                duration: 3000,
              });
            });
        } else {
          return false;
        }
      });
    },
    // 是否允许投稿
    onAllowDeliver(even) {
      // console.log('是否投稿1111')
      // console.log(even)
      if (even === -1) {
        // console.log('选中')
        this.ruleForm.is_need_check = -1;
        // console.log(this.ruleForm.is_need_check)
      }
    },
    //字数限制
    textareaInputs (e) {
      // 获取输入框的内容
      var value = this.ruleForm.desc;
      // 获取输入框内容的长度
      var len = parseInt(value.length);

      //最多字数限制
      if (len > 60) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
      this.currentWordNumber = len //当前字数
    },
  },
};
</script>

<style lang="less" scoped>
@import "./create-special.less";
</style>