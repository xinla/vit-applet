<template>
  <div>
    <div class="header">
      <img class="bg" src="/static/images/pic-background@2x.png" alt />
      <div class="nav-wrap">
        <div class="nav-link">
          <img class="nav-icon" src="/static/images/icon_chediya@2x.png" />
          车抵贷
        </div>
        <div class="nav-link">
          <img class="nav-icon" src="/static/images/icon_fangdiya@2x.png" />
          房抵贷
        </div>
        <div class="nav-link">
          <img class="nav-icon" src="/static/images/icon_xinyongdai@2x.png" />
          信用贷
        </div>
      </div>
    </div>

    <div class="title">
      <span class="line"></span>
      申请标准
    </div>

    <div class="main">
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png" />
        中国（不含港、澳、台）公民
      </div>
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png" />
        信誉良好、无恶意不良信用记录
      </div>
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png" />
        有本地有效居住、工作证明
      </div>
      <div class="condition">
        <img class="condition-icon" src="/static/images/point@2x.png" />
        本人名下有效资产证明／未抵押车辆／未抵押商品房等
      </div>

      <button
        v-if="value && !isCommit && isAuthorize"
        class="bottton"
        open-type="getPhoneNumber"
        lang="zh_CN"
        @getphonenumber="onGetPhoneNumber"
      >立即咨询</button>
      <div v-else-if="isCommit" class="bottton">等待客服联系</div>
      <div v-else class="bottton" @click="submit">立即咨询</div>

      <div class="agreen ac" v-if="!isCommit">
        <switch type="checkbox" @change="checkboxChange" />勾选即表示已阅读并同意
        <span class="yellow">
          <a href="../agreement/main">《融资居间服务委托授权书》</a>
        </span>
      </div>
    </div>
    <!-- 同意委托授权书弹窗 -->
    <div class="mask" v-if="isMask">
      <div class="cc">
        <div class="title">提示</div>
        <div class="message">
          请先阅读并同意
          <br />《融资居间服务委托授权书》
        </div>
        <div class="ok yellow" @click="isMask = false">好的</div>
      </div>
    </div>
    <!-- 授权提示弹窗 -->
    <div class="mask" v-if="isAuthorizeDialog">
      <div class="cc">
        <div class="title">提示</div>
        <div class="message">
          华圣百惠将请求获取您的基本信息
          <br />
        </div>
        <div class="botton-wrap">
          <div class="half" @click="isAuthorizeDialog = false">拒绝</div>
          <button
            class="yellow half"
            open-type="getUserInfo"
            lang="zh_CN"
            @getuserinfo="onGotUserInfo"
          >好的</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  saveUser,
  getCode,
  login,
  judgeAsked,
  decryptData
} from "@/api/weChat";
import store from "@/store";

