import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request({
    url: '/auth/login',
    data,
    method: 'post'
  })
}

// 获取用户信息
export const getUserInfo = (data) => {
  return request({
    url: '/auth/current',
    method: 'get',
    data
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 注册
export const register = (data) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

// 找回密码
export const findPassword = (data) => {
  return request({
    url: '/changePwd',
    method: 'post',
    data
  })
}

// 修改用户信息
export const editInfo = (data) => {
  return request({
    url: '/update',
    method: 'post',
    data
  })
}
