<template>
    <div class="content  recommend-special">
        <navigation></navigation>
        <div class="title">推荐专题</div>
        <div class="clearfix">
            <ul  class="special-content fl">
                <li :span="5" v-for="(item,index) in specialList" :key="index" class="special-list">
                    <div class="special-info">
                        <img :src="item.cover_image | onImag" class="margin-b-16" :class="item === 0 ? 'bg' : ''" />
                        <!-- <img :src="item.cover_image" class="margin-b-18" v-if="index !== 1" /> -->
                        <div class="special-title margin-b-8" @click="onSpecialDetails(item.id)" :class="item === 0 ? 'bg' : ''">{{item.name}}</div>
                        <div class="desc margin-b-14" ><span :class="item === 0 ? 'bg' : ''">{{item.desc}}</span></div>
                        <div class="special-stics margin-b-14" :class="item === 0 ? 'bg' : ''" ><span v-if="item !== 0">{{item.article_count}}篇文章 · {{item.follow_count}}人关注</span></div>
                        <el-button v-if="item !== 0" @click="onSpecialDetails(item.id)">查看专题</el-button>
                        <el-button v-else class="no-data-button"></el-button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="text-center">
            <el-button 
              type="text" 
              @click="onNextPage" 
              v-if="specialList.length == page_size "
            >
              <i class="el-icon-refresh-right"></i>
              <span>换一批</span>
            </el-button>
        </div>
    </div>
</template>
<script>
import navigation from "./common/navigation";
import {geHomeRecomndColumnList} from "@/api/college";
export default {
     filters: {
        onImag(value) {
        let circleUrl = require("../../../assets/image/loading.png");
        if (value !== undefined && value !== "" && value !== null) {
            let imgUrl = "http://cdn.65ph.com/" + value;
            return imgUrl;
        } else {
            return circleUrl;
        }
        return circleUrl;
        },
    },
    data(){
        return{
            specialList: [0,0,0,0,0],
            page: 1,
            page_size: 10,
        }
    },
    components: {
        navigation
    },
    created(){
        this.get_college_home_colum_list()
    },
    methods:{
        get_college_home_colum_list(){
            let parameter = {
                page: this.page,
                page_size: this.page_size
            }
            geHomeRecomndColumnList(parameter).then(res=>{
                if (res.status ==  200) {
                // console.log("专题列表",res.data)
                this.$set(this,'specialList',res.data)
                }
            })
        },
        onSpecialDetails(id){
            this.$router.push({ path: "/front/college/specialdetails",query:{id: id}});
        },
        onNextPage(){
            this.page = this.page + 1
            this.get_college_home_colum_list()
        }
    }
}
</script>
<style lang="less" scoped>
@import './recommend-special.less';
</style>