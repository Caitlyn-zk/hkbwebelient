<template>
    <div class="privacy">
        <div class="privacy-list">
            <div v-for="(item,index) in privacyList" :key="index">
                <div class="tiling privacy-info">
                    <div class="privacy-info-title">{{item.title}}</div>
                    <div class="privacy-info-text">{{item.value}}</div>
                    <el-checkbox v-model="item.checkbox" class="privacy-info-checkbox" @change="onCheckbox" >开启隐藏</el-checkbox>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            privacyList:[
                {
                    id: 0,
                    title: '匿名显示',
                    value: '选中匿名展示后，别人无法看到你的真实头像和姓名',
                    checkbox: false
                },
                {
                    id: 1,
                    title: '隐藏发表文章',
                    value: '选中隐藏文章，别人无法看到你发表的文章',
                    checkbox: false
                },
                {
                    id: 2,
                    title: '隐藏简历',
                    value: '隐藏后，您的简历将不会推荐给HR，也无法被搜索到，只有你投递到公司才可以查看你的简历',
                    checkbox: false
                },
                {
                    id: 3,
                    title: '隐藏项目',
                    value: '精心推荐给您的职位，定期发送。茫茫公司中找到它？',
                    checkbox: false
                },
                {
                    id: 4,
                    title: '企业短信',
                    value: '来自企业客户发送的短信，如面试通知、招聘信息等。',
                    checkbox: false
                }
            ]
        }
    },
    methods:{
        clickitem(e,index){
            if(e=== privacyList[index].radio){
                this.privacyList[index].radio = false    // 如果点击的对象是area就将v-model的值清空 radio状态为空
            }else{
                this.privacyList[index].radio = true // 否则就把点击的值赋值给area 即绑定的radio
            }
        },
        onCheckbox(val){
            console.log("开启隐藏",val)
        }
    }
}
</script>
<style lang="less" scoped>

@import './privacy.less';
</style>