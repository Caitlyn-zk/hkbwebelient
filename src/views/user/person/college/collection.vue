<template>
    <div class="collection">
        <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
            >
            <el-menu-item index="1">
                我的收藏
            </el-menu-item>
        </el-menu>
        <div class="el-menu-pane">
            <div class="no-data" >
                <img src="../../../../assets/image/null.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeIndex: '1'
        }
    }
}
</script>
<style lang="less" scoped>
@import './collection.less';
</style>