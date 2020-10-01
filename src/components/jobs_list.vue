<template>
    <v-data-table
      :headers= "headers"
      :items="this.$store.state.jobs"
      v-model="selectedJobs"
      :loading="loading"
      loading-text="Loading... Please Wait"
      dense
      x-small
      caption="Jobs List"
      class="elevation-2 mytable">
        <template v-slot:item="{ item }">
            <tr :class="selectedJobs.indexOf(item.id)>-1?'green lighten-4':''"
                @click="rowClicked(item)">
                <td align="end">{{item.id}}</td>
                <td align="start">{{item.jobid}}</td>
                <td align="start">{{item.client}}</td>
                <td>
                    <v-container fluid dense  class="pa-0">
                        <v-row align="center" dense class="pa-0">
                            <v-col cols="2" align="center" class="py-1">
                                <v-chip
                                    :color="getColor(item.color)"
                                    text-color="white"
                                    dark
                                    x-small/>
                            </v-col>
                            <v-col cols="10" align="start" dense class="px-5">
                                {{item.color}}
                             </v-col>
                         </v-row>
                     </v-container></td>
                <td  align="start">{{item.description}}</td>
                <td  align="start" class="text-sm-caption">{{item.startdts.toISOString().replace(/([TZ]|.000)/g, " ")}}</td>
                <td  align="start" class="text-sm-caption">{{item.enddts?item.enddts.toISOString().replace(/([TZ]|.000)/g, " "):""}}</td>
                <td  align="start" class="text-sm-caption">{{item.jobstatus}}</td>
                <td  align="start" class="text-sm-caption">{{item.jobtype}}</td>
            </tr>
        </template>
    </v-data-table>
</template>

<script>
export default {
  name: 'JobList',
  components: {},
  data() {
    return {
        selectedJobs: [],
        headers: [
            {
                text: "id",
                align: 'center',
                sortable: true,
                value: 'id',
                class: 'blue-grey lighten-4'
            },
            {
                text: "Job ID",
                align: 'center',
                sortable: true,
                value: 'jobid',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Client",
                align: 'start',
                sortable: true,
                value: 'client',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Color",
                align: 'center',
                sortable: true,
                value: 'color',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Comment",
                align: 'start',
                sortable: true,
                value: 'description',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Start Data",
                align: 'start',
                sortable: true,
                value: 'startdts',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Finished",
                align: 'start',
                sortable: true,
                value: 'enddts',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Status",
                align: 'start',
                sortable: true,
                value: 'jobstatus',
                class: 'blue-grey lighten-5'
            },
            {
                text: "Type",
                align: 'start',
                sortable: true,
                value: 'jobtype',
                class: 'blue-grey lighten-5'
            }
          ],
        loading: false,
        jobs: [],
        error: null
        }
  },
  mounted () {
    this.$store.dispatch('getJobs')
  },
  methods: {
    getColor(color) {
        let c = this.$colors[color];
        return c? c: "white";
        },
    rowClicked(row) {
      this.toggleSelection(row.id);
      console.log(row);
    },
    toggleSelection(keyID) {
      if (this.selectedJobs.includes(keyID)) {
        this.selectedJobs = this.selectedJobs.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
//        this.selectedJobs.push(keyID);
          this.selectedJobs = [keyID];
      }
    },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tbody tr:nth-of-type(even) {
  background-color: rgba(0.5, 1, 1, .04);
}
</style>
