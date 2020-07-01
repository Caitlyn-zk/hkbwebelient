<template>
  <div>
    <el-dialog title="添加职位标签" :visible.sync="postLabel.eject" width="35%">
      <el-form :inline="true" :model="formpostLabel" class="demo-form-inline">
        <div class="hk-exhibition">
          <el-tag
            :key="tag"
            v-for="tag in selectsPostLabel"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
        <div class="hk-selectsPostStaff">
          <el-checkbox-group v-model="selectsPostLabel" :min="1" :max="10" class="hk-table">
            <el-checkbox-button
              class="hk-bable-tr"
              v-for="post in good_staff_list"
              :key="post.value"
              :label="post.label"
              >
              {{post.label}}
            </el-checkbox-button>
          </el-checkbox-group>
        </div>
        <el-form-item class="padding-t-20 text-center post-item-but">
          <el-button type="info" @click="oncloss()">取消</el-button>
          <el-button type="primary" @click="onPostLabel()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    postLabel: {}
  },
  data () {
    return {
      // 职位标签数据
      formpostLabel: {
        value: 1,
        postLabels: ''
      },
      Index: null,
      good_staff_list: [{
        value: 1,
        label: 'CAD制图员'
      }, {
        value: 2,
        label: '采购专员'
      }, {
        value: 3,
        label: '带薪休假'
      }, {
        value: 4,
        label: '电气工程师'
      }, {
        value: 5,
        label: '土壤修复工程师'
      }, {
        value: 6,
        label: '暖通工程师'
      }, {
        value: 7,
        label: '人力资源管理'
      }, {
        value: 8,
        label: '设备管理工程师'
      }],
      selectsPostLabel: []
    }
  },
  methods: {
    onPostLabel () {
      let that = this;
      // this.$emit("onPostLabel", that.formpostLabel.postLabels);
      this.$emit('onPostLabel',that.selectsPostLabel)
      this.postLabel.eject = false;
    },
    oncloss () {
      this.postLabel.eject = false;
    },
    onSelctPostLabel (index, val) {
      console.log('点击')
      this.Index = index
      this.formpostLabel.postLabels = val
    },
    handleClose (tag) {
      this.selectsPostLabel.splice(this.selectsPostLabel.indexOf(tag), 1);
    },
  }
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.post-item-but {
  width: 100%;
  margin: 0 auto;
}
.el-tag {
  border-radius: 18px;
  padding: 0 20px;
  margin-right: 17px;
  margin-bottom: 15px;
  &.hk-select {
    background: #0BD094;
    color: #fff;
  }
}
.hk-jobmanagement .demo-form-inline {
  padding: 0;
}
.hk-exhibition {
  padding-top: 10px;
  padding-left: 10px;
  min-height: 48px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
/deep/ .el-dialog__body {
  padding: 0 20px 20px;
}
.hk-selectsPostStaff {
  padding: 0 15px;
}
.hk-table {
    .hk-bable-tr {
      // float: left;
      min-width: 130px;
      height: 36px;
      line-height: 36px;
      // padding-left: 20px;
      margin-bottom: 10px;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: #0BD094;
      }
      @{deep} .el-checkbox-button__inner {
        // border: none;
        border: 1px solid #ccc;
        padding: 0 10px;
        height: 36px;
        width: 100%;
        text-align: center;
        line-height: 36px;

      }
      @{deep} &.is-checked {
        .el-checkbox-button.is-checked {
          .el-checkbox-button__inner {
            background: transparent;
            color: #0BD094;
          }
        }
      }
    }
  }
</style>