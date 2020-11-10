<template>
  <div class="hk-resume-conter">
    <div class="hk-resume-conter-title">简历中心</div>
    <ul class="hk-resume-conter-list">
      <li class="hk-resume-conter-list-bar">
        <h4 class="hk-resume-conter-list-title">简历名称</h4>
      </li>
      <li class="hk-resume-conter-list-bar">
        <h4 class="hk-resume-conter-list-title">公开程度</h4>
      </li>
      <li class="hk-resume-conter-list-bar">
        <h4 class="hk-resume-conter-list-title">操作</h4>
      </li>
    </ul>
    <ul class="hk-resume-conter-list" v-for="item in resumeLists" :key="item.resume_id">
      <li class="hk-resume-conter-list-bar">
        <span
          class="hk-resume-conter-post-name"
          @click="EditResume(item.resume_id, item.privacy_state, item.in_time, item.resume_name)"
        >{{item.resume_name}}</span>
      </li>
      <li class="hk-resume-conter-list-bar">
        <span class="el-dropdown-link">
          <span
            class="hk-resume-conter-post-name"
            @click="EditResume(item.resume_id, item.privacy_state, item.in_time, item.resume_name)"
          >{{ item.privacy_state | onfundRang}}</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
      </li>
      <li class="hk-resume-conter-list-bar">
        <el-button type="text" class="font-16" @click="onMyResume(item.resume_id)">编辑</el-button>
        <!-- <el-button type="text" class="font-16">复制</el-button> -->
        <!-- <el-button type="text" class="text-user-red hk-resume-del font-16">删除</el-button> -->
      </li>
    </ul>
    <div class="hk-open-treaty">
      <h5 class="hk-open-treaty-title">公开程度说明:</h5>
      <p class="hk-open-treaty-list">对所有公开：允许通过环科宝审核的公司查看你的简历（注意：只允许有1份简历可以选择对所有公开）</p>
      <p class="hk-open-treaty-list">完全保密：不允许任何人员或公司查看您的简历，个人信息完全保密，除非你主动投递职位。</p>
    </div>
    <div>
      <el-dialog title="编辑简历名称" :visible.sync="dialogVisible" width="30%">
        <el-form :model="myfrom">
          <el-form-item label="简历名称" :label-width="formLabelWidth">
            <div class="fl">
              <el-input
                class="fl"
                v-model="myfrom.resume_name"
                autocomplete="off"
                placeholder="请填写简历新的简历名称"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="隐私状态" :label-width="formLabelWidth">
            <el-select v-model="myfrom.privacy_status" placeholder="请选择隐私状态">
              <el-option
                v-for="item in openList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="holdEditResume">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { resumeCenterList, editUserResume } from "@/api/recruit.js";
import { fundRang } from "@/config/constant";
import utils from "@/utils/index.js";
const openList = [
  {
    value: 10,
    label: "对所有公开"
  },
  {
    value: 20,
    label: "完全保密"
  }
];
export default {
  inject: ["reload"],
  filters: {
    onfundRang(value) {
      var obj = utils.findObj(openList, value);
      return obj.label;
    }
  },
  data() {
    return {
      isOpen: "对所有公开",
      openList: openList,
      resumeLists: [],
      // 弹框
      dialogVisible: false,
      formLabelWidth: "100",
      myfrom: {
        resume_name: "",
        privacy_status: ""
      },
      resume_id: 0,
      in_time: 10,
      salary: []
    };
  },
  created() {
    this.resumeList();
  },
  methods: {
    onMyResume(val) {
      // console.log(val);
      this.$router.push({
        path: "/user/my/resume",
        query: {
          resume_id: val
        }
      });
    },
    onOpen(val, name) {
      // console.log(name);
      this.isOpen = name;
    },
    resumeList() {
      let that = this;
      resumeCenterList().then(res => {
        if (res.status === 200) {
          // console.log("简历列表", JSON.stringify(res.data.resume_list));
          this.resumeLists = res.data.resume_list;
        }
      });
    },
    EditResume(id, status, time, name) {
      this.dialogVisible = true;
      this.resume_id = id;
      this.in_time = time;
      (this.myfrom.resume_name = name), (this.myfrom.privacy_status = status);
    },
    // 保存编辑
    holdEditResume() {
      let holdList = {
        resume_id: this.resume_id,
        resume_name: this.myfrom.resume_name,
        privacy_status: this.myfrom.privacy_status,
        in_time: this.in_time,
        jobwant_state: this.resumeLists[0].jobwant_state,
        work_type: this.resumeLists[0].work_type,
        privacy_state: this.resumeLists[0].privacy_state,
        post_cate: this.resumeLists[0].post_cate,
        post_cate_name: this.resumeLists[0].post_cate_name,
        min_salary: this.resumeLists[0].min_salary,
        max_salary: this.resumeLists[0].max_salary,
        area1_code: this.resumeLists[0].area1_code,
        area1_name: this.resumeLists[0].area1_name,
        area2_code: this.resumeLists[0].area2_code,
        area2_name: this.resumeLists[0].area2_name,
        area3_code: this.resumeLists[0].area3_code,
        area3_name: this.resumeLists[0].area3_name
      };
      // console.log(this.myfrom.privacy_status);
      editUserResume(holdList).then(res => {
        if (res.status === 200) {
          // console.log(res.data);
          this.dialogVisible = false;
          this.resumeList();
          this.$message({
            message: res.msg,
            type: "success",
            showClose: true,
            duration: 3000
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error",
            showClose: true,
            duration: 3000
          });
        }
        this.dialogVisible = false;
        this.reload();
      });
    }
  }
};
</script>

<style lang="less">
@import "./center.less";
</style>