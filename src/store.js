import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCommit: false
  },
  mutations: {
    isCommit: (state, data) => {
      state.isCommit = data
    }
  }
})

