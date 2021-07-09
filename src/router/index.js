import Vue from 'vue'
import VueRouter from 'vue-router'
/* 导入自定义组件 */
import Login from 'components/login/Login.vue'
import Home from 'components/home/Home.vue'
import Welcome from 'components/welcome/Welcome.vue'
import Users from 'components/users/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//全局路由导航守卫控制页面的访问权限
router.beforeEach((to, from, next) => {
  //1，to 将要访问的路径  2，from代表从哪个路径跳转而来  3，next是一个函数表示放行next()/next('/login)表示强制跳转
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next();
})

export default router
