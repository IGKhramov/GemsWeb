import Vue from 'vue';
import VueRouter from 'vue-router'

import LoginPage from '../components/login'
import Home from '../components/home'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: LoginPage },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV === 'production' ? '/gems/' : '/',
    routes
});


router.beforeEach((to, from, next) => {
   console.log(to, from, next);
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/foo'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log(authRequired, loggedIn)

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router;

