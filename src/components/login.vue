<template>
    <v-container fluid fill-height>
        <v-card
          elevation="4"
          outlined
          title="Login"
          loading="false"
          loader-height="6"
          min-height="300"

          class="mx-auto rounded-lg"
          width="400px"
        >
            <v-form >
                <v-container class="d-block pa-2 ">
                    <v-row justify="center" class="py-3 blue-grey lighten-5 text-center">
                        <v-label>Login</v-label>
                    </v-row>
                    <v-row justify="center" class="pt-6">
                      <v-col
                        cols="10"
                        sm="9"
                        class="pt-1"
                         >
                        <v-text-field
                          v-model="username"
                          ref="username"
                          :rules="[rules.required]"
                          :type="'text'"
                          name="input-email"
                          label="E-mail"
                          placeholder="john.Doe@google.com"
                        ></v-text-field>
                      </v-col>
                      </v-row>
                      <v-row justify="center" class="pt-0">

                      <v-col cols="10" sm="9" class="pt-0">
                        <v-text-field
                          v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required]"
                          :type="show1 ? 'text' : 'password'"
                          name="input-password"
                          label="Password"
                          placeholder="your awesome password"
                          counter
                          @click:append="show1 = !show1"
                          autocomplete="on"
                        />
                      </v-col>

                    </v-row>
                    <v-row justify="center">
                        <v-btn
                          elevation="4"
                          outlined
                          rounded
                          text
                          dark
                          max-width="140"
                          class="btn-primary blue accent-3 my-4"
                          :disabled= "status.loggingIn"
                          v-on:click="handleSubmit"
                          >
                              Login
                        </v-btn>
                    </v-row>
                   </v-container>
                    <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'LoginPage',
    data () {
        return {
            username: '',
            password: '',
            submitted: false,
            loggedin: !!this.$store.state.gemStore.user,

            show1: false,
      rules: {
        required: value => !!value || 'Required.',
//        min: v => v.length >= 6 || 'Min 6 characters',
//        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },


    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        ...mapActions('gemStore', ['getCurrent']),
        handleSubmit (e) {
            console.log(e);
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
//                .then( auth => {
//                        console.log(`After login: user: ${auth}`);
//                        const user = this.getCurrent();
//                        console.log("User", user);
//                        this.$store.commit("setCurrentUser", this.currentUser);
//                })
                ;

            }
        }
    }
};
</script>