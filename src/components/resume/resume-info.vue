<template>
  <div class="hk-resume-main-bar">
    <!-- 主要title -->
    <!-- <div class="hk-resume-title">简历完成度</div> -->
    <div class="hk-person-portrait padding-t-20 padding-r-20 clearfix">
      <div class="fr hk-person-button">
        <el-button round class="hk-person-el-button" @click="onEdit(userInfo)">编辑</el-button>
      </div>
      <div class="fl margin-r-24 user-image">
        <img v-if="user_image"  :src="user_image" class="avatar" />
      </div>
      <div class="fl">
        <span class="hk-author-name">{{user_name}}</span>
        <span class="hk-major">
          <span>{{school}}</span>
          <span class="padding-l-5">{{major}}</span>
          <div class="hk-work-bar-main clearfix">
            <div class="line-26 hk-work-bar">
              <span>工作状态：{{jobwant_state | onJobwantState(that)}}</span>
            </div>
            <div class="line-26 hk-work-bar" >
              <span>职位：{{post_name ? post_name : ''}}</span>
            </div>
          </div>
        </span>
      </div>
    </div>
    <!-- 个人信息弹框 -->
    <el-dialog title="填写个人信息" :visible.sync="infoAuFrom" >
      <div class="resume-info-content">
         <div class="head-sculpture">
            <img v-if="infoFrom.avatar !== ''" :src="infoFrom.avatar" class="form-avatar" @click="consoleFL"/>
            <div v-else class="avatar-uploader-icon" @click="consoleFL"></div>
            <div class="text-center">修改头像</div>
        </div>
        <el-form :model="infoFrom" :rules="rules" ref="infoFrom" class="resume-info-form">
            <!-- <el-form-item :label-width="formLabelWidth" > -->
              <!-- <el-avatar style="width: 70px;height: 70px ">
                <el-upload
                    class="form-avatar-uploader"
                    ref="upload"
                    action="string"
                    :show-file-list="false"
                    :http-request="httpRequest"
                    :before-upload="beforeAvatarUpload"
                  >
                  <img v-if="infoFrom.avatar" :src="infoFrom.avatar" class="form-avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-avatar> -->
            <!-- </el-form-item> -->
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="real_name">
              <el-input v-model="infoFrom.real_name" autocomplete="off" style="width:270px"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
              <el-select v-model="infoFrom.gender" placeholder="请选择性别" style="width:270px">
                <el-option
                    v-for="item in isgender"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生年月" :label-width="formLabelWidth" prop="birthday">
              <el-date-picker
                v-model="infoFrom.birthday"
                type="date"
                style="width:270px"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否是学生" :label-width="formLabelWidth" prop="student">
              <el-select v-model="infoFrom.student" placeholder="请选择" style="width:270px">
                <el-option
                    v-for="item in isStudent"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
              <el-input v-model="infoFrom.email" autocomplete="off" style="width:270px"></el-input>
            </el-form-item>
            <el-form-item label="工作经验" :label-width="formLabelWidth">
              <el-date-picker
                style="width:270px"
                v-model="infoFrom.work_date"
                type="date"
                value-format="yyyy-MM"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="项目所在地" :label-width="formLabelWidth">
                <el-cascader
                  style="width:270px"
                  ref="myCascader"
                  class="hk-addcont-address"
                  :options="optionsAddress"
                  v-model="infoFrom.selectedOptions"
                  @change="onGetCityData"
                  :separator="' '"
                  >
                </el-cascader>
              </el-form-item>
          </el-form>
      </div>
     
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="onEditInfo('infoFrom')">确 定</el-button>
      </div>
      <el-dialog :visible.sync="cropperModel" width="600px" :before-close="beforeClose" title="编辑" class="cropper" append-to-body>
        <Cropper  @close='onClose' @confirm="onConfirm" ></Cropper>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import {EditUserInfo} from '@/api/recruit'
