<template>
  <div>
    <el-dialog
      title="请选择职位类别"
      :visible.sync="elasticFrame.eject"
      :close-on-click-modal='false'
      @open="onOpen"
      class="hk-popup-main"
      :before-close="onClose">
      <!-- <div class="hk-close" @click="onClose">
        <i class="el-icon-close"></i>
      </div> -->
      <div class="hk-diale-title">
        <el-tag
          :key="tag"
          v-for="(tag, index) in activePostName"
          closable
          :disable-transitions="false"
          @close="handleClose(tag,index)">
          {{tag}}
        </el-tag>
      </div>
      <el-tabs :tab-position="tabPosition" style="max-height: 540px;min-height: 240px;">
        <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.cate_name">
          <!-- <ul class="hk-table clearfix">
            <li >@click="choicePost(post.id, post.cate_name)"</li>
          </ul> -->
          <el-checkbox-group v-model="activePostName" :min="1" :max="elasticFrame.number" class="hk-table">
            <el-checkbox-button
              class="hk-bable-tr"
              v-for="post in item.children"
              :key="post.id"
              :label="post.cate_name"
              >
              {{post.cate_name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
      <div class=" text-center">
        <el-button  class="hk-dialog-but" @click="onCancel">取消保存</el-button>
        <el-button class="hk-dialog-but" @click="choicePost">确认保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    elasticFrame: {}
  },
  data () {
    return {
      tabPosition: 'left',
      list: [],
      activePostName: []
    }
  },
  created () {
     this.list = this.elasticFrame.list
  },
  mounted () {
  },
  methods: {
    // 弹框传值
    toggleContent (event) {
        this.$emit('popup', event);
    },
    // 选择职位
    choicePost (id, name) {
      // console.log('职位数据',JSON.stringify(this.activePostName))
      this.$emit('popup',false, id, name,this.activePostName)
    },
    // 关闭弹框
    onClose () {
      this.$emit('close',false)
      // Object.assign(this.$data, this.$options.data())
    },
    // 取消关闭
    onCancel (){
      this.$emit('cancel',false)
      // Object.assign(this.$data, this.$options.data())
    },
    // 弹框title
    handleClose(tag) {
      this.activePostName.splice(this.activePostName.indexOf(tag), 1)
    },
    onOpen(){
      this.list = this.elasticFrame.list
      // console.log('获取参数',this.list)
      for (let item in this.list) {
        this.list[item].children.forEach(item => {
          item.checkbed = false
        })
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less">
@import './index.less';
</style>