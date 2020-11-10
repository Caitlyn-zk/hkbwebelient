<template>
  <div class="hk-login-main">
    <div class="hk-login-form clearfix">
      <div class="hk-login-right fr">
        <div class="hk-login-title-right">企业端-注册</div>
        <el-form v-if="isQRCode" class="hk-login-box hk-form hk-form-register" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <div @click="onQRCode" id="hk-QRcode" class="hk-QRcode">
            <img class="hk-QRcode-img" v-lazy="'/static/img/code-ligin.png'"/>
          </div>
          <div class="hk-register-title">手机注册</div>
          <el-form-item prop="phone">
            <el-input type="tel" v-model="ruleForm.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.pass" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="code" class="hk-code">
            <el-col :span="15" class="hk-code-input">
              <el-input type="text" v-model="ruleForm.code" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="6" class="margin-l-8">
              <el-button v-if="showTime === null" @click="onSend(ruleForm)">获取验证码</el-button>
              <el-button class="hk-disabled" v-else disabled>{{showTime}}</el-button>
            </el-col>
          </el-form-item>
          <div class="hk-agreement">
            <span>注册即同意</span><span class="text-green hk-cursor">环科宝协议</span>
          </div>
          <el-form-item class="hk-button-zoom">
            <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button>
          </el-form-item>
          <div class="">
            <span class="font-16 text-line">已有账号！</span><router-link to="/account/org/login"><span class="font-16 text-green hk-cursor">去登录</span></router-link>
          </div>
        </el-form>
        <el-form v-else class="hk-login-box hk-form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <div @click="onQRCode" id="hk-QRcode" class="hk-QRcode">
            <img class="hk-QRcode-img" v-lazy="'/static/img/poph-QRcode.png'"/>
          </div>
          <div class="text-center hk-QRcode-img-bar">
            <img v-lazy="'/static/img/footer_QR_code.png'" style="width: 172px;height: 172px;"/>
          </div>
          <p class="line-80 text-center font-18 hk-QRcode-text-bar">微信扫码，关注公众号即可注册登录</p>
        </el-form>
      </div>
      <div class="hk-login-left fl">
        <div class="hk-login-title-left">
          <span class="hk-login-hkb"><router-link to="/">环科宝</router-link></span>
          <span class="margin-l-20 platform-introduce">水与环境行业专业信息服务平台</span>
        </div>
        <ul class="hk-login-box">
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login01.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">50+万</p>
              <span class="hk-login-min-cont">水与环境行业人才</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login02.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">50万</p>
              <span class="hk-login-min-cont">水与环境行业简历</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login03.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">100万</p>
              <span class="hk-login-min-cont">职位招聘数</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login04.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">500000</p>
              <span class="hk-login-min-cont">项目发布数</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login05.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">30000</p>
              <span class="hk-login-min-cont">行业人才交流知识</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="text-center text-white padding-t-85 login-footer-info line-80">版权所有：广州行度人工智能技术有限公司     联系电话：13984128312</div>
  </div>
