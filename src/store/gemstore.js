import Vuex from "vuex";
import Vue from "vue";
import {getJobs} from "./actions/jobs";
import {getWorkers} from "./actions/workers";

Vue.use(Vuex)

//export const gemStore = new Vuex.Store({
export const gemStore = {
    namespaced: true,
    state: {
        count: 0,
        workers: [],
        jobs: [],
        gem_list: [],
        gems: [],
        gaps: [],
        currentWorker: {id: 1,
            name: "Serafima",
            description: "тестовый акаунт",
            email: "leanok@gmail.com"}
    },
    methods: {

    },
    mutations: {
        populateWorkers(state, workers) {
            state.workers = workers;
//        console.log("Start commit workers:");
//        for (let i of state.workers) {console.log("    ", i.id, i.name)}
        },
        setCurrentWorker(state, worker) {
            state.currentWorker = worker;
            gemStore.dispatch('getJobs');
        },
        populateJobs(state, jobs) {
            state.jobs = jobs;
        },
    },
    actions: {
        getWorkers,
        getJobs
    }
};
//);