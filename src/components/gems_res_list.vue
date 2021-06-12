<template>
  <v-data-table
      :headers= "headers"
      :items="gems"
      item-key="code"
      v-model="selectedGems"
      :loading="loading"
      loading-text="Loading... Please Wait"
      dense
      x-small
      hide-default-footer
      :hide-default-header = "gems.length===0"
      :search="search"
      class="elevation-4 fill-height rounded-t-lg">
    <template v-slot:top>
      <div class="d-flex teal lighten-5 font-weight-bold px-4 py-1 rounded-t-lg numbers">
        <v-icon left> mdi-hexagon-slice-2 mdi-drag-variant </v-icon>
        Cristals</div>
      <v-text-field
          v-model="selectedGems"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
          style="display: none"
      ></v-text-field>
    </template>

    <template v-slot:item="{item}" >
      <tr :class="selectedGems.indexOf(item.code)>-1?'teal lighten-5':''"
          @click="rowClicked(item)">
        <td align="start">{{item.name}}</td>
        <td align="start">{{item.code}}</td>
        <td align="end">{{item.cnt}}</td>
      </tr>
    </template>

  </v-data-table>

</template>

<script>
export default {
  props: ['gems'],
  name: 'gemsResList',
  components: {},
  data() {
    return {
        search: "",
        selectedGems: [],
        headers: [
            {
                text: "Name",
                align: 'center',
                sortable: true,
                value: 'code',
                class: 'numbers-10 teal lighten-4'
            },
            {
                text: "Code",
                align: 'center',
                sortable: true,
                value: 'name',
                class: 'numbers-10 teal lighten-4'
            },
            {
                text: "Count",
                align: 'end',
                sortable: true,
                value: 'cnt',
                class: 'numbers-10 teal lighten-4'
            }
          ],
        loading: false,
        error: null
        }
  },
  mounted () {
  },
  methods: {
    getColor(color) {
        let c = this.$colors[color];
        return c? c: "white";
        },
    rowClicked(row) {
      this.toggleSelection(row.code);
      console.log(row);
    },
    toggleSelection(keyID) {
      if (this.selectedGems.includes(keyID)) {
        this.selectedGems = this.selectedGems.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
//        this.selectedJobs.push(keyID);
          this.selectedGems = [keyID];
      }
    },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tbody tr:nth-of-type(even) {
  background-color: rgba(0, 1, 0, .02);
}
</style>
