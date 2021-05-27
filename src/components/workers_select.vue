<template>
    <v-select
        class="my-0"
        :items="workers"
        item-text="name"
        item-value="id"
        v-model="currentWorker"
        label="Worker"
        placeholder="Select Worker"
        return-object
        single-line
        dense
        outlined
        @input = "setCurrentWorker()"
        background-color = "white lighten-5"

        filled
        hide-details
        prepend-inner-icon=" mdi-account-arrow-right"

        >
    </v-select>

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
        currentWorker: this.$store.state.gemStore.currentWorker,
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
        console.log("Start getWorkers");
        this.loading = true;
        this.$store.dispatch('gemStore/getWorkers')
        .then(() => {
            this.workers=this.$store.state.gemStore.workers;
            })
        .catch((error) => {console.error("Fetch error", error)})
        .finally(() => {this.loading=false})
    },
    setCurrentWorker() {
        this.$store.commit("gemStore/setCurrentWorker", this.currentWorker);
        this.$store.dispatch('gemStore/getResults');
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
