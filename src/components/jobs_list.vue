<template>
    <v-data-table
      :headers= "headers"
      :items="this.$store.state.jobs"
      v-model="selectedJobs"
      :loading="loading"
      loading-text="Loading... Please Wait"
      dense
      x-small
      class="shrink">
        <template v-slot:item="{ item }">
            <tr :class="selectedJobs.indexOf(item.id)>-1?'green lighten-4':''"
                @click="rowClicked(item)">
                <td>{{item.id}}</td>
                <td>{{item.jobid}}</td>
                <td>{{item.client}}</td>
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
                            <v-col cols="10" align="start" dense class="px-3">
                                {{item.color}}
                             </v-col>
                         </v-row>
                     </v-container></td>
                <td>{{item.description}}</td>
                <td>{{item.startdts.toLocaleString()}}</td>
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
                value: 'id'
            },
            {
                text: "Job ID",
                align: 'start',
                sortable: true,
                value: 'jobid'
            },
            {
                text: "Client",
                align: 'start',
                sortable: true,
                value: 'client'
            },
            {
                text: "Color",
                align: 'center',
                sortable: true,
                value: 'color'
            },
            {
                text: "Comment",
                align: 'start',
                sortable: true,
                value: 'description'
            },
            {
                text: "Start Data",
                align: 'start',
                sortable: true,
                value: 'startdts'
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
</style>
