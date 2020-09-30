<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <div class="d-flex">
        <v-img
          alt="Crystalls Logo"
          class="shrink mr-1 ml-1"
          contain
          :src="logo"
          transition="scale-transition"
          width="90"
        />

        <v-card-text class="text-overline align-left blue--text text--lighten-2">Crystalls 4 Dress</v-card-text>
      </div>

      <v-spacer/>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
        <v-container>
            <v-row>
                <WorkerSelect/>
            </v-row>
            <v-row>
            <JobList/>
                </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import JobList from './components/jobs_list.vue'
import WorkerSelect from './components/workers_select.vue'

export default {
  name: 'App',
  components: {
  JobList, WorkerSelect
  },
  data() {
    return {
        logo: "imgs/gem_logo.png"
        }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0,20px;
  padding: 0;
  background-color: #ffffff;
}
</style>
