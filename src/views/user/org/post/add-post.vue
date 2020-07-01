<template>
  <div class="hk-jobmanagement">
    <div class="hk-addproject-title-mbar">职位管理/{{id == 0 ? '发布职位': '编辑职位'}}</div>
    <div class="content">
      <el-form
        :model="jobFrom"
        :rules="rules"
        ref="jobFrom"
        :label-position="labelPosition"
        label-width="118px"
        class="demo-jobFrom"
      >
        <div class="hk-add-cont-title clearfix margin-b-20">
          <div class="fl hk-cont-serialnumber margin-r-8"></div>
          <span class="hk-add-cont-info">请填写职位描述</span>
        </div>
        <el-form-item label="职位类别" prop="cate_id">
          <el-cascader
            ref="myprojeccader"
            :options="cate_list"
            :props="prostData"
            v-model="jobFrom.cate_id"
            placeholder="咨询"
            @change="onPostList"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="职位类型" prop="work_type">
          <el-select v-model="jobFrom.work_type" placeholder="请职位类型" clearable>
            <el-option
              v-for="item in workTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="jobFrom.name" class="hk-content-input-bar" placeholder="请填写职位名称"></el-input>
        </el-form-item>
        <el-form-item label="职位状态" prop="state">
          <el-select v-model="jobFrom.state" placeholder="请选择参与方式" clearable>
            <el-option
              v-for="item in statelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="hk-joblabel clearfix" label="职位标签">
          <!-- <el-col :span="16" class="clearfix"> -->
          <el-form-item
            v-for="(postlabel, index) in jobFrom.skill_tag"
            :key="index"
            :prop="'skill_tag.' + index "
          >
            <el-input v-model="jobFrom.skill_tag[index]"></el-input>
            <el-button class="hk-closs-butt" @click.prevent="onRemovePost(postlabel)">×</el-button>
          </el-form-item>
          <el-form-item class="hk-addomain-bar clearfix">
            <el-button @click="onAddPost">
              新增职位
              <i class="el-icon-plus"></i>
            </el-button>
          </el-form-item>
          <!-- </el-col> -->
        </el-form-item>
        <div class="hk-cont-main-bar padding-l-23 padding-b-20">
          <span class="margin-r-20">职位描述</span>
          <span class="text-user-red">(请勿输入公司邮箱、联系电话、薪资面议、性别歧视字样及其他外链，否则将自动删除，不可恢复。)</span>
        </div>
        <el-form-item class="hk-content-textarea" prop="desc">
          <quill-editor v-model="jobFrom.desc" ref="myQuillEditor" :options="postDetail"></quill-editor>
        </el-form-item>
        <!-- 职位亮点修改 -->
        <el-form-item class="hk-joblabel clearfix" label="职位亮点">
          <!-- <el-col :span="16" class="clearfix"> -->
          <el-form-item
            v-for="(postlabel, index) in jobFrom.good_staff"
            :key="index"
            :prop="'good_staff.' + index "
          >
            <el-input v-model="jobFrom.good_staff[index]"></el-input>
            <el-button class="hk-closs-butt" @click.prevent="onRemovePostStaff(postlabel)">×</el-button>
          </el-form-item>
          <!-- </el-col> -->
          <!-- <el-col :span="3"> -->
          <el-form-item class="hk-addomain-bar clearfix">
            <el-button @click="onAddPostStaff">
              职位亮点
              <i class="el-icon-plus"></i>
            </el-button>
          </el-form-item>
          <!-- </el-col> -->
        </el-form-item>
        <!-- 职位亮点111 -->
        <!-- <el-form-item label="职位亮点" prop="good_staff">
          <el-input v-model="jobFrom.good_staff" class="hk-content-input-bar"></el-input>
        </el-form-item>-->
        <el-form-item label="工作经验" prop="work_life">
          <el-select v-model="jobFrom.work_life" placeholder="请选择" clearable>
            <el-option
              v-for="(item, workLifeIndex) in work_life_list"
              :key="workLifeIndex"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历要求" prop="min_edu">
          <el-select v-model="jobFrom.min_edu" placeholder="请选择" clearable>
            <el-option
              v-for="(item,eduIndex) in min_edu_list"
              :key="eduIndex"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="yimc-salary-main">
          <el-col :span="11">
            <el-form-item label="最低薪资" prop="min_salary">
              <el-select
                v-model="jobFrom.min_salary"
                clearable
                placeholder="请选择"
                @change="onMinSalary('jobFrom', $event)"
              >
                <el-option
                  v-for="(item,minSalaryIndex) in salary_list"
                  :key="minSalaryIndex"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="最高薪资" prop="max_salary">
              <el-select
                v-model="jobFrom.max_salary"
                clearable
                placeholder="请选择"
                @change="onMaxSalary('jobFrom', $event)"
              >
                <el-option
                  v-for="(item,maxSalaryIndex) in salary_list"
                  :key="maxSalaryIndex"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- :disabled="item.value <= jobFrom.min_salary ? true: item.value >= jobFrom.min_salary + 10 ? true : false" -->
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="招聘时长" prop="valid_day">
          <el-select v-model="jobFrom.valid_day" placeholder="请选择" clearable>
            <el-option
              v-for="item in valid_day_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'工作地址'" prop="address">
          <el-form-item
            ref="myAddress"
            class="hk-address-content-main"
            v-for="(addresitem, index) in jobFrom.address"
            :key="addresitem.key + index"
            :prop="'address.' + index + '.value'"
            v-show="myAddressShow"
          >
            <span>{{addresitem.area1_name + addresitem.area2_name + addresitem.area3_name + addresitem.detail}}</span>
            <el-button
              type="text"
              class="hk-addres-delete"
              @click.prevent="removeDomain(addresitem)"
            >×</el-button>
          </el-form-item>
          <el-form-item class="margin-left-20">
            <el-button type="text" @click="addressFrame = true">
              选择地址
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item class="hk-addpaject-btn margin-l-25 margin-t-48 text-center">
          <el-button class round @click="onReleaseProject('jobFrom')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 职位标签弹窗 -->
    <postLabelPopup :postLabel="postLabel" @close="onClosLabelPopup" @onPostLabel="onPostLabel"></postLabelPopup>
    <!-- 职位亮点弹窗 -->
    <postHighlights :postStaff="postStaff" @close="onClosStaffPopup" @onPostStaff="onPostStaff"></postHighlights>
    <!-- 地址弹框 -->
    <el-dialog title="添加地址" class="address-dialog" :visible.sync="addressFrame" width="30%">
      <div></div>
      <el-form
        :model="addressFrom"
        ref="addressFrom"
        :label-position="labeladdressFrom"
        label-width="118px"
        class="demo-jobFrom demo-form-inline"
      >
        <el-form-item label="公司所在地" prop="selectedOptions">
          <el-cascader
            ref="myCascader"
            class="hk-addcont-address"
            :options="optionsaddress"
            v-model="addressFrom.selectedOptions"
            :separator="' '"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addressFrom.detail"></el-input>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type="primary" class="hk-address-postbtn" @click="getCityData(addressFrame)">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { regionData } from "element-china-area-data";
