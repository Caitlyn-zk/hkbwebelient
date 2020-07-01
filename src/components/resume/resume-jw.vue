<template>
  <div class="hk-details-list-title margin-t-10 clearfix">
    <div class="fr hk-resume-main">
      <el-button round @click="onEdit(jwList)">编辑</el-button>
    </div>
      <span class="hk-person-title-bar">求职意向</span>
      <div class="hk-resume-school-name font-16 text-bold clearfix" v-if="JSON.stringify(jwList) !=='{}'">
        <div class="hk-resume-cont-jw">
          <span>{{jwList.post_cate_name}}/</span>
          <span>{{jwList.area2_name}}/</span>
          <!-- <span v-if="jwList.min_salary === ''">{{jwList.min_salary}}</span> -->
          <span>{{jwList.min_salary | onSalary}}-</span>
          <!-- <span v-if="jwList.max_salary == ''">{{jwList.max_salary}}</span> -->
          <span>{{jwList.max_salary | onSalary}}</span>
        </div>
        <!-- <div class="hk-resume-school-time fr">
          <span class="hk-resume-school-time-bar">2017.9.9</span>
          <div class="hk-resume-shool-btn" v-if="selectButton">
            <el-button type="text" @click="onEdit(jwList)">编辑</el-button>
            <el-button type="text" class="text-user-red" :class="jwList.length > 1 ? '' : 'last-del'" @click="onDel(jwList.id)">删除</el-button>
          </div>
        </div> -->
    </div>
    <!--求职意向 弹框 -->
    <!-- <el-button type="text" >打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="添加期望职位" :visible.sync="dialogFormVisible"  @close="onClose">
      <el-form :model="form" :rules="rules" ref="form" id="myform">
      <el-form-item label="期望职位名称：" prop="post_name" label-width="150px">
        <!-- <el-input v-model="form.post_name" placeholder="期望什么职位" ></el-input> -->
        <el-cascader
        ref="myPost"
        :options="postCateTree"
        :props="postData"
        class="other-select"
        v-model="post"
        placeholder="请选择职位"
        :show-all-levels="false"
        @change="onPostSelect"
        style="width:100%;"
        clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="期望薪资范围：" prop="min_salary" label-width="150px" class="salary-select">
        <el-select v-model="form.min_salary" placeholder="最低薪资" @change="onMinSalary" class="min-salary" clearable style="width:49.5%;">
            <el-option v-for="(jwList,index) in salary" :key="index" :label="jwList.label" :value="jwList.value">{{jwList.label}}</el-option>
        </el-select>
        <el-select v-model="form.max_salary" placeholder="最高薪资" class="max-salary" @change="onMaxSalary" clearable style="width:49.5%;">
            <el-option v-for="(jwList,index) in salary" :key="index" :label="jwList.label" :value="jwList.value">{{jwList.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="期望城市：" prop="area2_code" label-width="150px">
        <el-cascader
          ref="myCascader"
          v-model="city"
          placeholder="请选择期望城市"
          :options="areaData"
          style="width:100%;"
          @change="onHandleChange"
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="职位类型：" prop="work_type" label-width="150px">
        <el-select v-model="form.work_type" placeholder="请选择职位类型" clearable style="width:100%;">
          <el-option v-for="(jwList,index) in workTypeData" :key="index" :label="jwList.label" :value="jwList.value">{{jwList.label}}</el-option>
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
import {minEdu, salaryNumber,workType} from '@/config/constant'
// import { regionData } from 'element-china-area-data'
import { regionData } from 'element-china-area-data'
import utils from '@/utils/index.js'
import {addUserResumeJw, delUserResumeJw, getPostCateTree,editUserResume} from '@/api/recruit'
export default {
  inject: ['reload'],
  filters: {
    onSalary (value) {
      var obj = utils.findObj(salaryNumber, value)
      return obj.label
    },
    onWorkType (value) {
      var obj = utils.findObj(workType, value)
      return obj.label
    }
  },
  props: {
    jwList: Object
  },
  data () {
    return {
      // 求职意向弹框
      dialogFormVisible: false,
      salary: salaryNumber,
      that: this,
      form: {
        id: 0,
        post_id: '',
        post_name: '',
        min_salary: null,
        max_salary: null,
        work_type: '',
        area1_code: null,
        area1_name: '',
        area2_code: null,
        area2_name: '',
        area3_code: null,
        area3_name: '',
      },
      post: [],
      city: [],
      area1_code: '',
      area1_name: '',
      area2_code: '',
      area2_name: '',
      area3_code: '',
      area3_name: '',
      arrivalTime: '',
      arrivalTimeData: [{
        id: 10,
        label: '正在找工作'
      },
      {
        id: 20,
        label: '观望中'
      },
      {
        id: 30,
        label: '不想找工作'
      }],
      workTypeData: [
        {
          value: 10,
          label: '全职'
        },
        {
          value: 20,
          label: '兼职'
        },
        {
          value: 30,
          label: '实习'
        }
      ],
      selectButton: true,
      postCateTree: [],
      minEdu: minEdu,
      areaData: regionData,
      rules: {
        post_name: [
          { required: true, message: '请选择期望职位', trigger: 'change' }
        ],
        area2_code: [
          { required: true, message: '请选择期望城市', trigger: 'blur' }
        ],
        min_salary: [
          { required: true, message: '请选择最低薪资', trigger: 'blur' }
        ],
        max_salary: [
          { required: true, message: '请选择最高薪资', trigger: 'blur' }
        ],
        work_type: [
          { required: true, message: '请选择职位类型', trigger: 'blur' }
        ]
      },
      postData: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      formLabelWidth: '120px',
      resume_id:null,
      jobwant_state:null,
      editData:[]
    }
  },
  created () {
    if(this.$route.query.resume_id){
      this.resume_id = parseInt(this.$route.query.resume_id)
    }
    this.getPostClassData()
  },
  methods: {
    getPostClassData () {
      getPostCateTree().then(res => {
        // console.log('职位分类数据', res)
        this.$set(this, 'postCateTree', res.data)
      })
    },
    // 保存上传
    onPreserve (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.editUserResume()
        }
      })
    },
    editUserResume(){
      let that = this
      var data = {
        post_cate: that.form.post_id,
        post_cate_name: that.form.post_name,
        min_salary: that.form.min_salary,
        max_salary: that.form.max_salary,
        work_type: that.form.work_type,
        area1_code: that.form.area1_code,
        area1_name: that.form.area1_name,
        area2_code: that.form.area2_code,
        area2_name: that.form.area2_name,
        area3_code: that.form.area3_code,
        area3_name: that.form.area3_name,
        resume_id: that.resume_id,
        resume_name : that.editData.resume_name,
        jobwant_state: that.editData.jobwant_state,
        privacy_state: that.editData.privacy_state,
        in_time: that.editData.in_time
      }
      console.log('传递参数',JSON.stringify(that.editData))
      editUserResume(data).then(res=>{
        if (res.status==200) {
          this.dialogFormVisible = false
          this.reload()
        }
        console.log("编辑求职意向",JSON.stringify(res))
      })
    },
    onClose () {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    onPostSelect (val) {
      // console.log('点击选择', val)
      this.$set(this.form, 'post_id', val[1])
      this.$set(this.form, 'post_name', this.$refs.myPost.getCheckedNodes()[0].pathLabels[1])
      // console.log('点击选择', this.form.post_id, this.form.post_name)
    },
    // onAdd () {
    //   this.post = []
    //   this.city = []
    //   this.dialogFormVisible = true
      
    //   if ([this.form].length > 0) {
    //     this.form.min_salary = ''
    //     this.form.max_salary = ''
    //     this.form.work_type = ''
    //   }
    // },
    onEdit (e) {
      this.post = []
      this.city = []
      this.dialogFormVisible = true
      // if (e.area2_code !== null) {
      //   let code1 = parseInt(e.area2_code / 10000) * 10000
      //   let code2 = e.area2_code
      //   this.city.push(code1.toString())
      //   this.city.push(code2.toString())
      // }
      this.city = [e.area1_code+'',e.area2_code+'',e.area3_code+'']
      if (e.post_cate !== null) {
        let post1 = parseInt(e.post_cate / 100)
        let post2 = e.post_cate
        this.post.push(post1)
        this.post.push(post2)
      }
      this.form = e
      this.editData = e
      this.form.min_salary = e.min_salary == 0 ? null : e.min_salary
      this.form.max_salary = e.min_salary == 0 ? null : e.max_salary
      this.form.post_name = e.post_cate_name
    },
    // onDel (e) {
    //   let arrayLength = this.jwList.length
    //   // console.log(arrayLength)
    //   if (arrayLength > 1) {
    //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.del(e)
    //     })
    //   }
    // },
    // add () {
    //   let that = this
    //   var parameter = {
    //     id: that.form.id,
    //     post_id: that.form.post_id,
    //     post_name: that.form.post_name,
    //     min_salary: that.form.min_salary,
    //     max_salary: that.form.max_salary,
    //     work_type: that.form.work_type,
    //     area2_code: that.form.area2_code,
    //     area2_name: that.form.area2_name,
    //     resume_id: that.resume_id
    //   }
    //   // console.log('参数', parameter)
    //   addUserResumeJw(parameter).then(res => {
    //     if (res.status === 200) {
    //       this.$message({
    //         message: res.msg,
    //         type: 'success',
    //         showClose: true,
    //         duration: 3000
    //       })
    //       this.dialogFormVisible = false
    //       this.reload()
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
    // del (id) {
    //   delUserResumeJw(id).then(res => {
    //     if (res.status === 200) {
    //       this.$message({
    //         message: res.msg,
    //         type: 'success',
    //         showClose: true,
    //         duration: 3000
    //       })
    //       this.dialogFormVisible = false
    //     } else {
    //       this.$message({
    //         message: res.msg,
    //         type: 'error',
    //         showClose: true,
    //         duration: 3000
    //       })
    //     }
    //     this.reload()
    //   })
    // },
    onHandleChange () {
      this.$set(this.form, 'area1_code', this.city[0])
      this.$set(this.form, 'area2_code', this.city[1])
      this.$set(this.form, 'area3_code', this.city[2])
      this.$set(this.form, 'area1_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
      this.$set(this.form, 'area2_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
      this.$set(this.form, 'area3_name', this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2])
      // console.log('地区', this.area1_name, this.form.area2_name, JSON.stringify(this.city))
    },
    onMaxSalary(val){
      // if(this.form.min_salary > this.form.max_salary){
      //   this.$message({message: '最大薪资不能小于最小薪资',
      //       type: 'error',
      //       showClose: true,
      //       duration: 3000});
      //   this.form.max_salary = null
      // }
    },
    onMinSalary(val){
      // if(this.form.min_salary > this.form.max_salary || this.form.max_salary !== ''){
      //   this.$message({message: '最小薪资不能大于最大薪资',
      //       type: 'error',
      //       showClose: true,
      //       duration: 3000});
      //   this.form.min_salary = null
      // }
    }
  }
}
</script>

<style lang="less">
 @import './index.less';
</style>
