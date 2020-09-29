import Cookies from 'js-cookie'

const TokenKey = 'token'
const InfoKey = 'userInfo'

// Token
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 用户信息
export function getInfo() {
  return typeof (Cookies.get(InfoKey)) === 'string' ? JSON.parse(Cookies.get(InfoKey)) : Cookies.get(InfoKey)
}

export function setInfo(userInfo) {
  return Cookies.set(InfoKey, userInfo)
}

export function removeInfo() {
  return Cookies.remove(InfoKey)
}
