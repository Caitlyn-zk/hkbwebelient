<template>
  <div class="personal-info">
    <div class="tiling">
      <div class="info">
        <div class="tiling" style="align-items: center;">
          <img
            class="avatar"
            :src="imageUrl === '' ? require('@/assets/image/user_img.png') : imageUrl "
          />
          <!-- @click="consoleFL" -->
          <div class="infon-muster">
            <div>姓名：{{real_name}}</div>
            <div>职位：{{post_name}}</div>
            <div>公司：{{org_name}}</div>
          </div>
        </div>
        <div class="tiling">
          <img :src="success_auth" alt class="auth-icon" />
          <div class="tips-info">
            <div>已完成身份材料认证</div>
            <div class="margin-t-5">认证材料：{{material_name}}</div>
            <div class="time">认证日期：{{time}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" class="form">
      <div class="title">个人信息</div>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="职位：" prop="post_name">
        <!-- <el-cascader
          ref="myprojeccader"
          :options="postList"
          :props="prostData"
          v-model="form.post_id"
          placeholder="职位"
          @change="onPostList"
          clearable
        ></el-cascader>-->
        <el-input v-model="form.post_name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机：" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请填写你的手机号"></el-input>
        <div class="tips">*用于接收招聘类通知短信</div>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" placeholder="请填写你的邮箱号"></el-input>
        <div class="tips">*用于接收简历</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit-button" @click="onSubmit('form')">确定</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-dialog :visible.sync="cropperModel" width="600px" :before-close="beforeClose" title="编辑">
      <Cropper @close="onClose" @confirm="onConfirm"></Cropper>
    </el-dialog> -->
  </div>
</template>
<script>
// import Cropper from "components/popup/cropper";
import { getPostCateTree } from "@/api/recruit";
import { authUserOrgEdit, getUserOrgData } from "@/api/user";
export default {
//   components: { Cropper },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else {
        if (value !== "") {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
    return {
      cropperModel: false,
      //   no_auth: require("@/assets/image/no-auth.png"),
      success_auth: require("@/assets/image/auth-success.png"),
      //   authentication: false,
      post_name: "未知",
      material_name: "营业执照",
      real_name: '',
      time: "2020年6月15日",
      form: {
        id: null,
        name: "",
        post_name: "",
        phone: "",
        email: "",
        post_name: "",
        mobile: ""
        // avatar: ""
      },
      rules: {
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        imageUrl: [{ required: true, message: "请选择头像", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }]
      },
      prostData: {
        value: "id",
        label: "cate_name",
        children: "children"
      },
      user_img: "",
      postList: [],
      imageUrl: ""
    };
  },
  computed: {
    org_logo() {
      if (this.$store.state.app.userInfo.org_list) {
          // console.log(this.$store.state.app.userInfo.org_list)
        return (
          "http://cdn.65ph.com/" +
          this.$store.state.app.userInfo.org_list[0].org_logo
        );
      }
      return "";
    },
    org_name() {
      if (this.$store.state.app.userInfo.org_list) {
        if (this.$store.state.app.userInfo.org_list.length > 0) {
          return this.$store.state.app.userInfo.org_list[0].org_name;
        }
      }
      return "新企业";
    },
    avatar() {
      if (this.$store.state.app.userInfo.avatar) {
        return "http://cdn.65ph.com/" + this.$store.state.app.userInfo.avatar;
      }
      return "";
    }
  },
  created() {
    this.getPostList();
    this.imageUrl = this.avatar;
    this.getInfo();
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let that = this;
          var parameter = {
            id: that.form.id,
            name: that.form.name,
            mobile: that.form.mobile,
            email: that.form.email,
            post_name: that.form.post_name
          };
          // console.log("信息提交");
          // console.log(parameter);
          authUserOrgEdit(parameter).then(res => {
            //   console.log("新增企业个人信息", JSON.stringify(res));
            if (res.status == 200) {
              this.$message({
                message: res.msg,
                type: "success",
                showClose: true,
                duration: 3000
              });
              this.getInfo()
            }
          });
        } else {
          return false;
        }
      });
    },
    // consoleFL() {
    //   this.cropperModel = true;
    // },
    // beforeClose() {
    //   this.cropperModel = false;
    // },
    // onClose() {
    //   this.cropperModel = false;
    // },
    // onConfirm(imageUrl, image_name) {
    //   this.cropperModel = false;
    //   // 页面展示
    //   this.imageUrl = imageUrl;
    //   // 上传到后台
    //   this.image_name = image_name;
    // },
    // 获取专业类别
    getPostList() {
      getPostCateTree().then(res => {
        this.$set(this, "postList", res.data);
      });
    },
    onPostList() {
      // console.log();
    },
    // 获取数据
    getInfo() {
      getUserOrgData().then(res => {
        // console.log("基本信息渲染", JSON.stringify(res));
        if (res.status == 200) {
          // 成功便将名字传给右侧导航
          // console.log("打印数据");
          // console.log(res.data);
          this.form.name = res.data.name;
          this.$set(this.form, "id", res.data.id);
          this.$set(this.form, "mobile", res.data.mobile);
          this.$set(this.form, "email", res.data.email);
          this.$set(this.form, "post_name", res.data.post_name);
          this.$set(this, "post_name", res.data.post_name);
          this.$set(this, "real_name", res.data.name);
          
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./personal-info.less";
</style>