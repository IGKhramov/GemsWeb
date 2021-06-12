<template>
  <v-data-table
    :headers="headers"
    :items="intervals"
    item-key="startDTS"
    v-model="selectedInterval"
    :loading="loading"
    loading-text="Loading... Please Wait"
    dense
    x-small
    hide-default-footer
    :hide-default-header = "intervals.length===0"
    class="elevation-4 fill-height rounded-t-lg"
    >
    <template v-slot:top>
      <div class="d-flex amber lighten-5 font-weight-bold text--accent-3 px-4 py-1 rounded-t-lg numbers" >
        <v-icon left>mdi-timeline-clock-outline</v-icon> Intervals</div>
      <v-text-field
          v-model="selectedInterval"
          label="Search (UPPER CASE ONLY)"
          class="mx-4" style="display: none"
      ></v-text-field>
    </template>
    <template v-slot:item="{item}" >
      <tr :class="selectedInterval.indexOf(item.startDTS)>-1?'amber lighten-4':''"
          @click="rowClicked(item)">
        <td class="fsmall grey--text text--darken-1" align="center">{{getDate(item.startDTS)}}</td>
        <td class="fsmall" v-html="formatDate(item.startDTS, item.endDTS)"/>
        <td class="fsmall font-weight-black">{{ item.time.substr(0,5) }}</td>

      </tr>
    </template>
  </v-data-table>


</template>


<script>
export default {
  props: ['intervals'],
  name: 'TimesResList',
  data() {
    return {
      search: "",
      selectedInterval: [],
      headers: [
        {
          text: "Date",
          align: 'center',
          sortable: true,
          value: 'startDTS',
          class: 'numbers-10 amber lighten-3'
        },
        {
          text: "Working interval",
          align: 'center',
          sortable: false,
          value: 'name',
          class: 'numbers-10 amber lighten-3'
        },
        {
          text: "Hours",
          align: 'left',
          sortable: false,
          value: '',
          class: 'numbers-10 amber lighten-3'
        }
        ],
      loading: false,
      error: null
        }
    },
  computed: {},
  methods: {
    formatDate(start, end) {
        return `<div align="center">
                <span class="black--text font-weight-bold">${start.substr(11, 5)}</span>
                 - <span class="black--text font-weight-bold">${end.substr(11, 5)}</span>
                </div>`
    },
    getDate(start) {
      return start.substr(0, 10)},
    rowClicked(row) {
      this.toggleSelection(row.startDTS);
      console.log(row);
    },
    toggleSelection(keyID) {
      if (this.selectedInterval.includes(keyID)) {
        this.selectedInterval = this.selectedInterval.filter(
            selectedKeyID => selectedKeyID !== keyID
        );
      } else {
//        this.selectedJobs.push(keyID);
        this.selectedInterval = [keyID];
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.fsmall {
    font-size: 10pt !important;
}
tbody tr:nth-of-type(even) {
  background-color: rgba(1, 0, 0, .04);
}
</style>