<template>
  <div class="hk-detail-list-title margin-t-10 clearfix">
    <div class="clearfix">
      <div class="fr hk-resume-main">
        <el-button round @click="onUserDialog()">添加</el-button>
      </div>
      <span class="hk-person-title-bar">教育经历</span>
      <div v-for="(item, index) in eduLists" :key="item.id">
        <div class="hk-resume-school-name text-bold clearfix">
          <span class>{{item.school}}</span>
          <div class="hk-resume-school-time fr" @mouseenter="onMouseEnter(index)">
            <span class="hk-resume-school-time-bar">{{item.end_dt}}</span>
            <div class="hk-resume-shool-btn">
              <el-button type="text" @click="onEditEdu(item.id, index)">编辑</el-button>
              <!-- :class="[isDel == true ? '' : 'last-del']" -->
              <el-button
                type="text"
                class="text-user-red"
                :class="[isDel == true ? '' : 'last-del']"
                @click="onDelEdu(item.id, index)"
              >删除</el-button>
            </div>
          </div>
        </div>
        <div class="hk-resume-cont-jw">
          <!-- 学历以及统招 -->
          <span>{{item.edu | onEdu}}</span>
          <span>- {{item.is_tz | isTz}}</span>
          <span class="padding-l-10">{{item.major}}</span>
        </div>
      </div>
    </div>
    <el-dialog
      :title="id == 0 ? '新增教育经历' : '编辑教育经历'"
      :visible.sync="dialogFormVisible"
      @close="onClose"
    >
      <el-form :model="eduForm" id="myform" ref="eduForm" :rules="rules">
        <el-form-item label="学校名称" :label-width="formLabelWidth" prop="school">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="eduForm.school"
            @input="changeInput"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
           
          > 
            <template slot-scope="{ item }">
              <div class="name">{{ item.school_name }}</div>
            </template>
          </el-autocomplete>
          <!-- <el-input v-model="eduForm.school" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth" prop="edu">
          <el-select v-model="eduForm.edu" placeholder="请选择活动区域">
            <el-option
              v-for="item in eduList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上学时间" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-form-item prop="begin_dt">
              <el-date-picker
                type="month"
                placeholder="选择开始日期"
                v-model="eduForm.begin_dt"
                value-format="yyyy-MM"
                style="width: 100%;"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">-</el-col>
          <el-col :span="7">
            <el-form-item prop="end_dt">
              <el-date-picker
                type="month"
                placeholder="选择结束日期"
                v-model="eduForm.end_dt"
                prop="end_dt"
                value-format="yyyy-MM"
                style="width: 100%;"
                :picker-options="pickerOptions1"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="是否统招" :label-width="formLabelWidth" prop="is_tz">
          <el-radio v-model="eduForm.is_tz" label="0">统招</el-radio>
          <el-radio v-model="eduForm.is_tz" label="1">非统招</el-radio>
        </el-form-item>
        <el-form-item label="专业选择" :label-width="formLabelWidth">
          <el-cascader
            ref="myCascader"
            :options="majorList"
            :props="prostData"
            class="other-select"
            v-model="major"
            placeholder="请输入所学专业"
            :show-all-levels="false"
            @change="onMajor"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="onUserResumeEdu('eduForm')">确 定</el-button>
      </div>
      <el-dialog width="40%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
        <!-- <popupCate :elasticFrame="personnel" @popup="acceptPersonnelData" @close="onClosePersonnelPopup" @cancel="onCancelPersonnelPopup"></popupCate> -->
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import popupCate from "@/components/popup/popCate";
import {
  addUserResumeEdu,
  getUserResumeEduList,
  delUserResumeEdu,
  getPostCateTree
} from "@/api/recruit";
import { getSchoolNameList } from "@/api/public";
import { tzList, minEdu } from "@/config/constant.js";
import utils from "@/utils/index.js";
export default {
  filters: {
    onEdu(value) {
      // console.log('状态数据', minEdu)
      var obj = utils.findObj(minEdu, value);
      return obj.label;
    },
    isTz(value) {
      var obj = utils.findObj(tzList, value);
      return obj.label;
    }
  },
  inject: ["reload"],
  props: {
    eduLists: Array
  },
  data() {
    return {
      isRouterAlive: true,
      // 教育
      dialogFormVisible: false,
      // id等0 表示新增 大于0表示编辑
      id: 0,
      eduForm: {
        school: "",
        // 学历
        edu: "",
        // 上学时间
        begin_dt: "",
        end_dt: "",
        major_id: "",
        major: "",
        is_tz: ""
      },
      form: {
        school: "",
        // 学历
        edu: "",
        // 上学时间
        begin_dt: "",
        end_dt: "",
        major_id: "",
        major: "",
        is_tz: ""
      },
      major: [],
      prostData: {
        value: "id",
        label: "cate_name",
        children: "children"
      },
      majorList: [],
      tzList: tzList,
      eduList: minEdu,
      // 判断是否为最后一条数据
      isDel: true,
      formLabelWidth: "120px",
      // 弹框参数
      personnel: {
        eject: false,
        number: 5,
        data: [],
        postList: []
      },
      innerVisible: false,
      resume_id: null,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          var time1 = new Date(this.eduForm.begin_dt).getTime();
          var endTime =
            time.getTime() < time1 || time.getTime() > Date.now() - 8.64e7;
          return endTime;
        }
      },
      // 搜索学校字段
      restaurants: [],
      timeout: null,
      schollList: [],
      rules: {
        school: [
          { required: true, message: "请输入学校名字", trigger: "blur" }
        ],
        edu: [{ required: true, message: "请选择学历", trigger: "change" }],
        major_id: [
          { required: true, message: "请输入专业id", trigger: "blur" }
        ],
        major: [{ required: true, message: "专业名称", trigger: "blur" }],
        begin_dt: [
          { required: true, message: "请输入入学时间", trigger: "blur" }
        ],
        end_dt: [{ required: true, message: "请输入毕业时间", trigger: "blur" }]
      }
    };
  },
  created() {
    // this.getUserEduList()
    // console.log(1342)
    // console.log(this.eduLists.length)
    if (this.$route.query.resume_id) {
      this.resume_id = parseInt(this.$route.query.resume_id);
    }
    this.getMajorList();
  },
  components: {
    popupCate
  },
  methods: {
    // 获取专业类别
    getMajorList() {
      getPostCateTree().then(res => {
        this.$set(this, "majorList", res.data);
      });
    },
    // 将改变的数据传送到父组件中
    toggleContent(event) {
      // console.log(event)
      this.$emit("educontent", event);
    },
    onMajor(val) {
      // console.log('专业',JSON.stringify(val))
      this.$set(this.eduForm, "major_id", val[1]);
      // console.log(val[1])
      // console.log(this.$set(this.eduForm, 'major_id', val[1]))
      // console.log(this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1])
      this.$set(
        this.eduForm,
        "major",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
      );
      this.$set(this, "major", val);
    },
    onClose() {
      this.getUserEduList();
      this.$nextTick(() => {
        this.$refs.eduForm.clearValidate();
      });
      this.eduForm = this.$options.data().eduForm;
    },
    // 鼠标移入时判断列表是否只有一个 如果只有一个，删除标签不显示
    onMouseEnter() {
      let lists = this.eduLists.length;
      if (lists <= 1) {
        this.isDel = false;
      } else {
        this.isDel = true;
      }
    },
    // 添加按钮
    onUserDialog() {
      this.dialogFormVisible = true;
      this.$set(this, "id", 0);
      if ([this.eduForm].length > 0) {
        document.getElementById("myform").reset();
        this.eduForm.is_tz = "";
      }
    },
    onUserResumeEdu(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          this.addEdu();
        }
      });
    },
    // 添加教育信息
    addEdu() {
      this.isDel = true;
      let edu = {
        id: this.id,
        school: this.eduForm.school,
        // 学历
        edu: this.eduForm.edu,
        // 上学时间
        begin_dt: this.eduForm.begin_dt,
        end_dt: this.eduForm.end_dt,
        major_id: this.eduForm.major_id,
        major: this.eduForm.major,
        is_tz: this.eduForm.is_tz,
        resume_id: this.resume_id
      };
      // console.log(edu)
      // console.log("教育信息数据", JSON.stringify(edu));
      addUserResumeEdu(edu)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.msg,
              type: "success",
              showClose: true,
              offset: 60,
              duration: 3000
            });
            this.getUserEduList();
            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: res.message,
              type: "error",
              showClose: true,
              offset: 60,
              duration: 3000
            });
            this.dialogFormVisible = false;
          }
        })
        .catch(res => {
          this.$message({
            message: res.message,
            type: "error",
            showClose: true,
            offset: 60,
            duration: 3000
          });
          this.dialogFormVisible = false;
        });
    },
    // 页面渲染
    getUserEduList() {
      getUserResumeEduList().then(res => {
        // console.log("数据", JSON.stringify(res.data));
        this.toggleContent(res.data.data_list);
        // 表单中
        // this.eduForm.major_id = res.data
      });
    },
    // 编辑教育经历
    onEditEdu(value, index) {
      // console.log("id", value);
      this.id = value;
      this.dialogFormVisible = true;
      // console.log("教育经历", JSON.stringify(this.eduLists[index]));
      this.$set(this, "eduForm", this.eduLists[index]);
      this.$set(this.eduForm, "is_tz", String(this.eduLists[index].is_tz));
      this.$set(this, "major", [
        parseInt(this.eduLists[index].major_id / 100),
        this.eduLists[index].major_id
      ]);
      // console.log('渲染的专业'+[parseInt(this.eduLists[index].major_id / 100),this.eduLists[index].major_id])
    },
    onDel(val) {
      delUserResumeEdu(val)
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.msg,
              type: "success",
              showClose: true,
              offset: 60,
              duration: 3000
            });
          } else {
            this.$message({
              message: res.message,
              type: "error",
              showClose: true,
              offset: 60,
              duration: 3000
            });
          }
          this.getUserEduList();
        })
        .catch(res => {
          this.$message({
            message: res.message,
            type: "error",
            showClose: true,
            offset: 60,
            duration: 3000
          });
        });
    },
    // 删除教育经历
    onDelEdu(val, index) {
      let arrayLength = this.eduLists.length;
      // console.log(arrayLength)
      if (arrayLength > 1) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.onDel(val);
        });
      } else {
        this.$message({
          message: "最后一条了，不能删,只能编辑",
          offset: 60,
          type: "warning"
        });
        this.isDel = false;
      }
    },
    // 请求学校数据
    onSchoolNameList(school_name) {
      getSchoolNameList(this.eduForm.school).then(res => {
        if (res.status === 200) {
          this.schollList = res.data;
        } else {
          this.schollList = [];
        }
      }).catch(res => {
          // console.log("when status code other")
          this.schollList = [];
        });
    },
    // 搜索
    querySearch(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let restaurants = this.restaurants;
        // console.log(restaurants)
        let results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        cb(results);
      }, 3000 * Math.random());
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.school_name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    // 选择搜索内容
    handleSelect(item) {
      this.eduForm.school = item.school_name
    },
    changeInput() {
      this.onSchoolNameList(this.eduForm.school);
    }
  },
  watch: {
    schollList () {
      this.restaurants = this.schollList
      // console.log(this.restaurants)
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
.last-del {
  display: none;
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
</style>
