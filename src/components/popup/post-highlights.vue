<template>
  <div>
    <el-dialog title="添加职位亮点" :visible.sync="postStaff.eject" width="35%">
      <el-form :inline="true" :model="formStaff" class="demo-form-inline">
        <div class="hk-exhibition">
          <el-tag
            :key="tag"
            v-for="tag in selectsPostStaff"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        <!-- <div>请选择你想要的职位亮点</div> -->
        </div>
        <!-- <el-form-item label="职位亮点">
          <el-input v-model="formStaff.postStaffName" placeholder="请输入职位亮点"></el-input>
        </el-form-item> -->
        <div class="hk-selectsPostStaff">
          <!-- <el-tag type="info" class="hk-cursor"
          v-for="(item,index) in good_staff_list"
          :key="index" @click="onStaff(index, item.label)"
          :class="Index === index ? 'hk-select': ''" >
            {{item.label}}
          </el-tag> -->
          <el-checkbox-group v-model="selectsPostStaff" class="hk-table">
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
          <el-button type="primary" @click="onPostStaff()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    postStaff: {}
  },
  data () {
    return {
      // 职位亮点数据
      formStaff: {
        value: 1,
        postStaffName: ''
      },
      good_staff_list: [{
        value: 1,
        label: '五险一金'
      }, {
        value: 2,
        label: '加班补贴'
      }, {
        value: 3,
        label: '带薪休假'
      }, {
        value: 4,
        label: '双休'
      }, {
        value: 5,
        label: '全勤奖利'
      }, {
        value: 6,
        label: '定期体检'
      }, {
        value: 7,
        label: '全勤奖'
      }, {
        value: 8,
        label: '年终奖'
      }, {
        value: 9,
        label: '员工旅游'
      }, {
        value: 10,
        label: '免费班车'
      }, {
        value: 11,
        label: '交通补贴'
      }, {
        value: 12,
        label: '节日福利'
      }, {
        value: 13,
        label: '包吃'
      }, {
        value: 14,
        label: '包住'
      }, {
        value: 15,
        label: '零食下午茶'
      }, {
        value: 16,
        label: '餐补'
      }, {
        value: 17,
        label: '通讯补贴'
      }, {
        value: 18,
        label: '住房补贴'
      }, {
        value: 19,
        label: '股票期权'
      },],
      selectsPostStaff: []
    }
  },
  methods: {
    onPostStaff () {
      let that = this;
      // this.$emit("onPostStaff", that.formStaff.postStaffName);
      this.$emit("onPostStaff", that.selectsPostStaff);
      this.postStaff.eject = false;
    },
    oncloss () {
      this.postStaff.eject = false;
      // this.$emit("onPostStaff", '');
    },
    onStaff (index, val) {
      // console.log('点击')
      this.Index = index
      this.formStaff.postStaffName = val
    },
    handleClose (tag) {
      this.selectsPostStaff.splice(this.selectsPostStaff.indexOf(tag), 1);
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
      width: 110px;
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
        padding: 0;
        height: 36px;
        width: 110px;
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