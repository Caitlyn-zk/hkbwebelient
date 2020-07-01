<template>
  <div class="org-info">
    <div class="title">
      主体信息
      <span
        :style="{'color':state === 0 ? '#FFA200': state === 1 ? '#05D797' : 'red'}"
      >{{state === 0 ? '认证中': state === 1 ? '已认证' : '未认证'}}</span>
    </div>
    <div class="content">
      <div class="company-info-muster">
        <div class="company-info">
          <img :src="org_logo === '' ? require('@/assets/image/user_img.png') : 'http://cdn.65ph.com/'+ org_logo "
          @click="consoleFL"/>
          <div>公司全称：{{org_name}}</div>
        </div>
        <div class="company-state">
          <div class="tips">
            <img :src="authImg[state]" alt class="auth-icon" />
            <div class>
              <div>公司{{state === 0 ? '认证中': state === 1 ? '已认证' : state === 2 ? '认证未通过':'未认证'}}</div>
              <div class="margin-t-7">完成公司认证，让更多的候选人更快的找到你</div>
            </div>
          </div>
          <el-button
            type="primary"
            @click="onAuth"
            :class="state === 0 ? 'attestation' : ''"
          >{{state === 0 ? '': state === 1 ? '更改认证' : state === 2 ? '重新认证':'立即认证'}}</el-button>
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left">
        <div class="form-title">基础信息：</div>
        <el-form-item label="公司简称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入公司简称"></el-input>
        </el-form-item>
        <el-form-item label="公司规模：" prop="scale">
          <el-select v-model="form.scale" placeholder="请选择" clearable>
            <el-option
              v-for="item in compayScale"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司地址：" prop="address">
          <el-cascader
            ref="myCascader"
            @change="getCityData"
            class="hk-addcont-address"
            :options="optionsaddress"
            v-model="form.address"
            :separator="' '"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="机构类型：" prop="org_type">
          <el-select v-model="form.org_type" placeholder="请选择" clearable>
            <el-option
              v-for="item in orgType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业介绍：" prop="desc" >
          <quill-editor v-model="form.desc" ref="myQuillEditor" :options="postDetail"></quill-editor>
        </el-form-item>
        <el-button type="primary" class="submit-button" @click="onSubmit('form')">保存</el-button>
      </el-form>
    </div>
    <el-dialog :visible.sync="cropperModel" width="600px" :before-close="beforeClose" title="编辑">
      <Cropper @close="onClose" @confirm="onConfirm"></Cropper>
    </el-dialog>
  </div>
</template>
<script>
import { authUserOrgPerfect, getOrgInfoData } from "@/api/user";
import { compayScale, industryNeighborhood } from "@/config/constant";
import Cropper from "components/popup/cropper";
import { regionData } from "element-china-area-data";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      // 0表示认证中 1表示认证成功，2表示认证失败，其他数字表示未认证
      state: 1,
      cropperModel: false,
      org_logo: '',
      image_name: null,
      form: {
        name: "",
        // industryNeighborhood: "",
        // website: "",
        address: "",
        org_type: "",
        // email: "",
        scale: "",
        desc: ""
      },
      area1: "",
      area2: "",
      area3: "",
      area1_name: "",
      area2_name: "",
      area3_name: "",
      postDetail: {
        theme: "snow"
      },
      buttonData: ["认证失败", "", "立即认证", "更改认证"],
      authImg: [
        require("@/assets/image/auth-of.png"),
        require("@/assets/image/auth-success.png"),
        require("@/assets/image/auth-erro.png"),
        require("@/assets/image/no-auth.png")
      ],
      optionsaddress: regionData, // 存放城市数据
      compayScale: compayScale,
      orgType: [
        {
          label: "民营企业",
          value: 10
        },
        {
          label: "国有企业",
          value: 20
        },
        {
          label: "事业单位",
          value: 30
        },
        {
          label: "机关",
          value: 40
        },
        {
          label: "社会团体",
          value: 50
        },
        {
          label: "民办非企业单位",
          value: 60
        },
        {
          label: "农民专业合作社",
          value: 70
        }
      ],
      rules: {
        scale: [{ required: true, message: "请选择公司规模", trigger: "change" }],
        org_type: [{ required: true, message: "请选择机构类型", trigger: "blur" }],
        name: [{ required: true, message: "请输入公司简称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写公司基本信息", trigger: "blur" }],
        address: [{ required: true, message: "请填写公司所在地", trigger: "blur" }]
      }
    };
  },
  created () {
      this.getUserInfoData()
  },
  components: {
    Cropper,
    quillEditor
  },
  computed: {
    org_name() {
      if (this.$store.state.app.userInfo.org_list) {
        if (this.$store.state.app.userInfo.org_list.length > 0) {
          return this.$store.state.app.userInfo.org_list[0].org_name;
        }
      }
      return "新企业";
    }
  },
  methods: {
    onAuth() {
      this.$router.push({ path: "/user/org/account/uploadlicense" });
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let that = this;
          var parameter = {
            // org_reg_state: 20,
            // name: that.form.name,
            id: 0,
            nick_name: that.form.name,
            logo: that.org_logo,
            org_type: that.form.org_type,
            scale: that.form.scale,
            // cert_url: that.cert_url,
            area1: that.area1,
            area2: that.area2,
            area3: that.area3,
            area1_name: that.area1_name,
            area2_name: that.area2_name,
            area3_name: that.area3_name,

            desc: that.form.desc
          };
          console.log("传递参数", parameter);
          authUserOrgPerfect(parameter).then(res => {
            console.log("新增企业个人信息", JSON.stringify(res));
            if (res.status == 200) {
                console.log('修改成功')
              this.$message({
                message: res.msg,
                type: "success",
                showClose: true,
                duration: 3000
              });
              this.getUserInfoData()
            }
          });
        } else {
          return false;
        }
      });
    },
    consoleFL() {
      this.cropperModel = true;
    },
    beforeClose() {
      this.cropperModel = false;
    },
    onClose() {
      this.cropperModel = false;
    },
    onConfirm(imageUrl, image_name) {
      this.cropperModel = false;
      // 页面展示
      // this.org_logo = imageUrl;
      // 上传到后台
      this.org_logo = image_name;
    },
    getUserInfoData () {
        getOrgInfoData().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.$set(this,'area1',res.data.area1)
                this.$set(this,'area2',res.data.area2)
                this.$set(this,'area3',res.data.area3)
                this.$set(this,'area1_name',res.data.area1_name)
                this.$set(this,'area2_name',res.data.area2_name)
                this.$set(this,'area3_name',res.data.area3_name)

                this.$set(this.form,'name',res.data.nick_name)
                this.$set(this.form,'org_type',res.data.org_type)
                this.$set(this.form,'scale',res.data.scale)
                this.$set(this.form,'desc',res.data.desc)
                this.$set(this,'org_logo',res.data.logo)
                this.form.address = [String(res.data.area1),String(res.data.area2),String(res.data.area3)]
            }
        })
    },
    // 获取省份
    getCityData() {
      let that = this;
      console.log(this.form.address)
      this.$set(that, "area1", this.form.address[0]);
      this.$set(that, "area2", this.form.address[1]);
      this.$set(that, "area3", this.form.address[2]);
      this.$set(
        that,
        "area1_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]
      );
      this.$set(
        that,
        "area2_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
      );
      this.$set(
        that,
        "area3_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]
      );
    },
  }
};
</script>
<style lang="less" scoped>
@import "./info.less";
</style>