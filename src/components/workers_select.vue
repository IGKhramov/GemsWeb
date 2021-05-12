<template>
    <v-container fluid>
        <v-row align="start" >
        <v-col cols="3">
            <v-select
                :items="workers"
                item-text="name"
                item-value="id"
                v-model="currentWorker"
                :hint="`ID: ${currentWorker.id} - ${currentWorker.description}`"
                label="Worker"
                persistent-hint
                return-object
                single-line
                dense
                outlined
                @input = "setCurrentWorker()"
                >
            </v-select>
        </v-col>
        <v-col cols="2"> <v-card  class="px-4 py-2"
        :q-name="$store.state.currentWorker.name"
        >
        {{$store.state.currentWorker.name}}</v-card> </v-col>
        <v-col cols="7"> <v-card  align="start" class="px-4 py-2">{{currentWorker}}</v-card> </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'WorkerSelect',
  props:  {

  },
  data() {
    return {
        loading: false,
        workers: [],
        currentWorker: this.$store.state.currentWorker,
        eror: null
        }
    },
  computed: {
    selected() {
        //console.log("Selected", this.$store.state.currentWorker.name);
        return this.$store.state.currentWorker
        }
  },
  mounted () {
    this.getWorkers()
  },
  methods: {
    getWorkers(){
        //console.log("Start getWorkers");
        this.loading = true;
        this.$store.dispatch('getWorkers')
        .then(() => {
            this.workers=this.$store.state.workers;
            })
        .catch((error) => {console.error("Fetch error", error)})
        .finally(() => {this.loading=false})
    },
    setCurrentWorker() {
        this.$store.commit("setCurrentWorker", this.currentWorker);
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
