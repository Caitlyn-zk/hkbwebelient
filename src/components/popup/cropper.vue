<template>
  <div class="cropper-component">
    <div class="info-item">
      <!-- <div class="font-16 text-blacks title">编辑{{name}}</div> -->
      <div class="font-16 text-blacks margin-t-20">拖拽方框，调整图片合适的位置和尺寸</div>
      <div class="font-12 text-gray margin-b-20">（大小不得超过10M,支持格式为：jpg、png、jpeg）</div>
      <label class="select-btn" for="uploads">选择图片</label>
      <div class="content"> 
        <div class="operation-box">
          <div class="cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
              @imgLoad="imgLoad"
            ></vueCropper>
          </div>
        </div>
        <div class="preview-box">
          <div class="text-center margin-b-20">图片预览：</div>
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <!-- <div :style="previews.div" class="license" v-if="type == 2">
                  <img :src="previews.url" :style="previews.img">
          </div>-->
        </div>
      </div>
      <div class="btn-box">
        <input
          type="file"
          id="uploads"
          :value="imgFile"
          style="position:absolute; clip:rect(0 0 0 0);width: 1px;"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        />
        <input type="button" class="operation-btn" value="+" title="放大" @click="changeScale(2)" />
        <input type="button" class="operation-btn" value="-" title="缩小" @click="changeScale(-2)" />
        <input type="button" class="operation-btn" value="↺" title="左旋转" @click="rotateLeft" />
        <input type="button" class="operation-btn" value="↻" title="右旋转" @click="rotateRight" />
        <!-- <input type="button" class="operation-btn" value="↓" title="下载" @click="down('blob')"> -->
      </div>
      <div class="btn">
        <div @click="finish('blob')" class="confirm-btn">确定</div>
        <div @click="onClose" class="close-btn">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage, getUpToken } from "@/api/public";
export default {
  name: "cropper",
  data() {
    return {
      //剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: "png", // 裁剪生成额图片的格式
        canMove: true, // 能否拖动图片
        original: true, // 上传图片是否显示原始宽高
        canMoveBox: true, // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true // 截图框固定大小
      },
      fileName: "", // 本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", // 上传后的图片的地址（不带服务器域名）
      name: "头像",
      typeData: ["avatar", "cert", "license"]
    };
  },
  // props: {type:Number},
  created() {},
  methods: {
    // 放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 坐旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 上传图片（点击上传按钮）
    finish(type) {
      // console.log("finish", this.type);
      let _this = this;
      let formData = new FormData();
      _this.$refs.cropper.getCropData(data => {
        let file = _this.convertBase64UrlToBlob(data);
        formData.append("image", file, _this.fileName);
        formData.append("type", "avatar");
        uploadImage(formData).then(res => {
          if (res.status == 200) {
            let imageUrl = "http://cdn.65ph.com/" + res.data.image_name;
            let image_name = res.data.image_name;
            _this.$emit("confirm", imageUrl, image_name);
            Object.assign(this.$data, this.$options.data())
            _this.$message({
              message: res.msg,
              type: "success"
            });
          }
        });
      });
    },
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    },
    // 实时预览函数
    realTime(data) {
      // console.log("realTime", data);
      this.previews = data;
    },
    // 选择本地图片
    uploadImg(e, num) {
      // console.log('uploadImg',e, num);
      var _this = this;
      // 上传图片
      if(e.target.files[0]){
        var file = e.target.files[0];
        // console.log('file',file);
        _this.fileName = file.name;
        const isJPEG = file.type === "image/jpeg";
        const isJPG = file.type === "image/jpg";
        const isPNG = file.type === "image/png";
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
          this.$message.error("上传头像图片格式不正确");
          return Object.assign(this.$data, this.$options.data());
        } else{
          if (!isLt10M) {
            this.$message.error("上传头像图片大小不能超过 10MB!");
            return Object.assign(this.$data, this.$options.data());
          }
          var reader = new FileReader();
          reader.onload = e => {
            let data;
            if (typeof e.target.result === "object") {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]));
            } else {
              data = e.target.result;
            }
            if (num === 1) {
              _this.option.img = data;
            } else if (num === 2) {
              _this.example2.img = data;
            }
          };
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
          reader.readAsArrayBuffer(file);
        }
      }
    },
    imgLoad(msg) {
      // console.log("imgLoad");
      // console.log(msg);
    },
    onClose() {
      Object.assign(this.$data, this.$options.data())
      this.$emit("close");
    }
  }
};
</script>
<style lang="less" scoped>
@import "./cropper.less";
</style>

