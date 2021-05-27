import Vuex from "vuex";
import Vue from "vue";
import {getJobs} from "./actions/jobs";
import {getResults} from "./actions/results";
import {getWorkers} from "./actions/workers";
import {getUsers, getCurrentUser} from "./actions/users";

Vue.use(Vuex)

//export const gemStore = new Vuex.Store({
export const gemStore = {
    namespaced: true,
    state: {
        count: 0,
        dates: [],
        users: [],
        currentUser: {
            id: null,
            name: null,
            email: null,
            role: 200,
            description: null},
        workers: [],
        jobs: [],
        gem_list: [],
        gems: [],
        gaps: [],
        results: [],
        currentWorker: {id: 1,
            name: "Serafima",
            description: "",
            email: "leanok@gmail.com"}
    },
    methods: {

    },
    mutations: {
        populateUsers(state, users) {
            state.users = users;
        },
        populateWorkers(state, workers) {
            state.workers = workers;
//        console.log("Start commit workers:");
//        for (let i of state.workers) {console.log("    ", i.id, i.name)}
        },
        setCurrentWorker(state, worker) {
            state.currentWorker = worker;
            //gemStore.dispatch('getJobs');
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        populateJobs(state, jobs) {
            state.jobs = jobs;
        },
        populateResults(state, results) {
            state.results = results;
        },
        setDates(state, dates) {
            state.dates = dates;
//            if (dates.length > 1) {
//                this.dispatch('gemStore/getJobs');
//                }
        }
    },
    actions: {
        getWorkers,
        getJobs,
        getResults,
        getUsers,
        getCurrentUser
    }
};
//);