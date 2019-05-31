import _config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? _config.baseUrl.dev : _config.baseUrl.pro

const request = (config) => {

  config.url = /^(http|https)/.test(config.url) ? config.url : baseUrl + config.url
  config.fail = () => {
    console.warn('error')
  }
  
  wx.request(config)
}

export default request
