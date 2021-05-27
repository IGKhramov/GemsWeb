import Vue from 'vue';
import Vuex from 'vuex';

//import { alert } from './alert.module';
import { account } from './account.module';
import { gemStore } from './gemstore';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        gemStore,
//        alert,
        account
//        users
    }
});
