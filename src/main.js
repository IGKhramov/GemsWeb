import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {gemStore} from "./store/gemstore";

Vue.config.productionTip = false

Vue.prototype.$colors = require('./js/colors.json');


new Vue({
  vuetify,
  store: gemStore,
  render: h => h(App)
}).$mount('#app')



//Time spent in the office [Color Not set] fvfvfdf