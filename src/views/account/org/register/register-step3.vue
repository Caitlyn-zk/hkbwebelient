<template>
  <div class="step-three">
    <el-form :model="stepFrome" label-position="left" status-icon :rules="rules" ref="stepFrome" label-width="230px" class="demo-ruleForm">
      <el-form-item label="选择你最感兴趣的5个话题" prop="conversation">
          <div class="tiling">
            <div v-if="conversationData.length > 0 && conversationData !== undefined" >
                <el-tag
                v-for="(item,index) in conversationData"
                :key="index"
                :closable="true"
                :disable-transitions="false"
                @close="handleClose(index)"
                >
                {{item}}
              </el-tag>
              <i class="el-icon-arrow-down select-icon" size="16" @click="onConversationSelect"></i>
             </div>
            <div v-else class="tips-text" @click="onConversationSelect">请选择<i class="el-icon-arrow-down select-icon" size="16" ></i></div>
          </div>
      </el-form-item>
      <el-form-item label="选择你最感兴趣的5个项目" prop="project">
        <div class="tiling">
            <div v-if="projectData.length > 0 && projectData !== undefined" >
                <el-tag
                v-for="(item,index) in projectData"
                :key="index"
                :closable="true"
                :disable-transitions="false"
                @close="projectClose(index)">
                {{item}}
              </el-tag>
              <i class="el-icon-arrow-down select-icon" size="16" @click="onProjectSelect"></i>
             </div>
            <div v-else class="tips-text" @click="onProjectSelect">请选择<i class="el-icon-arrow-down select-icon" size="16" ></i></div>
          </div>
      </el-form-item>
      <el-form-item label="选择你最关注的5类人才" prop="personnel">
        <div class="tiling">
           <div v-if="personnelData.length > 0 && personnelData !== undefined  " >
            <el-tag
              v-for="(item,index) in personnelData"
              :key="index"
              :closable="true"
              :disable-transitions="false"
              @close="personClose(index)"
            >
            {{item}}
          </el-tag>
          <i class="el-icon-arrow-down select-icon" size="16" @click="onPersonnelSelect"></i>
          </div>
          <div v-else class="tips-text" @click="onPersonnelSelect">请选择<i class="el-icon-arrow-down select-icon" size="16" ></i></div>
        </div>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="onPreviousStep">上一步</el-button>
        <el-button type="primary" @click="onNextStep('stepFrome')" >完成</el-button>
      </el-form-item>
    </el-form>
    <cmpElasticFrame :elasticFrame="personnel"   @popup="acceptPersonnelData" @close="onClosePersonnelPopup" @cancel="onCancelPersonnelPopup"></cmpElasticFrame>
    <!-- <el-button type="text" @click="onEject">技能标签</el-button> -->
    <Skill :skill="conversation" @confirm="acceptConversationData" @close="onCloseConversationPopup" @cancel="onCancelConversationPopup"></Skill>
    <cmpElasticFrame :elasticFrame="project" @popup="acceptProjectData" @close="onCloseProjectPopup" @cancel="onCancelProjectPopup"></cmpElasticFrame>
  </div>
</template>
   
