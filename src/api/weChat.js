import request from '@/utils/request'
import config from '@/config'

const controller = config.controllers.wechat

/**
 * 保存微信公海客户添加
 * @param {*} data 
 */
export const saveUser = (data, success) => {
  return request({
    url: controller,
    method: 'post',
    data,
    success
  })
}

/**
 * 查询
 * @param {*} data 
 */
export const getInfo = (data) => {
  return request({
    url: controller,
    method: 'put',
    data
  })
}

/**
 * 发送验证码
 * @param {*} phone 必须
 */
export const getCode = (data) => {
  return request({
    url: controller + `/sms`,
    method: 'post',
    data: {
      phone: data
    },
  })
}

/**
 * 微信登录
 * @param {*} data 微信登录临时凭证
 * @param {*} success 
 */
export const login = (data, success) => {
  return request({
    url: controller + `/login`,
    data: {
      code: data
    },
    success,
  })
}
