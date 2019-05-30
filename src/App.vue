<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
div{
  color: #444;
  font-size: 14px;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
/* common class */
/*bfc model*/
.bfc-o { overflow: hidden;position: relative;}
.bfc-d,.dib { display: inline-block; vertical-align: top;position: relative;}
.bfc-p { position: absolute; }
.fl { float: left; position: relative; }
.fr { float: right; position: relative; }
.al { text-align:left; }
.ac { text-align:center; }
.ar { text-align:right; }
.hide { display:none; }
/*top-fixed and bottom-fixed*/
.tf,.bf{
    position: fixed;
    width: 100%;
    height: 50px;
    z-index: 999;
}
.tf{top: 0;}
.bf{bottom: 0;}

/*mask*/
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(39, 39, 39, 0.76);
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 999999; 
}
/*center-center*/
.cc{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
/*t-o-h-e*/
.oe{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
