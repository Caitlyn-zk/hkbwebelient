<template>
    <div class="addproject" v-loading="loading">
      <div class="content hk-addproject-bar">
        <div class="hk-addproject-title-mbar">
          项目中心/{{ ruleForm.id == 0 ? '新增环评公示': '编辑环评公示'}}
        </div>
        <p class="hk-addproject-tips">温馨提示：平台的核心理念，让水与环境行业从业者资源共享，互助交流，打破行业从业者信息孤岛。所以禁止发布无关的项目</p>
        <div class="hk-addproject-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
          :label-position="labelPosition"
          label-width="140px" class="demo-ruleForm">
          <div class="hk-add-cont-title clearfix margin-b-20">
            <span class="hk-add-cont-info">基本信息</span>
          </div>
          <el-form-item label="公示类型" prop="category">
             <el-select v-model="ruleForm.type" clearable  style="width: 145px;height: 36px;" placeholder="公示类型" @change="selectState">
                <el-option
                    v-for="item in publiciTypelist"
                    :key="item.typeid"
                    :label="item.name"
                    :value="item.typeid">
                </el-option>
                  <!-- <el-option label="环评公示" value="1"></el-option> -->
                  <!-- <el-option label="验收公示" value="2"></el-option> -->
              </el-select>
          </el-form-item>
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name" class="hk-content-input-bar"></el-input>
          </el-form-item>
          <el-form-item label="项目所在地" prop="selectedOptions">
            <el-cascader
              ref="myCascader"
              class="hk-addcont-address"
              :options="optionsaddress"
              v-model="ruleForm.selectedOptions"
              @change="getCityData"
              :separator="' '"
              clearable 
              >
            </el-cascader>
          </el-form-item>
          <el-form-item label="上传文件:">
            <el-upload
              class="upload-demo"
              action="string"
              ref="upload"
              :http-request="httpRequest"
              :before-upload="beforeAvatarUpload"
              :on-remove="onRemove"
              multiple
              :file-list="imageList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传doc/pdf文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
          <div class="hk-cont-main-bar clearfix padding-l-34">
            <span class="margin-r-20">详情</span>
            <span class="hk-addproject-warning-bottm">请编辑项目详情，合同图片，现成图片等</span>
            <span class="hk-addproject-warning-bottm fr padding-r-80 hk-cursor" @click="onViewExamples">查看示列</span>
          </div>
          <el-form-item class="hk-content-textarea" prop="detail">
            <quill-editor
                v-model="ruleForm.detail"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
            </quill-editor>
          </el-form-item>
          <div class="hk-textarec-cheadbox margin-l-25 padding-t-10">
            <el-checkbox v-model="checked">我已阅读360行度环保协议</el-checkbox>
            <span @click="onAgreement">【360行度环保协议企业协议】</span>
          </div>
          <el-form-item class="hk-addpaject-btn margin-l-25 margin-t-48 text-center">
            <el-button class="" round @click="addPublici('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      </div>
      <el-dialog :visible.sync="examplesPopup" width="1200px" :lock-scroll="true"   :close-on-click-modal="false" :before-close="beforeClose" title="示例">
        <div class="examples">
          <div class="">公示类型：{{ruleForm.type == 1 ? '环评公示' : '验收公示'}}</div>
          <div class="">项目名称：{{ruleForm.name}}</div>
          <div class="">项目所在地：{{area1_name}} {{area2_name}} {{area3_name}}</div>
          <div class="">上传文件：</div>
          <div class="file-list">
            <div v-for="(item,index) in fileList" :key="index">{{item.name}}</div>
          </div>
          <div class="">项目详情：</div>
          <span v-html="ruleForm.detail"></span>
        </div>
      </el-dialog>
      <!-- <el-dialog :visible.sync="agreementPopup" width="800px" :lock-scroll="true" :close-on-click-modal="false" :before-close="beforeClose" title="协议">
          <div v-html="ruleForm.detail"></div>
      </el-dialog> -->
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { regionData } from 'element-china-area-data'
import { addProjectUserNoticePublic, getProjectNoticedetail } from '@/api/project'
import {uploadImage} from "@/api/public"
export default {
  data () {
    return {
      loading: false,
      // 上传图片的路径
      baseImportExcelParse: 'https://jsonplaceholder.typicode.com/posts/',
      labelPosition: 'right',
      ruleForm: {
        // 项目ID，0=表示新增，大于0表示编辑
        id: 0,
        // 公示类型 1=环评公示  2=验收公示
        type: null,
        noticeval1: 1,
        noticeval2: 2,
        name: '',
        detail: '',
        selectedOptions: []
      },
      publiciTypelist: [{typeid: 1, name: '环评公示'}, {typeid: 2, name: '验收公示'}],
      attach_list: [],
      checked: true,
      editorOption: {
        theme: 'snow'
      },
      province: {
        code: 11,
        name: '北京'
      },
      optionsaddress: regionData, // 存放城市数据
      area1_code: '',
      area1_name: '',
      area2_code: '',
      area2_name: '',
      area3_code: '',
      area3_name: '',
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList:[],
      imageList:[],
      examplesPopup: false,
      agreementPopup: false,
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '名字不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
    org_id () {
      if (this.$store.state.app.userInfo.org_list) {
       return this.$store.state.app.userInfo.org_list[0].org_id
      }
      return ''
    },
  },
  components: {
    quillEditor
  },
  beforeCreate () {
    this.loading = true
  },
  created () {
    this.ruleForm.id = this.$route.query.id
    if (this.ruleForm.id > 0) {
      this.onProjectNoticeetailData()
    }
    this.loading = false
    // console.log('编辑获取参数' + JSON.stringify(this.$route.query.row))
  },
  methods: {
    httpRequest(file){
      console.log("上传图片1111",file.file)
      let formData = new FormData();
      formData.append("image",file.file);
      formData.append("type", 'project');
      uploadImage(formData).then(res=>{
        if (res.status == 200) {
          this.fileList.push({name:file.file.name,url:res.data.image_name,uid:file.file.uid})
          console.log('上传图片',this.imageList)
          this.dialogVisible = true;
          this.$message({
            message: res.msg,
            type: "success"
          })
        }
      }).catch(res=>{
        file.onError();
        this.$message({
          message: res.msg,
          type: "error"
        })
      })
    },
    beforeAvatarUpload(file) {
      // const isJPEG = file.type === 'image/jpeg'
      // const isJPG = file.type === 'image/jpg'
      // const isPNG = file.type === 'image/png'
      // const isLt10M = file.size / 1024 / 1024 < 10
      // if (!isJPEG && !isJPG && !isPNG) {
      //   this.$message.error('上传头像图片格式不正确')
      // }
      // if (!isLt10M) {
      //   this.$message.error('上传头像图片大小不能超过 10M!')
      // }
      // return [isJPG || isJPEG|| isPNG] && isLt10M
    },
    onRemove(file){
      var index = this.fileList.findIndex(item => item.uid == file.uid);
      this.fileList.splice(index,1)
      console.log('删除图片',this.fileList)
    },
    handleClick (tab, event) {
      // console.log(tab, event)
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
    // 获取省份
    getCityData (val) {
      // console.log('val', val)
      // console.log(this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
      if(this.$refs.myCascader.getCheckedNodes()[0]){
        this.$set(this, 'area1_code', this.ruleForm.selectedOptions[0])
        this.$set(this, 'area2_code', this.ruleForm.selectedOptions[1])
        this.$set(this, 'area3_code', this.ruleForm.selectedOptions[2])
        this.$set(this, 'area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
        this.$set(this, 'area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
        this.$set(this, 'area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
      } else {
        this.$set(this, 'area1_code', null)
        this.$set(this, 'area2_code', null)
        this.$set(this, 'area3_code', null)
        this.$set(this, 'area1_name', '')
        this.$set(this, 'area2_name', '')
        this.$set(this, 'area3_name', '')
      }
      
      // console.log('地区选择' + this.area1_name, this.area2_name, this.area3_name)
    },
    // 发布项目请求
    addPublici (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        // console.log('请求数据', valid)
        if (valid) {
          setTimeout(this.loading = true, 3000)
          var parameter = {
            id: this.ruleForm.id,
            org_id: this.org_id,
            type: this.ruleForm.type,
            name: this.ruleForm.name,
            attach_list: JSON.stringify(this.fileList),
            detail: this.ruleForm.detail,
            area1_code: this.area1_code,
            area1_name: this.area1_name,
            area2_code: this.area2_code,
            area2_name: this.area2_name,
            area3_code: this.area3_code,
            area3_name: this.area3_name
          }
          addProjectUserNoticePublic(parameter).then(res => {
            if (res.status === 200) {
              this.$message({
                message: res.msg,
                type: 'success',
                showClose: true,
                duration: 3000
              })
              Object.assign(this.$data, this.$options.data())
              this.$router.push({path: '/user/org/notice/list'})
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
          setTimeout(this.loading = true, 3000)
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 环评项目详情渲染
    onProjectNoticeetailData () {
      getProjectNoticedetail(this.ruleForm.id).then(res => {
        // console.log('渲染数据',JSON.stringify(res.data))
        // console.log(res.data.id)
        // console.log(res.data)
        this.ruleForm = res.data
        console.log(this.ruleForm)
        this.ruleForm.project_cate = res.data.cate_id
        this.ruleForm.selectedOptions = [res.data.area1_code, res.data.area2_code, res.data.area3_code]
        this.area1_code = res.data.area1_code,
        this.area1_name = res.data.area1_name,
        this.area2_code = res.data.area2_code,
        this.area2_name = res.data.area2_name,
        this.area3_code = res.data.area3_code,
        this.area3_name = res.data.area3_name
        var contact = JSON.parse(res.data.attach_list)
        this.imageList = contact
        // for (let index = 0; index < contact.length; index++) {
        //   this.imageList.push({name:contact[index].name,url:'http://cdn.65ph.com/'+ contact[index].url})
        // }
        this.fileList = contact
        console.log('文件列表',contact)
      })
    },
    // 公示类型
    selectState () {

    },
    handleRemove (file) {
      // console.log(file)
      // console.log('删除图片')
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 查看示例
    onViewExamples () {
      this.examplesPopup = true
    },
    // 关闭弹窗
    beforeClose(){
      this.examplesPopup = false
      this.agreementPopup = false
    },
    // 查看协议
    onAgreement () {
      this.agreementPopup = true
    }
  }
}
</script>
<style lang="less" scoped>

@import './notice-add.less';
</style>
