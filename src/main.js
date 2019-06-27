import Vue from 'vue'
import App from './App'

import Toast from "@/components/Toast";
Vue.component('Toast', Toast)

Vue.config.productionTip = false
App.mpType = 'app'

// pages: [
//   '^pages/index/main'
// ]

const app = new Vue(App)
app.$mount()