<script> 
import { authUserOrgNeedAu } from '@/api/user'
// import cmpElasticFrame from '@/components/popup/popCate'
import cmpElasticFrame from '@/components/popup/popMutilCate'
import { getPostCateTree } from '@/api/recruit'
import {getProjectCateTree} from '@/api/project'
import Skill from '@/components/popup/skill'
export default {
  inject: ['reload'],
  data(){
    var validateConversation = (rule, value, callback) => {
        if (value.length < 5 ) {
          callback(new Error('请选择话题，并且最多选择5个'));
        } else {
          callback();
        }
    };
    var validateProject = (rule, value, callback) => {
        if (value.length < 5 ) {
          callback(new Error('请选择项目，并且最多选择5个'));
        } else {
          callback();
        }
    };
    var validatePersonnel = (rule, value, callback) => {
        if (value.length < 5 ) {
          callback(new Error('请选择人才，并且最多选择5个'));
        } else {
          callback();
        }
    };
    return {
      postList:[],
      stepFrome:{
        id: 0,
        conversation:[],
        personnel:[],
        need_topic: '',
	      need_project: '',
	      need_post: ''
      },
      conversation:{
        eject:false,
        number:5,
        data:[]
      },
      project:{
        eject:false,
        number:5,
        data:[],
        list:[]
      },
      personnel:{
        eject:false,
        number:5,
        data:[],
        list:[]
      },
      conversationData:[],
      projectData:[],
      personnelData:[],
      // 控制弹框是否显示
      // elasticFrame: false,
      rules: {
        conversation: [
          { required: true, validator: validateConversation, trigger: 'change' }
        ],
        project: [
          { required: true, validator: validateProject, trigger: 'change' }
        ],
        personnel: [
          { required: true,validator: validatePersonnel, trigger: 'change' }
        ],
      }
    }
  },
  components: {
    cmpElasticFrame,
    Skill
  },
  created() {
    this.postCateTree()
    this.projectCateTree()
  },
  methods: {
    // 上一步
    onPreviousStep() {
      this.$router.push({
        path: '/account/org/register/companyinfo',
        query: {
          active: 2
        }
      })
      this.reload()
    },
    onNextStep (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("验证成功")
          this.add()
        } else {
          // console.log('error submit!!')
          return false;
        }
      })
    },
    add(){
      let that = this
      var parameter = {
        org_reg_state: 30,
        id: that.stepFrome.id,
        need_topic: that.stepFrome.need_topic,
        need_project: that.stepFrome.need_project,
        need_post: that.stepFrome.need_post
      }
      authUserOrgNeedAu(parameter).then(res =>{
        // console.log('新增企业个人信息',JSON.stringify(res))
        if(res.status == 200) {
          // cookie.remove(BACK_URL)
          this.$router.push({ path: "/user/org/index" })
        }
      })
    },
    onSelectConversation(val){
      let data = val
      // console.log('话题多选',data.join())
      // 数组转换为字符串
      this.$set(this.stepFrome,'college_topic',data.join())
    },
    onSelectProject(val){
      let data = val
      // console.log('话题多选',data.join())
      // 数组转换为字符串
      this.$set(this.stepFrome,'project_cate',data.join())
    },
    onConversationSelect(e){
      this.conversation.eject = true
    },
    onProjectSelect(e){
      this.project.eject = true
    },
    onPersonnelSelect(e){
      this.personnel.eject = true
    },
    onCancelPersonnelPopup(e){
      // console.log('取消',e)
      this.personnel.eject = false
    },
    // 
    acceptConversationData(data,e){
      // console.log('获取弹窗数据',JSON.stringify(data),e)
      this.$set(this,'conversationData',data)
      let need_topic = []
      // for (let index = 0; index < data.length; index++) {
      //   need_topic.push(data[index].value)
      // }
      this.$set(this.stepFrome,'need_topic',data.join())
      this.$set(this.stepFrome,'conversation',data)
      this.$set(this.conversation,'data',data)
      this.conversation.eject = false
    },
    // 
    acceptProjectData(isframe, id, post_name,data){
      this.$set(this,'projectData',data)
      // console.log('项目选择',data)
      this.$set(this.stepFrome,'need_project',data.join())
      this.$set(this.stepFrome,'project',data)
      this.$set(this.project,'data',data)
      this.$set(this.project, 'eject', isframe)
    },
    // 弹框
    acceptPersonnelData (isframe, id, post_name,data) {
      this.$set(this.stepFrome,'need_post',data.join())

      this.$set(this.stepFrome, 'personnel', data)
      this.$set(this.personnel, 'eject', isframe)
      this.$set(this,'personnelData',data)
    },
    onCloseConversationPopup(e){
      // console.log('关闭弹窗',e)
      this.conversation.eject = e
    },
    onCloseProjectPopup(e){
      // console.log('关闭弹窗',e)
      this.project.eject = false
    },
    onClosePersonnelPopup(e){
      this.personnel.eject = false
    },

    onCancelProjectPopup(){
      this.project.eject = false
    },
    // 取消关闭话题事件
    onCancelConversationPopup(){
      this.conversation.eject = false
    },
    handleClose(e){
      // console.log('删除')
      this.conversationData.splice(e, 1);
    },
    projectClose(e) {
      this.projectData.splice(e, 1);
    },
    personClose(e) {
      this.personnelData.splice(e, 1)
    },
    async postCateTree () {
      let that = this
      await getPostCateTree().then(res => {
        that.$set(that.personnel,'list',res.data)
        // that.personnel.postList = res.data
        // console.log('111111',that.personnel)
      })
      // console.log('111111',that.postList)
    },
    projectCateTree(){
      let that = this
      getProjectCateTree().then(res => {
        that.$set(that.project,'list',res.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>

@import './register-step3.less';
</style>
