<template>

  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="dates"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          class="text-body-2"
          v-model="dateRange"
          prepend-inner-icon="mdi-calendar"
          readonly
          outlined
          dense
          v-bind="attrs"
          v-on="on"
          background-color="white lighten-5"
          filled
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="dates"
        no-title
        range
        color="blue accent-2"
    >
      <v-spacer></v-spacer>
      <v-btn
          elevation="1"
          outlined
          rounded
          text
          dark
          max-width="140"
          class="blue-grey lighten-4 my-0 py-0"
          @click="menu = false;"
      >
        Cancel
      </v-btn>
      <v-btn
          elevation="1"
          outlined
          rounded
          text
          dark
          min-width="80"
          class="btn-primary my-0"
          @click="$refs.menu.save(dates); updateStorageJobs();"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>


</template>

<script>
export default {
  name: 'datePicker',
  props:  {

  },
  data() {
    return {
        dates: this.$store.state.gemStore.dates,
        menu: false
        }
    },
  computed: {
      dateRange() {
        var val = this.dates;
        val.sort();
        this.$store.commit("gemStore/setDates", this.dates);
        return `from: ${val[0]}  to:  ${val.length >1?val[1]:""}`
      },
        selected() {
        return this.$store.state.currentWorker
        }
  },
  watch: {
        dates: (val) => {
            console.log(val);
        }
    },
  mounted () {
    this.setDateRange();
    this.$store.dispatch('gemStore/getResults');
  },
  methods: {
    updateStorageJobs() {
        this.$store.dispatch('gemStore/getJobs');
        this.$store.dispatch('gemStore/getResults');
        },
    setDateRange(){
        const to = this.dates[0]? new Date(this.dates[0]): new Date(new Date().setHours(23,59,59,0));
        const day =  to.getDate() > 15? 16:1;
        const from = this.dates[1]? new Date(this.dates[1]): new Date(new Date(new Date().setDate(day)).setHours(0,0,0))
        console.log("ddddd   ", this.dates, from, to)
        this.dates = [from.toISOString().substr(0, 10),to.toISOString().substr(0, 10)]
        this.$store.state.gemStore.dates = this.dates
    }
  }


}
</script>