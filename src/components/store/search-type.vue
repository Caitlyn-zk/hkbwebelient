<template>
  <div class="padding-b-15">
    <div
      class="search-condition"
      :class="isMoreBrand ? 'is-more' : isCheckedBrand ? 'is-checked' : ''"
    >
      <div class="condition-title">品牌:</div>
      <div class="condition-content">
        <ul class="condition-list">
          <li
            class="conditeon-list-bar title-nowrap hk-cursor"
            v-for="(item, index) in brandList"
            :key="'b'+ index"
            @click="onSearchType(item)"
          >{{item.title}}</li>
        </ul>
        <div class="condition-checked">
          <el-checkbox-group class="condition-list-chacked" v-model="checkedCities" :max="7">
            <el-checkbox
              v-for="(item, index) in brandList"
              :label="item"
              :key="'checked'+index"
            >{{item.title}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-if="checkedCities.length > 0"
            class="condition-list-checked title-nowrap"
            v-model="checkedList"
            :max="7"
          >
            <span class="font-12 margin-l-15 text-line">已选条件：</span>
            <el-checkbox
              class="title-nowrap"
              v-for="(item, index) in checkedCities"
              :label="item"
              :checked="true"
              :key="'checkeds'+index"
            >{{item.title}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="condition-list-button">
          <el-button @click="oncheckedType(checkedCities)" :class="checkedCities.length > 0 ? 'is-active': ''">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </div>
      <div class="condition-button">
        <el-button @click="onMoreBrand(1)">
          {{isMoreBrand ? '收起': '更多'}}
          <i
            :class="isMoreBrand ? 'el-icon-arrow-up': 'el-icon-arrow-down'"
          ></i>
        </el-button>
        <el-button @click="onCheckeBrand(1)">
          <i class="iconfont icon-jia font-12"></i> 多选
        </el-button>
      </div>
    </div>
    <div class="search-condition" :class="isMoreDevice ? 'is-more' : ''">
      <div class="condition-title">智能设备：</div>
      <div class="condition-content">
        <ul class="condition-list">
          <li
            class="conditeon-list-bar title-nowrap hk-cursor"
            v-for="(item, index) in deviceList"
            :key="'b'+ index"
            @click="onSearchType(item)"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="condition-button">
        <el-button @click="onMoreBrand(2)" v-show="deviceList.length > 7">
          {{isMoreDevice ? '收起': '更多'}}
          <i
            :class="isMoreDevice ? 'el-icon-arrow-up': 'el-icon-arrow-down'"
          ></i>
        </el-button>
      </div>
    </div>
    <div class="search-condition" :class="isMoreTool ? 'is-more' : ''">
      <div class="condition-title">五金工具：</div>
      <div class="condition-content">
        <ul class="condition-list">
          <li
            class="conditeon-list-bar title-nowrap hk-cursor"
            v-for="(item, index) in toolList"
            :key="'b'+ index"
            @click="onSearchType(item)"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="condition-button">
        <el-button @click="onMoreBrand(3)" v-show="toolList.length > 7">
          {{isMoreTool ? '收起': '更多'}}
          <i
            :class="isMoreTool ? 'el-icon-arrow-up': 'el-icon-arrow-down'"
          ></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMoreBrand: false,
      isMoreDevice: false,
      isMoreTool: false,
      isCheckedBrand: false,
      checkedCities: [],
      checkedList: [],
      brandList: [
        {
          id: 1,
          title: "维安视",
        },
        {
          id: 2,
          title: "宾孚（BINFU）",
        },
        {
          id: 3,
          title: "稳健（Winner）",
        },
        {
          id: 4,
          title: "海氏海诺",
        },
        {
          id: 5,
          title: "绿盾",
        },
        {
          id: 6,
          title: "闪电卫士",
        },
        {
          id: 7,
          title: "亲贝（pigeon）",
        },
        {
          id: 8,
          title: "维安视",
        },
        {
          id: 9,
          title: "亲贝（pigeon）",
        },
        {
          id: 10,
          title: "维安视",
        },
        {
          id: 11,
          title: "亲贝（pigeon）",
        },
        {
          id: 12,
          title: "维安视",
        },
        {
          id: 13,
          title: "亲贝（pigeon）",
        },
        {
          id: 14,
          title: "维安视",
        },
        {
          id: 15,
          title: "亲贝（pigeon）",
        },
        {
          id: 16,
          title: "维安视",
        },
        {
          id: 17,
          title: "亲贝（pigeon）",
        },
        {
          id: 18,
          title: "维安视",
        },
        {
          id: 19,
          title: "亲贝（pigeon）",
        },
      ],
      deviceList: [
        {
          id: 1,
          title: "仪表仪器",
        },
        {
          id: 1,
          title: "测量工具",
        },
      ],
      toolList: [
        {
          id: 1,
          title: "家用五金",
        },
        {
          id: 2,
          title: "电动工具",
        },
        {
          id: 3,
          title: "气动工具",
        },
        {
          id: 4,
          title: "机电五金",
        },
        {
          id: 5,
          title: "家用五金",
        },
        {
          id: 6,
          title: "家用五金",
        },
        {
          id: 7,
          title: "家用五金",
        },
        {
          id: 8,
          title: "家用五金",
        },
        {
          id: 9,
          title: "家用五金",
        },
        {
          id: 10,
          title: "家用五金",
        },
        {
          id: 11,
          title: "家用五金",
        },
        {
          id: 12,
          title: "家用五金",
        },
        {
          id: 13,
          title: "家用五金",
        },
        {
          id: 14,
          title: "家用五金",
        },
      ],
    };
  },
  methods: {
    onMoreBrand(val) {
      if (val === 1) {
        this.isCheckedBrand = false;
        if (this.isMoreBrand) {
          this.isMoreBrand = false;
        } else {
          this.isMoreBrand = true;
        }
      } else if (val === 2) {
        if (this.isMoreDevice) {
          this.isMoreDevice = false;
        } else {
          this.isMoreDevice = true;
        }
      } else if (val === 3) {
        if (this.isMoreTool) {
          this.isMoreTool = false;
        } else {
          this.isMoreTool = true;
        }
      }
    },
    onCheckeBrand(val) {
      if (val === 1) {
        this.isMoreBrand = false;
        if (this.isCheckedBrand) {
          this.isCheckedBrand = false;
        } else {
          this.isCheckedBrand = true;
        }
      }
    },
    oncheckedType (val) {
      // console.log(val)
      this.$emit('searchCheck', val)
    },
    onSearchType (val) {
      // console.log(val.title)
      this.$emit("searchType", val);
    },
    onCancel() {
      this.isMoreBrand = false;
      this.isCheckedBrand = false;
    },
  },
};
</script>

