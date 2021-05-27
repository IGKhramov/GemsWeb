<template>
  <v-container fluid class="d-block">
    <v-row class="d-flex ma-0 pa-0">
      <v-col cols="4" class="mt-2 pa-0">
        <span class="mx-0 py-2">Worker:</span>
        <WorkerSelect/>
      </v-col>
      <v-col class="mt-2 pa-0"/>
      <v-col cols="5" class="mt-2 pa-0">
        Date range:
        <DateRange/>
      </v-col>
    </v-row>
    <div >
      <Results/>
    </div>
  </v-container>
</template>

<script>
import WorkerSelect from './workers_select.vue'
import DateRange from './date_range.vue'
import Results from './results.vue'

export default {
  name: 'HomeContainer',
   components: {
 //     JobList,
      WorkerSelect,
      DateRange,
      Results
  },
  props:  {

  },
  data() {
    return {
        loading: false,
        users: [],
        curentUser: this.$store.state.gemStore.currentUser,
        eror: null,
        dates: ['2019-09-10', '2019-09-20']
        }
    },
  computed: {
    selected() {
        //console.log("Selected", this.$store.state.currentWorker.name);
        return this.$store.state.gemStore.currentUser
        }
  },
  mounted () {
    this.getCurrentUser();
    this.getUsers();
  },
  methods: {
    getCurrentUser(){
        console.log("Start getUsers");
        this.loading = true;
        this.$store.dispatch('gemStore/getCurrentUser')
        .then(() => {
            this.currentuser=this.$store.state.gemStore.currentUser;
            })
        .catch((error) => {console.error("Fetch error", error)})
        .finally(() => {this.loading=false})
        },

    getUsers(){
        console.log("Start getUsers");
        this.loading = true;
        this.$store.dispatch('gemStore/getUsers')
        .then(() => {
            this.users=this.$store.state.gemStore.users;
            })
        .catch((error) => {console.error("Fetch error", error)})
        .finally(() => {this.loading=false})
    }
  }


}
</script>