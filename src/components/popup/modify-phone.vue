<template>
    <div class="binding-phone">
        <el-dialog :visible.sync="phonePopup" width="500px" :lock-scroll="true"  :close-on-click-modal="false" :before-close="beforeClose">
            <div class="title"> 修改手机号</div>
            <el-form ref="form" :rules="rules" :model="form" class="form" label-width="80px">
                <el-form-item prop="phone" label="手机号:">
                    <el-input v-model="form.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码:">
                    <el-input v-model="form.code" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入验证码">
                        <!-- <template slot="append"><div class="code" @click="onSend(form)">获取验证码</div></template> -->
                        <div slot="suffix" class="code" @click="onSend(form)">获取验证码</div>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit-button" @click="onSubmit('form')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {bindingPhone} from '@/api/public'
import {registerVerify} from '@/api/user'
import cookie from '@/utils/store/cookie'
import store from '@/store'
export default {
    inject: ['reload'],
    props:{phonePopup:Boolean},
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
    methods:{
        onSubmit(form){
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
                    this.$message({
                        message: res.msg,
                        type: 'success',
                        showClose: true,
                        duration: 3000
                    })
                    this.$emit('submit')
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
            } else {
                this.$message({
                            message: "请输入手机号",
                            type: 'error',
                            showClose: true,
                            duration: 3000
                        })
            }
            
        },
        beforeClose() {
            this.$refs['form'].resetFields()
            this.$emit('close')
        }
    }
}
</script>
<style lang="less" scoped>

@import './modify-phone.less';
</style>