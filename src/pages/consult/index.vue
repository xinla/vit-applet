<template>
  <div class="wrap">
    <div class="input-wrap">
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          姓名
        </div>
        <input class="input" type="text" v-model="form.name" @blur="onBlur" placeholder="请输入姓名" />
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          手机号
        </div>
        <input class="input" type="text" v-model="form.phone" @blur="onBlur" placeholder="请输入手机号" />
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          验证码
        </div>
        <div>
          <input
            class="input code"
            type="text"
            v-model="form.code"
            @blur="onBlur"
            placeholder="请输入验证码"
          />
          <span v-if="isCoding" class="count-down">{{second}}</span>
          <span v-else class="get" @click="getCode">获取</span>
        </div>
      </div>
      <div class="input-item">
        <div>
          <span class="yellow">*</span>
          现居住地
        </div>
        <picker
          mode="region"
          @change="bindRegionChange"
          :value="region"
          @click="clearTimer"
        >
          <view
            class="picker"
          >{{region[0] ? (region[0] + '-' + region[1] + '-' + region[2]) : '请选择现居住地'}}</view>
        </picker>
      </div>
    </div>
    <!-- <div class="tip" v-show="tip">{{tip}}</div> -->
    <!-- <button class="bottton" :disabled="!isAll" @click="submit"> 确认信息 </button> -->
    <div class="bottton" :class="{disabled: !isAll}" @click="submit">确认信息</div>

    <div class="mask" v-if="isMask">
      <div class="cc">
        <div class="title">提示</div>
        <div class="message">
          专属客服即将与您联系
          <br />请保持电话畅通
        </div>
        <div class="ok yellow" @click="isMask = false">好的</div>
      </div>
    </div>

    <Toast v-model="isToast" :message="tip" />
  </div>
</template>

<script>
import { saveUser, consult, getCode, update } from "@/api/weChat";
import store from "@/store";

export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        code: "",
        provinceCode: 0,
        cityCode: 0,
        regionCode: 0
      },
      isMask: false,
      isCoding: false,
      second: 60,
      isAll: false,
      tip: "",
      region: ["", "", ""],
      isToast: false,
      code: undefined,
      timer: ""
    };
  },
  mounted() {
    this.form.phone = store.state.phone;

    // this.isCoding = true;
    // this.timer = setInterval(() => {
    //         this.second--;
    //         if (this.second <= 0) {
    //           this.isCoding = false;
    //           this.second = 60;
    //           clearInterval(this.timer);
    //         }
    //       }, 1000);
  },
  methods: {
    getCode() {
      this.tip = "";
      if (this.form.phone.length === 11) {
        getCode(
          this.form.phone,
          res => {
            // console.log(res);
            this.showToast("验证码已发送");
            this.isCoding = true;
            this.code = res.code;
            this.timer = setInterval(() => {
              this.second--;
              if (this.second <= 0) {
                this.isCoding = false;
                this.second = 60;
                clearInterval(this.timer);
              }
            }, 1000);
          },
          // error => {
          //   this.showToast();
          // }
        );
      } else {
        this.showToast("手机号格式错误");
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
      if (!this.isAll) {
        return;
      }
      if (this.code != this.form.code) {
        this.showToast("验证码错误");
        return;
      }
      this.form.id = store.state.userId;
      consult(
        this.form,
        res => {
          this.isMask = true;
          store.state.isCommit = true;
          // console.log(store.state.isCommit);
          this.showToast("咨询成功，请等待客服联系");
          wx.switchTab({ url: "/pages/index/main" });
          // wx.navigateBack({delta: 1})
        },
        // error => {
        //   this.showToast(error.data.data || error.data.message);
        // }
      );
    },
    onBlur() {
      // console.log('blur')
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          // let temp = this.form[key].replace(/ /g, '')
          // console.log(key, this.form[key])
          if (this.form[key] && this.form[key].replace(/ /g, "")) {
            this.isAll = true;
          } else {
            this.isAll = false;
            return;
          }
        }
      }
    },
    bindRegionChange(e) {
      this.timer = setInterval(() => {
        this.second--;
        if (this.second <= 0) {
          this.isCoding = false;
          this.second = 60;
          clearInterval(this.timer);
        }
      }, 1000);

      // console.log("picker发送选择改变，携带值为", e.target.value);
      this.region = e.target.value;
      this.form.provinceCode = e.target.code[0];
      this.form.cityCode = e.target.code[1];
      this.form.regionCode = e.target.code[2];
      this.onBlur();
      // console.log(e.target.code)
    },
    showToast(mes = "请求失败") {
      this.isToast = true;
      this.tip = mes;
    },
    clearTimer() {
      clearInterval(this.timer);
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
.input {
  text-align: right;
}
.code {
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
.disabled {
  background: #ddd;
  color: #fff;
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
  color: #bbb;
  font-size: 12px;
  line-height: 20px;
}
.ok {
  padding-top: 12px;
  border-top: 1rpx solid #ddd;
}
.count-down {
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
.tip {
  margin: 30rpx;
  color: #f00;
  font-size: 12px;
}
.picker {
  color: #888;
}
</style>
