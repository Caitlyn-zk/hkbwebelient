<template>
  <div>
    <el-form :model="stepFrome" label-position="left" status-icon :rules="rules" ref="stepFrome" label-width="120px" class="demo-ruleForm">
      <el-form-item label="头像" prop="imageUrl" class="hk-avatar-main" >
        <img v-if="stepFrome.imageUrl !== ''" :src="stepFrome.imageUrl" class="image-url" @click="consoleFL"/>
        <div v-if="stepFrome.imageUrl == ''" class="avatar-uploader-icon" @click="consoleFL"></div>
        <div class="hk-avater-datiel">建议使用招聘者真实头像提升真实性、专业性 支持jpg、jpeg、png，小于10MB</div>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="stepFrome.name" placeholder="请填写你工作中的姓名，用于向向求职者展示"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="post_name">
        <el-input type="text" v-model="stepFrome.post_name" placeholder="请填写当前公司任职职位"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="stepFrome.email" placeholder="请填写常用邮箱，支持招聘设置中修改"></el-input>
      </el-form-item>
      <el-form-item label="公司全称" prop="org_name">
        <el-input type="text" v-model="stepFrome.org_name" placeholder="请填写与营业执照名称/劳动合同/公司发票/公司发票抬头一直的公司全称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCompany('stepFrome')" class="hk-add-company">加入公司</el-button>
        <el-button type="primary" @click="onNextStep('stepFrome')" >下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="cropperModel" width="600px" :lock-scroll="true"  :close-on-click-modal="false" :before-close="beforeClose" title="编辑头像">
      <Cropper  @close='onClose' @confirm="onConfirm">
      </Cropper>
    </el-dialog>
  </div>
</template>

<script>
import { getUserOrgInfo, authUserOrgAu } from '@/api/user'
import {__config} from '@/config/index'
import {uploadImage} from "@/api/public"
import Cropper from 'components/popup/cropper'
export default {
  inject: ['reload'],
  components:{Cropper},
  data() {
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
    return {
      // 上传图片的路径
      imgUrl:__config.production.imgUrl,
      cropperModel: false,
      stepFrome: {
        imageUrl: '',
        name: '',
        post_name: '',
        email: '',
        org_name: ''
      },
      imageUrl: '',
      image_name: '',
      rules: {
        imageUrl: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入你的名字', trigger: 'blur' }
        ],
        post_name: [
          { required: true, message: '请输入你的职位', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        org_name: [
          { required: true, message: '请输入你所在公司的全称', trigger: 'blur' }
        ],
      }
    };
  },
  created () {
    this.getInfo()
  },
  methods: {
    // 下一步
    onNextStep (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add()
          this.reload()
        } else {
          // console.log('error submit!!')
          return false;
        }
      })
    },
    // 加入公司
    addCompany (formName) {
      // console.log('加入公司成功')
    },
    getInfo () {
      var parameter = {
        org_reg_state: 10
      }
      let that = this
      getUserOrgInfo(parameter).then(res => {
        // console.log('基本信息渲染',JSON.stringify(res))
        if (res.status == 200) {
          // 成功便将名字传给右侧导航
          // console.log(res.data)
          // 将所得数据渲染到页面上 判断有无数据
          // this.stepFrome = res.data
          if (res.data !== null) {
            this.$set(this.stepFrome, 'name', res.data.real_name)
            this.$set(this.stepFrome, 'post_name', res.data.post_name)
            this.$set(this.stepFrome, 'email', res.data.email)
            this.$set(this.stepFrome, 'org_name', res.data.org_name)
            this.$set(this.stepFrome, 'imageUrl', 'http://cdn.65ph.com/' + res.data.org_logo)
            this.$set(this, 'image_name', res.data.org_logo)
          }
        }
      })
    },
    add(){
      let that = this
      // console.log(that.stepFrome.imageUrl)
      
      var parameter = {
        org_reg_state: 10 ,
        name: that.stepFrome.name,
        avatar: that.image_name,
        email: that.stepFrome.email, 
        post_name: that.stepFrome.post_name,	 
        org_name: that.stepFrome.org_name	 
      }
      // console.log("传递参数",parameter)
      authUserOrgAu(parameter).then(res =>{
        // console.log('新增企业个人信息',JSON.stringify(res))
        if(res.status == 200) {
          this.$router.push({
            path: '/account/org/register/companyinfo',
            query: {
              active: 1,
              org_name:this.stepFrome.org_name
            }
          })
        }
      })
    },
    consoleFL(){
      this.cropperModel = true
    },
    beforeClose (done) {
      this.cropperModel = false
    },
    onConfirm(imageUrl,image_name){
      this.cropperModel = false
      this.stepFrome.imageUrl = imageUrl
      this.image_name = image_name
    },
    onClose(){
      this.cropperModel = false
    }
  }
}
</script>

<style lang="less">

@import './register-step1.less';
</style>
