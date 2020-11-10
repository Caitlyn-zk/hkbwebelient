<template>
  <div class="dialog">
    <el-dialog
      :visible.sync="skill.eject"
      title="技能标签"
      :lock-scroll="true"
      :append-to-body="skill.type == 0"
      :close-on-click-modal="false"
      :before-close="onClose"
      @open="onOpen"
    >
      <div class="skill">
        <div class="tips">选择你的技能标签</div>
        <div class="skill-tiling">
          <el-input
            v-model="inputValue"
            placeholder="请输入技能标签"
            maxlength="10"
            show-word-limit
            class="skill-input"
          ></el-input>
          <el-button class="add-skill" @click="onSearch">+ 添加</el-button>
        </div>
        <div class="skill-content">
          <!-- <div v-for="(item,index) in skillData" :key="index">
                        <div class="option" :class="item.checked ? 'selection' :''" @click="onSelectSkill(index)">{{item.value}}</div>
          </div>-->
          <el-checkbox-group v-model="activePostName" :min="1" :max="skill.number" class="hk-table">
            <el-checkbox-button
              class="margin-b-20 margin-r-20"
              v-for="item in skillData"
              :key="item.id"
              :label="item.value"
            >{{item.value}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="button">
        <el-button @click="onCancel" class="cancel-button">取消</el-button>
        <el-button @click="onConfirm" class="confirm-button">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
      activePostName: [],
      skillData: [
        {
          id: 0,
          value: "大数据",
          checked: false
        },
        {
          id: 1,
          value: "数据管理",
          checked: false
        },
        {
          id: 2,
          value: "网络监控",
          checked: false
        },
        {
          id: 3,
          value: "网络管理",
          checked: false
        },
        {
          id: 4,
          value: "web开发",
          checked: false
        },
        {
          id: 5,
          value: "web实习",
          checked: false
        },
        {
          id: 6,
          value: "Java",
          checked: false
        }
      ]
    };
  },
  created() {},
  props: {
    skill: {}
  },
  mounted() {},
  methods: {
    onSelectSkill(e) {
      var data = this.add();
      if (data.length == this.skill.number) {
        var obj = data.find(function(obj) {
          return obj.id === e;
        });
        if (obj !== undefined) {
          this.$set(this.skillData[e], "checked", !this.skillData[e].checked);
        } else {
          let tips = "最多可选择" + this.skill.number + "个";
          // alert(tips)
          this.$message({
            message: tips,
            type: "success",
            showClose: true,
            offset: 60,
            duration: 1000
          });
        }
      } else {
        this.$set(this.skillData[e], "checked", !this.skillData[e].checked);
      }
    },
    add() {
      var data = [];
      for (let i = 0; i < this.skillData.length; i++) {
        if (this.skillData[i].checked && data.length < this.skill.number) {
          data.push(this.skillData[i]);
        }
      }
      return data;
    },
    onSearch() {
      if (this.skillData[this.skillData.length - 1].value !== this.inputValue) {
        let data = {
          value: this.inputValue,
          checked: false
        };
        this.$set(this, "skillData", this.skillData.concat(data));
      } else {
        this.$message("不可添加重复的标签");
      }
    },
    onConfirm() {
      var data = this.add();
      // console.log("获取传递数据", JSON.stringify(this.activePostName));
      this.$emit("confirm", this.activePostName, false);
      //  Object.assign(this.$data, this.$options.data())
    },
    onClose() {
      this.$emit("close", false);
      // Object.assign(this.$data, this.$options.data())
    },
    onCancel() {
      this.$emit("cancel", false);
      // Object.assign(this.$data, this.$options.data())
    },
    onOpen() {
      let that = this;
      if (that.skill.data.length !== 0) {
        for (let index = 0; index < that.skill.data.length; index++) {
          var obj = that.skillData.find(function(obj) {
            return obj.id === that.skill.data[index].id;
          });
          if (obj !== undefined) {
            // console.log("获取参数", obj);
            let id = obj.id;
            that.$set(that.skillData[id], "checked", true);
            // console.log("获取参数", that.skillData[id].checked);
          }
          this.activePostName = that.skill.data;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./skill.less";
</style>