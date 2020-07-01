<template>
  <div class="hk-details-list-title clearfix">
    <div class="clearfix">
      <div class="hk-resume-main">
        <el-button round @click="onUserDialog()">添加</el-button>
      </div>
      <span class="hk-person-title-bar">工作经历</span>
      <div v-for="(prop,index) in workList" :key="prop.id">
        <div class="hk-resume-company-name clearfix">
          <span class>{{prop.company}}</span>
          <span class="hk-resume-post-name">{{prop.post_name}}</span>
          <div class="hk-resume-school-time" @mouseenter="onMouseEnter(index)">
            <span class="hk-resume-school-time-bar">{{prop.begin_dt}}</span>
            <div class="hk-resume-shool-btn">
              <el-button type="text" @click="onEditWf(prop.id, index)">编辑</el-button>
              <el-button type="text" class="text-user-red" :class="[isDel == true ? '' : 'last-del']"  @click="onDelWf(prop.id, index)">删除</el-button>
            </div>
          </div>
        </div>
        <!-- 职位类别 -->
        <div class="hk-resume-skill">
          <div class="padding-tb-25 hk-el-button-bar">
            <el-button round v-for="(item, index)  in prop.skill_tag.split(',')" :key="index">{{item}}</el-button>
          </div>
          <div class="">
            <div class="hk-ql-editor-font ql-editor" v-html="prop.desc"></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="id == 0 ? '新增工作经历' : '编辑工作经历'" :visible.sync="dialogFormVisible" @close="onClose">
      <el-form :model="wfForm" id="myform" :rules="rules" ref="wfForm" >
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="company">
          <el-input v-model="wfForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位名称" :label-width="formLabelWidth" prop="post_name">
          <el-input v-model="wfForm.post_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="技巧" :label-width="formLabelWidth" >
          <!-- <el-input v-model="wfForm.skill_tag" autocomplete="off" placeholder="请填写你会的技能"></el-input> -->
          <div class="skill-list">
            <div v-if="skillData.length > 0 && skillData !== undefined" >
                <el-tag
                v-for="(item,index) in skillData"
                :key="index"
                class="skill-tag"
                :closable="true"
                :disable-transitions="false"
                @close="handleClose(index)"
                >
                {{item}}
              </el-tag>
              <i class="el-icon-arrow-down select-icon" size="16" @click="onSkillSelect"></i>
             </div>
            <div v-else class="tips-text" @click="onSkillSelect">请选择<i class="el-icon-arrow-down select-icon" size="16" ></i></div>
          </div>
        </el-form-item>
        <el-form-item label="工作时间" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-form-item prop="begin_dt">
              <el-date-picker type="month" placeholder="选择开始工作日期"
                v-model="wfForm.begin_dt"
                value-format="yyyy-MM"
                style="width: 100%;"
                :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">-</el-col>
          <el-col :span="7">
            <el-form-item prop="end_dt">
              <!-- value-format="yyyy-MM" -->
              <el-date-picker type="month" placeholder="选择结束工作日期"
                v-model="wfForm.end_dt"
                value-format="yyyy-MM"
                style="width: 100%;"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="月薪" :label-width="formLabelWidth" prop="salary">
          <el-select v-model="wfForm.salary" placeholder="请选择活动区域">
            <el-option
                v-for="item in salarylist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主要任务介绍" :label-width="formLabelWidth" prop="desc">
          <quill-editor
              v-model="wfForm.desc"
              ref="myQuillEditor"
              :options="detailData">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="onUserResumeWf('wfForm')">确 定</el-button>
      </div>
      <Skill :skill="skill" @confirm="onSelectSkill" @close="onCloseSkill" @cancel="onCancel"></Skill>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {salary} from '@/config/constant'
