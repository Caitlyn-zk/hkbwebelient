<template>
    <div class="project-info-muster" @click="onProjectDetails(item)">
        <div class="project-info-left">
            <div class="project-name">{{item.name}}</div>
            <div class="org-name">发布机构：{{item.org_name}}</div>
            <div class="release-time">{{item.add_time}}</div>
        </div>
        <div class="project-info-center">{{item.type == 1 ? '环评公示':'验收公示'}}</div>
        <div class="project-info-right">
            <div class="address">{{item.area1_name}}</div>
        </div>
    </div>
</template>
<script>
import { fundRang } from "@/config/constant";
import utils from "@/utils/index.js";
import {formatDate} from '@/utils/formatDate.js'
export default {
    filters: {
    },
    data(){
        return{

        }
    },
    props:{item:Object},
    methods:{
        onProjectDetails(item){
            this.$emit('details',item)
        }
    }
}
</script>
<style lang="less" scoped>
@import './project-item.less';
</style>