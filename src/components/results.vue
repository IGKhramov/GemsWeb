<template>
  <div id="results">
    <v-container  class="blue-grey lighten-1 rounded-t-lg px-1 pt-2 pb-0">
      <div class="px-2 mx-1 m-b-2 d-flex align-center"
          >
        <div class="ma-0 mb-0 py-0 px-1 ">
          <v-card-text class="font-weight-bold text-h6 text-left white--text m-0 pt-1 pb-0 px-1">Results</v-card-text>
        </div>
        <v-col class="my-0 py-0"/>
        <div class="blue-grey d-flex px-2 py-0 my-0 justify-center">
          <div class=" ma-0 py-0 px-1">
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
            <v-card-text class="teal--text  text--lighten-4 font-weight-bold text-body-1 text-left m-0 pt-2 pb-0 px-1">
              $: <span v-html='getSum()' />
            </v-card-text>

          </div>
          <v-btn
              color="#E0F2F1"
              dark
              small
              class="ml-3 mr-0 mt-1 py-0 px-3 black--text text-lowercase font-weight-black"
              @click.stop="dialog = true;">
            <v-icon medium
                    left color="green darken-3" dark
            >mdi-piggy-bank
            </v-icon>
            Pay
          </v-btn>
          <PayDialogue
              :show_dialog.sync="dialog"
              :amount="getAmount()"
              ></PayDialogue>

        </div>

        <v-tooltip bottom color="red darken-3" >
          <template v-slot:activator="{ on, attrs }">
            <v-btn small
                   class="ml-3 py-3 mt-1 black--text text--lighten-5 text-lowercase font-weight-black"
                   color="#E0F2F1"
                   :disabled="dnloaded"
                   @click="download_csv"
                   v-bind="attrs"
                   v-on="on">
              <v-icon medium
                  left color="#5C6BC0" dark
                  >mdi-file-table-box
              </v-icon>
                .csv
            </v-btn>
          </template>
          <span>Download results in csv format</span>
        </v-tooltip>
      </div>


      <v-row class="pl-4 pr-2 ma-0 mt-3"
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
              class="d-flex white justify-center align-center" min-height="350"> No Data </v-card>
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
            <v-row class="myFont pa-0 ma-0 d-inline-flexflex"
                   no-gutters >
              <v-col class="d-flex flex-column ma-0 ml-1 pa-0"
                cols="2">
                <div class="my-1 mx-0 px-1 justify-content-start numbers font-weight-bold"
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
                     cols="2">
                <div class="d-flex numbers my-1 mx-0 px-1 text-right justify-center font-weight-bold">
                  <span class="indigo--text darken-3">{{jobGems(item)}}</span>
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
              <v-col class="d-flex flex-column ma-0 ml-1 mr-0 py-0 pl-2 pr-0  align-end"
                     cols="1">
                <div class="d-flex myFont-9 my-1 mx-0 pl-1 text-right font-weight-bold green--text text--darken-1">
                  <v-icon left x-small>mdi-currency-usd</v-icon>
                  {{ jobAmount(item) }}
                </div>
              </v-col>
              <v-col class="d-flex flex-column ma-0 ml-1 py-0 pr-0 align-start"
                     cols="1">
                <div class="d-flex myFont-9 my-1 mx-0 px-0 font-weight-bold red--text text--darken-1">
                  | {{"0.00"}}
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
              <v-col cols="6" class="pl-0 pr-01 mx-0">
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
    <a hidden id="csv-link">?</a>
  </div>

</template>

<script>
import GemsResList from "./gems_res_list";
import TimesResList from "./times_res_item";
import PayDialogue from "./pay_dialogue";

export default {
  name: 'Results',
  components: {TimesResList, GemsResList, PayDialogue},
  data() {
    return {
      panel: [],
      disabled: false,
      readonly: false,
      dialog: false
    }

  },
  computed: {
    items() {return this.$store.state.gemStore.results.length},
    dnloaded() {return this.getAmount() <1}
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
      return items.reduce((x, y) => x + y.times.secs, 0);
    },
    getAmount() {return (this.getGems()*9.5+this.getTime()/3600*16).toFixed(2)},
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
      const sum=this.getAmount();
      return `<span class="white--text mx-1"> ${sum}</span>`
    },
    jobGems(item) {
      return item.gems.filter((x) => !x.code.startsWith("Sewon")).reduce((x, y) => x+y.cnt,0)
    },
    jobAmount(item) {
      return (item.times.hours * 16 + this.jobGems(item) * 9.5).toFixed(2)
    },
    download_csv() {
      const items = this.$store.state.gemStore.results;
      var result = 'Job,SWA,PRES,AC,CH,Sewon SWA,Sewon CH,MB,seconds,hours';
      for (var i of items) {
        var res = {
          job: i.jobID.startsWith("Misc")? "D4D":  i.jobID,
          SWA: 0,
          PRES: 0,
          AC: 0,
          CH: 0,
          'Sewon SWA': 0,
          'Sewon CH': 0,
          'MB': 0,
          seconds: 0,
          hours: 0
        }
        for (var gem of i.gems){
          res[gem.code] = gem.cnt;
        }
        res.seconds = i.times.secs;
        res.hours = i.times.time;
        console.log(Object.keys(res).map((id) => {return res[id]}).join());
        result += '\n' + (Object.keys(res).map((id) => {return res[id]})).join();
      }
      var a = document.getElementById("csv-link");
      a.href = "data:text/csv;charset=utf-8," + result;
      a.setAttribute("download", "file.csv");
      a.click();
    },
    open_pay() {
      console.log(`dialog: ${this.dialog}`);
      this.dialog = true;
      console.log(`dialog: ${this.dialog}`);
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
.numbers-10{
  font-family:  'Courier Prime',monospace;
  font-size: 10pt !important;
}
.numbers{
  font-family:  'Courier Prime',monospace;
  font-size: 11pt !important;
}
.numbers-12{
  font-family:  'Courier Prime',monospace;
  font-size: 12pt !important;
}
.myFont {
  font-family: Helvetica, Verdana, sans-serif, cursive;
  font-size: 11pt  !important;
}
.myFont-10 {
  font-family: Helvetica, Verdana, sans-serif, cursive;
  font-size: 10pt  !important;
}
.myFont-9 {
  font-family: Helvetica, Verdana, sans-serif, cursive;
  font-size: 9pt  !important;
}
</style>