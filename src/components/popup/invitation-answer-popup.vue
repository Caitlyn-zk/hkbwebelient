<template>
  <div class>
    <!-- 邀请 -->
    <el-dialog :visible.sync="elasticFrame.eject" width="30%">
      <div class="clearfix">
        <span class="fl line-36">你可以搜索下面用户，快速获得回答</span>
        <el-input
          placeholder="搜索你想邀请的人"
          v-model="invitationSearch">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <ul class="hk-user-list">
        <li class="margin-tb-10" v-for="item in 15" :key="item">
          <div class="hk-querst clearfix">
            <el-button class="fr margin-t-10">邀请回答</el-button>
            <div class="block fl">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="fl text-l margin-l-20">
              <span class="line-30 font-20">黄大雁</span>
              <p class="text-line">在‘环评’话题下获得12个赞</p>
            </div>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    elasticFrame: {}
  },
  data() {
    return {
      invitationSearch: '',
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    // 弹框传值
    toggleContent (event) {
        this.$emit('popup', event);
    },
  }
};
</script>

<style lang="less" scoped>
// 搜索框
@deep: ~'>>>';
@{deep}.el-input {
  width: 200px;
  float: right;
  .el-input__inner {
    height: 36px;
    border-radius: 22px;
  }
}
//  邀请人
.hk-user-list {
  height: 320px;
  overflow-y: scroll;
  &::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 2px;
    border: 5px solid #726b6b;
    box-shadow: 5px 0 0 #726b6b inset;
  }
  &::-webkit-scrollbar-thumb:hover {
    box-shadow: 5px 0 0 #4A4A4A inset;
  }
}
</style>
