<template>
  <div>
    <!-- 我的草稿箱 -->
    <h3>我的草稿箱</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="回答草稿" name="answer">
        <ul class="hk-mydrafts-content text-l">
          <li class="hk-mydrafts-content-list" v-for="item in 3" :key="item">
            <h3 class="line-46">探索播州区环保事业发展</h3>
            <p class="retract line-30">
              我不是环评师，我是环评技术人员，生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活,
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
            </p>
            <div>
              <el-button type="text">发布</el-button>
              <el-button type="text">删除</el-button>
              <router-link to="/front/college/question/details"><el-button type="text">编辑</el-button></router-link>
              <span class="margin-l-50">2小时前</span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="文章草稿" name="article">
        <ul class="hk-mydrafts-content text-l">
          <li class="hk-mydrafts-content-list" v-for="item in 3" :key="item">
            <h3 class="line-46">20年环评注册师，你怎么成炮灰了？</h3>
            <p class="retract line-30">
              我不是环评师，我是环评技术人员，生活在环评食物链的最低端，工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活,
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
              工作中遇见的所有人都是我的甲方，领导教促趁着年轻干活
            </p>
            <div>
              <el-button type="text">发布</el-button>
              <el-button type="text">删除</el-button>
              <router-link to="/front/college/question/details"><el-button type="text">编辑</el-button></router-link>
              <span class="margin-l-50">2小时前</span>
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "answer"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style lang="less">
.hk-mydrafts-content-list {
  padding: 20px 100px 10px 0;
  margin: 20px 0;
  border-bottom: 2px solid #ccc;
  .retract {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
