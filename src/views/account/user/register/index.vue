<template>
  <div class="hk-login-main" :style="{ minHeight:domHeight-50+ 'px' }">
    <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form> -->
    <el-button type="success" @click="bindWechat">绑定微信</el-button>
    <div class="weixin" @click="weChatLogin()"><i class="iconfont iconweixin"></i>微信登录</div>
    <div class="login-qr" >
        <wxlogin :appid="appid" :scope="scope" :theme='style' :state='state' :redirect_uri="redirect_uri"></wxlogin>
    </div>
  </div>
</template>
<script>
import { login, loginMobile, registerVerify, register } from '@/api/user'
import wxlogin from 'vue-wxlogin'
import dayjs from 'dayjs'
import cookie from '@/utils/store/cookie'
const BACK_URL = 'login_back_url'

export default {
  components: {
    wxlogin
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      appid: 'wx……',
      scope: 'snsapi_login',
      state: 'bind',
      style: 'black',
      redirect_uri: encodeURI('……………………'),
      domHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    weChatLogin () {
      weChatLogin().then(res => {
        if (res.result === 1) {
          window.location.href = res.url
        }
      })
    },
    submitForm (ruleForm) {
      // const { account, password } = this
      let account = this.ruleForm.name
      let password = this.ruleForm.pass
      login({ account, password }).then(res => {
        if (res.status === 200) {
          // console.log(1213)
          this.$store.commit('LOGIN', res.data.token, dayjs(res.data.expires_time))
          const backUrl = cookie.get(BACK_URL) || '/'
          cookie.remove(BACK_URL)
          this.$router.push({ path: backUrl })
        }
      }).catch(e => {
        this.$dialog.error(e.msg)
      })
      // var that = this
      // loginMobile({
      //   phone: '',
      //   captcha: that.captcha,
      //   spread: cookie.get("spread")
      // })
      //   .then(res => {
      //     let data = res.data
      //     let newTime = Math.round(new Date() / 1000)
      //     that.$store.commit(
      //       'LOGIN',
      //       data.token,
      //       dayjs(data.expires_time) - newTime
      //     )
      //     const backUrl = cookie.get(BACK_URL) || "/"
      //     cookie.remove(BACK_URL)
      //     that.$router.replace({ path: backUrl })
      //   })
      //   .catch(res => {
      //     that.$dialog.error(res.msg)
      //   })
    },
    resetForm (ruleForm) {
      this.$refs[ruleForm].resetFields()
    }
  }
}
</script>

<style lang="less">

@import './index.less';
</style>
