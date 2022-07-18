import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (to.path === '/login' && token) {
    return next('/')
  }
  if (to.path !== '/login' && !token) {
    return next('/login')
  }
  next()
})
