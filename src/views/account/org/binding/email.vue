<template>
    <div class="binding-email">
        <div class="content">
            <div class="title">绑定邮箱</div>
            <div class="form">
                <el-form ref="form" :rules="rules" :model="form">
                    <el-form-item prop="phone">
                        <el-input v-model="form.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="form.email" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="form.code" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入验证码"><template slot="append"><div class="code" @click="onSend(form)">获取验证码</div></template></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="next-step" @click="onNextStep('form')">下一步</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import {bindingPhone} from '@/api/public'
import {registerVerify} from '@/api/user'
import cookie from '@/utils/store/cookie'
import store from '@/store'
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
        var validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请正确填写邮箱'))
            } else {
                if (value !== '') { 
                var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if(!reg.test(value)){
                    callback(new Error('请输入有效的邮箱'))
                }
                }
                callback()
            }
        }
        return{
            form:{
                phone:'',
                email:'',
                code:''
            },
            rules:{
                phone: [
                    {required: true, validator: validateMobilePhone, trigger: 'blur' }
                ],
                email: [
                    { required: true, validator: validateEmail, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#05D797')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
    methods:{
        //   返回登录
        onReturnLogin() {
            this.$router.push({ path: "/user/org/index" });
        },
        onNextStep(form){
            this.$refs[form].validate((valid) => {
                if(valid){
                    this.bindingPhone()
                }
            })
        },
        bindingPhone(){
            let that = this
            var data ={
                phone: that.form.phone,
                captcha: that.form.code
            }
            bindingPhone(data).then(res=>{
                if (res.status === 200) {
                    // console.log('验证码发送成功')
                    this.$$router.push({path:'/user/org/index'})
                } else {
                    that.$message({
                    message: res.msg,
                    type: 'error',
                    showClose: true,
                    duration: 3000
                    })
                }
            })
        },
        onSend (form) {
            console.log(form)
            let that = this
            if (form.phone == '') {
                // console.log(this.)
                // that.$message.error('手机号不能为空！')
            } else {
                if (form.phone !== '') {
                var reg = /^1[3456789]\d{9}$/
                if (!reg.test(form.phone)) {

                } else {
                    let type = 'login'
                    cookie.set('phone', form.phone)
                    registerVerify({phone: form.phone, type: type}).then(res => {
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
    }
}
</script>
<style lang="less" scoped>
@import './email.less';
</style>
