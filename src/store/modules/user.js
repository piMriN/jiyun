import UserApi from '../../api/user'
import { setItem, getItem, removeItem } from '../../utiles/storage'
export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setuserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem('userInfo', userInfo)
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await UserApi.login(payload)
        console.log(response, '123')
        commit('setToken', response.token)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async userInfo({ commit }) {
      try {
        const response = await UserApi.getUserInfo()
        console.log(response, 'userinfo')
        commit('setUserInfo', response)
      } catch (error) {
        console.log(error)
      }
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', '')
      removeItem()
    }
  }
}
