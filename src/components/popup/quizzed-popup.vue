<template>
  <div>
      <!-- title="提问" -->
    <el-dialog :visible.sync="quizzed.eject" width="30%" class="hk-college-tiwen-dialog">
      <div class="clearfix margin-b-10">
        <div class="block fl">
          <el-avatar :size="80" :src="circleUrl"></el-avatar>
        </div>
        <span class="fl margin-l-10 margin-t-60 text-line">写下问题，尽量描述准确，更容易得到解答</span>
      </div>
      <!-- class="hk-college-tiwem" -->
      <div class="hk-content-textarea">
        <quill-editor v-model="detail" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </div>
      <div class="hk-college-add-topic line-36 clearfix">
        <div
          class="fl hk-topicofconversation"
          v-for="(domain, index) in domains"
          :label="'话题' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
              required: true, message: '标签不能为空', trigger: 'blur'
            }"
          :class="domain.value === '' ? 'hk-hidden': ''"
        >
          <span>{{domain.value}}</span>
          <i @click.prevent="onRemoveLabel(domain)" class="el-icon-close font-16"></i>
        </div>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          class="hk-autocomplete"
          :class="isShow === false ? 'is-avtive' : ''"
        >
          <i class="el-icon-search" slot="suffix" @click="onSearch"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.address }}</span>
          </template>
        </el-autocomplete>
        <el-button
          class="hk-scope-button"
          :class="isShow ? '' : 'is-avtive'"
          type="text"
          @click="openSearch"
        >
          <span>+</span>
          <span>添加话题（至少添加一个话题）</span>
        </el-button>
      </div>
      <div class="clearfix">
        <el-button class="fr" @click="onQuizzed">发布问题</el-button>
        <el-checkbox class="fl" v-model="checked">匿名回答</el-checkbox>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  props: {
    quizzed: {}
  },
  data () {
    return {
      detail: "",
      checked: true,
      editorOption: {
        theme: "snow"
      },
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      domains: [
        {
          value: ""
        }
      ],
      state: "",
      restaurants: [],
      isShow: true,
    }
  },
  components: {
    quillEditor,
    // collegeTitle
  },
  methods: {
    openSearch() {
      this.state = "";
      this.isShow = false;
    },
    // 提问弹框的一些操作
    onQuizzed (e) {
      this.quizzed.eject = false
    },
    onRemoveLabel(item) {
      var index = this.domains.indexOf(item);
      if (index !== -1) {
        this.domains.splice(index, 1);
      }
    },
    // 搜索
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" }
      ];
    },
    // 选择搜索内容
    handleSelect(item) {
      // console.log('我是方法handleselect')
      // console.log(item.value);
      this.isShow = true;
      // 将选择的标签展示到页面
      this.domains.push({
        value: item.value,
        key: Date.now()
      });
    },
    onSearch(ev) {
      // console.log("我是onSearch");
      // console.log(ev);
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
    // console.log(this.restaurants)
  }
}
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.hk-college-tiwen-dialog {
    .hk-college-tiwem {
        min-height: 100px;
        border: 1px solid #ccc;
    }
    .hk-topicofconversation {
        margin-left: 10px;
        height: 36px;
        line-height: 36px;
        padding: 0 12px;
        border-radius: 18px;
        background: #f1f1f1;
        border: 1px solid #ccc;
        position: relative;
    }
    .hk-hidden {
        display: none;
    }
    .hk-scope-button {
        display: block;
        &.is-avtive {
            display: none;
        }
    }
    .hk-college-add-topic {
        margin: 10px 0;
        @{deep}.hk-autocomplete {
            display: none;
            &.is-avtive {
                display: inline-block;
            }
            .el-input {
                border-radius: 22px;
                .el-input__inner {
                    border-radius: 22px;
                    height: 36px;
                }
            }
        }
        .my-autocomplete {
            li {
                line-height: normal;
                padding: 7px;
            
                .name {
                text-overflow: ellipsis;
                overflow: hidden;
                }
                .addr {
                font-size: 12px;
                color: #b4b4b4;
                }
            
                .highlighted .addr {
                color: #ddd;
                }
            }
        }
    }
  // 富文本框样式
.hk-content-textarea {
    // width:1078px;
    width: 100%;
    height:250px;
    overflow: hidden;
    background:rgba(242,242,242,1);
    border-radius:18px;
    margin-left: 0;
    padding: 0;
    @{deep} .el-form-item__content {
        margin-left: 0 !important;
    }
    @{deep} .ql-container.ql-snow {
        border: none;
        height: 160px;
    }
    @{deep}.ql-toolbar.ql-snow {
        border: none;
    }
    @{deep}.ql-snow .ql-tooltip {
        left: 0 !important;
    }
    .ql-editor .ql-video {
        width: 100% !important;
    }
}
}

</style>