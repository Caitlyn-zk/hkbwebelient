<template>
  <div class="levitate">
    <div class="option">
      <router-link to="/aboutus">
        <div class="option-name">关于我们</div>
      </router-link>
    </div>
    <div class="option">
      <el-popover placement="left" trigger="hover" width="96px">
        <img
          src="../../../static/img/footer_QR_code.png"
          style="margin-bottom: -4px;"
          alt
          class="qr-code"
        />
        <div slot="reference" class="option-name">公众帐号</div>
      </el-popover>
    </div>
    <div class="option">
      <el-popover placement="left" trigger="hover">
        <div class="contact-way">
          <div class="qq" @click="onQQ">
           <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=471182971&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:471182971:51" alt="环科宝客服" title="环科宝客服"/></a>
            <!-- <div>{{qq}}</div> -->
          </div>
          <div class="wx" @click="onWinXin">
            <a href="https://wx.qq.com/">
              <img src="/static/img/weixin.png" alt />
            </a>
            <div>{{wx}}</div>
          </div>
        </div>
        <div slot="reference" class="option-name">联系我们</div>
      </el-popover>
    </div>
    <div class="option">
      <div class="option-name" @click="onReport">意见反馈</div>
    </div>
    <feedbackPopup :feedback="feedback" @close="onCloseReportPopup"></feedbackPopup>
    
  </div>
</template>
<script>
import feedbackPopup from "@/components/popup/feedback";
export default {
  data() {
    return {
      feedback:{
        eject: false
      },
      qq: '471182971',
      wx: '18230812577'
    };
  },
  components: {
    feedbackPopup
  },
  methods: {
    // 举报弹框
    onReport(e) {
      this.feedback.eject = true;
    },
    onCloseReportPopup(e) {
      this.feedback.eject = false;
    },
    onQQ () {
      // alert('点击了qq')
      // console.log('点击了qq')
    },
    onWinXin () {
      // alert('点击了qq')
      // console.log('点击了qq')
    }
  }
};
</script>
<style lang="less" scoped>
.levitate {
  position: fixed;
  right: 0;
  top: 30%;
  width: 40px;
  /* border: 1px solid red; */
}
.el-backtop {
    bottom: 100px !important;
  }
.levitate .el-button {
  background: #f5f5f5 !important;
  width: 40px !important;
}
.levitate .option {
  margin-bottom: 50px;
}
.levitate .option-name {
  width: 40px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #999999;
  padding: 5px;
  text-align: center;
  cursor: pointer;
}
.levitate .option-name:hover {
  background-color: #0bd094;
  color: #fff;
}
.qr-code {
  width: 96px;
  height: 96px;
  cursor: pointer;
}
.el-popover {
  height: 96px !important;
}

.contact-way {
  display: flex;
  cursor: pointer;
}
.contact-way .qq {
  display: flex;
  align-items: center;
}
.contact-way .wx {
  margin-left: 23px;
  display: flex;
  align-items: center;
}
.contact-way img {
  margin-right: 7px;
  // width: 24px;
  height: 31px;
}
</style>