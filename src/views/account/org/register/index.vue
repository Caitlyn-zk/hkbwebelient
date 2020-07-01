<template>
  <div class="hk-org-step-main">
    <div class="hk-org-title-bar">
      <span>水与环境行业专业信息服务平台</span>
      <span class="hk-org-bg-title">企业版</span>
    </div>
    <div class="hk-org-step-title">
      <el-steps :active="active">
        <el-step title="完善个人信息" description="0"></el-step>
        <el-step title="确认公司信息" description="0"></el-step>
        <el-step title="确认需求" description="0"></el-step>
      </el-steps>
      <div class="hk-org-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created () {
    let data = this.$route.query.active
    this.active = Number(data)
  },
  mounted () {
    let data = this.$route.query.active
    this.active = Number(data)
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    }
  },
  watch: {
    $route: {
      handler() {
        this.active  = Number(this.$route.query.active)
      },
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
