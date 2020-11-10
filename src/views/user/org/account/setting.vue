<template>
  <div class="hk-single-account">
    <div class="hk-single-account-title">
      <div>企业名称：<span>{{org_name}}</span>
        <p class="hk-single-account-notes">绑定后，你可以同时使用以下方式登录</p>
      </div>
      <p class="hk-single-account-thirdparty ">
        <i class="el-icon-mobile-phone"></i>
        <span>已绑定手机: {{phone}}</span>
        <span class="hk-single-account-pohp" @click="onUpdatePhone">更换手机号</span>
      </p>
      <p class="hk-single-account-thirdparty ">
        <i class=" el-icon-message"></i>
        <span>邮箱{{emailState == 0 ? '未验证':'已验证'}}: {{email}}</span>
        <span class="margin-l-30  hk-cursor" :class="emailState == 0 ? 'text-topyellow':'text-green' ">{{emailState == 0 ? '验证邮箱':'修改邮箱'}}</span>
      </p>
      <p class="hk-single-account-thirdparty text-green padding-b-25">
        <i class="iconfont icon-weixin"></i>
        <span>绑定微信</span>
      </p>
    </div>
    <div class="hk-single-account-modify">
      <p class="title">修改密码</p>
      <p class="hk-modify-title">登录账号：<span>{{phone}}</span><span class="code" @click="onCode">获取验证码</span></p>
      <el-form :model="personForm" :rules="rules" ref="personForm" label-width="0" class="demo-personForm">
        <!-- <el-form-item prop="pass">
          <el-input type="password" v-model="personForm.pass" placeholder="请输入当前密码"></el-input>
        </el-form-item> -->
        <el-form-item prop="newPassword">
          <el-input type="password" v-model="personForm.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="newCheckPass">
          <el-input type="password" v-model="personForm.newCheckPass" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="personForm.code" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item class="hk-Preservation-btn">
          <el-button type="button" @click="submitForm('personForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <modifyPhone :phonePopup="phonePopup" @close="onClose" @submit="onSubmit"></modifyPhone>
  </div>
</template>

<script>
import { registerReset, registerVerify } from "@/api/user";
import modifyPhone from "components/popup/modify-phone"
import {bindingPhone} from '@/api/public'
import cookie from '@/utils/store/cookie'
export default {
  inject: ['reload'],
  components:{modifyPhone},
  data() {
    var newPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输当前入密码'));
        // callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.personForm.newCheckPass !== '') {
          this.$refs.personForm.validateField('newCheckPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.personForm.newCheckPass) {
        callback(new Error('两次输入新密码不一致!'));
      } else {
        callback();
      }
    };
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'))
      } else {
        if (value !== '') {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'))
          }
        }
        callback()
      }
    }
    return {
      phoneForm:{
        phone: '',
        code: '',
      },
      orgState: '未认证',
      emailState: 0,
      personForm: {
        pass: '',
        newCheckPass: '',
        newPassword: '',
        code:''
      },
      phonePopup: false,
      rules: {
        newPassword: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        newCheckPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        pass: [
          { validator: newPassword, trigger: 'blur' },
          { required: true, min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
        ],
        phone: [
          { validator: validateMobilePhone, trigger: 'blur' }
        ],
      }
    };
  },
  computed:{
    phone () {
      if (this.$store.state.app.userInfo.phone) {
        return this.$store.state.app.userInfo.phone
      }
      return ''
    },
    email () {
      if (this.$store.state.app.userInfo.email) {
        return this.$store.state.app.userInfo.email
      }
      return ''
    },
    org_name () {
      if (this.$store.state.app.userInfo.org_list) {
        if (this.$store.state.app.userInfo.org_list.length>0) {
          return this.$store.state.app.userInfo.org_list[0].org_name
        }
      }
      return '新企业'
    },
  },
  methods: {
    onCode(){
      let that = this
      let type = 'reset_pwd'
      registerVerify({phone: this.phone, type: type}).then(res => {
        if (res.status === 200) {
          that.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        } else {
          that.$message({
            message: res.msg,
            type: 'error',
            showClose: true,
            duration: 3000
          })
        }
        }).catch(res => {
          that.$message({
              message: res.msg,
              type: 'error',
              showClose: true,
              duration: 3000
          })
      })
    },
    resetPwd(){
      registerReset({ phone: this.phone, password: this.personForm.newPassword, code: this.personForm.code })
        .then(res => {
          if (res.status === 200) {
            cookie.remove("resetCodeTime")
            cookie.remove('phone')
            that.reload()
            that.$message({
              message: res.msg,
              type: 'success',
              showClose: true,
              duration: 3000
            })
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
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
        });
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resetPwd()
        } else {
          // console.log('error submit!!');
          return false;
        }
      })
    },
    onUpdatePhone () {
      this.phonePopup = true
    },
    onClose () {
      this.phonePopup = false
    },
    onSubmit(val){
      this.phonePopup = false
      this.reload()
    }
  }
}
</script>

<style lang="less">

@import './setting.less';
</style>