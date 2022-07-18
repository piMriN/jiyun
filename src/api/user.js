import request from '../utiles/request'

// 登录接口
const login = (data) => {
  return request({ url: 'admin/login', method: 'POST', data })
}

const getUserInfo = () => {
  return request({
    url: 'admin/getinfo',
    method: 'POST'
  })
}
export default {
  login,
  getUserInfo
}
