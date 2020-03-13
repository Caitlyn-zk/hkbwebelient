<template>
  <div id="app">
    <!-- 内容部分 -->
    <Top></Top>
    <!-- <div class="content">
    </div> -->
    <project></project>
    <router-view/>
    <!-- <el-button type="">常规样式</el-button> -->
  </div>
</template>

<script>
import Top from './components/top/index.vue'
import Project from './views/project/content.vue'
export default {
  name: 'App',
  components: {
    Top,
    Project
  }
}
</script>

<style lang="less">
#app {
  background: #f6f6f8;
}
</style>
