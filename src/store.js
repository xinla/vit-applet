import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCommit: false,
    userId: '',
    phone: ''
  },
  mutations: {
    isCommit: (state, data) => {
      state.isCommit = data
    },
    userId: (state, data) => {
      state.userId = data
    }
  }
})

