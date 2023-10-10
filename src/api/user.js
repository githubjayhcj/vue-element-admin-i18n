import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'adminWeb/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url: 'adminWeb/getUserInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  // return request({
  //   url: '/vue-element-admin/user/logout',
  //   method: 'post'
  // })
  return removeToken()
}
