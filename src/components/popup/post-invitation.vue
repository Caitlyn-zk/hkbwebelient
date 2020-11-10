<template>
  <div class="position-invitation">
    <el-dialog
      :visible.sync="display"
      title="职位邀请"
      :lock-scroll="true"
      width="40%"
      :close-on-click-modal="false"
      :before-close="onClose"
      @open="onOpen"
    >
      <div class="content">
        <div class="user-name">[{{name}}]</div>
        <div class="tips">您好,我是{{org_name}}的hr,看到你的简历,觉得您比较适合我们公司,诚擎邀请您投递简历。</div>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="90px" class>
        <el-form-item label="公司名称">
          <el-input v-model="org_name" placeholder="请输入公司名称" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邀请岗位" prop="post_name">
          <el-input v-model="form.post_name" placeholder="请输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="薪资福利" prop="salary">
          <el-input v-model="form.time" placeholder="请输入薪资福利"></el-input>
        </el-form-item>
        <el-form-item label="联系信息">
          <el-input v-model="form.contact" placeholder="请输入联系信息, 如：姓名、手机号"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.info" placeholder="请输入备注信息,如：准备材料、乘车路线等"></el-input>
        </el-form-item>
      </el-form>
      <div class="select">
        <el-radio v-model="form.sendMode" :label="1">发送邮件给候选人</el-radio>
        <el-radio v-model="form.sendMode" :label="2">发送短信给候选人</el-radio>
        <div class="invitation-botton" @click="onSending('form')">发送邀请</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        post_name: "",
        salary: "",
        address: "",
        contact: "",
        info: "",
        sendMode: 1
      },
      rules: {
        name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        post_name: [
          { required: true, message: "请输入职位名称", trigger: "blur" }
        ],
        salary: [
          { required: true, message: "请输入薪资福利", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入面试地址", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    display: Boolean,
    name: String,
    org_name: String
  },
  methods: {
    onClose() {
      this.$emit("close");
      Object.assign(this.$data, this.$options.data());
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    onOpen() {},
    onSending(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./post-invitation.less";
</style>