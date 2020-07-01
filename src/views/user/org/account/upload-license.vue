<template>
    <div class="upload-license">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" class="form">
            <el-form-item label="公司全称:" >
                <el-input v-model="org_name" placeholder="请输入公司全称" disabled></el-input>
            </el-form-item>
            <el-form-item label="营业执照:" prop="img_url" style="margin-top:40px">
                <el-upload
                    class="hk-upload-main"
                    ref="uploadxls"
                    action="string"
                    :show-file-list="false"
                    :http-request="httpReques"
                    :before-upload="beforeAvatarUpload"
                    >
                    <!-- <img v-if="form.img_url" :src="form.img_url" class="avatar"> -->
                    <el-image v-if="form.img_url" fit="fill" :src="form.img_url" class="avatar"></el-image>
                    <div v-else class="select-upload">
                        <div class="tips-content">
                            <i class="el-icon-upload" ></i>
                            <div class="tips">上传营业执照正面</div>
                            <div class="require">支持jpg、png、jpeg格式,大小不得超过10M</div>
                        </div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <div class="tips">
                    <div>1.请提供有效年检期内的《企业法人营业执照副本》。</div>
                    <div>2.请确保营业执照公司名称与公司全称一致。</div>
                    <div>3.请保证所以信息清晰完整。</div>
                    <div>4.不接受电子版执照</div>
                    <div>5.该营业执照只用于公司认证使用，请放心上传</div>
                </div>
            </el-form-item>
            <el-button type="primary" @click="onNext('form')">下一步</el-button>
        </el-form>
    </div>
</template>
<script>
import {uploadImage} from "@/api/public"
export default {
    data(){
        return{
            form:{
                org_name:'',
                img_url:''
            },
            cert_url:'',
            rules:{
                img_url: [
                    { required: true, message: '请上传公司执照', trigger: 'blur' }
                ]
            }
        }
    },
    computed:{
        org_name () {
            if (this.$store.state.app.userInfo.org_list) {
                if (this.$store.state.app.userInfo.org_list.length>0) {
                return this.$store.state.app.userInfo.org_list[0].org_name
                }
            }
        return '新企业'
        },
    },
    methods:{
        onNext(val){
            this.$refs[val].validate((valid) => {
                if (valid) {
                    this.$router.push({path:'/user/org/account/companyinfo',query:{org_name:this.org_name}})
                }
            })
        },
        httpReques(file){
            // console.log("上传图片1111",file.file)
            let formData = new FormData();
            formData.append("image",file.file);
            formData.append("type", 'license');
            uploadImage(formData).then(res=>{
                if (res.status == 200) {
                this.form.img_url = 'http://cdn.65ph.com/'+ res.data.image_name
                this.cert_url = res.data.image_name
                this.$message({
                    message: res.msg,
                    type: "success"
                })
                }
            }).catch(res=>{
                this.$message({
                message: res.msg,
                type: "error"
                })
            })
        },
        beforeAvatarUpload(file) {
            const isJPEG = file.type === 'image/jpeg'
            const isJPG = file.type === 'image/jpg'
            const isPNG = file.type === 'image/png'
            const isLt10M = file.size / 1024 / 1024 < 10
            if (!isJPEG && !isJPG && !isPNG) {
                this.$message.error('上传头像图片格式不正确')
            }
            if (!isLt10M) {
                this.$message.error('上传头像图片大小不能超过 10MB!')
            }
            return [isJPG || isJPEG || isPNG] && isLt10M
        },
    },

}
</script>
<style lang="less" scoped>
@import './upload-license.less';
</style>