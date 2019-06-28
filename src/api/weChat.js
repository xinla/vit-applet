import request from '@/utils/request'
import config from '@/config'

const controller = config.controllers.wechat

/**
 * 保存微信公海客户添加
 * @param {*} data 
 */
export const saveUser = (data, successCallback, failedCallback) => {
  return request({
    url: controller,
    method: 'post',
    data,
    successCallback, 
    failedCallback
  })
}

/**
 * 查询
 * @param {*} data 
 */
export const consult = (data, successCallback, failedCallback) => {
  return request({
    url: controller,
    method: 'put',
    data,
    successCallback,
    failedCallback
  })
}

export const update = (data, successCallback, failedCallback) => {
  return request({
    url: controller + '/update',
    method: 'put',
    data,
    successCallback,
    failedCallback
  })
}

/**
 * 判断是否咨询过
 * @param {*} data 
 * @param {*} successCallback 
 * @param {*} failedCallback 
 */
export const judgeAsked = (data, successCallback, failedCallback) => {
  return request({
    url: controller + `/isAsked`,
    method: 'get',
    data: {
      nickName: data
    },
    successCallback,
    failedCallback
  })
}

/**
 * 发送验证码
 * @param {*} phone 必须
 */
export const getCode = (data, successCallback, failedCallback) => {
  return request({
    url: controller + `/sms`,
    method: 'post',
    data: {
      phone: data
    },
    successCallback,
    failedCallback,
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
