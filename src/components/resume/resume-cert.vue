<template>
  <div class="hk-detail-list-title margin-t-10 clearfix">
    <!-- <div class="fl" v-for="item in certList" :key="item"> -->
    <div class="hk-resume-main">
      <el-button round @click="onAdd">添加</el-button>
    </div>
    <span class="hk-person-title-bar">我的证书</span>
      <div class="hk-resume-school-name font-16 text-bold clearfix" v-for="(item,index) in certList" :key="index">
        <div class="hk-resume-project-name">证书名称：{{item.name}}</div>
        <div class="hk-resume-font-stlye">证书获取时间：{{item.get_dt}}</div>
        <div v-if="imageData.length > 0" class="cert-img-list">
          <div v-for="(item,index) in fileList" :key="index">
            <el-image 
            :src="item.url" 
            fit="cover"
            :preview-src-list="srcList">
          </el-image>
          </div>
        </div>
        <div class="hk-resume-school-time fr">
          <span class="hk-resume-school-time-bar">{{item.get_dt}}</span>
          <div class="hk-resume-shool-btn">
            <el-button type="text" @click="onEdit(item)">编辑</el-button>
            <el-button type="text" class="text-user-red"  :class="certList.length > 1 ? '' : 'last-del'" @click="onDel(item.id)">删除</el-button>
          </div>
        </div>
    </div>
    <!-- 证书弹框 -->
    <el-dialog title="添加我的证书" :visible.sync="dialogFormVisible" @close="onClose">
      <el-form :model="form" :rules="rules" ref="form" id="myform">
        <el-form-item label="证书名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="获取证书时间" :label-width="formLabelWidth" prop="get_dt">
          <el-date-picker
            v-model="form.get_dt"
            type="month"
            placeholder="选择项目开始"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM" 
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <!-- <el-avatar style="width: 70px;height: 70px ">
            <el-upload
                class="form-avatar-uploader"
                ref="upload"
                action="string"
                :show-file-list="false"
                :http-request="httpRequest"
                :before-upload="beforeAvatarUpload"
              >
              <img v-if="form.cert_image" :src="form.cert_image" class="form-avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-avatar> -->
          <el-upload
            v-model="dialogImageUrl"
            action="string"
            list-type="picture-card"
            :http-request="httpRequest"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :on-remove="onRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="onPreserve('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addUserCertAu, getUserCertList, delUserCertDel} from '@/api/recruit'
import {uploadImage} from "@/api/public"
export default {
  inject: ['reload'],
  props: {
    certList: Array
  },
  data () {
    return {
      // 项目经历
      dialogFormVisible: false,
      form: {
        id: 0,
        name: '',
        get_dt: '',
        cert_image:'',
      },
      dialogImageUrl:'',
      dialogVisible: false,
      formLabelWidth: '150px',
      resume_id:null,
      cert_image: '',
      imageData:[],
      fileList:[],
      srcList:[],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now()-8.64e7
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入证书名称', trigger: 'blur' }
        ],
        get_dt: [
          { required: true, message: '请选择证书获取时间', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if(this.$route.query.resume_id){
      this.resume_id = parseInt(this.$route.query.resume_id)
    }
    // 测试数据列表
  },
  methods: {
    httpRequest(file){
      // console.log("上传图片1111",file.file)
      let formData = new FormData();
      formData.append("image",file.file);
      formData.append("type", 'cert');
      uploadImage(formData).then(res=>{
        if (res.status == 200) {
          this.form.cert_image = 'http://cdn.65ph.com/'+res.data.image_name
          this.imageData.push(res.data.image_name)
          //  console.log('上传图片',JSON.stringify(res.data.image_name))
           this.dialogVisible = true;
          this.$message({
            message: res.msg,
            offset: 60,
            type: "success"
          })
        }
      }).catch(res=>{
        this.$message({
          message: res.msg,
          offset: 60,
          type: "error"
        })
      })
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
      return [isJPG || isJPEG|| isPNG] && isLt10M
    },
    onRemove(file, fileList){
      // console.log('删除图片',file,fileList,this.fileList)
      var index = this.fileList.findIndex(item => item.uid == file.uid);
      // console.log('删除图片index',index)
      this.fileList.splice(index,1)
      this.imageData.splice(index,1)
      // console.log('删除图片',file,fileList,this.fileList)
    },
    add () {
      let that = this
      let cert_image = that.imageData.join(',');
      var parameter = {
        resume_id: that.resume_id,
        id: that.form.id,
        name: that.form.name,
        get_dt: that.form.get_dt,
        cert_image: cert_image
      }
      addUserCertAu(parameter).then(res => {
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            offset: 60,
            duration: 3000
          })
          this.reload()
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        }
      })
    },
    getCertList () {
      getUserCertList().then(res => {
        this.toggleContent(res.data)
      })
    },
    del (id) {
      delUserCertDel(id).then(res => {
        if (res.status == 200) {
          // this.reload()
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            offset: 60,
            duration: 3000
          })
          this.dialogFormVisible = false
          this.getCertList()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        }
      })
    },
    toggleContent(event) {
      this.$emit('cert', event);
    },
    // 添加事件
    onAdd () {
      this.dialogFormVisible = true
      this.form.id = 0
      if ([this.form].length > 0) {
        // document.getElementById('myform').reset()
      }
    },
    // 编辑事件
    onEdit (e) {
      this.dialogFormVisible = true
      this.form = e
    },
    // 删除事件
    onDel (e) {
      let arrayLength = this.certList.length
      // console.log(arrayLength)
      if (arrayLength > 1) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.del(e)
        })
      }
    },
    onPreserve (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.add()
        }
      })
    },
    onClose () {
      // console.log('关闭')
      this.getCertList()
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  },
  watch: {
    certList(newV,oldV) {
      if (newV[0]) {
        // console.log('图片000',JSON.stringify(newV[0].cert_image))
        var img = newV[0].cert_image
        if (img == '') {
          this.imageData = []
        } else {
          var cert_image = img.split(',')
          // console.log('图片11',JSON.stringify(cert_image))
          this.imageData = cert_image
          cert_image.forEach(element => {
          let obj = new Object();
          obj.url = 'http://cdn.65ph.com/'+ element
          this.srcList.push('http://cdn.65ph.com/'+ element)
          this.fileList.push(obj)
        });
        }
      }
    } 
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
