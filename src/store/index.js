import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // vuex 持久化
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },

  getters: {

  },

  mutations: {
    //
  },

  actions: {
    //
  },

  // vuex全局持久化配置
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],

  // 引入模块
  modules: {
    user
  }
})
