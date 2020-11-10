<template>
  <div>
    <!-- <el-dialog
      title="请选择职位类别"
      :visible.sync="elasticFrame"
      class="hk-popup-main"
      append-to-body>
      <div class="hk-close" @click="onClose">
        <i class="el-icon-close"></i>
      </div>
    </el-dialog> -->
    <el-tabs :tab-position="tabPosition" style="max-height: 540px;">
      <el-tab-pane v-for="(item, index) in postList" :key="index" :label="item.cate_name">
        <ul class="hk-table clearfix">
          <li class="hk-bable-tr fl" v-for="post in item.children" :key="post.id" @click="choicePost(post.id, post.cate_name)">{{post.cate_name}}</li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getPostCateTree } from '@/api/recruit'
export default {
  props: {
    elasticFrame: Boolean
  },
  data () {
    return {
      tabPosition: 'left',
      postList: []
    }
  },
  created () {
    // console.log(this.elasticFrame)
    this.PostCateTree()
  },
  mounted () {
    // if (this.elasticFrame = !this.elasticFrame) {
    //     this.toggleContent()
    //   }
  },
  methods: {
    // 弹框传值
    toggleContent (event) {
      this.$emit('popup', event);
    },
    PostCateTree () {
      getPostCateTree().then(res => {
        // console.log(res.data.children)
        // this.postList = res.data
        
        for (let item in res.data) {
          res.data[item].children.forEach(item => {
            item.checkbed = false
          })
          // console.log(res.data[item].children)
        }
        // console.log(res.data)
        this.postList = res.data
        // console.log(res.data)
      })
    },
    // 选择职位
    choicePost (id, name) {
      // let children = JSON.stringify
      // console.log(data.id)
      // for (let item in data) {}
      this.$emit('popup',false, id, name)
    },
    // 关闭弹框
    onClose () {
      this.$emit('popup',false)
    }
  },
}
</script>

<style lang="less">

@import './index.less';
</style>