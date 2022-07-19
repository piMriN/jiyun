import request from '@/utils/request'

// 登录
const login = (data) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data
  })
}

// 统计数据1
const statistics1 = () => {
  return request({
    url: '/admin/statistics1',
    method: 'GET'
  })
}

// 统计数据2
const statistics2 = () => {
  return request({
    url: '/admin/statistics2',
    method: 'GET'
  })
}

// 统计数据3
const statistics3 = (data) => {
  return request({
    url: `/admin/statistics3?type=${data.type}`,
    method: 'GET'
  })
}

// 用户信息
const getUserInfo = () => {
  return request({
    url: '/admin/getinfo',
    method: 'POST'
  })
}

// 退出登录
const logout = () => {
  return request({
    url: '/admin/logout',
    method: 'POST'
  })
}

export default {
  login,
  statistics1,
  statistics2,
  statistics3,
  getUserInfo,
  logout
}
