<template>
    <div class="popup-login">
        <el-dialog
        :visible.sync="isLogin"
        :close-on-click-modal='false'
        width="500px"
        :before-close="onColse"
        >
        <div v-if="isQRCode" class="content">
            <div @click="onQRCode" id="hk-QRcode" class="hk-QRcode">
                <img class="hk-QRcode-img" v-lazy="'/static/img/code-ligin.png'"/>
            </div>
            <div class="title">个人端-登陆</div>
            <div class="hk-login-box-switch padding-b-45">
                <el-button class="hk-el-button" :class="ordinaryLogin == true ? 'is-focuse' : ''" @click="loginMode(true,'accountNumberLoginForm')">密码登录</el-button>
                <el-button class="hk-el-button" :class="ordinaryLogin == false ? 'is-focuse' : ''" @click="loginMode(false,'phoneLoginForm')">验证码登陆</el-button>
            </div>
            <el-form ref="accountNumberLoginForm" :model="accountNumberLoginForm" :rules="rules" label-width="110px" v-if="ordinaryLogin" class="form">
                <el-form-item label="输入手机号" prop="phone">
                    <el-input v-model="accountNumberLoginForm.phone" placeholder="请输入绑定手机号"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwd">
                    <el-input v-model="accountNumberLoginForm.pwd" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item >
                    <div @click="onRetrievePwd" class="forget-pwd">忘记密码</div>
                    <el-button type="primary" class="login-button" @click="onLogin('accountNumberLoginForm')">登陆</el-button>
                    <div class="register" @click="onRefister">立即注册</div>
                </el-form-item>
            </el-form>
            <el-form ref="phoneLoginForm" :model="phoneLoginForm" :rules="verificationCodeRules" label-width="110px" v-else class="form">
                <el-form-item label="输入手机号" prop="phone">
                    <el-input v-model="phoneLoginForm.phone" placeholder="请输入绑定手机号"></el-input>
                </el-form-item>
                <el-form-item label="输入验证码" prop="code">
                    <el-input v-model="phoneLoginForm.code" placeholder="请输入验证码"><div slot="suffix" class="code" @click="onCode">获取验证码</div></el-input>
                </el-form-item>
                <el-form-item >
                    <div @click="onRetrievePwd" class="forget-pwd">忘记密码</div>
                    <el-button type="primary" class="login-button"  @click="onPhoneLogin('phoneLoginForm')">登陆</el-button>
                    <div class="register" @click="onRefister">立即注册</div>
                </el-form-item>
            </el-form>
        </div>
        <div v-else class="content">
            <div @click="onQRCode" id="hk-QRcode" class="hk-QRcode">
                <img class="hk-QRcode-img" v-lazy="'/static/img/poph-QRcode.png'"/>
            </div>
            <div class="qr-code">
                <div class="text-center hk-QRcode-img-bar">
                    <img v-lazy="qrcode_url" style="width: 172px;height: 172px;"/>
                </div>
                <p class="line-80 text-center font-18 hk-QRcode-text-bar">微信扫码，关注公众号即可注册登录</p>
            </div>
        </div>
        </el-dialog>
  </div>
</template>
<script>
import { login, registerVerify,getAccountQrcodeUrl,wechatPollingLogin} from '@/api/user'
import { mapGetters } from 'vuex'
import {handlePersonLoginSuccess} from '@/libs/login'
import dayjs from 'dayjs'
import utils from '@/utils/index.js'
import cookie from '@/utils/store/cookie'
import store from '@/store'
export default {
    inject: ['reload'],
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
            checked: false,
            ordinaryLogin:true,
            isQRCode: true,
            rules:{
                phone:[
                    {required: true, validator: validateMobilePhone, trigger: 'blur' }
                ],
                pwd: [
                    { required: true,validator: validatePass, trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ]
            },
            verificationCodeRules:{
                 phone: [
                    {required: true, validator: validateMobilePhone, trigger: 'blur' }
                ],
                code: [
                     { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
                ],
            },
            accountNumberLoginForm:{
                phone:'',
                pwd:''
            },
            phoneLoginForm:{
                phone: '',
                code: ''
            },
            qrcode_url: '',
            uu_str: '',
            qrCodeTime: null,
            pollingLoginTime: null,
        }
    },
    props:{
        isLogin:Boolean
    },
    beforeDestroy() {
        clearInterval(this.pollingLoginTime);
        clearInterval(this.qrCodeTime);
    },
    methods:{
        // 微信 轮询登录
        getWechatPollingLogin(){
            wechatPollingLogin(this.uu_str).then(res=>{
                if(res.status == 200){
                    this.reload()
                }
            }).catch(res=>{})
        },
        // 获取二维码
        get_AccountQrcodeUrl(){
            getAccountQrcodeUrl().then(res=>{
                if(res.status == 200){
                    this.$set(this,'qrcode_url',res.data.qrcode_url)
                    this.$set(this,'uu_str',res.data.uu_str)
                    this.getWechatPollingLogin()
                }
            }).catch(res=>{
                // console.log('获取二维码 报错',JSON.stringify(res))
                this.$message({
                    message: res.msg,
                    type: "error"
                })
            })
        },
        onQRCode(){
            // this.isQRCode = !this.isQRCode
            if(!this.isQRCode){
                this.get_AccountQrcodeUrl()
                this.qrCodeTime = setInterval(this.get_AccountQrcodeUrl, 300000);
                this.pollingLoginTime = setInterval(this.getWechatPollingLogin, 1000);
            } else {
                clearInterval(this.pollingLoginTime);
                clearInterval(this.qrCodeTime);
            }
        },
        loginMode(e,form){
            this.ordinaryLogin = e
            this.$nextTick(() => {
                this.$refs[form].clearValidate()
            })
        },
        // 
        onRetrievePwd(){
            this.$router.push({path: '/account/org/reset/pwd'})
        },
        // 注册
        onRefister(){
            this.$router.push({path: '/account/register'})
        },
        // 获取验证码
        onCode(){

        },
        onLogin(ruleForm){
            let accountInfo = ''
                let phone = this.accountNumberLoginForm.phone
                let password = this.accountNumberLoginForm.pwd
                let newaccount = Base64.encode(phone)
                let newPassord = Base64.encode(password)
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                    login({ phone, password }).then(res => {
                        if (res.status === 200) {
                            store.commit('LOGIN', {token: res.data.token, expires_time: dayjs(res.data.expires_time)})
                            this.$emit('login')
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
                }
            })
        },
        onPhoneLogin(ruleForm){
            this.$refs[ruleForm].validate(valid => {
                if(valid){

                }
            })
        },
        onColse(e){
            console.log('关闭')
            this.$emit('close')
        }
    }
}
</script>
<style lang="less" scoped>

@import "./login.less";
</style>