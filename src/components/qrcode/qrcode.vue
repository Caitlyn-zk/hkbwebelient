<template>
    <div>
        <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
    data(){
        return{

        }
    },
    props:{data:{}},
    created(){
        this.$nextTick(() => {
            this.creatQrCode();
        });
    },
    methods: {
        creatQrCode() {
            var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: this.data.text, // 需要转换为二维码的内容
                width: this.data.width,
                height: this.data.height,
                colorDark: this.data.colorDark,
                colorLight: this.data.colorLight,
                correctLevel: QRCode.CorrectLevel.H
            })
        },
    }
}
</script>
<style lang="less" scoped>

</style>