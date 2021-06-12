<template>
  <v-app  class="grey lighten-4 pa-0 ma-0" >

    <v-app-bar
      app
      color="primary"
      dark>
      <div class="d-flex">
        <v-img
          alt="Crystalls Logo"
          class="shrink mr-6 ml-1"
          contain
          :src="logo"
          transition="scale-transition"
          width="90"
        />
        <v-card-text class="text-overline align-left blue--text text--lighten-2">Crystalls 4 Dress</v-card-text>
      </div>

      <v-spacer/>

      <v-btn text>
        <span class="mx-2" v-if="status.loggedIn">|</span>
        <span class="mr-0" v-if="status.loggedIn">{{$store.state.gemStore.currentUser.name}}</span>
        <span class="mx-2" v-if="status.loggedIn">|</span>
      </v-btn>

      <v-btn v-if="status.loggedIn"
        v-on:click="logout_"
        text>
        <span class="mr-1" v-if="status.loggedIn">Loguot</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

       <v-btn text v-else>
        <span class="mr-1">You are not logged in</span>
        <v-icon>mdi-account-off</v-icon>
      </v-btn>

    </v-app-bar>
    <v-main class="grey lighten-4 px-0">
    <router-view fluid class="pa-1" ></router-view>
    </v-main>
  </v-app>
</template>

<script>
//import JobList from './components/jobs_list.vue'
import { mapState, mapActions } from 'vuex'
import { clearInterval } from 'timers'
import {userService} from './js/user.service'

export default {
  name: 'App',
  components: {
// JobList, WorkerSelect
  },
  data() {
    return {
        logo: "./imgs/gem_logo.png",
        loggedin: !!localStorage.getItem("user")
        }
  },
  created() {
    window.vm.app = this;
    console.log("zzzzzzzzzzzzzzzzzzzzzz")
    userService.start_timer();
  },
  beforeDestroy() {
    if ( window.vm.app.timer) {
      clearInterval ( window.vm.app.timer) // Close
    }

  },
  computed: {
        ...mapState('account', ['status'])
    },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    ...mapActions('gemStore', ['getCurrent']),
    logout_() {
        console.log(`Logout_() runs ${this}`)
        this.logout();
        this.$router.push("/login");
        if (window.app.timer) {
          clearInterval (window.app.timer) // Close
        }
    },
    start_() {
      this.start_timer();
    }

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@300,400;700&&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;1,300&display=swap');

</style>
