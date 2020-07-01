<template>
  <div class="about-us">
    <div class="content about-us-content">
      <div class="company-img">
        <img src="/static/img/banner.png" fit="contain" lazy />
      </div>
      <div class="company-info">
        <div class="company-info-title">公司简介</div>
        <div class="company-info-english-title">Company Profile</div>
        <div class="company-introduce">
          <p class="padding-b-40">
            &#12288;&#12288;环科宝有限公司是集软件开发、环保论坛、
            独立自主的多功能平台和线下一对一市场商业模式为一体的医疗、
            健康专业性公司，因疫情大爆发的防疫需求而应运而生，由此在医疗、
            健康领域长期耕耘。
          </p>
          <p class="padding-b-40">
            &#12288;&#12288;益天医疗独立自主开发的B2C网站，由简体中文、
            繁体中文、英语、日语、德语、法语、俄语、葡萄牙语、西班牙语等
            国际常见语种组成。公司励志打造成为医疗、健康领域一流专业平台，
            为防止新冠病毒疫情在全球蔓延而贡献我们的一份力量，为人类的健
            康事业贡献一份力量而深感荣幸。
          </p>
          <p class="padding-b-40">
            &#12288;&#12288;公司的主要股东设立了“广州行度人工智能技术有限公司”，
            是一家专注于生态环境的生态链闭环平台建设的公司，相关技术已在贵阳
            重点环保公司研究开发了大半年的时间。股东会决定二家公司同步发展，广州益天
            医疗器械公司专注于医疗、健康，为新冠病毒疫情后的基础设施建设提供高效专业的
            运营。而行度人工智能技术公司为益天医疗技术公司提供平台、软件的技术支持。
          </p>
          <p>益天，为有益天下而生……</p>
        </div>
        <div class="contact-us-title">
          <div class="company-info-title">联系我们</div>
          <div class="company-info-english-title">Contact Us</div>
        </div>
        <div class="display-flex clearfix">
          <div class="location fl">
            <img src="/static/img/address.png" fit="contain" lazy />
          </div>
          <div class="company-info-muster fl">
            <div class="company-name">环科宝有限公司</div>
            <div class="company-contact-us">
              <div class="company-contact-us-mode">所在地址：</div>
              <div class="company-contact-us-info">广东省广州市番禺区市桥街道金悦大厦502</div>
            </div>
            <div class="company-contact-us">
              <div class="company-contact-us-mode">联系电话：</div>
              <div class="company-contact-us-info">020-31066085</div>
            </div>
            <div class="company-contact-us">
              <div class="company-contact-us-mode">企业官网：</div>
              <div class="company-contact-us-info">www.yimcmedical.com</div>
            </div>
            <div class="company-contact-us">
              <div class="company-contact-us-mode">电子邮箱：</div>
              <div class="company-contact-us-info">chenkw01@yitianmc.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>
<style lang="less" scoped>
.about-us-content {
  margin-top: 20px;
  .company-img img {
    width: 100%;
    height: 300px;
  }
  .company-info {
    padding: 67px 140px;
    .company-info-title {
      text-align: center;
      font-size: 24px;
      line-height: 24px;
      color: #333333;
      margin-bottom: 6px;
    }
    .company-info-english-title {
      font-size: 15px;
      line-height: 15px;
      text-align: center;
      color: #999999;
      margin-bottom: 56px;
    }
    .contact-us {
      margin-top: 110px;
      margin-bottom: 78px;
    }
    .company-introduce {
      font-size: 16px;
      line-height: 26px;
      color: #999999;
    }
    .location {
      width: 447px;
      height: 320px;
      margin-right: 87px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
    .company-info-muster {
      padding: 87px 0px 32px 0px;
      width: 296px;
      .company-name {
        font-size: 20px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 34px;
      }
      .company-contact-us {
        display: flex;
        margin-bottom: 19px;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
        font-family: Microsoft YaHei;
        line-height: 26px;
        .company-contact-us-mode {
          width: 90px;
        }
        .company-contact-us-info {
          width: 206px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>