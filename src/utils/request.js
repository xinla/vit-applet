import _config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? _config.baseUrl.dev : _config.baseUrl.pro

const request = (config) => {
  const url = /^(http|https)/.test(config.url) ? config.url : baseUrl + config.url

  const configReq = {
    url,
    fail: () => {
      console.warn('error')
    },
    success: (res) => {
      if (res && config.success) {
        config.success(res)
      } else {
        console.warn('warn')
      }
    }
  }
  
  const _configReq = Object(config, configReq)

  wx.request(_configReq)
}

export default request
