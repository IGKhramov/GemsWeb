<template>
  <v-dialog
      v-model="show_dialog"
      max-width="80%"
      @click:outside="$emit('update:show_dialog', false);"
  >
    <v-card>
      <v-card-title class="text-h6 d-block">
        <v-row>
          <v-col cols="2">Worker: </v-col>
          <v-col>{{this.$store.state.gemStore.currentWorker.name}}</v-col>
        </v-row>

        <v-row class="myFont-10 font-weight-bold my-0 py-0" style="background-color: rgba(255, 0, 0, 0.2);">
          <v-col cols="2" class="my-0 py-0 green"><span class="my-0 py-0 blue">Period:</span> </v-col>
          <v-col  class="my-0 py-0">
            <span class="grey--text mr-2 green my-0 py-0">from</span>
            <span class="myFont font-weight-bold green my-0 py-0">{{this.$store.state.gemStore.dates[0]}} </span>
            <span class="grey--text mx-2 my-0 py-0">to</span>
            <span class="myFont font-weight-bold green my-0 py-0">{{this.$store.state.gemStore.dates[1]}}</span>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="2" class="">Amount: </v-col>
          <v-col>

            <v-btn class="numbers-12 mx-0 px-2 py-0 font-weight-black"
                   text
                   min-width="30"
                   small
                   color="blue-grey darken-1"
                  @click="zamount = amount"
                  > {{amount}}<v-icon right>  mdi-arrow-down-thick  </v-icon></v-btn>
          </v-col>
        </v-row>


      </v-card-title>

      <v-card-text>
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.


      <v-text-field
          v-model="zamount"
          name="input-amount"
          label="Pay amount"
          counter
          autocomplete="on"
      />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="green darken-1"
            text
            @click="$emit('update:show_dialog', false);"
        >
          Disagree
        </v-btn>

        <v-btn
            color="green darken-1"
            text
            @click="$emit('update:show_dialog', false);"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>


<script>
export default {
  props: ["show_dialog", 'amount'],
  name: 'PayDialogue',
  data() {
    return {
      zamount: this.amount
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>