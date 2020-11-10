<template>
    <div>
        <el-dialog
            :visible.sync="delivery"
            :lock-scroll="true"
            :close-on-click-modal="false"
            :before-close="onClose"
            width="640px"
            class="dialog"
            >
            <div class="content">
                <div class="title text-blacks font-18">给该专题投稿<span class="font-14 hk-cursor margin-l-24" @click="onArticle">写篇新文章</span></div>
                <div class="margin-t-8 text-line font-12">每篇文章有总共有5次投稿机会</div>
                <el-input v-model="key" placeholder="搜索我的文章" class="margin-t-22" @change="onSearch">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <div class="special-search-list" v-if="userArticleList.length > 0">
                    <div v-for="(item,index) in userArticleList" :key="index" class="special-list">
                        <div class="block">
                            <div class="special-name  text-blacks" >{{item.tittle}}</div>
                        </div>
                        <el-button  @click="onDeliverArticle(item.id)" ><span v-if="item !== 0">投递</span></el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {deliverArticle,geUserArticleList} from '@/api/college'
export default {
    data(){
        return{
            userArticleList:[],
            stateData:[
                {
                    id: 0,
                    name:'',
                    label:'收录'
                },
                {
                    id: 1,
                    name:'待审核',
                    label:'撤回'
                },
                {
                    id: 2,
                    name:'已加入',
                    label:'移除'
                },
                {
                    id: 3,
                    name:'未通过',
                    label:'再次投稿'
                }
            ],
            colorData:[
                {
                    id: 0,
                    color:'normal',
                },
                {
                    id: 1,
                    color:'withdraw',
                },
                {
                    id: 2,
                    color:'del',
                },
                {
                    id: 3,
                    color:'normal',
                },
            ],
            key: '',
            column_id:null,
            page: 1,
            page_size: 5,
        }
    },
    props:{
        delivery:Boolean
    },
    computed: {
        uid () {
            if (this.$store.state.app.userInfo) {
                return this.$store.state.app.userInfo.uid
            }
            return null
        },
    },
    created(){
        if (this.$route.query.id) {
            this.column_id = this.$route.query.id
        }
        this.get_user_article_list()
    },
    methods:{
        onSearch(val){
            this.get_user_article_list()
        },
        onArticle(){
            this.$router.push({path:'/front/college/article/editor'})
        },
        // 搜索文章列表
        get_user_article_list(){
            var parameter = {
                key: this.key,
                from_uid: this.uid,
                page: this.page,
                page_size: this.page_size
            }
            // console.log('搜索用户文章列表参数',parameter)
            geUserArticleList(parameter).then(res=>{
                // console.log('文章列表',res)
                this.$set(this,'userArticleList',res.data)
            })
        },
        onClose(){
            this.$emit('close')
        },
        onDeliverArticle(id){
            this.$emit('delivery',id)
        }
    }
}
</script>
<style lang="less" scoped>
@import './delivery.less';
</style>