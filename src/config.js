export default {
  baseUrl: {
    // dev: 'https://gateway.visualinsur.cn:8888', // 虚拟机192.168.1.28
    // dev: 'http://192.168.1.150:8888', // 本地
    dev: 'http://192.168.1.28:8083', // liushuang~本地
    pro: 'https://gateway.visualinsur.cn:8888'
  },

  controllers: {
    // wechat: '/api/credit-server/weChat',
    wechat: '/weChat', // 本地
  }
}