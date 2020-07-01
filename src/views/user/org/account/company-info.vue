<template>
    <div class="replenish-company-info">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="form">
            <el-form-item label="公司全称:">
                <el-input v-model="form.org_name" placeholder="" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司logo:" prop="logo">
                <div class="upload">
                    <img v-if="form.logo !== ''" :src="form.logo" class="image-url" @click="consoleFL"/>
                    <div v-else class="uploader-icon" @click="consoleFL">
                        <i class="el-icon-upload"></i>
                    </div>
                    <div class="upload-tips">支持jpg、jpeg、png，文件不超过10MB</div>
                </div>
            </el-form-item>
            <el-form-item label="公司地址:" prop="address">
                <el-cascader
                    ref="myCascader"
                    class="hk-addcont-address"
                    :options="optionsaddress"
                    v-model="form.address"
                    @change="getCityData"
                    >
                </el-cascader>
            </el-form-item>
            <el-form-item >
                <el-input v-model="form.detailedAddress" placeholder="请填写公司所在街道、楼宇等" class="detailed-address"></el-input>
            </el-form-item>
            <el-form-item label="公司网址:">
                <el-input v-model="form.officialWebsite" placeholder="请填写公司官网"></el-input>
                <div class="tips">
                    公司网址可为：公司官网、app下载页面、认证过的企业官方微博、官方微信公众号、网店地址（有工商执照可查,如：天猫企业店铺）。
                </div>
            </el-form-item>
            <el-form-item label="公司介绍" class="company-info" prop="companyInfo">
                <el-input
                    type="textarea"
                    :rows="6"
                    maxlength="1000"
                    show-word-limit
                    placeholder="请描述公司简介、企业文化、公司愿景等，10-1000字"
                    v-model="form.companyInfo">
                </el-input>
            </el-form-item>
            <el-form-item label="企业邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请填写公司常用邮箱"></el-input>
            </el-form-item>
            <el-form-item >
                <div class="tips">
                    <div>1.此邮箱需要激活验证,确保邮箱真实可用。</div>
                    <div>2.通过验证后,你的同事也可以通过相同后缀的邮箱号(如：cc@huankenao.com中的@huankenao.com)验证后直接进入你的公司</div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onNext('form')">提交认证</el-button>
                <el-button type="" @click="onPreviousStep">返回上一步</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="cropperModel" width="600px" :lock-scroll="true"  :close-on-click-modal="false" :before-close="beforeClose" title="编辑公司logo">
            <Cropper  @close='onClose' @confirm="onConfirm"></Cropper>
        </el-dialog>
    </div>
</template>
<script>
import Cropper from 'components/popup/cropper'
import { regionData } from 'element-china-area-data'
export default {
    components:{Cropper},
    data(){
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
                org_name:'',
                logo:'',
                address:[],
                detailedAddress:'',
                officialWebsite:'',
                companyInfo:'',
                email:''
            },
            logo:'',
            area1_code: '',
            area1_name: '',
            area2_code: '',
            area2_name: '',
            area3_code: '',
            area3_name: '',
            optionsaddress: regionData,
            cropperModel: false,
            rules:{
                logo:[
                    { required: true, message: '请选择公司logo', trigger: 'blur' }
                ],
                address:[
                    { required: true, message: '请选择公司地址', trigger: 'change' }
                ],
                companyInfo:[
                    { required: true, message: '请输入公司信息', trigger: 'blur' },
                    { min: 10, max: 1000, message: '长度在 10 到 1000 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, validator: validateEmail, trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        if (this.$route.query.org_name) {
            this.form.org_name = this.$route.query.org_name
        }
    },
    methods:{
        beforeClose(){
            this.cropperModel = false
        },
        consoleFL(){
            this.cropperModel = true
        },
        onClose(){
            this.cropperModel = false
        },
        onConfirm(imageUrl,image_name){
            this.form.logo = imageUrl
            this.logo = image_name
            this.cropperModel = false
        },
        // 获取公司地址
        getCityData(){

        },
        onPreviousStep(){
            this.$router.go(-1)
        },
        onNext(val){
            this.$refs[val].validate((valid) => {
                if (valid) {
                    this.$router.push({path:'/user/org/account/orginfo'})
                }
            })
        },
    },
    watch: {
        $route: {
            handler() {
                if (this.$route.query.org_name) {
                    this.form.org_name = this.$route.query.org_name
                }
            },
        }
    }
}
</script>
<style lang="less" scoped>
@import './company-info.less';
</style>