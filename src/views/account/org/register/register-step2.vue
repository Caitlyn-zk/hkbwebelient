<template>
  <div class="company-info">
    <el-form :model="stepFrome" label-position="left" status-icon :rules="rules" ref="stepFrome" label-width="120px" class="demo-ruleForm">
      <el-form-item label="公司logo" prop="imageUrl" class="hk-avatar-main">
        <div class="logo">
          <img v-if="stepFrome.imageUrl !== ''" :src="stepFrome.imageUrl" class="image-url" @click="selectLogo"/>
          <div v-else class="avatar-uploader-icon" @click="selectLogo"></div>
          <div class="hk-avater-datiel">建议：清晰的公司logo提升公司形象、职位查看点击率提升20%要求：不能为二维码、营业执照、环境图、人物图像等格式：jpg、jpeg、gif、png，小于10MB</div>
        </div>
      </el-form-item>
      <el-form-item label="公司名称" prop="name" >
      <!-- :disabled="true" -->
        <el-input v-model="stepFrome.name" readonly="readonly" :disabled="true" placeholder="请填写与营业执照名称/劳动合同/公司发票/公司发票抬头一致的公司全称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="行业领域" prop="nick_name">
        <el-select v-model="stepFrome.nick_name" placeholder="请选择" clearable >
          <el-option
            v-for="item in industryNeighborhood"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="公司规模" prop="scale">
        <el-select v-model="stepFrome.scale" placeholder="请选择" clearable >
          <el-option
            v-for="item in compayScale"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构类型" prop="org_type">
        <el-select v-model="stepFrome.org_type" placeholder="请选择" clearable >
          <el-option
            v-for="item in orgType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-cascader
            ref="myCascader"
            class="hk-addcont-address"
            :options="optionsaddress"
            v-model="stepFrome.address"
            @change="getCityData"
            :separator="' '"
            >
          </el-cascader>
      </el-form-item>
      <el-form-item label="营业执照" prop="license" class="hk-license clearfix">
        <div class="fl hk-logo-img">
  
            <el-upload
              class="hk-upload-main"
              ref="uploadxls"
              action="string"
              :show-file-list="false"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUpload"
            >
            <img v-if="certImageUrl" :src="certImageUrl" class="avatar">
            <i class="el-icon-plus" v-else></i>
          </el-upload>
          <div style="margin-left:15px;">
            <span class="text-user-red">上传执照须知</span>
            <div class="hk-upload-main-bar" style="width:270px;overflow: hidden;line-height:23px;color:#666;">
              <p>营业执照清晰完善，不能剪裁</p>
              <p>不支持手机屏幕截图和电脑翻拍图片</p>
              <p>营业执照的黑白复印件、扫描件，需加盖红色公司公章</p>
              <p>营业执照二维码能识别出本公司信息</p>
              <p>如公司信息已变更，请上传最新营业执照</p>
              <p>营业执照与公司全称一致</p>
              <p>如添加水印须与拉勾网招聘审核相关</p>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="公司介绍" prop="desc">
        <quill-editor
            v-model="stepFrome.desc"
            ref="myQuillEditor"
            :options="postDetail"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPreviousStep">返回上一步</el-button>
        <el-button type="primary" @click="onNextStep('stepFrome')" :editactive="active">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="cropperModel" width="600px" :lock-scroll="true"  :close-on-click-modal="false" :before-close="beforeCloseLogo" title="编辑公司Logo">
      <Cropper  @close='onClose' @confirm="onConfirm" ></Cropper>
    </el-dialog>
  </div>
</template>

