<template>
    <div class="salary-query">
        <el-form ref="" :model="form" :rules="rules" label-width="100px" label-position="left">
            <el-form-item label="地区">
                <el-cascader
                ref="myCascader"
                v-model="form.region"
                placeholder="请选择"
                :options="areaData"
                @change="onHandleChange"
                clearable>
                </el-cascader>
            </el-form-item>
            <el-form-item label="行业">
                <el-select v-model="form.industry" placeholder="请选择">
                    <el-option v-for="(item,index) in workType" :key="index" :value="item.value" :label="item.label">{{item.label}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职能">
                <el-select v-model="form.function" placeholder="请选择">
                    <el-option v-for="(item,index) in workType" :key="index" :value="item.value" :label="item.label">{{item.label}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公司性质">
                <el-select v-model="form.companyNature" placeholder="请选择">
                    <el-option v-for="(item,index) in workType" :key="index" :value="item.value" :label="item.label">{{item.label}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="button">
                <el-button class="query">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {workType} from '@/config/constant'
import { regionData } from 'element-china-area-data'
export default {
    data(){
        return{
            form:{
                region:'',
                industry:'',
                function:'',
                companyNature:''
            },
            rules:{},
            workType:workType,
            areaData:regionData
        }
    },
    methods:{
        onHandleChange() {
        }
    }
}
</script>
<style lang="less" scoped>

@import './salary-query.less';
</style>