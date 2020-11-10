<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import $store from '@/store'
  import { uploadImage } from "@/api/public";
  export default {
    name: 'editoritem',
    data() {
      return {
        // uploadPath,
        editor: null,
        info_: null
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        // console.log("触发清除文本域内容",val)
        // if (val) {
          this.editor.txt.clear()
          this.info_ = null
          // this.$emit('close',false)
        // }
      },
      value: function(value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
      }
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted(){
      this.seteditor()
      this.editor.txt.html(this.value)
    },
    methods:{
        seteditor() {
        // http://192.168.2.125:8080/admin/storage/create
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
        this.editor.customConfig.uploadImgHeaders = $store.state.app.token// 自定义 header
        this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
        // 配置菜单
        this.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]
        this.editor.customConfig.customUploadImg = (files, insert) => {
            let _this = this;
            let formData = new FormData();
            let file = new Blob()
            let reader = new window.FileReader()
            // console.log("reader",reader)
            reader.readAsArrayBuffer(files[0])
            reader.onload = function (e) {
              const result = e.target.result
              const contentType = files[0].type
              // 生成blob图片,需要参数(字节数组, 文件类型)
              const blob = new Blob([result], { type: contentType })
              // console.log("blob1111111",blob)
              formData.append("image", blob, files[0].name);
              formData.append("type", "cert");
              uploadImage(formData).then(res => {
                if (res.status == 200) {
                  let imageUrl = "http://cdn.65ph.com/" + res.data.image_name;
                  insert(imageUrl)
                  _this.$message({
                    message: res.msg,
                    type: "success"
                  });
                }
              })   
            }
            
        };
        this.editor.customConfig.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
            var imgList = [];
            html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
              imgList.push(capture);
            });
          var img = ''
          if (imgList.length !== 0) {
            img = imgList[0].substring(20,imgList[0].length)
          }
          // console.log('获取图片',img)
          var brief = html.replace(/<[^>]+>/g, "").substring(0,100)
          // console.log('提取文字',brief,brief.length)
          this.$emit('change', this.info_,img,brief) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
      },
    }
}
</script>
<style lang="less" scoped>
@import "./editor-item.less";
</style>