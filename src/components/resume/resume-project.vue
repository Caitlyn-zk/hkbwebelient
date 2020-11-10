<template>
  <div class="hk-detail-list-title margin-t-10 clearfix">
     <div class="hk-resume-main">
        <el-button round @click="onAdd">添加</el-button>
      </div>
      <span class="hk-person-title-bar">项目经历</span>
      <div class="hk-resume-school-name font-16 text-bold clearfix" v-for="(item,index) in projectList" :key="index">
          <div class="hk-resume-project-name">项目名称：{{item.name}}</div>
          <!-- <div class="font-12">项目地区：{{item.company}}</div> -->
          <div class="hk-resume-font-stlye">项目时间段：{{item.begin_dt}}至{{item.end_dt}}</div>
          <!-- <div class="font-12">项目描述：<text v-html="item.desc"><text></div> -->
          <div class="hk-resume-font-stlye">
            <div>项目描述：</div>
            <div v-html="item.desc"></div>
          </div>
          <div class="hk-resume-font-stlye" v-if="item.duty !=='' ">项目职责：{{item.duty}}</div>
          <div class="hk-resume-school-time fr">
            <span class="hk-resume-school-time-bar">{{item.begin_dt}}</span>
            <div class="hk-resume-shool-btn">
              <el-button type="text" @click="onEdit(item)">编辑</el-button>
              <el-button type="text" class="text-user-red" :class="projectList.length > 1 ? '' : 'last-del'" @click="onDel(item.id)">删除</el-button>
            </div>
          </div>
      </div>
    <!-- 项目经历弹框 -->
    <el-dialog title="添加项目经历" :visible.sync="dialogFormVisible"  @close="onClose">
      <el-form :model="form" :rules="rules" ref="form" id="myform">
        <el-form-item label="项目名称:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目城市:" :label-width="formLabelWidth" prop="company">
          <el-cascader
            ref="myCascader"
            v-model="city"
            placeholder="选择地区"
            :options="areaData"
            @change="onHandleChange"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="项目时间段:" :label-width="formLabelWidth" prop="begin_dt">
          <el-date-picker
          v-model="form.begin_dt"
          type="month"
          placeholder="选择项目开始"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
          :picker-options="pickerOptions">
        </el-date-picker>
        </el-form-item>
        <el-form-item prop="end_dt" :label-width="formLabelWidth">
          <el-date-picker
          v-model="form.end_dt"
          type="month"
          placeholder="选择项目结束时间"
          format="yyyy 年 MM 月"
          value-format="yyyy-MM"
          :picker-options="pickerOptions1">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth" prop="desc">
          <quill-editor
            v-model="form.desc"
            ref="myDescEditor"
            class="quill-editor"
            >
          </quill-editor>
        </el-form-item>
        <el-form-item label="职责:" :label-width="formLabelWidth" prop="duty">
          <el-input v-model="form.duty" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth" prop="until_now">
          <el-radio v-model="form.until_now" label="0">不是</el-radio>
          <el-radio v-model="form.until_now" label="1">至今</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="onPreserve('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {addUserResumeProject, getUserResumeProject, delUserResumeProject} from '@/api/recruit'
export default {
  inject: ['reload'],
  props: {
    projectList: Array
  },
  components: {
    quillEditor
  },
  data () {
    return {
      areaData: provinceAndCityData,
      // 项目经历
      dialogFormVisible: false,
      editorOption: {
      },
      form: {
        // 职位ID 0=新增，大于0编辑
        id: 0,
        // 职位名称
        name: '',
        // 城市编码
        company: '',
        begin_dt: '',
        // 结束时间
        end_dt: '',
        // 0不是，1=至今
        until_now: '',
        // 描述
        desc: '',
        // 职责
        duty: ''
      },
      area1_code: '',
      area1_name: '',
      area2_code: '',
      area2_name: '',
      area3_code: '',
      area3_name: '',
      formLabelWidth: '120px',
      city: [],
      resume_id:null,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now()-8.64e7
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          var time1 = new Date(this.form.begin_dt).getTime();
          var endTime = time.getTime() < time1 || time.getTime() > Date.now()-8.64e7
          return endTime;
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入项目描述', trigger: 'blur' }
        ],
        duty: [
          { required: true, message: '请输入项目职责', trigger: 'blur' }
        ],
        begin_dt: [
          { required: true, message: '请输入项目开始时间', trigger: 'blur' }
        ],
        end_dt: [
          { required: true, message: '请输入项目结束时间', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if(this.$route.query.resume_id){
      this.resume_id = parseInt(this.$route.query.resume_id)
    }
  },
  mounted () {
    // this.$emit('resumeproject', this.projectList)
  },
  methods: {
    onHandleChange (val) {
      this.$set(this, 'area1_code', this.city[0])
      this.$set(this.form, 'company', this.city[1])
      // this.$set(this, 'area3_code', this.form.region[2])
      this.$set(this, 'area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
      this.$set(this, 'area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
      // this.$set(this, 'area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
      // console.log('地区', this.area2_name)
    },
    add () {
      let that = this
      var parameter = {
        id: that.form.id,
        name: that.form.name,
        company: that.form.company,
        begin_dt: that.form.begin_dt,
        end_dt: that.form.end_dt,
        until_now: that.form.until_now,
        desc: that.form.desc,
        duty: that.form.duty,
        resume_id: that.resume_id
      }
      // console.log('参数', parameter)
      addUserResumeProject(parameter).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            offset: 60,
            duration: 3000
          })
          this.dialogFormVisible = false
          this.getProjectList()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        }
        // this.reload()
      })
    },
    getProjectList () {
      getUserResumeProject().then(res => {
        // console.log('获取数据', res)
        // this.$set(this, 'projectList', res.data)
        this.toggleContent(res.data)
      })
    },
    toggleContent(event) {
      this.$emit('project', event);
    },
    del (id) {
      // let that = this
      delUserResumeProject(id).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            offset: 60,
            duration: 3000
          })
          this.dialogFormVisible = false
          this.getProjectList()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            showClose: true,
            offset: 60,
            duration: 3000
          })
        }
        // this.reload()
      })
    },
    onAdd () {
      this.city = []
      this.dialogFormVisible = true
      this.form.id = 0
      if ([this.form].length > 0) {
        document.getElementById('myform').reset()
        // this.$refs.form.resetFields()
        this.form.desc = ''
        this.form.duty = ''
        this.form.until_now = ''
      }
    },
    onEdit (e) {
      this.city = []
      this.dialogFormVisible = true
      // console.log('编辑', JSON.stringify(e))
      let code1 = parseInt(parseInt(e.company) / 10000) * 10000
      let code2 = e.company
      this.city.push(code1.toString())
      this.city.push(code2)
      // console.log('编辑', JSON.stringify(this.city))
      this.form = e
      this.form.until_now = e.until_now.toString()
    },
    onDel (e) {
      let arrayLength = this.projectList.length
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
    // 确定保存事件
    onPreserve (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.add()
        }
      })
    },
    onClose () {
      this.getProjectList()
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  }
}
</script>

<style lang="less" >
 @import './index.less';
</style>