<style lang="less" scoped>
.search-condition {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d8d8d8;

  max-height: 40px;
  overflow: hidden;
  &:last-child {
    border-bottom: 1px solid #d8d8d8;
  }
  &.is-more {
    border: 1px solid #d8d8d8;
    max-height: 100%;
    overflow: auto;
    .condition-title {
      color: #333333;
    }
  }
  &.is-checked {
    border: 1px solid #ffa641;
    max-height: 100%;
    overflow: auto;
    .condition-title {
      color: #333333;
      background: rgba(255, 166, 65, 0.1);
    }
    .condition-content {
      max-width: 1088px;
      .condition-list-button {
        display: block;
      }
      .condition-list {
        display: none;
      }
      .condition-checked {
        display: block;
        width: 1088px;
      }
    }

    .condition-button {
      display: none;
    }
  }
  .condition-title {
    width: 110px;
    min-height: 39px;
    font-size: 12px;
    padding: 12px 12px 0;
    color: rgba(102, 102, 102, 1);
    background-color: #f5f5f5;
  }
  .condition-content {
    line-height: 39px;
    text-align: left;
    max-width: 920px;
    min-width: 920px;
    .condition-list {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      align-content: stretch;
      .conditeon-list-bar {
        width: 130px;
        color: #005aa0;
        font-size: 12px;
        padding-left: 15px;
      }
    }
    .condition-checked {
      display: none;
      .condition-list-chacked {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        align-content: stretch;
        height: 100%;
        display: block;
        /deep/.el-checkbox {
          width: 130px;
          color: #005aa0;
          font-size: 12px;
          padding-left: 15px;
          height: 39px;
          line-height: 39px;
          margin-right: 0px;
          .el-checkbox__input {
            &.is-checked {
              .el-checkbox__inner {
                background: #fff;
                &::after {
                  border-color: #05d796;
                }
              }
            }
          }
          .el-checkbox__label {
            color: #005aa0;
            display: inline-block;
            width: 100px;
            vertical-align: -5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .condition-list-checked {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        align-content: stretch;
        /deep/.el-checkbox {
          .el-checkbox__input {
            &.is-checked {
              .el-checkbox__inner {
                background: #fff;
                &::after {
                  border-color: #05d796;
                }
              }
            }
          }
          .el-checkbox__label {
            color: #005aa0;
          }
        }
      }
    }

    .condition-list-button {
      display: none;
      text-align: center;
      .el-button {
        width: 56px;
        height: 23px;
        padding: 0;
        font-size: 12px;
        &:nth-child(2) {
          background: #f5f5f5;
          border: 1px solid #999999;
          color: #666;
        }
        &:nth-child(1) {
          background: #ffffff;
          border: 1px solid #cccccc;
          color: #cccccc;
        }
        &.is-active {
          color: #fff;
          background: #05d796;
          border-color: #05d796;
        }
      }
    }
  }
  .condition-button {
    width: 180px;
    height: 39px;
    line-height: 39px;
    .el-button {
      width: 56px;
      height: 23px;
      padding: 0;
      font-size: 12px;
      color: #666;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(153, 153, 153, 1);
      &:focus,
      &:hover {
        color: #666;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>