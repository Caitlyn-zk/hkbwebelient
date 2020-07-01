<template>
    <div class="binding-phone">
        <div class="content">
            <div class="title">绑定手机</div>
            <div class="form">
                <el-form ref="form" :rules="rules" :model="form">
                    <el-form-item prop="phone">
                        <el-input v-model="form.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入电话号码"></el-input>
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
        return{
            form:{
                phone:'',
                code:''
            },
            rules:{
                phone: [
                    {required: true, validator: validateMobilePhone, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#fff')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
    methods:{
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
                    cookie.remove("resetCodeTime")
                    cookie.remove('phone')
                    this.$router.push({path:'/user/person/index'})
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
            if (form.phone !== '') {
                var reg = /^1[3456789]\d{9}$/
                if (reg.test(form.phone)) {
                    let type = 'register'
                    cookie.set('phone', form.phone)
                    registerVerify({phone: form.phone, type: type}).then(res => {
                        if (res.status === 200) {
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
            
        },
    }
}
</script>
<style lang="less" scoped>

@import './phone.less';
</style>