export default {
  data() {
    return {
      value: false, // 是否同意协议
      isMask: false, // 遮罩层
      isAuthorize: true, // 用户基本信息是否授权给小程序
      isAuthorizeDialog: false, // 是否弹出授权框，
      code: ""
    };
  },
  computed: {
    isCommit() {
      return store.state.isCommit;
    }
  },
  mounted() {
    // 显示分享按钮
    wx.showShareMenu({
      withShareTicket: true
    });
    // 小程序版本检查更新
    const updateManager = wx.getUpdateManager();
    // updateManager.onCheckForUpdate(function(res) {
    //   // 请求完新版本信息的回调
    //   console.log(res.hasUpdate);
    // });
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否马上重启小程序？",
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    // updateManager.onUpdateFailed(function() {
    //   // 新的版本下载失败
    // });

    // 防止接口延迟
    wx.showLoading({
      mask: true
    });

    this.login(() => {
      let _this = this;
      // 判断用户是否授权
      wx.getUserInfo({
        lang: "zh_CN",
        success(res) {
          // console.log('userInfo ', res);
          let prams = {
            encryptedData: res.encryptedData,
            iv: res.iv,
            code: _this.code
          };
          _this.judge(prams);
        },
        fail(res) {
          wx.hideLoading();
          // console.log(res)
          _this.isAuthorize = false;
          _this.isAuthorizeDialog = true;
        }
      });
    });
  },
  methods: {
    submit() {
      if (!this.isAuthorize) {
        wx.showToast({
          title: "未获得授权，无法操作",
          icon: "none",
          duration: 2000
        });
        return;
      }
      if (this.value) {
      } else {
        this.isMask = true;
      }
    },
    checkboxChange(e) {
      this.value = e.target.value;
    },
    onGotUserInfo(e) {
      // console.log(2, e);
      this.isAuthorizeDialog = false;
      if (e.target.userInfo) {
        this.isAuthorize = true;

        let prams = {
          encryptedData: e.target.encryptedData,
          iv: e.target.iv,
          code: this.code
        };

        this.judge(prams);
      }
    },
    onGetPhoneNumber(e) {
      let _this = this;
      // if (!this.isAuthorize) {
      //   wx.showToast({
      //     title: "未获得授权，无法操作",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return;
      // }

      // console.log(e);

      if (e.target.iv) {
        // console.log("GetPhoneNumber: ", e);
        // 解析加密数据，获取用户手机号
        let prams = {
          encryptedData: e.target.encryptedData,
          iv: e.target.iv,
          code: this.code
        };

        wx.checkSession({
          success() {
            //session_key 未过期，并且在本生命周期一直有效
            // console.log("session_key 未过期，进入getPhone");
            decryptData(prams, res => {
              // console.log(res);
              store.state.phone = res.phoneNumber;
              if (store.state.userId) {
                wx.navigateTo({ url: "../consult/main" });
              } else {
                wx.showToast({
                  title: "系统忙，请稍后重试",
                  icon: "none"
                });
              }
            });
          },
          fail() {
            // console.log("session_key 已经失效");
            wx.showToast({
              title: "获取权限过期，请重试",
              icon: "none",
              duration: 2000
            });
            // session_key 已经失效，需要重新执行登录流程
            _this.login(); //重新登录
          }
        });
      } else {
        wx.showToast({
          title: "未获得授权",
          icon: "none",
          duration: 2000
        });
      }
    },
    login(callback) {
      let _this = this;
      wx.login({
        success(res) {
          // console.log(res)
          if (res.code) {
            _this.code = res.code;
            callback && callback();
          } else {
            // console.log("登录失败！" + res.errMsg);
          }
        }
      });
    },
    judge(prams) {
      decryptData(prams, res1 => {
        // console.log("decryptUserInfo: ", res1);
        // 判断是否提交
        judgeAsked(res1.unionId, res2 => {
          // console.log('isCommit: ', res2)
          if (res2) {
            store.state.isCommit = res2;
            wx.showToast({
              title: "您已咨询过",
              icon: "none",
              duration: 2000
            });
          } else {
            saveUser(res1, _res => {
              wx.hideLoading();
              store.state.userId = _res.id;
              // this.value = false;
              //  console.log('userId ', store.state.userId)
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.bg {
  position: absolute;
  width: 100%;
  top: -65px;
}
.nav-wrap {
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
.nav-icon {
  display: block;
  margin: 0 auto 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title {
  font-weight: 600;
}
.line {
  display: inline-block;
  width: 5px;
  height: 23px;
  background: #ff9b48;
  border-radius: 3px;
  margin-right: 20px;
  vertical-align: bottom;
}
.main {
  margin: 0 38px 0 35px;
}
.condition {
  margin: 20px 0;
  padding: 15px 0;
  position: relative;
}
.condition::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transform: skew(-15deg, 0);
  border-radius: 8px;
  z-index: -1;
}
.condition:nth-child(1)::after {
  background: linear-gradient(to right, #fffff5, #ffefae);
}
.condition:nth-child(2)::after {
  background: linear-gradient(to right, #f7fafe, #ecf4fc);
}
.condition:nth-child(3)::after {
  background: linear-gradient(to right, #fefaf6, #faecda);
}
.condition:nth-child(4)::after {
  background: linear-gradient(to right, #fffff5, #ffe6e6);
}
.condition:nth-child(4) {
  padding: 5px 0;
}
.condition:nth-child(4) .condition-icon {
  margin-top: 8px;
}
.condition-icon {
  float: left;
  width: 22px;
  height: 22px;
  margin: 0 8px 0 22px;
  vertical-align: middle;
  font-size: 16px;
}
.bottton {
  margin: 25px 0;
  color: #fff;
  text-align: center;
  line-height: 45px;
  height: 45px;
  background: linear-gradient(to right, #ff8b41, #ffb252);
  border-radius: 8px;
  font-size: 14px;
  border: 0;
}
.agreen {
  font-size: 11px;
  margin-bottom: 15px;
}
switch {
  transform: scale(0.6);
  width: 20px;
  height: 12px;
  vertical-align: sub;
  line-height: 30px;
}
.agreen .yellow {
  display: inline-block;
}
.yellow {
  color: #ff9b48;
}
/* 提示框 */
.cc {
  width: 70%;
  background: #fff;
  text-align: center;
  border-radius: 8px;
}
.cc .title,
.ok {
  margin: 12px 0;
}
.message {
  color: #888;
  font-size: 12px;
  line-height: 20px;
}
.ok {
  padding-top: 12px;
  border-top: 1rpx solid #ddd;
}
.half {
  display: inline-block;
  width: 50%;
  line-height: 40px;
  vertical-align: middle;
  background: #fff;
  border: 0;
  font-size: 14px;
  border-radius: 50px;
}
.botton-wrap {
  margin-top: 10px;
  border-top: 1px solid #ddd;
}
</style>
