<template>
  <div class="hk-reportPopup">
    <el-dialog :visible.sync="report.eject" title="举报" width="380px" center>
      <p class="text-line text-center">请选择举报理由</p>
      <el-checkbox-group v-model="checkList" class="hk-report-content">
        <el-checkbox v-for="(item,index) in rportList" :key="index" :label="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="danger" @click="onReport">举 报</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    report: {}
  },
  data() {
    return {
      checkList: [],
      rportList: [{
        value: 1,
        label: '垃圾广告信息'
      }, {
        value: 2,
        label: '不实信息'
      }, {
        value: 3,
        label: '侮辱、人身攻击等不友善行为'
      }, {
        value: 4,
        label: '有害信息'
      }, {
        value: 5,
        label: '诱导赞同、关注等行为'
      }]
    };
  },
  methods: {
    // 弹框传值
    toggleContent (event) {
      this.$emit('popup', event);
    },
    onReport (e) {
      this.report.eject = false
    },
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.hk-reportPopup {
  @{deep}.el-dialog__body {
    padding: 0 !important;
  }
  .hk-report-content {
    padding: 30px 20px;
    @{deep}.el-checkbox {
        display: block;
        text-align: left;
        height: 40px;
        line-height: 40px;
        margin-right: 0;
        border-bottom: 1px solid #ccc;
      }
  }
}


</style>