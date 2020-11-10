<template>
    <div class="addproject" v-loading="loading">
      <div class="content hk-addproject-bar">
        <div class="hk-addproject-title-mbar">
          项目中心/{{proid == 0 ? '发布项目': '编辑项目'}}
        </div>
        <p class="hk-addproject-tips">温馨提示：平台的核心理念，让水与环境行业从业者资源共享，互助交流，打破行业从业者信息孤岛。所以禁止发布无关的项目</p>
        <p class="hk-addproject-warning">
          <i class="el-icon-warning-outline"></i>
          <span>未认证的企业发布兼职信息需要经过2个小时的信息审核时间（9：30-18：00），才能发布到平台，认证的企业由绿色通道快速上架</span>
        </p>
        <div class="hk-addproject-content">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
            :label-position="labelPosition"
            label-width="140px" class="demo-ruleForm">
            <div class="hk-add-cont-title clearfix margin-b-20">
              <div class="fl hk-cont-serialnumber margin-r-8">1</div>
              <span class="hk-add-cont-info">基本信息</span>
            </div>
            <el-form-item label="项目类别" prop="project_cate">
              <el-cascader
                ref="myprojeccader"
                :options="from_code_tree"
                :props="from_code_tree_data"
                v-model="ruleForm.project_cate" placeholder="咨询" @change="onGetCateData" >
              </el-cascader>
            </el-form-item>
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="ruleForm.name" class="hk-content-input-bar"></el-input>
            </el-form-item>
            <el-form-item class="hk-content-towitem">
              <el-col :span="8">
                <el-form-item label="资金来源" prop="fund_from">
                  <el-select v-model="ruleForm.fund_from" placeholder="请选择资金来源" clearable>
                    <el-option
                        v-for="item in fund_froms"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资金规模" prop="fund_rang">
                <el-select v-model="ruleForm.fund_rang" placeholder="请选择资金规模" clearable>
                  <el-option
                      v-for="item in fund_rang"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="参与方式" prop="in_way">
              <el-select v-model="ruleForm.in_way" placeholder="请选择参与方式" clearable >
                <el-option
                    v-for="item in in_way"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="is_online">
              <el-select v-model="ruleForm.is_online" placeholder="请选择状态">
                <el-option
                    v-for="item in is_online"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="hk-content-towitem">
              <el-col :span="8">
                <el-form-item label="项目上线时间"  >
                  <el-date-picker
                  v-model="ruleForm.online_time"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width: 141px;"
                  placeholder="选择开始日期"
                  :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="项目截至时间" >
                    <el-date-picker
                    v-model="ruleForm.offline_time"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width: 141px;"
                    placeholder="选择结束日期"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <div class="hk-add-cont-title clearfix margin-b-20">
              <div class="fl hk-cont-serialnumber margin-r-8">2</div>
              <span class="hk-add-cont-info">详细说明</span>
            </div>
            <el-form-item label="项目所在地" prop="selectedOptions">
              <el-cascader
                ref="myCascader"
                class="hk-addcont-address"
                :options="optionsaddress"
                v-model="ruleForm.selectedOptions"
                @change="onGetCityData"
                :separator="' '"
                clearable
                >
              </el-cascader>
            </el-form-item>
            <el-form-item label="联系人姓名" placeholder="请输入姓名" prop="link_man" >
              <el-input v-model="ruleForm.link_man" class="hk-content-input-bar"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="link_tel" placeholder="请输入电话" >
              <el-input v-model="ruleForm.link_tel" class="hk-content-input-bar"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="mail" placeholder="请输入电子邮件" >
              <el-input v-model="ruleForm.mail" class="hk-content-input-bar"></el-input>
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
                  :options="detailData"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
              </quill-editor>
            </el-form-item>
            <div class="hk-textarec-cheadbox margin-l-25 padding-t-10">
              <el-checkbox v-model="checked">我已阅读360行度环保协议</el-checkbox>
              <span @click="onAgreement">【360行度环保协议企业协议】</span>
            </div>
            <el-form-item class="hk-addpaject-btn margin-l-25 margin-t-48 text-center">
              <el-button class="" round @click="onReleaseProject('ruleForm')">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-dialog :visible.sync="examplesPopup" width="1200px" :before-close="beforeClose" title="示例">
          <div v-html="ruleForm.detail"></div>
      </el-dialog>
      <!-- <el-dialog :visible.sync="agreementPopup" width="1200px" :before-close="beforeClose" title="协议">
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
import { addReleaseProjectData, getProjectCateTree, getUserProjectdetail } from '@/api/project'
export default {
  data () {
    // 电话验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    return {
      loading: false,
      labelPosition: 'right',
      examplesPopup: false,
      activeName: 'first',
      proid: 0,
      from_code_tree: [],
      cate_id: '',
      fund_froms: [{
        value: 0,
        label: '不公开'
      }, {
        value: 1,
        label: '自筹'
      }, {
        value: 5,
        label: '专项'
      }],
      fund_rang: [{
        value: 0,
        label: '不公开'
      }, {
        value: 10,
        label: '5万以下'
      }, {
        value: 20,
        label: '5-10万'
      }, {
        value: 30,
        label: '10-20万'
      }, {
        value: 40,
        label: '20-50万'
      }, {
        value: 50,
        label: '50-100万'
      }, {
        value: 60,
        label: '100-500万'
      }, {
        value: 70,
        label: '500-1000万'
      }, {
        value: 80,
        label: '1000万以上'
      }],
      in_way: [{
        value: 0,
        label: '不限'
      }, {
        value: 1,
        label: '投标'
      }, {
        value: 2,
        label: '竞价'
      }],
      is_online: [{
        value: 0,
        label: '不上架'
      }, {
        value: 1,
        label: '上架'
      }],
      ruleForm: {
        fund_rang: '',
        name: '',
        cate_id: '',
        fund_from: '',
        in_way: '',
        is_online: '',
        address: '',
        online_time: '',
        offline_time: '',
        link_man: '',
        link_tel: '',
        mail: '',
        project_cate: '',
        selectedOptions: [], // 存放地址默认值
        detail: ''
      },
      checked: true,
      agreementPopup: false,
      detailData: {
        theme: 'snow'
      },
      province: {
        code: 11,
        name: '北京'
      },
      optionsaddress: regionData, // 存放城市数据
      // 时间选择
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.ruleForm.offline_time !== '') {
            // return time.getTime() > Date.now()
          } else {
            // return time.getTime() > Date.now()
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          // console.log(this.ruleForm.online_time)
          var time1 = new Date(this.ruleForm.online_time).getTime()
          // console.log('时间', time.getTime() < this.ruleForm.online_time)
          return time.getTime() < time1
        }
      },
      area1_code: '',
      area1_name: '',
      area2_code: '',
      area2_name: '',
      area3_code: '',
      area3_name: '',
      from_code_tree_data: {
        value: 'id',
        label: 'cate_name',
        children: 'children'
      },
      type: 0,
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        link_man: [
          { required: true, message: '名字不能为空', trigger: 'blur' }
        ],
        link_tel: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
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
    // setTimeout(this.loading = false, 3000)
    if(this.$route.query.type){
      this.type = this.$route.query.type
    }
    this.onGetProjectcate()
    this.proid = this.$route.query.proid
    if (this.proid > 0) {
      this.onUserProjectDetailData()
    }
    this.loading = false
  },
  watch: {
    $route: {
      handler (val, oldval) {
        // console.log(val)
        // this.onRouterPathChanged(val, oldval)
      }
    }
  },
  methods: {
    onHandleClick (tab, event) {
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
    onGetCityData (val) {
      // console.log('城市选择',val)
      // console.log('选择' + val, this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
      // console.log(this.ruleForm.selectedOptions)
      // console.log(this.ruleForm.selectedOptions[0], this.ruleForm.selectedOptions[1], this.ruleForm.selectedOptions[2])
      this.$set(this, 'area1_code',val ? this.ruleForm.selectedOptions[0] : nill)
      this.$set(this, 'area2_code',val ? this.ruleForm.selectedOptions[1] : nill)
      this.$set(this, 'area3_code',val ? this.ruleForm.selectedOptions[2] : nill)
      this.$set(this, 'area1_name',val ? this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0] : '')
      this.$set(this, 'area2_name',val ? this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1] : '')
      this.$set(this, 'area3_name',val ? this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2] : '')
    },
    // 发布项目请求
    onReleaseProject (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          setTimeout(this.loading = true, 3000)
          addReleaseProjectData(
            {
              proid:this.type !== 0 ? 0 : this.proid,
              org_id: this.org_id,
              cate_id: this.ruleForm.cate_id,
              name: this.ruleForm.name,
              fund_rang: this.ruleForm.fund_rang  == '' ? null : this.ruleForm.fund_rang,
              fund_from: this.ruleForm.fund_from  == '' ? null : this.ruleForm.fund_from,
              in_way: this.ruleForm.in_way == '' ? null : this.ruleForm.in_way,
              is_online: this.ruleForm.is_online == '' ? null : this.ruleForm.is_online,
              online_time: this.ruleForm.online_time,
              offline_time: this.ruleForm.offline_time,
              link_man: this.ruleForm.link_man,
              link_tel: this.ruleForm.link_tel,
              mail: this.ruleForm.mail,
              detail: this.ruleForm.detail,
              area1_code: this.area1_code,
              area1_name: this.area1_name,
              area2_code: this.area2_code,
              area2_name: this.area2_name,
              area3_code: this.area3_code,
              area3_name: this.area3_name
            }
          ).then(res => {
            if (res.status === 200) {
              // console.log('发布项目成功')
              this.$message({
                message: res.msg,
                type: 'success',
                showClose: true,
                duration: 3000
              })
              Object.assign(this.$data, this.$options.data())
              this.$router.push({path: '/user/org/project'})
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
              message: res.message,
              type: 'error',
              showClose: true,
              duration: 3000
            })
          })
          setTimeout(this.loading = false, 3000)
        } else {
          this.$message.error('请完善表单相关信息！')
          return false
        }
      })
    },
    onGetProjectcate () {
      getProjectCateTree().then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.$set(this, 'from_code_tree', res.data)
          // console.log(this.from_code_tree)
        }
      })
    },
    // 点击二级菜单
    onGetCateData (val) {
      // console.log(this.$set(this, 'cate_id', this.$refs.myprojeccader))
      this.$set(this, 'ruleForm.cate_id', this.$refs.myprojeccader.getCheckedNodes()[0].data.id)
      this.ruleForm.cate_id = this.$refs.myprojeccader.getCheckedNodes()[0].data.id
      // console.log(this.ruleForm.cate_id)
      // console.log(this.$set(this, 'cate_id', this.$refs.myprojeccader))
    },
    onUserProjectDetailData () {
      getUserProjectdetail(this.proid).then(res => {
        // console.log('项目数据渲染',JSON.stringify(res.data))
        // let data = res.data
        // console.log(res.data.proid)
        // console.log(res.data)
        this.ruleForm = res.data
        // console.log(this.ruleForm)
        this.ruleForm.project_cate = res.data.cate_id
        this.ruleForm.selectedOptions = [res.data.area1_code, res.data.area2_code, res.data.area3_code]
        this.area1_code = res.data.area1_code,
        this.area1_name = res.data.area1_name,
        this.area2_code = res.data.area2_code,
        this.area2_name = res.data.area2_name,
        this.area3_code = res.data.area3_code,
        this.area3_name = res.data.area3_name
        // console.log(this.ruleForm.selectedOptions)
      })
    },
    onViewExamples () {
      this.examplesPopup = true
    },
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

@import './release.less';
</style>