import {addUserResumeWf, getUserResumeWfList, delUserResumeWf} from '@/api/recruit'
import Skill from 'components/popup/skill'
export default {
  props: {
    workList: Array
  },
  inject: ['reload'],
  data () {
    return {
      // 教育
      dialogFormVisible: false,
      // id等0 表示新增 大于0表示编辑
      id: 0,
      skillData: [],
      skill:{
        eject:false,
        number:5,
        data:[],
        type:0
      },
      wfForm: {
        id: 0,
        // 公司名称
        company: '',
        // 职位名称
        post_name: '',
        // 技巧
        skill_tag: '',
        // 入职时间
        begin_dt: null,
        // 离职时间
        end_dt: null,
        // 薪水
        salary: null,
        // 详情描述
        desc: ''
      },
      resume_id:null,
      workForList: [],
      skill_tag_list: [],
      detailData: {
        theme: 'snow'
      },
      editoroption: {
      },
      salarylist: salary,
      // 判断是否为最后一条数据
      isDel: true,
      formLabelWidth: '150px',
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now()-8.64e7
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          var time1 = new Date(this.wfForm.begin_dt).getTime();
          var endTime = time.getTime() < time1 || time.getTime() > Date.now()-8.64e7
          return endTime;
        }
      },
      rules: {
        company: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        post_name: [
          { required: true, message: '请输入公司职位', trigger: 'change' }
        ],
        salary: [
          { required: true, message: '请输入公司担任职位', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '主要负责', trigger: 'blur' }
        ],
        begin_dt: [
          { required: true, message: '请输入入职时间', trigger: 'blur' }
        ],
        end_dt: [
          { required: true, message: '请输入离职时间', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if(this.$route.query.resume_id){
      this.resume_id = parseInt(this.$route.query.resume_id)
    }
    // this.onWorkFor()
  },
  components: {
    quillEditor,
    Skill
  },
  methods: {
    // 渲染数据
    onWorkFor () {
      this.workForList = this.workList
      console.log(this.workForList)
      // this.$set(this.arrData,rowIndex,newRowData)
      this.workForList.forEach(item => {
        console.log(item.skill_tag)
        item.skill_tag = [item.skill_tag.split(',')]
      })
      // this.postTable = arr
    },
    // 添加按钮
    onUserDialog () {
      this.dialogFormVisible = true
      this.$set(this, 'id', 0)
      // console.log([this.wfForm])
      if ([this.wfForm].length > 0) {
        // document.getElementById('myform').reset()
        this.wfForm.desc = ''
      }
    },
    // 鼠标移入时判断列表是否只有一个 如果只有一个，删除标签不显示
    onMouseEnter () {
      // console.log(12)
      let lists = this.workList.length
      if (lists <= 1) {
        this.isDel = false
      } else {
        this.isDel = true
      }
    },
    onUserResumeWf (val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          this.addWf()
        }
      })
    },
    // 添加工作经历
    addWf () {
      let salary = this.wfForm.salary
      salary *= 1
      let data = {
        id: this.id,
        post_name: this.wfForm.post_name,
        company: this.wfForm.company,
        skill_tag: this.wfForm.skill_tag,
        begin_dt: this.wfForm.begin_dt,
        end_dt: this.wfForm.end_dt,
        salary: salary,
        desc: this.wfForm.desc,
        resume_id: this.resume_id
      }
      addUserResumeWf(data).then(res => {
        if (res.status === 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            showClose: true,
            duration: 3000
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            showClose: true,
            duration: 3000
          })
        }
      }).catch(res => {
        this.$message({
          message: res.message,
          type: 'error',
          showClose: true,
          duration: 3000
        })
      })
      this.dialogFormVisible = false
      this.reload()
    },
    // 页面渲染
    getUserWfList () {
      getUserResumeWfList().then(res => {
        this.toggleContent(res.data)
      })
    },
    toggleContent(event) {
      this.$emit('workcontent', event);
    },
    onClose() {
      // console.log('关闭工作经历弹窗')
      // this.wfForm = this.form
      this.getUserWfList()
      this.$nextTick(() => {
        this.$refs.wfForm.clearValidate()
      })
    },
    // 编辑工作经历
    onEditWf (value, index) {
      this.id = value
      this.dialogFormVisible = true
      // console.log(this.workList[index])
      this.$set(this, 'wfForm', this.workList[index])
      console.log("编辑工作经历",JSON.stringify(this.wfForm.skill_tag))
      this.skillData = this.wfForm.skill_tag.split(',')
      this.skill_tag_list = this.workList[index].skill_tag
    },
    // 删除工作经历
    onDelWf (val, index) {
      // console.log(val)
      let arrayLength = this.workList.length
      // console.log(arrayLength)
      // console.log('这里是删除')
      if (arrayLength > 1) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUserResumeWf(val).then(res => {
            if (res.status === 200) {
              this.$message({
                message: res.msg,
                type: 'success',
                showClose: true,
                duration: 3000
              })
            } else {
              this.$message({
                message: res.message,
                type: 'error',
                showClose: true,
                duration: 3000
              })
            }
          }).catch(res => {
            this.$message({
              message: res.message,
              type: 'error',
              showClose: true,
              duration: 3000
            })
          })
          this.reload()
        })
      } else {
        this.isDel = false
      }
    },
    onSelectSkill(data,e){
      this.skill.eject = e
      this.skillData = data
      this.wfForm.skill_tag = data.join(',')
    },
    onCloseSkill(){
      this.skill.eject = false
    },
    onCancel(){
      this.skill.eject = false
    },
    onSkillSelect(){
      this.skill.eject = true
    },
    handleClose(index){
      this.skillData.splice(index,1)
    }
  }
}
</script>

<style lang="less">
 @import './index.less';
.hk-resume-school-time {
  float: right;
  width: 120px;
  height: 36px;
  text-align: center;
  font-size:16px;
  font-family: Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  cursor: pointer;
  .hk-resume-school-time-bar {
    display: block;
  }

  .hk-resume-shool-btn {
    font-family: Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    cursor: pointer;
    width: 100px;
    text-align: center;
    display: none;
  }

  &:hover {
    .hk-resume-school-time-bar {
      display: none;
    }

    .hk-resume-shool-btn {
      display: block;
    }
  }
}
.last-del {
  display: none;
}
// 使用pre超出部分内容换行
pre {
    // font-family: "微软雅黑";
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
