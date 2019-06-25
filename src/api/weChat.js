import request from '@/utils/request'
import config from '@/config'

const controller = config.controllers.wechat

/**
 * 保存微信公海客户添加
 * @param {*} data 
 */
export const saveUser = (data, successCallback) => {
  return request({
    url: controller,
    method: 'post',
    data,
    successCallback
  })
}

/**
 * 查询
 * @param {*} data 
 */
export const consult = (data, successCallback) => {
  return request({
    url: controller,
    method: 'put',
    data,
    successCallback
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
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 微信登录
 * @param {*} data 微信登录临时凭证
 * @param {*} successCallback 
 */
export const login = (data, successCallback) => {
  return request({
    url: controller + `/login`,
    data: {
      code: data
    },
    successCallback,
  })
}
