<template>
  <div class="hk-reportPopup">
    <el-dialog :visible.sync="report.eject" title="举报文章" width="543px">
      <div class="hk-report-content">
        <el-radio-group v-model="checkList" >
          <el-radio v-for="(item,index) in rportList" :key="index" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
      <div class="hk-report-textarea">
        <el-input type="textarea" v-model="desc" placeholder="写下举报的详细情况（选填）"></el-input>
      </div>
      <div slot="footer" class="dialog-footer text-r">
        <el-button type="" round @click="onCancel">取 消</el-button>
        <el-button type="" round @click="onReport">举 报</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import utils from "@/utils/index.js";
export default {
  props: {
    report: {}
  },
  data() {
    return {
      checkList: 1,
      rportList: [{
        value: 1,
        label: '广告及垃圾信息'
      }, {
        value: 2,
        label: '抄袭或未授权转载'
      }, {
        value: 3,
        label: '其它'
      }],
      desc: ''
    };
  },
  methods: {
    // 弹框传值
    toggleContent (event) {
        this.$emit('popup', event);
    },
    onCancel(){
      this.$emit('close')
    },
    onReport (e) {
      let inform_reason = utils.findObj(this.rportList, this.checkList).label
      var parameter = {
        inform_reason: inform_reason,
        inform_content: this.desc
      }
      this.$emit('report',parameter)
    },
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.hk-reportPopup {
  font-family:Microsoft YaHei;
  @{deep} .el-dialog__header {
    border-bottom: 1px solid #eee;
    .el-dialog__title {
      font-size:18px;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
  }
  @{deep}.el-dialog__body {
    padding: 0 !important;
  }
  .dialog-footer {
    .el-button {
      width:80px;
      height:36px;
      padding: 0;
      border:1px solid rgba(153,153,153,1);
      font-size:14px;
      font-weight:bold;
      color:rgba(153,153,153,1);
      &:last-child {
        border-color: #0BD094;
        color: #0BD094;
      }
    }
  }
}
.hk-report-content {
    // padding: 30px 20px;
     height: 60px;
      line-height: 60px;
    @{deep}.el-radio {
        font-size: 16px;
        color: #333;
        text-align: left;
       margin: 0 23px;
        height: 40px;
        line-height: 40px;
        // border-bottom: 1px solid #ccc;
      }
  }
.hk-report-textarea {
  padding: 0 22px 14px;
  @{deep}.el-textarea__inner {
    width:485px;
    height:90px;
    font-size:16px;
    color:rgba(153,153,153,1);
    background:rgba(246,246,248,1);
    border:1px solid rgba(221,221,221,1);
  }
}
</style>