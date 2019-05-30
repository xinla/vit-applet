<template>
  <div class="wrap">
    <div class="input-wrap">
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          姓名
        </div>
        <input class="input" type="text" placeholder="请输入姓名">
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          手机号
        </div>
        <input class="input" type="text" placeholder="请输入手机号">
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          验证码
        </div>
        <div>
          <input class="input code" type="text" placeholder="请输入验证码">
          <span class="get" @click="getCode">获取</span>
        </div>
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          现居住地
        </div>
        <input class="input" type="text" placeholder="请输入现居住地">
      </div>
    </div>

    <div class="bottton" @click="submit">立即估值</div>

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
import {saveUser, getInfo, getCode} from '@/api/seasUser'

export default {
  data() {
    return {
      isMask: false
    };
  },
  mounted() {},
  methods: {
    getCode() {},
    submit() {
      this.isMask = true
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
  color: #888;
  font-size: 12px;
  line-height: 20px;
}
.ok{
  padding-top: 12px;
  border-top: 1rpx solid #ddd;
}
</style>
