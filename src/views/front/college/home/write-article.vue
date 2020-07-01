<template>
  <!-- 写文章 -->
  <div class="hk-write-an-aeticle text-l">
    <div class="font-20 line-70 text-center">写文章</div>
    <div class="hk-wite-an-aeticle-img padding-lr-60">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        class="hk-wite-an-aeticle-img-upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <div class="hk-write-article-title padding-tb-20">
      <el-input v-model="articleTitle" maxlength="50" placeholder="请输入标题（最多50个字）"></el-input>
    </div>
    <div class="margin-tb-20 hk-content-textarea">
      <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 文章标题
      articleTitle: '',
      content: '',
      editorOption: {
        theme: "snow"
      },
    };
  },
  components: {
    quillEditor
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.hk-write-an-aeticle {
  background: #fff;
  margin-bottom: 20px;
  // 文章图片
  .hk-wite-an-aeticle-img {
    .hk-wite-an-aeticle-img-upload {
      .el-upload--picture-card {
        width: 100%;
        height: 200px;
        line-height: 200px;
      }
      .el-upload-list--picture-card .el-upload-list__item {
        width: 100%;
        height: 200px;
      }
    }
  }
  .hk-write-article-title {
    // width: 1000px;
    padding: 10px 65px;
    text-align: center;
    .el-input {
      .el-input__inner {
        border: none;
        font-size: 18px;
        &::placeholder {
          font-size: 18px;
          color: #333;
        }
      }
    }
  }
  .hk-content-textarea {
    margin: 20px auto;
    // padding: 20px 0;
  }
}
</style>
