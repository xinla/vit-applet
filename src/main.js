import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// pages: [
//   '^pages/index/main'
// ]

const app = new Vue(App)
app.$mount()
