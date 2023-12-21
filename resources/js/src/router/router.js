import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('x_xsrf_token')
  if (!token) {
    if (to.path === '/' || to.path === '/login' || to.path === '/register') {
      return next()
    } else {
      return next({
        path: '/login',
      })
    }
  }  
  if (to.path === '/login' || to.path === '/register' && token) {
    return next({
      path: '/',
    })
  }
  else next()
})

export default router