<script>
import {compayScale , industryNeighborhood} from '@/config/constant'
import {authUserOrgPerfect} from '@/api/user'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {uploadImage} from "@/api/public"
import { regionData } from 'element-china-area-data'
import Cropper from 'components/popup/cropper'
export default {
  inject: ['reload'],
  data () {
    return {
      stepFrome:{
        imageUrl: '',
        // company_logo:'',
        name:"",
        nick_name:'',
        scale:'',
        org_type:'',
        address:'',
        license: '',
        desc:'',
      },
      type:0 ,
      // 地址
      cropperModel: false,
      cropperCert: false,
      optionsaddress: regionData, // 存放城市数据
      area1_code: '',
      area1_name: '',
      area2_code: '',
      area2_name: '',
      area3_code: '',
      area3_name: '',
      imageUrl: '',
      active: 1,
      postDetail: {
        theme: 'snow'
      },
      compayScale: compayScale,
      industryNeighborhood: industryNeighborhood,
      orgType: [
        {
          label:'民营企业',
          value: 10
        },
        {
          label:'国有企业',
          value: 20
        },
        {
          label: '事业单位',
          value: 30
        },
        {
          label: '机关',
          value: 40
        },
        {
          label: '社会团体',
          value: 50
        },
        {
          label: '民办非企业单位',
          value: 60
        },
        {
          label: '农民专业合作社',
          value: 70
        }
      ],
      certImageUrl: '',
      dialogVisible: false,
      imageUrl:'',
      logo: '',
      cert_url:'',
      rules: {
        imageUrl: [
          // { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入公司的名字', trigger: 'blur' }
        ],
        // nick_name: [
        //   { required: true, message: '请选择你的行业领域', trigger: 'blur' }
        // ],
        scale: [
          { required: true, message: '请选择公司规模', trigger: 'blur' }
        ],
        org_type: [
          { required: true, message: '请选择机构规模', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ],
        license: [
          { required: true, message: '请上传营业执照',trigger:'blur'}
        ],
        desc: [
          { required: true, message: '请填写公司详情', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.stepFrome.name = this.$route.query.org_name
    this.stepFrome.license = this.certImageUrl
    console.log('打印值'+ this.certImageUrl)
  },
  components: {
    quillEditor,
    Cropper,
  },
  mounted () {
    this.stepFrome.license = this.certImageUrl
    console.log('打印值'+ this.certImageUrl)
  },
  methods: {
    httpRequest(file){
      console.log("上传图片1111",file.file)
      let formData = new FormData();
      formData.append("image",file.file);
      formData.append("type", 'license');
      uploadImage(formData).then(res=>{
        if (res.status == 200) {
          this.certImageUrl = 'http://cdn.65ph.com/'+ res.data.image_name
          this.cert_url = res.data.image_name
          this.$message({
            message: res.msg,
            type: "success"
          })
        }
      }).catch(res=>{
        this.$message({
          message: res.msg,
          type: "error"
        })
      })
    },
    // 富文本
    onEditorReady (editor) {
      // 准备编辑
    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus (val, editor) {
      // console.log(val, editor) // 富文本获取焦点内容
      // editor.enable(false) // 在获取焦点的时候禁用
    }, // 获取焦点事件
    onEditorChange () {}, // 内容改变事件
    saveHtml: (event) => {
      // console.log(this.content)
    },
    // 上一步
    onPreviousStep() {
      this.$router.push({
        path: '/account/org/register/personInfo',
        // name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_1',
        query: {
          active: 0
        }
      })
      this.reload()
    },
    // 下一步
    onNextStep (formName) {
      // this.$refs.uploadxls.submit()
      this.stepFrome.license = this.certImageUrl
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$router.push({
          //   name: 'PATH_ACCOUNT_ORG_REGISTER_STEP_3',
          //   query: {
          //     active: 2
          //   }
          // })
          this.add()
          this.reload()
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    add(){
      let that = this
      var parameter = {
        org_reg_state: 20 ,
        name: that.stepFrome.name,
        id: 0,
        // nick_name: that.stepFrome.nick_name,
        logo: that.logo,
        org_type: that.stepFrome.org_type,	 
        scale: that.stepFrome.scale,
        cert_url: that.cert_url, 
        area1: that.area1_code,
        area2: that.area2_code,
        area3: that.area3_code,
        area1_name: that.area1_name,
        area2_name: that.area2_name,
        area3_name: that.area3_name,
        desc: that.stepFrome.desc
      }
      console.log("传递参数",parameter)
      authUserOrgPerfect(parameter).then(res =>{
        console.log('新增企业个人信息',JSON.stringify(res))
        if(res.status == 200) {
          this.$router.push({
            path: '/account/org/register/completeinfo',
            query: {
              active: 2
            }
          })
        }
      })
    },
    // 获取省份
    getCityData () {
      let that = this
      this.$set(that, 'area1_code', this.stepFrome.address[0])
      this.$set(that, 'area2_code', this.stepFrome.address[1])
      this.$set(that, 'area3_code', this.stepFrome.address[2])
      this.$set(that, 'area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
      this.$set(that, 'area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
      this.$set(that, 'area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
    },
    // 拉取渲染时
    perfectList () {
      let that = this
      that.stepFrome.name = res.data.name
      // that.stepFrome.nick_name = res.data.nick_name
      that.stepFrome.imageUrl = res.data.logo
      that.stepFrome.org_type = res.data.org_type
      that.stepFrome.scale = res.data.scale
      that.stepFrome.license = res.data.cert_url
      // 渲染地址所用
      that.infoFrom.address = [String(res.data.area1), String(res.data.area2), String(res.data.area3)]
      that.stepFrome.desc = res.data.desc
    },
    handlePictureCardPreview(file) {
      console.log('上传图片11',JSON.stringify(file.url))
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPEG && !isJPG && !isPNG) {
        this.$message.error('上传头像图片格式不正确')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return [isJPG || isJPEG || isPNG] && isLt10M
    },
    beforeCloseLogo (done) {
      this.cropperModel = false
    },
    selectLogo(){
      this.cropperModel = true
    },
    // 确认
    onConfirm(imageUrl,image_name){
      this.cropperModel = false
      this.stepFrome.imageUrl = imageUrl
      this.logo = image_name
  
    },
    // 取消弹窗
    onClose(){
      this.cropperModel = false
    },
  }
}
</script>

<style lang="less" scoped>
@import './register-step2.less';
</style>