import _config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? _config.baseUrl.dev : _config.baseUrl.pro

const request = (config) => {

  config.url = /^(http|https)/.test(config.url) ? config.url : baseUrl + config.url
  // config.fail = () => {
  //   console.warn('error')
  // }
  config.complete = (res) => {
    console.log(res)
    const { data, status } = res
    if (status === 200 && data.code === 0) {
      config.successCallback(data.result)
    } else {
      console.warn('error')
    }
  }
  
  wx.request(config)
}

export default request
