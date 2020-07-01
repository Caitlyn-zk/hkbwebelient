<template>
  <div class="hk-details-list-title margin-t-10 clearfix">
    <div class="clearfix">
      <div class="fr hk-resume-main">
        <el-button round @click="onEdit(jobWantState)">编辑</el-button>
      </div>
      <span class="hk-person-title-bar">求职状态</span>
      <div class="hk-resume-cont-jw" v-if="JSON.stringify(jobWantState) !=='{}'">
        <span>{{  jobWantState.jobwant_state | onState(that)}} / {{ jobWantState.in_time | onInTime(that)}}</span>
      </div>
    </div>
    <el-dialog title="添加求职状态" :visible.sync="dialogFormVisible" @close="onClose">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="求职状态：" :label-width="formLabelWidth" prop="state">
          <el-select v-model="form.state_bar" placeholder="请选择求职状态"  class="min-salary" clearable style="width:100%;">
              <el-option v-for="(item,index) in stateData" :key="index" :label="item.label" :value="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到岗时间：" :label-width="formLabelWidth" prop="in_time">
         <el-select v-model="form.in_time_bar" placeholder="请选择到岗时间"  class="min-salary" clearable style="width:100%;">
              <el-option v-for="(item,index) in inTime" :key="index" :label="item.label" :value="item.value">{{item.label}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="onPreserve('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addUserJwStateAu,editUserResume} from '@/api/recruit'
import utils from '@/utils/index.js'
import {workType,inTime} from "@/config/constant"
export default {
  inject: ['reload'],
  filters: {
    onState (value, that) {
      var obj = utils.findObj(that.stateData, value)
      return obj.label
    },
    onInTime (value, that) {
      var obj = utils.findObj(that.inTime, value)
      return obj.label
    }
  },
  props: {
    jobWantState: {}
  },
  data () {
    return {
      // 求职意向弹框
      dialogFormVisible: false,
      that: this,
      stateData: [
        {
          value: 10,
          label: '正在找工作'
        },
        {
          value: 20,
          label: '观望中'
        },
        {
          value: 30,
          label: '不想找工作'
        }
      ],
      lss: {},
      inTime:inTime,
      rules: {
        in_time_bar: [
          { required: true, message: '请选择求职状态', trigger: 'change' }
        ],
        in_time_bar: [
          { required: true, message: '请选择到岗时间', trigger: 'change' }
        ]
      },
      form: {
        // 求职状态，1=随时到岗，2=月内到岗，3=考虑机会，4=暂不考虑
        state_bar: '',
        // 到岗时间,0=未知，1=随时，2=2周以内，3=2周-一个月，4=1-3个月，5=三个月以上
        in_time_bar: ''
      },
      formData: {
        state: '积极找工作',
        in_time: ''
      },
      formLabelWidth: '120px',
      editData:[]
    }
  },
  created () {
    // console.log('测试aasssssss', JSON.stringify(this.lss) === '{}')
  },
  methods: {
    // // 添加
    // add () {
    //   let that = this
    //   var parameter = {
    //     state: that.form.state_bar,
    //     in_time: that.form.in_time_bar
    //   }
    //   addUserJwStateAu(parameter).then(res => {
    //     if (res.status === 200) {
    //       this.$message({
    //         message: res.msg,
    //         type: 'success',
    //         showClose: true,
    //         duration: 3000
    //       })
    //       this.dialogFormVisible = false
    //       this.$set(this, 'jobWantState', parameter)
    //     } else {
    //       this.$message({
    //         message: res.msg,
    //         type: 'error',
    //         showClose: true,
    //         duration: 3000
    //       })
    //     }
    //   })
    // },
    editUserResume(){
      let that = this
       console.log('上传参数',JSON.stringify(that.editData))
      var data = {
        resume_id: that.editData.resume_id,
        resume_name: that.editData.resume_name,
        privacy_state: that.editData.privacy_state,
        in_time: that.form.in_time_bar,
        jobwant_state: that.form.state_bar,
        work_type: that.editData.work_type,
        min_salary: that.editData.min_salary,
        max_salary: that.editData.max_salary,
        area1_code: that.editData.area1_code,
        area1_name: that.editData.area1_name,
        area2_code: that.editData.area2_code,
        area2_name: that.editData.area2_name,
        area3_code: that.editData.area3_code,
        area3_name: that.editData.area3_name,
        post_cate: that.editData.post_cate,
        post_cate_name: that.editData.post_cate_name,
      }
      editUserResume(data).then(res=>{
        if (res.status==200) {
          that.dialogFormVisible = false
          that.reload()
        }
      })
    },
    onClose () {
      // this.form = this.formData
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    onPreserve (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.editUserResume()
        }
      })
    },
    onEdit (e) {
      console.log("求职状态",JSON.stringify(e))
      // console.log(this.jobWantState)
      this.$set(this, 'dialogFormVisible', true)
      this.form.state_bar = e.jobwant_state
      this.form.in_time_bar = e.in_time
      this.editData = e
    }
  }
}
</script>

<style lang="less">
 @import './index.less';
</style>
