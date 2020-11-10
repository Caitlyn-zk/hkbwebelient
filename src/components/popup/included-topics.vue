<template>
  <div class="hk-reportPopup">
    <el-dialog :visible.sync="included.eject" title="收入到我管理的专题" width="640px">
      <div class="hk-report-content">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
        <el-button class="margin-l-20" type="text">+新建专题</el-button>
      </div>
      <ul class="included">
        <li class="clearfix included-list" v-for="(pops,index) in containColumn" :key="index">
          <div class="article-button fr margin-t-7">
            <el-button round :class="index === 1 ? 'is-active': ''">{{index === 1 ? '移除': '收录'}}</el-button>
          </div>
          <div class="included-list-bar">
            <img width="48" height="48" class="included-list-img" :src="pops.cover_image | onImag" alt />
            <div class="hk-included-cont">
              <h4
                class="hk-included-cont-title padding-b-9 padding-t-3 hk-cursor"
                @click="onColumnDetail(pops.column_id)"
              >{{pops.name}}</h4>
              <p class="text-line hk-included-cont-contet title-nowrap">{{pops.desc}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer text-r">
        <el-button type round @click="onReport">取 消</el-button>
        <el-button type round @click="onReport">举 报</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    included: {}
  },
  filters: {
    onImag(value) {
      let circleUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      if (value !== undefined && value !== "" && value !== null) {
        let imgUrl = "http://cdn.65ph.com/" + value;
        return imgUrl;
      } else {
        return circleUrl;
      }
      return circleUrl;
    },
  },
  data() {
    return {
      checkList: [],
      containColumn: [
        {
          column_id: 1,
          name: "怎么做一个合格的环评工程师？",
          cover_image: "cert/202007061200035198902683.jpg",
          desc:
            "收录了270篇文章 · 322人关注"
        },
        {
          column_id: 3,
          name: "物镜系统",
          cover_image: "cert/202007061200035198902683.jpg",
          desc:
            "收录了270篇文章 · 322人关注"
        }
      ],
      input: "",
      desc: ""
    };
  },
  methods: {
    // 弹框传值
    toggleContent(event) {
      this.$emit("popup", event);
    },
    onReport(e) {
      this.included.eject = false;
    },
    // 跳转专题详情
    onColumnDetail(id) {
      this.$router.push({
        path: "/front/college/specialdetails",
        query: { id: id }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~">>>";
.hk-reportPopup {
  font-family: Microsoft YaHei;
  @{deep} .el-dialog__header {
    border-bottom: 1px solid #eee;
    .el-dialog__title {
      font-size: 18px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  @{deep}.el-dialog__body {
    padding: 0 !important;
  }
  .dialog-footer {
    .el-button {
      width: 80px;
      height: 36px;
      padding: 0;
      border: 1px solid rgba(153, 153, 153, 1);
      font-size: 14px;
      font-weight: bold;
      color: rgba(153, 153, 153, 1);
      &:last-child {
        border-color: #0bd094;
        color: #0bd094;
      }
    }
  }
}
.hk-report-content {
  margin: 20px;
  display: flex;
  justify-content: left;
  // height: 60px;
  @{deep}.el-input {
    width: 495px;
    .el-input__inner {
      width: 100%;
      height: 40px;
      background: rgba(245, 245, 245, 1);
      border-radius: 20px;
    }
  }
  .el-button {
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    &:hover,
    &:focus {
      color: #0bd094;
    }
  }
}
.included {
  padding: 0 20px;
  margin-bottom: 20px;
  .included-list {
    padding-bottom: 30px;
    .included-list-bar {
      display: flex;
      justify-content: left;
    }
    &:last-child {
      padding-bottom: 0;
    }

    .included-list-img {
      border-radius: 4px;
      margin-right: 15px;
    }
    .article-button {
      .el-button {
        width: 80px;
        height: 34px;
        line-height: 31px;
        padding: 0;
        border: 1px solid #0BD094;
        font-size: 14px;
        color: #0bd094;
        &.is-active {
          background: rgb(234, 241, 236);
          // opacity:0.13;
          color: #0BD094;
          border: none;
          border-radius:18px;
        }
      }
    }
    .hk-included-cont {
      width: 70%;
      .hk-included-cont-title {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }

      .hk-included-cont-contet {
        font-size: 12px;
        // font-weight: bold;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>