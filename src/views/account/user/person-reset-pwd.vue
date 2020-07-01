<template>
  <div class="rerieve-pwd">
    <div class="content">
      <div class="tiling">
        <div class="tiling">
          <div class="font-30 text-bold margin-r-20 text-green"><router-link to="/">环科宝</router-link></div>
          <div class="platform-introduce  text-blacks">水与环境行业专业信息服务平台</div>
        </div>
        <div class="title text-blacks">找回密码</div>
      </div>
      <div class="form form-border">
        <el-form ref="form" :rules="rules" :model="form">
          <div class="return-login" @click="onReturnLogin">
            返回登陆
            <img src="../../../assets/image/icon-return.png" class="icon-return" />
          </div>
          <el-form-item prop="phone">
            <el-input v-model="form.phone" type="tel" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入注册时使用的手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="form.code" type="text" maxlength="6" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请输入短信验证码">
              <template slot="append" class="code">
                <!-- <div @click="onSend">获取验证码</div> -->
                <el-button type="text" v-if="showtime === null" @click="onSend(form)">获取验证码</el-button>
                <el-button type="text" class="hk-disabled" v-else disabled>{{showtime}}</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off" auto-complete="new-password" readonly onfocus="this.removeAttribute('readonly')" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password" v-model="form.checkPass" readonly onfocus="this.removeAttribute('readonly')" autocomplete="off" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item class="button">
            <el-button type="primary" @click="onConfirm('form')" class="confirm-button">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="text-center text-line padding-t-85 login-footer-info line-80">版权所有：广州行度人工智能技术有限公司&#12288;&#12288;联系电话：13984128312</div>
  </div>
</template>
<script>
import { registerReset, registerVerify } from "@/api/user";
import cookie from "@/utils/store/cookie";
export default {
  data() {
    var validateMobilePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不可为空"));
      } else {
        if (value !== "") {
          var reg = /^1[3456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的手机号码"));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("请输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        phone: "",
        pass: "",
        checkPass: "",
        code: ""
      },
      // 计时器,注意需要进行销毁
      timeCounter: null,
      // null 则显示按钮 秒数则显示读秒
      showtime: null,
      // 记住密码checked
      checked: false,
      // 获取验证码的cookie
      isCookie: null,
      rules: {
        phone: [
          { required: true, validator: validateMobilePhone, trigger: "blur" }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 4 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#fff')
    this.getCookieTime();
    let that = this
    let phone = cookie.get('phone')
    that.form.phone = phone
  },
  beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
  },
  methods: {
    //   返回登录
    onReturnLogin() {
      this.$router.push({ path: "/account/login" });
    },
    // 确认按钮
    onConfirm(form) {
      // console.log(form);
      let phone = this.form.phone;
      let password = this.form.pass;
      let code = this.form.code;
      let that = this
      // console.log(phone, password, code);
      this.$refs[form].validate(valid => {
        if (valid) {
          registerReset({ phone: phone, password: password, code: code })
            .then(res => {
              if (res.status === 200) {
                var t = parseInt(5);
                var tTime = 5
                let tiem = window.setInterval(function() {
                  if (t > 0) {
                      tTime = t
                  } else {
                    that.onReturnLogin();
                    window.clearInterval(tiem)
                  }
                  t--;
                }, 1000)
                this.$message({
                  message: "倒数"+tTime+"s后跳转到登录页",
                  type: "success",
                  showClose: true,
                  duration: 5000
                });
                cookie.remove("resetCodeTime")
                cookie.remove('phone')
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
        }
      });
    },
    // 获取cookie中的时间
    getCookieTime() {
      let getCookieTime = cookie.get("resetCodeTime");
      // console.log(getCookieTime);
      if (getCookieTime !== null) {
        this.isCookie = getCookieTime;
        this.resetCodeTime = false;
      } else {
        this.isCookie = null;
      }
    },
    // 倒计时显示处理
    countDownText(s) {
      this.showtime = `${s}s后重新获取`;
    },
    // 倒计时 60秒 不需要很精准
    countDown(times) {
      // console.log(times);
      const that = this;
      // 时间间隔 1秒
      const interval = 1000;
      let count = 0;
      that.timeCounter = setTimeout(countDownStart, interval);
      function countDownStart() {
        if (that.timeCounter == null) {
          return false;
        }
        count++;
        // 存储resetCodeTime到cookie中
        cookie.set("resetCodeTime", times - count + 1);
        // 在resetCodeTime中存储每次变化时间
        that.countDownText(times - count + 1);
        // console.log(this.showtime)
        if (count > times) {
          clearTimeout(that.timeCounter);
          cookie.remove("resetCodeTime");
          that.showtime = null;
        } else {
          cookie.set("resetCodeTime", times - count + 1);
          that.timeCounter = setTimeout(countDownStart, interval);
        }
      }
    },
    onSend(form) {
      // console.log(form);
      let that = this;
      if (form.phone == "") {
        // console.log(this.)
        that.$message.error("手机号不能为空！");
      } else {
        if (form.phone !== "") {
          var reg = /^1[3456789]\d{9}$/;
          if (!reg.test(form.phone)) {
            // callback(new Error('请输入有效的手机号码'))
            // that.$message.error('请输入有效的手机号码')
          } else {
            let type = "reset_pwd";
            registerVerify({ phone: form.phone, type: type })
              .then(res => {
                that.countDown(60);
                if (res.status === 200) {
                  // console.log("验证码发送成功");
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
              })
              .catch(res => {
                this.$message({
                  message: res.msg,
                  type: "error",
                  showClose: true,
                  duration: 3000
                });
              });
          }
        }
      }
    }
  },
  watch: {
    isCookie: function() {
      if (this.isCookie !== null) {
        this.countDown(this.isCookie);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '~@/css/account.less';
@import "./person-reset-pwd.less";
</style>