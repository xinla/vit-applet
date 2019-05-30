<template>
  <div>
    
    <div class="header">
      <img class="bg" src="/static/images/pic-background@2x.png" alt="">
      <div class="nav-wrap">
        <div class="nav-link">
          <img class="nav-icon" src="/static/images/icon_chediya@2x.png">
          车抵贷</div>
        <div class="nav-link">
          <img class="nav-icon" src="/static/images/icon_fangdiya@2x.png">
          房抵贷</div>
        <div class="nav-link">
          <img class="nav-icon" src="/static/images/icon_xinyongdai@2x.png">
          信用贷</div>
      </div>
    </div>

    <div class="title">
      <span class="line"></span>
      申请标准
    </div>

    <div class="main">
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png">
        中国（不含港、澳、台）公民
      </div>
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png">
        信誉良好、无恶意不良信用记录
      </div>
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png">
        有本地有效居住、工作证明
      </div>
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png">
        本人名下有效资产证明／未抵押车辆／未抵押商品房等
      </div>
      <div class="bottton" @click="submit">
        立即咨询
      </div>
      <div class="agreen">
      <switch type="checkbox" @change="checkboxChange"/>
        勾选即表示已阅读并同意
        <span class="yellow"><a href="../agreement/main">《融资居间服务委托授权书》</a></span>
      </div>
    </div>

    <div class="mask" v-if="isMask">
      <div class="cc">
        <div class="title">
          提示
        </div>
        <div class="message">
          请先阅读并同意<br>
《融资居间服务委托授权书》
        </div>
        <div class="ok yellow" @click="isMask = false">好的</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      value: false,
      isMask: false
    }
  },
  created () {
  },
  methods: {
    submit () {
      if (this.value) {
        wx.navigateTo({url: '../consult/main'})
      } else {
        this.isMask = true
      }
    },
    checkboxChange (e) {
      this.value = e.target.value
    }
  }
}
</script>

<style scoped>
.bg{
  position: absolute;
  width: 100%;
  top: -65px;
}
.nav-wrap{
  display: flex;
  justify-content: space-between;
  margin: 50px 16px 30px;
  background: #fff;
  position: relative;
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0rpx -20rpx 120rpx #ffb252;
}
.nav-icon{
  display: block;
  margin: 0 auto 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title{
  font-weight: 600;
}
.line{
  display: inline-block;
  width:5px;
  height: 23px;
  background: #ff9b48;
  border-radius: 3px;
  margin-right: 20px;
  vertical-align: bottom;
}
.main{
  margin: 0 38px 0 35px;
}
.condition{
  margin: 20px 0;
  padding: 15px 0;
  position: relative;
}
.condition::after{
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transform: skew(-15deg,0);
  border-radius: 8px;
  z-index: -1;
}
.condition:nth-child(1)::after{
  background: linear-gradient(to right, #fffff5, #ffefae);
}
.condition:nth-child(2)::after{
  background: linear-gradient(to right, #f7fafe, #ecf4fc);
}
.condition:nth-child(3)::after{
  background: linear-gradient(to right, #fefaf6, #faecda);
}
.condition:nth-child(4)::after{
  background: linear-gradient(to right, #fffff5, #ffe6e6);
}
.condition:nth-child(4){
  padding: 5px 0;
}
.condition:nth-child(4) .condition-icon{
  margin-top: 8px;
}
.condition-icon{
  float: left;
  width: 22px;
  height: 22px;
  margin: 0 8px 0 22px;
  vertical-align: middle;
  font-size: 16px;
}
.bottton{
  margin: 25px 0;
  color: #fff;
  text-align: center;
  line-height: 45px;
  height: 45px;
  background: linear-gradient(to right, #ff8b41, #ffb252);
  border-radius: 8px;
}
.agreen{
  font-size: 11px;
  margin-bottom: 15px;
}
switch{
  transform:scale(0.6);
  width: 20px;
  height: 12px;
  vertical-align: sub;
  line-height: 30px;
}
.agreen .yellow{
  display: inline-block;
}
.yellow{
  color: #ff9b48;
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