import { getPostCateTree, addUserPost, getPostdetail } from "@/api/recruit";
import postHighlights from "@/components/popup/post-highlights";
import postLabelPopup from "@/components/popup/post-label";
import {
  postState,
  mainSalary,
  validDay,
  workLife,
  minEdu
} from "@/config/constant";
export default {
  data() {
    var minSalary = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("最低金额不能为空"));
      } else {
        callback();
      }
    };
    var maxSalary = (rule, value, callback) => {
      let minSalary = this.jobFrom.min_salary + 10;
      let minsSalary = this.jobFrom.min_salary + 2;
      if (value === null) {
        callback(new Error("最高金额不能为空"));
      } else if (value <= this.jobFrom.min_salary) {
        callback(
          new Error("请选择[" + minsSalary + "k," + minSalary + "k]之间的薪资")
        );
      } else if (value >= minSalary) {
        callback(
          new Error("请选择[" + minsSalary + "k," + minSalary + "k]之间的薪资")
        );
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      labeladdressFrom: "right",
      id: 0,
      jobFrom: {
        name: "",
        cate_id: "",
        state: "", // 职位状态
        // 学历
        min_edu: null,
        // 技能要求
        skill_tag: [],
        // 工作类型
        work_type: null,
        // 工作经验
        work_life: null,
        // 工作亮点
        good_staff: [],
        // 所属部门
        departments: "",
        min_salary: null,
        max_salary: null,
        valid_day: "",
        // 添加地址
        address: [
          {
            area1_code: "",
            area1_name: "",
            area2_code: "",
            area2_name: "",
            area3_code: "",
            area3_name: "",
            detail: ""
          }
        ],
        // 描述
        desc: ""
      },
      // 职位类型
      workTypeList: [
        {
          value: 10,
          label: "全职"
        },
        {
          value: 20,
          label: "兼职"
        },
        {
          value: 30,
          label: "实习"
        }
      ],
      valid_day_list: validDay,
      // postState
      statelist: [
        {
          value: 10,
          label: "上线"
        },
        {
          value: 20,
          label: "稍后上线"
        }
      ],
      // departmentslist: [],
      min_edu_list: minEdu,
      work_life_list: workLife,
      // 月薪
      salary_list: mainSalary,
      cate_list: [],
      // 职位分类
      prostData: {
        value: "id",
        label: "cate_name",
        children: "children"
      },
      // 工作地址
      workaddress: "",
      postLabelFrame: false,
      postLabelStaff: false,
      addressFrame: false,
      addressLists: "",
      optionsaddress: regionData, // 存放城市数据
      area1_code: "",
      area1_name: "",
      area2_code: "",
      area2_name: "",
      area3_code: "",
      area3_name: "",
      // 职位标签数据
      formInline: {
        value: 1,
        postname: ""
      },
      postDetail: {
        theme: "snow"
      },
      // staff_list: [],
      addressFrom: {
        selectedOptions: "",
        detail: ""
      },
      // 职位亮点弹框
      postStaff: {
        eject: false,
        selectsPostStaff: []
      },
      postLabel: {
        eject: false,
        selectsPostLabel: []
      },
      // 地址显隐
      myAddressShow: true,
      // 表单验证
      rules: {
        cate_id: [
          { required: true, message: "请选择职位类别", trigger: "blur" }
        ],
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        state: [
          { required: true, message: "上线时间不能为空", trigger: "blur" }
        ],
        min_salary: [
          { required: true, message: "最低金额不能为空", trigger: "blur" },
          { required: true, validator: minSalary, trigger: "blur" }
        ],
        max_salary: [
          { required: true, message: "最高金额不能为空", trigger: "blur" },
          { required: true, validator: maxSalary, trigger: "blur" }
        ],
        address: [
          { required: true, message: "工作地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    quillEditor,
    postHighlights,
    postLabelPopup
  },
  created() {
    this.onPostList();
    this.id = this.$route.query.id;
    this.myAddressShow = false;
    this.jobFrom.address = [];
    if (this.id > 0) {
      this.onUserprjectpostData();
    }
  },
  mounted() {
  },
  methods: {
    // 获取省份
    getCityData(addressFrame) {
      let that = this;
      this.addressFrame = !addressFrame;
      this.$set(that, "area1_code", this.addressFrom.selectedOptions[0]);
      this.$set(that, "area2_code", this.addressFrom.selectedOptions[1]);
      this.$set(that, "area3_code", this.addressFrom.selectedOptions[2]);
      this.$set(
        that,
        "area1_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]
      );
      this.$set(
        that,
        "area2_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
      );
      this.$set(
        that,
        "area3_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]
      );
      // console.log('地区选择' + this.area1_code, this.area2_code, this.area3_code, this.addressFrom.detail)
      that.jobFrom.address.push({
        value:
          that.area1_name +
          this.area2_name +
          this.area3_name +
          this.addressFrom.detail,
        area1_code: that.area1_code,
        area1_name: that.area1_name,
        area2_code: that.area2_code,
        area2_name: that.area2_name,
        area3_code: that.area3_code,
        area3_name: that.area3_name,
        detail: that.addressFrom.detail,
        key: Date.now()
      });
      this.myAddressShow = true;
      // console.log(this.jobFrom.address)
    },
    // 提交新增请求
    onReleaseProject(jobFrom) {
      let that = this;
      let addressjson = JSON.stringify(that.jobFrom.address);
      // 职位标签
      let skillTagData = that.jobFrom.skill_tag.join(",");
      // 职位亮点
      let postStaffs = that.jobFrom.good_staff.join(",");
      let addPostData = {
        id: that.id,
        state: that.jobFrom.state,
        name: that.jobFrom.name,
        work_type: that.jobFrom.work_type == '' ? null : that.jobFrom.work_type,
        cate_id: that.jobFrom.cate_id[1] ? that.jobFrom.cate_id[1] : null,
        min_salary: that.jobFrom.min_salary == '' ? null : that.jobFrom.min_salary,
        max_salary: that.jobFrom.max_salary == '' ? null : that.jobFrom.max_salary,
        min_edu: that.jobFrom.min_edu == '' ? null : that.jobFrom.min_edu,
        work_life: that.jobFrom.work_life == '' ? null : that.jobFrom.work_life,
        valid_day: that.jobFrom.valid_day == '' ? null : that.jobFrom.valid_day,
        skill_tag: skillTagData,
        good_staff: postStaffs,
        desc: that.jobFrom.desc,
        address: addressjson
      };
      console.log(addPostData);
      this.$refs[jobFrom].validate(valid => {
        if (valid) {
          // alert('submit!');
          addUserPost(addPostData)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: res.msg,
                  type: "success",
                  showClose: true,
                  duration: 3000
                });
                this.$router.push({ path: "/user/org/post/manage" });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                  showClose: true,
                  duration: 3000
                });
              }
            })
            .catch(res => {
              this.$message({
                message: res.msg,
                type: "error",
                showClose: true,
                duration: 3000
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 请求招聘相关职位
    onUserprjectpostData() {
      console.log(this.id);
      getPostdetail(this.id).then(res => {
        // console.log("职位", JSON.stringify(res.data));
        this.jobFrom = res.data;
        this.id = res.data.id;
        let aa = JSON.stringify(res.data.cate_id);
        var shortName = aa.substring(0, 2);
        // console.log(shortName)
        // 字符串转数字
        shortName *= 1;
        let listcatr = [shortName, res.data.cate_id];
        this.$set(this.jobFrom, "cate_id", listcatr);
        this.jobFrom.cate_id = listcatr;
        // this.jobFrom.address = res.data.address;
        // 职位标签
        // 将字符串转换为数组
        this.jobFrom.skill_tag =
          res.data.skill_tag !== "" ? res.data.skill_tag.split(",") : [];
        this.jobFrom.good_staff =
          res.data.good_staff !== "" ? res.data.good_staff.split(",") : [];
        // this.work_type = res.data.work_type
        // 将数组去重
        let repeatRemovalArr = Array.from(new Set(res.data.address));
        this.jobFrom.address = [];
        repeatRemovalArr.forEach(item => {
          this.jobFrom.address.push({
            value:
              item.area1_name + item.area2_name + item.area3_name + item.detail,
            area1_code: item.area1_code,
            area1_name: item.area1_name,
            area2_code: item.area3_code,
            area2_name: item.area2_name,
            area3_code: item.area2_code,
            area3_name: item.area3_name,
            detail: item.detail,
            key: Date.now()
          });
        });
        console.log("最后的");
        if (this.jobFrom.address.value !== "") {
          this.myAddressShow = true;
        }
        console.log(this.jobFrom.address);
      });
    },
    // 删除
    onRemovePost(item) {
      var index = this.jobFrom.skill_tag.indexOf(item);
      if (index !== -1) {
        this.jobFrom.skill_tag.splice(index, 1);
      }
    },
    // 添加职位标签弹框按钮
    onAddPost() {
      this.postLabel.eject = true;
      this.postLabel.selectsPostLabel = this.jobFrom.skill_tag;
    },
    onClosLabelPopup() {
      this.postLabel.eject = false;
    },
    // 职位标签弹框
    onPostLabel(data) {
      // let that = this;
      // this.jobFrom.skill_tag = data;
      this.$set(this.jobFrom,'skill_tag',data)
      this.$set(this.postLabel,'selectsPostLabel',data)
      this.postLabel.eject = false
    },
    // 职位亮点
    onAddPostStaff() {
      this.postStaff.eject = true;
      // this.$emit('popup',false, id, name,)
      this.postStaff.selectsPostStaf = this.jobFrom.good_staff;
    },
    onClosStaffPopup(e) {
      this.postStaff.eject = false;
    },
    onPostStaff(data) {
      // console.log(data);
      this.jobFrom.good_staff = data;
    },
    onRemovePostStaff(item) {
      var index = this.jobFrom.good_staff.indexOf(item);
      if (index !== -1) {
        this.jobFrom.good_staff.splice(index, 1);
      }
    },
    // 添加新的地址
    removeDomain(item) {
      var index = this.jobFrom.address.indexOf(item);
      if (index !== -1) {
        this.jobFrom.address.splice(index, 1);
      }
    },
    // 职位分类
    onPostList(addressFrame) {
      // console.log('用于获取职位分类')
      getPostCateTree().then(res => {
        // console.log(res.data);
        this.$set(this, "cate_list", res.data);
      });
    },
    onMinSalary(jobFrom, val) {
      console.log("最小薪资");
      console.log(val);
      this.$refs.jobFrom.validateField("max_salary", valid => {
        if (valid === "" || valid === undefined || valid === null) {
          // console.log('验证通过')
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    onMaxSalary(jobFrom, val) {
      console.log("最高薪资");
      console.log(val);
      this.$refs.jobFrom.validateField("max_salary", valid => {
        if (valid === "" || valid === undefined || valid === null) {
          // console.log('验证通过')
          // alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  },
  watch: {}
};
</script>

<style lang="less">
@import "./add-post.less";
</style>