import {uploadImage} from "@/api/public"
import utils from '@/utils/index.js'
import Cropper from 'components/popup/cropper'
export default {
  props: {
    userInfo: Object
  },
  components:{Cropper},
  filters:{
    onJobwantState(value,that){
      var obj = utils.findObj(that.stateData, value)
      return obj.label
    }
  },
  inject: ['reload'],
  data () {
    return {
      that:this,
      userData:{},
      formLabelWidth: '120px',
      // 个人信息弹框
      infoAuFrom: false,
      cropperModel: false,
      // 是否统招
      tzList: [{
        value: 1,
        label: '统招'
      }, {
        value: 2,
        label: '非统招'
      }],
      student: [{
        value: 1,
        label: '是'
      }, {
        value: 2,
        label: '不是'
      }, {
        value: 0,
        label: '未知'
      }],
      isgender: [{
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }],
      work_date: [{
        value: 1,
        time: '2020-09'
      }, {
        value: 0,
        time: null
      }],
      isStudent: [{
        value: 0,
        label: '未知'
      }, {
        value: 1,
        label: '是'
      }, {
        value: 2,
        label: '不是'
      }],
      stateData: [
        {
          value: 10,
          label: "正在找工作"
        },
        {
          value: 20,
          label: "观望中"
        },
        {
          value: 30,
          label: "不想找工作"
        }
      ],
      optionsAddress: regionData, // 存放城市数据
      infoFrom: {
        real_name: '',
        avatar: '',
        gender: '',
        birthday: '',
        student: '',
        email: '',
        work_date: '',
        selectedOptions: ''
      },
      live_in_area1: '',
      live_in_area2: '',
      live_in_area3: '',
      live_in_area1_name: '',
      live_in_area2_name: '',
      live_in_area3_name: '',
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
      rules: {
        real_name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        selectedOptions: [
          { required: true, message: '请选择居住地址', trigger: 'blur' }
        ],
        work_date: [
          { required: true, message: '请选择工作年限', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      user_name:'',
      school:'',
      major:'',
      post_name:'',
      jobwant_state: null,
      image_name:'',
      user_image:''
    }
  },
  created () {
  },
  methods: {
    httpRequest(file){
      // console.log("上传图片1111",file.file)
      let formData = new FormData();
      formData.append("image",file.file);
      formData.append("type", 'avatar');
      uploadImage(formData).then(res=>{
        if (res.status == 200) {
          this.infoFrom.avatar = 'http://cdn.65ph.com/'+res.data.image_name
          this.image_name = res.data.image_name
          this.$message({
            message: res.msg,
            offset: 60,
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
    // // 头像上传事件
    // handleavatarSuccess (res, file) {
    //   this.infoFrom.avatar = URL.createObjectURL(file.raw)
    // },
    // beforeAvatarUpload(file) {
    //   const isJPEG = file.type === 'image/jpeg'
    //   const isJPG = file.type === 'image/jpg'
    //   const isPNG = file.type === 'image/png'
    //   const isLt10M = file.size / 1024 / 1024 < 10
    //   if (!isJPEG && !isJPG && !isPNG) {
    //     this.$message.error('上传头像图片格式不正确')
    //   }
    //   if (!isLt10M) {
    //     this.$message.error('上传头像图片大小不能超过 10MB!')
    //   }
    //   return [isJPG || isJPEG|| isPNG] && isLt10M
    // },
    // 获取省份信息
    onGetCityData (val) {
      // console.log(this.infoFrom.selectedOptions)
      // console.log(this.infoFrom.selectedOptions[0], this.infoFrom.selectedOptions[1], this.infoFrom.selectedOptions[2])
      this.$set(this, 'live_in_area1', this.infoFrom.selectedOptions[0])
      this.$set(this, 'live_in_area2', this.infoFrom.selectedOptions[1])
      this.$set(this, 'live_in_area3', this.infoFrom.selectedOptions[2])
      this.$set(this, 'live_in_area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
      this.$set(this, 'live_in_area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
      this.$set(this, 'live_in_area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
      // console.log(this.$set(this, 'live_in_area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]))
      // console.log(this.$set(this, 'live_in_area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]))
      // console.log(this.$set(this, 'live_in_area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]))
    },
    // 编辑用户信息
    onEdit (e) {
      this.infoAuFrom = true
      // console.log(JSON.stringify(e))
      let infoLists = this.userInfo.user_info
      // console.log([infoLists.live_in_area1, infoLists.live_in_area2, infoLists.live_in_area3])
      // console.log([infoLists.live_in_area1, infoLists.live_in_area2, infoLists.live_in_area3] + '时间' + infoLists.work_date + '生日' + infoLists.birthday)
      // 渲染表单中地区
      this.infoFrom.selectedOptions = [String(infoLists.live_in_area1), String(infoLists.live_in_area2), String(infoLists.live_in_area3)]
      this.live_in_area1 = infoLists.live_in_area1
      this.live_in_area2 = infoLists.live_in_area2
      this.live_in_area3 = infoLists.live_in_area3
      this.live_in_area1_name = infoLists.live_in_area1_name
      this.live_in_area2_name = infoLists.live_in_area2_name
      this.live_in_area3_name = infoLists.live_in_area3_name
      // 将获取来的时间戳转换成data时间格式
      this.infoFrom.birthday = infoLists.birthday
      this.infoFrom.work_date = infoLists.work_date
      this.infoFrom.email = infoLists.email
      this.infoFrom.student = infoLists.student
      this.infoFrom.gender = infoLists.gender
      this.infoFrom.real_name = infoLists.real_name
      // console.log(this.infoFrom)
      // console.log(this.userInfo)
    },
    onEditInfo (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.addInfo()
        }
      })
    },
    addInfo () {
      // console.log('储存')
      let data = {
        real_name: this.infoFrom.real_name,
        avatar: this.image_name,
        gender: this.infoFrom.gender,
        birthday: this.infoFrom.birthday,
        student: this.infoFrom.student,
        email: this.infoFrom.email,
        work_date: this.infoFrom.work_date,
        live_in_area1: this.live_in_area1,
        live_in_area2: this.live_in_area2,
        live_in_area3: this.live_in_area3,
        live_in_area1_name: this.live_in_area1_name,
        live_in_area2_name: this.live_in_area2_name,
        live_in_area3_name: this.live_in_area3_name
      }
      // 先拉取数据 成功在执行编辑
      EditUserInfo(data).then(res => {
        if (res.status === 200) {
          window.localStorage.setItem('info', JSON.stringify(data))
          this.reload()
          this.$emit('info')
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        }
      }).catch(res => {
        this.$message({
          message: res.message,
          type: 'error',
          showClose: true,
          offset: 60,
          duration: 3000
        })
      })
      // 弹框隐藏
      this.infoAuFrom = false
    },
    consoleFL(){
      this.cropperModel = true
    },
    beforeClose(){
      this.cropperModel = false
    },
    onClose(){
      this.cropperModel = false
    },
    onConfirm(image,image_name){
      this.cropperModel = false
      this.infoFrom.avatar = image
      this.image_name = image_name
    }
  },
  watch: {
    userInfo(newV,oldV) {
      this.userData = newV
      this.user_name = newV.user_info.real_name
      if (newV.edu.length !== 0) {
        this.school = newV.edu[0].school
        this.major = newV.edu[0].major
      }
      // if (newV.work.length > 0) {
      //   this.post_name = newV.work[0].post_name
      // }
      this.post_name = newV.resume_user.post_cate_name
      this.jobwant_state = newV.resume_user.jobwant_state
      this.infoFrom.avatar = newV.user_info.avatar !==''?'http://cdn.65ph.com/'+ newV.user_info.avatar : ''
      this.user_image = newV.user_info.avatar ==''? require('../../assets/image/user_img.png'):'http://cdn.65ph.com/'+ newV.user_info.avatar
      this.image_name = newV.user_info.avatar
      // console.log('图片',this.infoFrom.avatar)
    } 
  }
}
</script>

<style lang="less">
 @import './index.less';
</style>
