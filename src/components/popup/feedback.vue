<template>
  <div class="">
    <!-- 意见反馈 -->
    <el-dialog :visible.sync="feedback.eject" title="意见反馈" class="hk-feedback" width="490px" append-to-body>
      <div class="padding-b-20">
        <el-form :model="feedbackForm" :rules="rules" ref="feedbackForm" label-width="110px" class="margin-t-26 padding-r-32">
        
          <el-form-item label="意见类型:" prop="opinion_type">
            <el-select v-model="feedbackForm.opinion_type" placeholder="请选择您想反馈的意见类型">
              <el-option label="意见类型1" value="shanghai"></el-option>
              <el-option label="意见类型2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="内容描述:" prop="desc" class="hk-textarea-m">
            <el-input type="textarea" v-model="feedbackForm.desc" :autosize="{ minRows: 5, maxRows: 8}" placeholder="请描述您的问题和意见（必填）"></el-input>
          </el-form-item>

          <el-form-item label="联系方式:" prop="contact">
            <el-input v-model="feedbackForm.contact" placeholder="请填写您的手机号或邮箱（必填）"></el-input>
          </el-form-item>
          
          <el-form-item class="text-r hk-feedback-btn">
            <el-button type="" @click="resetForm('feedbackForm')" class="hk-feedback-cancel">取消</el-button>
            <el-button type="primary" @click="onSubmit('feedbackForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div slot="footer" class="dialog-footer text-r"></div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    feedback: {}
  },
  data() {
    return {
      checkList: [],
      feedbackForm: {
        contact: '',
        opinion_type: '',
        desc: ''
      },
      rules: {
        contact: [
          { required: true, message: '请填写你的联系方式', trigger: 'blur' }
        ],
        opinion_type: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请描述您的问题和意见（必填）', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 弹框传值
    toggleContent (event) {
        this.$emit('popup', event);
    },
    onfeedback (e) {
      this.feedback.eject = false
    },
    // 提交
    onSubmit(feedbackForm) {
      this.$refs[feedbackForm].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.onfeedback()
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
      
    },
    // 取消
    resetForm(feedbackForm) {
      this.$refs[feedbackForm].resetFields();
      this.onfeedback()
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.hk-feedback {
  @{deep}.el-dialog__header {
    border-bottom: 1px solid #eeeeee;
  }
  @{deep}.el-dialog__body {
    padding: 0 !important;
  }
  @{deep}.el-form {
    // padding: 30px 20px;
    .el-select {
      width: 100%;
    }
    .hk-textarea-m {
      .el-textarea {
        .el-textarea__inner {
          outline: none;
	        resize: none;
        }
      }
    }
  }
  .hk-feedback-btn {
    .el-button {
      padding: 12px 26px;
      &.hk-feedback-cancel {
        border-color: #0BD094;
        color: #0BD094;
      }
    }
  }
}


</style>