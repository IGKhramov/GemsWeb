<template>

  <v-simple-table
      dense
      x-small>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          <span class="ml-16 pl-8">working interval</span>
        </th>
        <th class="text-left">
          Hours
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in intervals"
          :key="item.startdts"
      >
        <td class="fsmall" v-html="formatDate(item.startDTS, item.endDTS)"/>
        <td class="fsmall font-weight-black">{{ item.time.substr(0,5) }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>


<script>
export default {
  props: ['intervals'],
  name: 'TimesResList',
  methods: {
    formatDate(start, end) {
        return `<div><span class="grey--text">${start.substr(0, 10)}</span> &nbsp;&nbsp;
                  <v-divider
                      class="my-0 mx-6"/>
                <span class="black--text font-weight-bold">${start.substr(11, 5)}</span>
                 - <span class="black--text font-weight-bold">${end.substr(11, 5)}</span>
                </div>`
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