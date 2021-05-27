<template>
  <div id="results">
    <v-container  class="blue-grey lighten-1 rounded-t-lg px-1 pt-2 pb-0"
      >
      <div class="px-2 ma-1 d-flex"
          >
        <div class="ma-0 mb-0 py-0 px-1 ">
          <v-card-text class="font-weight-bold text-h6 text-left white--text m-0 pt-1 pb-0 px-1">Results</v-card-text>
        </div>
        <v-col class="my-0 py-0"/>
        <div class="blue-grey d-flex px-4 py-0 my-0">
        <div class=" ma-0 py-0 px-1" cols="2">
          <v-card-text class="teal--text text--lighten-4 font-weight-bold text-body-2 text-left m-0 pt-2 pb-0 px-1">
            Gems: <span v-html='getGemSum()'/>
          </v-card-text>
        </div>

        <div class=" ma-0 ml-2 py-0 px-1" cols="3">
          <v-card-text class="teal--text text--lighten-4 font-weight-bold text-body-2 text-center m-0 pt-2 pb-0 px-1">
            Time: <span v-html='getTimeSum()' />
          </v-card-text>
        </div>
        <div class=" ma-0 ml-4 py-0 px-0 " cols="2">
          <v-card-text class="teal--text text--lighten-4 font-weight-bold text-body-1 text-left m-0 pt-2 pb-0 px-1">
            $: <span v-html='getSum()' />
          </v-card-text>
        </div>
        </div>
      </div>


      <v-row class="pl-4 pr-2 ma-0 "
             no-gutters >
        <v-col class="d-flex flex-column ma-0 ml-1 pa-0"
               cols="2">
          <v-btn class="my-1 mx-0 px-0"
                 small
                 depressed
                 color="blue-grey lighten-2"
                 dark
                 @click="addToDo(myTodo)">
            <div class="jobHead text-capitalize" >Job #</div>
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column ma-0 ml-1 pa-0"
               cols="2"
        >
          <v-btn class="my-1 mx-0 px-0"
                 small
                 depressed
                 color="blue-grey lighten-2"
                 dark
                 @click="addToDo(myTodo)">
            <div class="jobHead text-capitalize" >Date</div>
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column mb-0 ml-1 pa-0"
               cols="2"
        >
          <v-btn class="my-1 mx-0 px-0"
                 small
                 depressed
                 color="blue-grey lighten-2"
                 dark
                 @click="addToDo(myTodo)">
            <div class="jobHead text-capitalize" >Client</div>
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column ma-0 ml-1 pa-0"
              cols="2"
              >
          <v-btn class="my-1 mx-0 px-0"
                 small
                 depressed
                 color="blue-grey lighten-2"
                 dark
                 @click="addToDo(myTodo)">
            <div class="jobHead text-capitalize ">Gems | Sewon</div>
          </v-btn>
        </v-col>
        <v-col class="d-flex flex-column ma-0 ml-1 pa-0"
               cols="1"
        >
          <v-btn class="my-1 mx-0 px-0"
                 small
                 depressed
                 color="blue-grey lighten-2"
                 dark
                 @click="addToDo(myTodo)">
            <div class="jobHead text-capitalize" >Hours</div>
          </v-btn>
        </v-col>
        <v-col/>
        <v-col class="justify-end text-right pt-0 pb-0 px-0">
          <v-btn class="mt-1 mb-0 mx-1 px-0"
                 small
                 elevation="2"
                 icon
                 outlined
                 dark
                 depressed
                 @click="all">
            <v-icon>
              mdi-chevron-down
            </v-icon>
          </v-btn>
          <v-btn class="mt-1 mb-0 mx-1 px-0"
                 small
                 elevation="2"
                 icon
                 outlined
                 dark
                 @click="none">
            <v-icon>
              mdi-chevron-up
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
    <v-container fluid class="pa-1 ma-0 blue-grey lighten-1">
      <v-card v-if="this.$store.state.gemStore.results.length === 0"
              class="d-flex whyte justify-center align-center" min-height="350"> No Data </v-card>
      <v-expansion-panels
          v-else
          accordion
          v-model="panel"
          :disabled="disabled"
          multiple
        >
        <v-expansion-panel
            v-for="item in this.$store.state.gemStore.results"
            :key="item.id"
        >
          <v-expansion-panel-header
              class=" text-body-1
                      black--text  mb-0
                      font-weight-medium"
          >
            <v-row class="myFont pa-0 ma-0"
                   no-gutters >
              <v-col class="d-flex flex-column ma-0 ml-1 pa-0"
                cols="2">
                <div class="my-1 mx-0 px-1 justify-content-start numbers font-weight-bold"
                       small
                       depressed
                       >{{ item.jobID.startsWith("Misc")? " - ":  item.jobID}}</div>
              </v-col>
              <v-col class="d-flex  text--accent-1 flex-column ma-0 ml-1 pa-0"
                cols="2"
              >
                <div class="my-1 mx-0 px-1  text-center myFont"
                       small
                       depressed
                       >{{ (new Date(item.startDTS * 1000)).toISOString().replace(/([TZ]|.000)/g, " ").substr(0,16) }}</div>
              </v-col>
              <v-col class="d-flex flex-column ma-0 ml-1 pa-0  font-weight-bold"
                cols="2"
              >
                <div class="my-1 mx-0 px-1 "
                       small
                       depressed
                       >{{ item.Client.charAt(0).toUpperCase() + item.Client.slice(1) }}</div>
              </v-col>
              <v-col class="d-flex flex-column ma-0 ml-1 py-0 px-3"
                     cols="2"
              >
                <div class="d-flex numbers my-1 mx-0 px-1 text-right justify-center font-weight-bold">
                  <span class="indigo--text darken-3">{{item.gems.filter((x) => !x.code.startsWith("Sewon")).reduce((x, y) => x+y.cnt,0)}}</span>
                  <v-divider
                      vertical
                      dark
                      class="my-0 mx-1 px-0"/>
                  <span class="grey--text darken-3 text-decoration-line-through">{{item.gems.filter((x) => x.code.startsWith("Sewon")).reduce((x, y) => x+y.cnt,0)}}</span>
                </div>
              </v-col>
              <v-col class="d-flex flex-column ma-0 ml-1 py-0 px-2"
                     cols="1"
                >
                <div class="numbers my-1 mx-0 px-1 text-right font-weight-bold"
                >{{ item.times.time.substr(0,5) }}
                </div>
              </v-col>
              <v-col/>

            </v-row>




          </v-expansion-panel-header>
          <v-expansion-panel-content
              style="background-color: #a0a0ff;"
              class="px-0 mx-0 indigo lighten-5"
          >
            <v-row >
              <v-col cols="6" class="numbers pl-0 pr-01 mx-0">
                <GemsResList  :gems="item.gems"></GemsResList>
              </v-col>
              <v-col class="pl-1 pr-0 mx-0">
                <TimesResList :intervals="item.intervals" ></TimesResList>
              </v-col>
            </v-row>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </v-container>

  </div>
