import _config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? _config.baseUrl.dev : _config.baseUrl.pro

const request = (config) => {

  config.url = /^(http|https)/.test(config.url) ? config.url : baseUrl + config.url
  // config.fail = () => {
  //   console.warn('error')
  // }
  config.complete = (res) => {
    // console.log(res)
    const { data, statusCode } = res
    if (statusCode === 200 && data.code === 0) {
      let _res = JSON.stringify(data.result) ? data.result : data.data
      config.successCallback && config.successCallback(_res)
    } else {
      console.warn('error', res)
      wx.showToast({
        title: res.data.data || res.data.message,
        icon: "none",
        duration: 2000
      });
      config.failedCallback && config.failedCallback(res)
    }
  }
  
  wx.request(config)
}

export default request
