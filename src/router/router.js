import Vue from 'vue';
import VueRouter from 'vue-router'

//import HomePage from '../home/HomePage'
import LoginPage from '../components/login'
import Foo from '../components/foo'

Vue.use(VueRouter)

const Home = { template: '<div>HOME</div>' }
//const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },

 //   { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
//    { path: '/register', component: RegisterPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
//const router = new VueRouter({
//  routes // short for `routes: routes`
//})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
//const app = new Vue({
//  router
//}).$mount('#app')


const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
});


router.beforeEach((to, from, next) => {
   console.log(to, from, next);
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/foo'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router;

