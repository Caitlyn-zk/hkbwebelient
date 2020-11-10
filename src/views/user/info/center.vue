<template>
    <div class="news-center">
        <div class="title">
            消息中心
        </div>
        <div class="content">
            <el-collapse v-model="activeNames" @change="handleChange" v-if="infoList.length > 0" accordion>
                <el-collapse-item  v-for="(item,index) in infoList" :key="index"   :name="index" :class="item.is_read == 0 ? '':'select'">
                    <template slot="title">
                        <div class="icon"></div>{{item.ms_title}}
                    </template>
                    <div>{{item.ms_content}}</div>
                    <!-- <template slot="icon">
                        <div class="time">11111111111</div>
                    </template> -->
                </el-collapse-item>
            </el-collapse>
            <div class="select-button" v-if="infoList.length == list_rows">
                <el-button-group  >
                    <el-button type="primary" icon="el-icon-arrow-left" @click="onPreviousPage">上一页</el-button>
                    <el-button type="primary" @click="onNextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
            </div>
            <div class="no-data" v-if="infoList.length == 0">
                <img src="@/assets/image/no-data.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import {setSystemMessageRead,getSystemMessageList} from '@/api/user'
export default {
    data(){
        return{
            infoList:[],
            currentPage: 1,
            activeNames: null,
            list_rows: 20
        }
    },
    created(){
        this.getSystemMessageList()
    },
    mounted(){
    },
    methods:{
        setSystemMessageRead(id){
            setSystemMessageRead(id).then(res=>{
                if (res.status == 200) {
                    this.getSystemMessageList()
                }
            })
        },
        getSystemMessageList(){
            var data = {
                page: this.currentPage,
                list_rows: this.list_rows
            }
            getSystemMessageList(data).then(res=>{
                if (res.status == 200) {
                    this.infoList = res.data.data
                }
            })
        },
        onSelect(id){
            // console.log('onSelect',JSON.stringify(id))
        },
        handleChange(val){
            // console.log('信息中心',JSON.stringify(val))
            if (val !=='') {
                if (this.infoList[val].is_read !== 1) {
                    this.setSystemMessageRead(this.infoList[val].ms_id)
                }
            }
        },
        // 上一页
        onPreviousPage(){
            if (this.currentPage >1 ) {
                this.currentPage = this.currentPage -1
                this.activeNames = null
                this.getSystemMessageList()
            }
        },
        // 下一页 
        onNextPage() {
            this.currentPage = this.currentPage + 1
            this.activeNames = null
            this.getSystemMessageList()
        }
    }
}
</script>
<style lang="less" scoped>
@import './center.less';
</style>