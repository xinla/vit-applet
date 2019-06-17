<template>
  <div class="wrap">
    <div class="input-wrap">
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          姓名
        </div>
        <input class="input" type="text" v-model="form.name" @blur="onBlur" placeholder="请输入姓名">
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          手机号
        </div>
        <input class="input" type="text" v-model="form.phone" @blur="onBlur" placeholder="请输入手机号">
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          验证码
        </div>
        <div>
          <input class="input code" type="text" v-model="form.code" @blur="onBlur" placeholder="请输入验证码">
          <span v-if="isCoding" class="count-down">{{second}}</span>
          <span v-else class="get" @click="getCode">获取</span>
        </div>
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          现居住地
        </div>
        <input class="input" type="text" v-model="form.area" @blur="onBlur" placeholder="请输入现居住地">
      </div>
    </div>
      <div class="tip" v-show="tip">
        {{tip}}
      </div>
<!-- <button class="bottton" :disabled="!isAll" @click="submit"> 确认信息 </button> -->
    <div class="bottton" :class="{disabled: !isAll}" @click="submit">确认信息</div>

    <div class="mask" v-if="isMask">
      <div class="cc">
        <div class="title">提示</div>
        <div class="message">
          专属客服即将与您联系
          <br>请保持电话畅通
        </div>
        <div class="ok yellow" @click="isMask = false">好的</div>
      </div>
    </div>
  </div>
</template>

<script>
import {saveUser, getInfo, getCode} from '@/api/weChat'
import store from '@/store'

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        code: '',
        area: '',
      },
      isMask: false,
      isCoding : false,
      second: 60,
      isAll: false,
      tip: ''
    };
  },
  mounted() {},
  methods: {
    getCode() {
      this.tip = ''
      if (this.form.phone.length === 11) {
        getCode(this.form.phone, () => {
          this.isCoding = true
          let timer = setInterval(() => {
            this.second--
            if (this.second <= 0) {
              this.isCoding = false
              clearInterval(timer)
            }
          }, 1000)
          })
      } else {
        this.tip = '手机号格式错误'
      }
        // wx.getLocation({success: (res) => {
        //   console.log(res)
        //   let { latitude, longitude } = res
        //   wx.openLocation({
        //     latitude, longitude, success: (_res) => {
        //        console.log(_res)
        //     }
        //   })
        // }})
    },
    submit() {
      // console.log(this.form)      
      this.isAll && saveUser(this.form, () =>{
        this.isMask = true
        store.state.isCommit = true
        console.log(store.state.isCommit)
        wx.switchTab({url: '/pages/index/main'})
        // wx.navigateBack({delta: 1})
      })
    },
    onBlur() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          // let temp = this.form[key].replace(/ /g, '')
          // console.log(temp)
          if (this.form[key].replace(/ /g, '')) {
            this.isAll = true
          } else {
            this.isAll = false
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.wrap {
  height: 100vh;
  background: #f2f2f2;
}
.yellow {
  color: #ff9b48;
}
.input-wrap {
  padding: 0 15px;
  line-height: 50px;
  background: #fff;
}
.input-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #dbdbdb;
}
.input-item:nth-child(4) {
  border: 0;
}
.input{
  text-align: right;
}
.code{
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
.get {
  padding: 0px 5px;
  border: 1rpx solid #ffb252;
  color: #ffb252;
  border-radius: 5px;
  font-size: 10px;
}
.bottton {
  margin: 20px 15px;
  color: #fff;
  text-align: center;
  line-height: 45px;
  height: 45px;
  background: linear-gradient(to right, #ff8b41, #ffb252);
  border-radius: 8px;
}
.disabled{
  background: #ddd;
  color: #fff;
}
/* 提示框 */
.cc{
  width: 70%;
  background: #fff;
  text-align: center;
  border-radius: 8px;
}
.cc .title, .ok{
  margin: 12px 0;
}
.message{
  color: #bbb;
  font-size: 12px;
  line-height: 20px;
}
.ok{
  padding-top: 12px;
  border-top: 1rpx solid #ddd;
}
.count-down{
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align-last: center;
  background: #ddd;
  border-radius: 50%;
  color: #fff;
  vertical-align: middle;
}
.tip{
  margin: 30rpx;
  color: #f00;
  font-size: 12px;
}
</style>