</template>
<script>
import { login, registerVerify, register} from '@/api/user'
import {handleOrgLoginSuccess,toLogin} from '@/libs/login'
import dayjs from 'dayjs'
import cookie from '@/utils/store/cookie'
// const BACK_URL = 'login_back_url'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
      isAvtive: true,
      isQRCode: true,
      ruleForm: {
        phone: '',
        pass: '',
        checkPass: '',
        code: ''
      },
      // 计时器,注意需要进行销毁
      timeCounter: null,
      // null 则显示按钮 秒数则显示读秒
      showTime: null,
      // 获取验证码的cookie
      isCookie: null,
      rules: {
        phone: [
          { required: true, validator: validateMobilePhone, trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { required: true, min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    
  },
  mounted (){
    document.querySelector('body').setAttribute('style', 'background-color:#00BB8D')
    this.getCookieTime()
    let that = this
    if (that.showtime !== null) {
      let phone = cookie.get('phone')
      // console.log(phone)
      that.ruleForm.phone = phone
    }
  },
  beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
  },
  methods: {
    registerForm (ruleForm) {
      let phone = this.ruleForm.phone
      let code = this.ruleForm.code
      let password = this.ruleForm.pass
      this.$refs[ ruleForm ].validate((valid) => {
        if (valid) {
          register({ phone, code, password }).then(res => {
            if (res.status === 200) {
              cookie.remove('accountInfo')
              this.loginMobile(phone, password)
              cookie.remove('phone')
            }else {
              this.$message({
                message: res.msg,
                type: 'error',
                showClose: true,
                offset: 60,
                duration: 3000
              })
            }
          }).catch(res => {
              this.$message({
                message: res.msg,
                type: 'error',
                showClose: true,
                offset: 60,
                duration: 3000
              })
            // }
          })
        } else {
          // console.log('error submit!!')
          // return false
        }
      })
    },
    loginMobile (phone, password) {
      login({ phone, password }).then(res => {
        if (res.status === 200) {
          handleOrgLoginSuccess(res)
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: 'error',
          showClose: true,
          offset: 60,
          duration: 3000
        })
      })
    },
    // 获取cookie中的时间
    getCookieTime () {
      let getCookieTime = cookie.get('codeTime')
      // console.log(getCookieTime)
      if (getCookieTime !== null) {
        this.isCookie = getCookieTime
        this.codeTime = false
      } else {
        this.isCookie = null
      }
    },
    onQRCode () {
      this.isQRCode = !this.isQRCode
    },
    //发送验证码时添加cookie
    addCookie(name, value, expiresHours) {
        var cookieString = name + "=" + escape(value)
        //判断是否设置过期时间,0代表关闭浏览器时失效
        if(expiresHours > 0) {
            var date = new Date()
            date.setTime(date.getTime() + expiresHours * 1000);
            cookieString = cookieString + ";expires=" + date.toUTCString()
        }
        document.cookie = cookieString
    },
    //修改cookie的值
    editCookie (name, value, expiresHours) {
        var cookieString = name + "=" + escape(value)
        if(expiresHours > 0) {
            var date = new Date()
            date.setTime(date.getTime() + expiresHours * 1000)//单位是毫秒
            cookieString = cookieString + ";expires=" + date.toGMTString()
        }
        document.cookie = cookieString
    },
    //根据名字获取cookie的值
    getCookieValue(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ")
        for(var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=")
            if(arr[0] == name) {
                return unescape(arr[1])
                break
            }
        }
    },
    // 倒计时显示处理
    countDownText (s) {
      this.showTime = `${s}s后重新获取`
    },
    // 倒计时 60秒 不需要很精准
    countDown (times) {
      const self = this
      // 时间间隔 1秒
      const interval = 1000
      let count = 0
      self.timeCounter = setTimeout(countDownStart, interval)
      function countDownStart () {
        if (self.timeCounter == null) {
          return false
        }
        count++
        // console.log(times - count + 1)
        cookie.set('codeTime', times - count + 1)
        self.countDownText(times - count + 1)
        if (count > times) {
          clearTimeout(self.timeCounter)
          self.showTime = null
        } else {
          cookie.set('codeTime', times - count + 1)
          self.timeCounter = setTimeout(countDownStart, interval)
        }
      }
    },
    onSend (ruleForm) {
      let that = this
      if (ruleForm.phone == '') {
        that.$message.error('手机号不能为空！')
      } else {
        if (ruleForm.phone !== '') {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(ruleForm.phone)) {
            // callback(new Error('请输入有效的手机号码'))
            // that.$message.error('请输入有效的手机号码')
          } else {
            // console.log('手机号')
            let type = 'register'
            cookie.set('phone', ruleForm.phone)
            registerVerify({phone: ruleForm.phone, type: type}).then(res => {
              if (res.status === 200) {
                //开始计时
                this.countDown(60)
                this.$message({
                  message: res.msg,
                  type: 'success',
                  showClose: true,
                  offset: 60,
                  duration: 3000
                })
              } else {
                // this.countDown(60)
                this.$message({
                  message: res.msg,
                  type: 'error',
                  showClose: true,
                  offset: 60,
                  duration: 3000
                })
              }
            }).catch(res => {
              this.$message({
                message: res.msg,
                type: 'error',
                showClose: true,
                offset: 60,
                duration: 3000
              })
            })
          }
        }
      }
    },
  },
  watch: {
    isCookie: function () {
      if (this.isCookie !== null) {
        this.countDown(this.isCookie)
      }
    },
    isQRCode: function () {
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/account.less';
@import './index.less';
.hk-form {
  &.hk-form-register {
    padding: 0 56px !important;
    /deep/ .el-form-item {
        margin-bottom: 20px !important;
    }
    .hk-agreement {
      font-size:14px;
      font-weight:400;
      color:rgba(153,153,153,1);
      padding-bottom: 10px;
      letter-spacing: 2px;
    }
  }
}
.hk-register-title {
  font-size:22px;
  font-weight:bold;
  color:rgba(0,0,0,1);
  text-align: center;
  line-height: 60px;
}
</style>
