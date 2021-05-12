import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify';
import {store} from "./store";


Vue.config.productionTip = false

Vue.prototype.$colors = require('./js/colors.json');


new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')

