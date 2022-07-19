import { createStore } from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import tagsView from './modules/tagsView'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user,
    menu,
    tagsView
  }
})
