<template>
  <div class="hk-login-main">
    <div class="hk-login-form clearfix">
      <div class="hk-login-right fr">
        <div class="hk-login-title-right">个人端-登录</div>
        <el-form v-if="isQRCode" class="hk-login-box hk-form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <div @click="onQRCode" id="hk-QRcode" class="hk-QRcode">
            <img class="hk-QRcode-img" v-lazy="'/static/img/code-ligin.png'"/>
          </div>
          <div class="hk-login-box-switch padding-b-45">
            <el-button class="hk-el-button" :class="isAvtive == true ? 'is-focuse' : ''" @click="loginMode(true, 'ruleForm')">手机登录</el-button>
            <el-button class="hk-el-button" :class="isAvtive == false ? 'is-focuse' : ''" @click="loginMode(false, 'ruleForm')">验证码登录</el-button>
          </div>
          <el-form-item v-if="isAvtive === true" class="hk-form-item-bar">
            <el-form-item prop="phone">
              <el-input type="tel" v-model="ruleForm.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="ruleForm.pass" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="确认密码"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item v-else class="hk-form-item-bar">
            <el-form-item prop="phone">
              <el-input type="tel" v-model="ruleForm.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="hk-code">
              <el-col :span="15">
                <el-input type="text" v-model="ruleForm.code" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="6" class="margin-l-8">
                <el-button v-if="showtime === null" @click="onSend(ruleForm)">获取验证码</el-button>
                <el-button class="hk-disabled" v-else disabled>{{showtime}}</el-button>
              </el-col>
            </el-form-item>
          </el-form-item>
          <el-form-item class="hk-button-zoom">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <div class="clearfix">
            <div class="fr">
              <div class="font-16 text-green hk-cursor" @click="onRetrievePwd">忘记密码？</div>
            </div>
            <div class="fl hk-mypassword">
              <div class="padding-b-10">
                <el-checkbox v-model="checked" class="font-16 text-green hk-cursor">记住密码</el-checkbox>
              </div>
              <span class="font-16 text-line">还没有账号，</span><router-link to="/account/register"><span class="font-16 text-green hk-cursor">去注册</span></router-link>
            </div>
          </div>
        </el-form>
        <el-form v-else class="hk-login-box hk-form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <div @click="onQRCode" id="hk-QRcode" class="hk-QRcode">
            <img class="hk-QRcode-img" v-lazy="'/static/img/poph-QRcode.png'"/>
          </div>
          <div class="text-center hk-QRcode-img-bar">
            <img v-lazy="qrcode_url" style="width: 172px;height: 172px;"/>
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
              <p class="hk-login-title-p">海量疑难问题为你解答</p>
              <span class="hk-login-min-cont">懂得比，就是知识</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login02.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">海量行业职位优选</p>
              <span class="hk-login-min-cont">专注、只做水与环境</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login03.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">快速找到设计图</p>
              <span class="hk-login-min-cont">不必重复设计了</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login04.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">高效的投递反馈</p>
              <span class="hk-login-min-cont">谁看我的简历，早知道</span>
            </div>
          </li>
          <li class="hk-login-list-bar clearfix">
            <div class="fl margin-r-21 padding-t-5">
              <img v-lazy="'/static/img/hk-login05.png'"/>
            </div>
            <div class="fl">
              <p class="hk-login-title-p">快速投递职位</p>
              <span class="hk-login-min-cont">多方式，直达HR</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="text-center text-line text-blacks padding-t-85 login-footer-info line-80">版权所有：广州行度人工智能技术有限公司     联系电话：13984128312</div>
  </div>
</template>
<script>
import { login, registerVerify,getAccountQrcodeUrl,wechatPollingLogin} from '@/api/user'
let Base64 = require('js-base64').Base64
import { mapGetters } from 'vuex'
import {handlePersonLoginSuccess} from '@/libs/login'
import cookie from '@/utils/store/cookie'
import store from '@/store'
import wxlogin from 'vue-wxlogin';
// import { setInterval, clearInterval } from "timers";

// import { setTimeout, clearTimeout } from "timers";

