<template>
    <div>
        <el-form ref="form" :rules="rules" :model="form" class="form" v-if="!isLogin">
            <el-form-item prop="phone">
            <el-input v-model="form.phone"   placeholder="请输入用户名" class="login-input" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
            <el-input v-model="form.pwd" type="password"  placeholder="请输入密码" class="login-input" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item >
            <div class="login-help-select">
                <el-checkbox v-model="checked" size="10" class="checkbox">记住账号</el-checkbox>
                <div class="forget-pwd" @click="onRetrievePwd">忘记密码</div>
            </div>
            </el-form-item>
            <el-form-item >
            <div class="login-click-button">
                <el-button class="login-modular-button" :class="login.type !== 1 ? 'enterprise': ''" @click="onLoginJump('form')">{{login.reception}}</el-button>
                <el-button class="login-modular-button release-button" :class="login.type !== 1 ? 'enterprise': ''" @click="onRelease">{{login.backstage}}</el-button>
            </div>
            </el-form-item>
        </el-form>
        <div v-else-if="isLogin">
            <div class="titing">
                <img :src="userInfo.avatar == '' ? userImg : avatar" alt="" class="user-img">
                <div class="greet">
                    <div class="greet-user-name">Hi，{{real_name}}</div>
                    <div class="">欢迎回来，{{hoursTip}}！</div>
                </div>
            </div>
            <div class="titing recruit-info">
                <div class="info">
                    <div><span class="info-umer">10</span> 家</div>
                    <div>企业看过</div>
                </div>
                <div class="info">
                    <div><span class="info-umer">10</span>条</div>
                    <div>企业反馈</div>
                </div>
            </div>
            <div type="primary" class="personal" @click="onPersonal">个人中心</div>
        </div>
    </div>
</template>
<script>
import { login, registerVerify} from '@/api/user'
import { mapGetters } from 'vuex'
import {handlePersonLoginSuccess} from '@/libs/login'
let Base64 = require('js-base64').Base64
import utils from '@/utils/index.js'
import cookie from '@/utils/store/cookie'
import store from '@/store'
import dayjs from 'dayjs'
export default {
    data(){
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        return{
             form:{
                phone:'',
                pwd:''
            },
            hoursTip:'',
            name: "黎明",
            checked: false,
            userImg:require('../../assets/image/user_img.png'),
            rules:{
                phone: [
                    {required: true, validator: validateMobilePhone, trigger: 'blur' }
                ],
                pwd: [
                    { required: true,validator: validatePass, trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
            },
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'isLogin',
            userInfo:'userInfo'
        }),
        avatar(){
            if (this.userInfo.avatar) {
                return 'http://cdn.65ph.com/' + this.userInfo.avatar
            }
            return ''
        },
        real_name(){
            if (this.userInfo.real_name) {
                return this.userInfo.real_name
            }
            return ''
        }
    },
    props:{
        login:{}
    },
    created(){
        this.loadAccountInfo()
        this.getCookieTime()
        this.getMycount()
    },
    mounted: function () {
        if(this.isLogin)
            this.$store.dispatch("USERINFO", true)
    },
    methods:{
         // 跳转到企业项目中心
        onRelease () {
            if(this.login.type ===1 ){
                this.$router.push({path: '/user/org/project'})
            }else{
                this.$router.push({path: '/user/org/post/manage'})
            }
        },
        onLoginJump(form){
            if(this.isLogin){
                if(this.login.type ===1){
                    this.$router.push({path: '/front/project/search'})
                }else{
                    this.$router.push({path: '/front/recruit/post/search'})
                }
            }else {
                let accountInfo = ''
                let phone = this.form.phone
                let password = this.form.pwd
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
                this.$refs[form].validate((valid) => {
                    if (valid) {
                    // alert('submit!')
                    login({ phone, password }).then(res => {
                        if (res.status === 200) {
                            // handlePersonLoginSuccess(res)
                            store.commit('LOGIN', {token: res.data.token, expires_time: dayjs(res.data.expires_time)})
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
                        console.log('error submit!!')
                        this.$message({
                            message: '未填写信息，请填写',
                            type: 'error',
                            showClose: true,
                            duration: 3000
                        })
                    }
                })
            }
        },
        onRetrievePwd(){
            // console.log('找回密码11')
            this.$router.push({path: '/account/user/reset/pwd'})
        },
        getCookieTime () {
      let getCookieTime = cookie.get('codeTime')
    //   console.log(getCookieTime)
      if (getCookieTime !== null) {
        this.isCookie = getCookieTime
        this.codeTime = false
      } else {
        this.isCookie = null
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
      let that = this
      let accountInfo = this.getCookie('accountInfo')
    //   console.log(accountInfo)
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
        console.log(accountInfo)
        userName = accountInfo.substring(0,index)
        passWord = accountInfo.substring(index+1)// 拿到加密后的密码
        // 解密
        // var bytes = Base64.decode(passWord)
        //拿到解密后的密码（登录时输入的密码
        // var newpassWord = bytes.toString(CryptoJs.enc.Utf8)
        that.form.phone = Base64.decode(userName)
        that.form.pwd = Base64.decode(passWord)
        that.checked = true
      }
    },
    getMycount:function(){
　　　　let that=this;
　　　　let date=new Date();
　　　　if(date.getHours()>=1&&date.getHours()<8){
            that.hoursTip="早上好"
　　　　}else if(date.getHours()>=8&&date.getHours()<12){
            that.hoursTip="上午好"
　　　　}else if(date.getHours()>=12&&date.getHours()<18){
　　　　　   that.hoursTip="下午好"
　　　　}else{
　　　　　　 that.hoursTip="晚上好"
　　　　}
　　},
    onPersonal(){
        this.$router.push({path:"/user/person/index"})
    }
  }
}
</script>
<style lang="less" scoped>

@import './login.less';
</style>