<template>
    <div>
        <div v-if="id == 1" class="article-item">
            <div class="title bg"></div>
            <div class="block">
                <div class="text  bg loading"></div>
                <div class="text  animation-delay bg"></div>
            </div>
            <div class="select">
                <div class="bg"></div>
                <div class="bg"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        id:Number
    }
}
</script>
<style lang="less" scoped>
@import './loading.less';
</style>