</template>

<script>
import GemsResList from "./gems_res_list";
import TimesResList from "./times_res_item";

export default {
  name: 'Results',
  components: {TimesResList, GemsResList},
  data() {
    return {
      panel: [],
      disabled: false,
      readonly: false,
    }

  },
  computed: {
    items() {return this.$store.state.gemStore.results.length}
  },

  mounted () {
    this.$store.dispatch('gemStore/getResults')
  },
  methods: {
    addToDo: function (job) {
      console.log(job)
    },
    deleteItem: function (id) {
      console.log(id)
    },
    all() {
      this.panel = [...Array(this.items).keys()].map((k, i) => i)
    },
    // Reset the panel
    none() {
      this.panel = []
    },
    getGems() {
      const items = this.$store.state.gemStore.results;
      return  items.map((item) => {
        return item.gems.filter((x) => !x.code.startsWith("Sewon")).reduce((x, y) => x + y.cnt, 0)
        }).reduce((x, y) => x + y, 0);
      },
    getTime() {
      const items = this.$store.state.gemStore.results;
      const summ = items.reduce((x, y) => x + y.times.secs, 0);
      return summ
    },
    getGemSum() {
      const items = this.$store.state.gemStore.results;
      const gems = this.getGems()
      const sewons = items.map((item) => {
        return item.gems.filter((x) => x.code.startsWith("Sewon")).reduce((x, y) => x + y.cnt, 0)
      }).reduce((x, y) => x + y, 0);
      return `<span class="white--text mx-1">${gems}</span> | <span class="lime--text text-decoration-line-through">${sewons}</span>`
    },
    getTimeSum() {
      const summ =  this.getTime()
      const dec = (summ / 3600).toFixed(2)
      const hh = (Math.floor(summ % 3600 / 60)/100).toFixed(2).toString().substr(2,4)
      return `<span class="white--text mx-1">${Math.floor(summ / 3600)}:${hh}</span> (<span class="lime--text mx-1">${dec}</span>)`
    },
    getSum() {
      const sum=(this.getGems()*9.5+this.getTime()/3600*16).toFixed(2)
      return `<span class="white--text mx-1"> ${sum}</span>`
    }

  }
}
</script>

<style>

.jobHead{
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bolder;
  font-size: 10pt  !important;
}
.numbers{
  font-family:  'Courier Prime',monospace;
  font-size: 11pt !important;
}


.myFont {
  font-family: Helvetica, Verdana, sans-serif, cursive;
  font-size: 11pt  !important;
}
</style>