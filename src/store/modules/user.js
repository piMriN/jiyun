import UserApi from '../../api/user'
import { setItem, getItem, removeAllItem } from '../../utils/storage'

export default {
  namespaced: true,
  state: () => ({
    token: getItem('token') || '',
    userinfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await UserApi.login(payload)
        console.log(response)
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
    async logout({ commit }) {
      try {
        await UserApi.logout()
        commit('setToken', '')
        commit('setUserInfo', '')
        removeAllItem()
      } catch (error) {}
    }
  }
}
