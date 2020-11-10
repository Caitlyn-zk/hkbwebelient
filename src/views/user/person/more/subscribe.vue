<template>
    <div class="subscribe">
        <el-tabs v-model="activeName" >
            <el-tab-pane label="我的订阅" name="subscribe" class="title"></el-tab-pane>
        </el-tabs>
        <div class="content">
            <div class="tiling">
                <div class="email hk-cursor">你的邮箱：{{email}}</div>
                <div class="tiling ">
                    <div class="proving hk-cursor" @click="onVerify">验证</div>
                    <div class="modify hk-cursor" @click="onRevise">修改</div>
                </div>
            </div>
            <div class="subscribe-list">
                <div v-for="(item,index) in subscribeList" :key="index">
                    <div class="tiling subscribe-info">
                        <div class="subscribe-info-title">{{item.title}}</div>
                        <div class="subscribe-info-text">{{item.value}}</div>
                        <el-radio-group class="subscribe-info-radio" v-model="item.radio" @change="onSubscribe(item.radio,index)">
                            <el-radio  label="1">已订阅</el-radio>
                            <el-radio  label="2">未订阅/退订</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="emailPopup" width="500px" :lock-scroll="true"  :close-on-click-modal="false" :before-close="beforeClose" title="修改邮箱">
            <el-form ref="form" :rules="rules" :model="form" class="form">
                <el-form-item prop="phone">
                    <el-input v-model="form.phone" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <el-form-item prop="eamil">
                    <el-input v-model="form.eamil" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入新的邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="form.code" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入验证码"><template slot="append"><div class="code" @click="onSend(phoneForm)">获取验证码</div></template></el-input>
                </el-form-item>
                <el-button type="primary" @click="onSubmit('form')">确定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeName:'subscribe',
            emailPopup: false,
            form:{
                phone: '',
                eamil:'',
                code:'',
            },
            rules:{},
            subscribeList:[
                {
                    id: 0,
                    title: '特惠活动',
                    value: '提供最新的本期特惠，让您实惠到家！不定期发送。',
                    radio: '2'
                },
                {
                    id: 1,
                    title: '站内信息',
                    value: '提供站内信消息到达的通知。',
                    radio: '2'
                },
                {
                    id: 2,
                    title: '才市情报',
                    value: '第一手的人才市场情报速递、职场资讯、办公室攻略，每月一期',
                    radio: '2'
                },
                {
                    id: 3,
                    title: '工作机会',
                    value: '精心推荐给您的职位，定期发送。茫茫公司中找到它？',
                    radio: '2'
                },
                {
                    id: 4,
                    title: '企业短信',
                    value: '来自企业客户发送的短信，如面试通知、招聘信息等。',
                    radio: '2'
                }
            ]
        }
    },
    computed:{
        email () {
            if (this.$store.state.app.userInfo.email) {
                return this.$store.state.app.userInfo.email
            }
            return ''
        },
    },
    methods:{
        onSubscribe(val,index){
            // console.log('订阅单选',val,index)
        },
        beforeClose(){
            this.emailPopup  = false
        },
        onRevise(){
            this.emailPopup = true
        },
        onSend(){

        },
        // 修改邮箱
        onSubmit(form){
           this.$refs[form].validate((valid) => {
                if(valid){
                    
                }
            }) 
        },
        // 邮箱验证
        onVerify(){

        }
    }
}
</script>
<style lang="less" scoped>

@import './subscribe.less';
</style>