export default {
  inject: ['reload'],
  components:{
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
        name: '',
        pass: '',
        phone: '',
        code: ''
      },
      // 计时器,注意需要进行销毁
      timeCounter: null,
      // null 则显示按钮 秒数则显示读秒
      showtime: null,
      // 记住密码checked
      checked: false,
      // 获取验证码的cookie
      isCookie: null,
      personName: '',
      uu_str:'',
      qrcode_url:'',
      qrCodeTime: null,
      pollingLoginTime: null,
      rules: {
        phone: [
          { validator: validateMobilePhone, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    document.querySelector('body').setAttribute('style', 'background-color:#fff')
  },
  mounted () {
    this.loadAccountInfo()
    this.getCookieTime()
    
    let that  = this
    if (that.showtime !== null && this.isAvtive === false) {
      let phone = cookie.get('phone')
      // console.log(phone)
      that.ruleForm.phone = phone
    }
  },
  
  methods: {
    // 微信 轮询登录
    getWechatPollingLogin(){
      wechatPollingLogin(this.uu_str).then(res=>{
        if(res.status==200){
          handlePersonLoginSuccess(res)
          clearInterval(this.pollingLoginTime);
          clearInterval(this.qrCodeTime);
        }
      }).catch(res=>{})
    },
    // 获取二维码
    get_AccountQrcodeUrl(){
      let that = this
      getAccountQrcodeUrl().then(res=>{
        that.$set(that,'qrcode_url',res.data.qrcode_url)
        that.$set(that,'uu_str',res.data.uu_str)
        that.getWechatPollingLogin()
      }).catch(res=>{
        that.$message({
          message: res.msg,
          type: "error"
        })
      })
    },
    submitForm (ruleForm) {
      let accountInfo = ''
      let phone = this.ruleForm.phone
      let password = this.ruleForm.pass
      let newaccount = Base64.encode(phone)
      let newPassord = Base64.encode(password)
      if (this.checked == true) {
        // console.log('选择记住密码', this.checked == true)
        // 将加密后的密码存入cookie对象中
        accountInfo = newaccount + '&' + newPassord
        // 传入账户和密码，保存5天
        cookie.set('accountInfo', accountInfo, 1440 * 5)
      } else {
        // console.log('清空cookie')
      // 清空Cookie
        cookie.remove('accountInfo')
      }
      
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // alert('submit!')
          login({ phone, password }).then(res => {
            if (res.status === 200) {
                handlePersonLoginSuccess(res)
                cookie.remove('phone')
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                showClose: true,
                duration: 3000
              })
            }
          }).catch(res => {
            this.$message({
              message: res.msg,
              type: 'error',
              showClose: true,
              duration: 3000
            })
          })
        } else {
          // console.log('error submit!!')
          this.$message({
            message: '未填写信息，请填写',
            type: 'error',
            showClose: true,
            duration: 3000
          })
        }
      })
    },
    loginMode (val, formName) {
      this.isAvtive = val
      // 切换就重置表单
      this.$refs[formName].resetFields()
      let that  = this
      if (that.showtime !== null && this.isAvtive === false) {
        let phone = cookie.get('phone')
        // console.log(phone)
        that.ruleForm.phone = phone
      }
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
      this.$set(this,'isQRCode',!this.isQRCode)
      if (!this.isQRCode) {
        this.get_AccountQrcodeUrl()
        this.qrCodeTime = setInterval(this.get_AccountQrcodeUrl, 300000); 
        this.pollingLoginTime = setInterval(this.getWechatPollingLogin, 1000);
      }else{
        clearInterval(this.pollingLoginTime);
        clearInterval(this.qrCodeTime);
      }
    },
    // 倒计时显示处理
    countDownText (s) {
      this.showtime = `${s}s后重新获取`
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
        // 存储codeTime到cookie中
        cookie.set('codeTime', times - count + 1)
        // 在codeTime中存储每次变化时间
        self.countDownText(times - count + 1)
        // console.log(this.showtime)
        if (count > times) {
          clearTimeout(self.timeCounter)
          cookie.remove('codeTime')
          self.showtime = null
        } else {
          cookie.set('codeTime', times - count + 1)
          self.timeCounter = setTimeout(countDownStart, interval)
        }
      }
    },
    onSend (ruleForm) {
      // console.log(ruleForm)
      let that = this
      if (ruleForm.phone == '') {
        // console.log(this.)
        // that.$message.error('手机号不能为空！')
      } else {
        if (ruleForm.phone !== '') {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(ruleForm.phone)) {
            // callback(new Error('请输入有效的手机号码'))
            // that.$message.error('请输入有效的手机号码')
          } else {
            let type = 'login'
            cookie.set('phone', ruleForm.phone)
            registerVerify({phone: ruleForm.phone, type: type}).then(res => {
              that.countDown(60)
              if (res.status === 200) {
                // console.log('验证码发送成功')
                this.$message({
                  message: res.msg,
                  type: 'success',
                  showClose: true,
                  duration: 3000
                })
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  showClose: true,
                  duration: 3000
                })
              }
            }).catch(res => {
              this.$message({
                message: res.mes,
                type: 'error',
                showClose: true,
                duration: 3000
              })
            })
          }
        }
      }
    },
    // 记住密码读取信息
    getCookie(cookieName) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + '=')
        if (c_start != -1) {
          c_start = c_start + cookieName.length + 1;
          var c_end = document.cookie.indexOf(';', c_start)
          if (c_end == -1)
            c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ''
    },
    // 预读取cookie中用户信息
    loadAccountInfo () {
      let self = this
      let accountInfo = this.getCookie('accountInfo')
      // console.log(accountInfo)
      // 如果cookie里没有账号信息
      if(Boolean(accountInfo) == false) {
        // console.log('cookie中没有检测到用户账号信息！')
        return false
      } else {
        // 如果cookie里有账号信息
        // console.log('cookie中检测到账号信息！现在开始预填写！')
        let userName = ''
        let passWord = ''
        let index = accountInfo.indexOf('&')
        // console.log(accountInfo)
        userName = accountInfo.substring(0,index)
        passWord = accountInfo.substring(index+1)// 拿到加密后的密码
        // 解密
        // var bytes = Base64.decode(passWord)
        //拿到解密后的密码（登录时输入的密码）
        // var newpassWord = bytes.toString(CryptoJs.enc.Utf8)

        self.ruleForm.phone = Base64.decode(userName)
        self.ruleForm.pass = Base64.decode(passWord)
        self.checked = true
      }
    },
    onRetrievePwd(){
      // console.log('找回密码11')
      this.$router.push({path: '/account/user/reset/pwd'})
    },
  },
  watch: {
    isCookie: function () {
      if (this.isCookie !== null) {
        this.countDown(this.isCookie)
      }
    },
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
    // clearInterval(this.wechatPollingLogin());
    // clearInterval(this.pollingLoginTime);
    // clearInterval(this.qrCodeTime);
  },
}
</script>

<style lang="less" scoped>
@import '~@/css/account.less';
@import './index.less';
</style>
