<template>
  <span :endTime="endTime" :callback="callback" :endText="endText">
    <div v-for="(item, index) in [content]" :key="index" class="yimc-countDown" v-show="content !== endText">
      <!-- {{content}} -->
      <span class="text-gray font-14">剩余时间：</span>
      <span class="yimc-call-tiem-list">{{item.hour}}</span>
      <span>时:</span>
      <span class="yimc-call-tiem-list">{{item.min}}</span>
      <span>分:</span>
      <span class="yimc-call-tiem-list">{{item.sec}}</span>
      <span>秒</span>
    </div>
    <div v-show="content === endText">
      倒计时已结束
    </div>
  </span>
</template>
<script>
export default {
  data () {
    return {
      content: {
        day: '00',
        hour: '00',
        min: '00',
        sec: '00'
      }
    }
  },
  props: {
    endTime: {
      type: String
    },
    endText: {
      type: String,
      default: '已结束'
    },
    callback: {
      type: Function,
      default: null
    }
  },
  methods: {
    countdowm (timestamp) {
      let self = this
      let timer = setInterval(function () {
        let nowTime = new Date()
        let t = timestamp - nowTime.getTime()
        // console.log(timestamp)
        // console.log(nowTime.getTime())
        // console.log(timestamp - nowTime.getTime())
        // console.log(t)
        if (t > 0) {
          let day = Math.floor(t / 86400000)
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60)
          let sec = Math.floor((t / 1000) % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          let format = {}
          if (day > 0) {
            format = `${day} 天 ${hour} 小时 ${min} 分 ${sec} 秒`
          }
          if (day <= 0 && hour > 0) {
            format = `${hour} 小时 ${min} 分 ${sec} 秒`
          }
          if (day <= 0 && hour <= 0) {
            format = `${min} 分 ${sec} 秒`
          }
          self.content.day = day
          self.content.hour = hour
          self.content.min = min
          self.content.sec = sec
        } else {
          clearInterval(timer)
          self.content = self.endText
          self._callback()
        }
      }, 1000)
    },
    _callback () {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this)
      }
    }
  },
  mounted () {
    this.countdowm(this.endTime)
  }
}
</script>
<style lang='less' rel='stylesheet/less' scoped>
@import './count-down.less';
</style>
