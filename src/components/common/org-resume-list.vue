<template>
  <ul class="resurm-list">
    <li v-for="(resume,resumeIndex) in resumeList" :key="resumeIndex" class="resurm-content">
      <div class="box">
        <div class="post-name">应聘岗位：{{resume.post_name}}</div>
        <div class="delivery-time">投递时间：{{resume.add_time}}</div>
      </div>
      <div class="box">
        <div class="resurm-info">
          <div class="block">
            <el-avatar
              :size="68"
              :src="resume.avatar === '' ? require('@/assets/image/user_img.png') : user_img + resume.avatar"
            ></el-avatar>
            
          </div>
          <div class="hk-resurm-text">
            <div
              class="name"
              @click="onResumeDetails(resume.delivery_status,resume)"
            >
              <span class="name-text">{{resume.real_name}}</span>
              <span class="last_login_time">{{resume.last_login_time}}</span>
            </div>
            <div
              class="details"
            >{{resume.work_date | onWorkType}}/{{resume.max_user_edu | onEdu}}/{{resume.birthday}}岁</div>
          </div>
        </div>
        <div class="tiling select">
          <el-button
            @click="onDeliveryStatus(50,resume)"
            class="select-button"
            :class="resume.delivery_status == 50 ? 'selections':'no'"
          >不合适</el-button>
          <el-button
            @click="onDeliveryStatus(30,resume)"
            class="select-button"
            :class="resume.delivery_status == 30 ? 'selections':'no'"
          >感兴趣</el-button>
          <el-button
            @click="onDeliveryStatus(40,resume)"
            class="select-button"
            :class="resume.delivery_status == 40 ? 'selections':'no'"
          >邀面试</el-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { minEdu, workLife, age } from "@/config/constant";
import utils from "@/utils/index.js";
export default {
  filters: {
    onWorkType(value) {
      var obj = utils.findObj(workLife, value);
      return obj.label;
    },
    onEdu(value) {
      var obj = utils.findObj(minEdu, value);
      return obj.label;
    }
  },
  props: {
    resumeList: Array
  },
  data() {
    return {
      user_img: 'http://cdn.65ph.com/'
    };
  },
  methods: {
    onDeliveryStatus(e, item) {
      // this.state(state);
      this.$emit("resumeItem", e, item);
      // this.$emit("resumeItem", this.citySelect);
    },
    onResumeDetails(e, item) {
      this.$router.push({
        path: "/user/org/talentpool/resumedetails",
        query: {
          resume_id: item.resume_id,
          post_id: item.post_id,
          delivery_id: item.delivery_id,
          delivery_status: e
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.resurm-list {
  width: 100%;
  .resurm-content {
    // padding: 15px 30px 30px 30px;
    padding: 0px 14px 19px 10px;
    border: 1px solid #eee;
    margin-bottom: 20px;
    cursor: pointer;
    .box {
      display: flex;
      align-items: center;
      margin-top: 5px;
      letter-spacing: 1.5px;
      &:first-child {
        margin-top: 0;
      }
      .post-name {
        margin-left: 0;
        margin-right: auto;
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
      }
      .delivery-time {
        margin-left: auto;
        margin-right: 0;
        font-size: 12px;
        color: #999999;
        line-height: 40px;
      }
      .resurm-info {
        display: flex;
        align-items: center;
        .hk-resurm-text {
          height: 68px;
        }
        .block {
          margin-top: 0px;
          text-align: right;
          margin-right: 20px;
          height: 68px;
        }
        .name {
          font-size: 14px;
          line-height: 32px;
          font-weight: 700;
          padding-top: 8px;
          font-family: Microsoft YaHei;
          color: rgba(51, 51, 51, 1);
          .name-text {
            &:hover {
              color: #05d797;
            }
          }
          .last_login_time {
            color: #05d797;
            font-size: 12px;
            margin-left: 15px;
            margin-top: auto;
            margin-bottom: 0;
          }
        }
        .details {
          color: #999999;
          font-size: 12px;
        }
      }
      .select {
        margin-left: auto;
        margin-right: 0;
        .select-button {
          margin-left: 20px;
          width: 64px;
          height: 26px;
          border: 1px solid rgba(13, 199, 142, 1);
          border-radius: 13px;
          font-size: 12px;
          text-align: center;
          padding: 0;
          line-height: 23px;
          cursor: pointer;
          &:hover {
            color: #05d797;
            border: 1px solid #05d797;
          }
          // &:last-child {
          //     color: #fff;
          //     background-color: #0DC78E;
          // }
        }
        .selections {
          color: #fff;
          background-color: #05d797;
          border: 1px solid #05d797;
          &:hover {
            color: #fff;
          }
        }
        .no {
          color: #0dc78e;
          border: 1px solid #0dc78e;
        }
      }
    }
  }
}
</style>