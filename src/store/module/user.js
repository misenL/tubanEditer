import { login, getUserInfo, logout, register, editInfo, findPassword } from '@/api/user'
import { getToken, setToken, removeToken, getInfo, setInfo, removeInfo } from '@/utils/cookies'

import { Message } from 'element-ui'

export default {
  state: {
    token: getToken(),
    userInfo: getInfo()
  },

  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setInfo(userInfo)
    }
  },

  getters: {

  },

  actions: {
    // 登录
    handleLogin({ commit }, form) {
      return new Promise((resolve, reject) => {
        login(form).then(res => {
          commit('setToken', res.data.access_token)
          resolve(res)
        }).catch(error => {
          Message.error(error.response.data.message)
          reject(error)
        })
      })
    },

    // 获取用户相关信息
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            commit('setUserInfo', res.data)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          Message.error(error.response.data.message)
          reject(error)
        }
      })
    },

    // 退出登录
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          commit('setToken', null)
          commit('setUserInfo', {})
          removeToken()
          removeInfo()
          sessionStorage.clear()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 用户注册
    handleRegister({ commit }, form) {
      return new Promise((resolve, reject) => {
        register(form).then(res => {
          resolve(res)
        }).catch(error => {
          Message.error(error.response.data.message)
          reject(error)
        })
      })
    },

    // 找回密码
    handleFindPassword({ commit }, form) {
      return new Promise((resolve, reject) => {
        findPassword(form).then(res => {
          resolve(res)
        }).catch(error => {
          Message.error(error.response.data.message)
          reject(error)
        })
      })
    },

    // 修改用户信息
    handleEditInfo({ commit }, form) {
      return new Promise((resolve, reject) => {
        editInfo(form).then(res => {
          resolve(res)
        }).catch(error => {
          Message.error(error.response.data.message)
          reject(error)
        })
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('setToken', null)
        removeToken()
        resolve()
      })
    },

    // remove userinfo
    resetInfo({ commit }) {
      return new Promise(resolve => {
        commit('setUserInfo', {})
        removeInfo()
        resolve()
      })
    }
  }
}

