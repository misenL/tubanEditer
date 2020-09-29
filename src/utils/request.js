import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message, Loading } from 'element-ui'

let loading
const request = axios.create({
  baseURL: '/api',
  timeout: 100000 // 请求超时时间
})

// request 拦截器, 发起请求之前做的事
request.interceptors.request.use(
  config => {
    // 让每个请求都携带 token
    if (store.state.user.token) {
      config.headers['Authorization'] = 'Bearer ' + store.state.user.token
    }
    // 添加Loading
    if (config.loading) {
      loading = Loading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: 'Loading ...'
      })
    }
    return config
  },
  error => {
    // 这里处理一些请求出错的情况
    Promise.reject(error)
  }
)

// 拦截去, 请求返回后做的事情
request.interceptors.response.use(
  response => {
    if (loading) loading.close()
    return response.data
  },
  error => {
    if (loading) loading.close()
    // 判断返回的状态值, 进行相对应的操作
    switch (error.response.status) {
      case 401:
        store.commit('setToken', null)
        store.commit('setUserInfo', {})
        router.push('/')
        Message('您还未登录或登录失效')
        break
      case 404:
        Message('访问错误')
        break
      case 422:
        Message.error(error.response.data.message)
        break
      case 500:
        Message('服务信息错误')
        break
      default:
        break
    }
    // 这列处理一些response出错的逻辑
    return Promise.reject(error)
  }
)

export default request

