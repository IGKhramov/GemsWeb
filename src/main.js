import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.prototype.$colors = require('./js/colors.json');


const store = new Vuex.Store({
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
        store.dispatch('getJobs');
    },
    populateJobs(state, jobs) {
        state.jobs = jobs;
    },
  },
  actions: {
    getWorkers({commit}) {
        return new Promise((resolve, reject) => {
                fetch("https://us.navalclash.com/oldsdb/workers",
                    {
                        method: 'GET',
                        cache: 'no-cache',
                        headers: {
                          'Content-Type': 'application/json'
                            }
                    }
                    )
                    .then(response => response.json())
                    .then(result =>{
                        if(typeof(result) == 'object') {
                            let workers = [];
                            let re =  /,? *e-mail: *([a-z0-9]\.?)*@[a-z0-9]*?\.[a-z0-9]* *,?/ig
                            if(result.success === true && typeof(result.data) === 'object'){
                                for (let worker of result.data.sort((a,b)=>{
                                            if (a.name<b.name) {return -1}
                                            else {return 1}
                                            })) {
                                    let email = worker.description.match(re)[0]
                                    email = email.replace('e-mail:','').replace(',','').trim()
                                    let desc = worker.description.replace(re, '').trim()
                                    worker.email = email
                                    worker.description = desc
                                    workers.push(worker)
                                    }
                                }
                            console.log("Resived workers")
                            for (let worker of workers) {
                                console.log(`   ${JSON.stringify(worker)}`)
                                }
                            commit('populateWorkers', workers);
                            resolve()
                            }
                    })
                    .catch((error) => {
                    console.error("Fetch error", error)
                    reject(error)
                    })

        })
    },
    getJobs({commit}) {
        return new Promise((resolve, reject) => {
            let workerId = store.state.currentWorker.id;
            fetch(
                "https://us.navalclash.com/oldsdb/jobs/?" + new URLSearchParams({workerid: workerId}),
                {
                    method: 'GET',
                    cache: 'no-cache',
                    headers: {
                      'Content-Type': 'application/json'
                        }
                })
            .then(response => {
                console.log(`GET ${response.url} -> ${response.status}`)
                return response.json()})
            .then(result => {
                if (typeof(result) == 'object') {
                    console.log(`Recived jobs: Success - ${result.success} \n  Data - ${result.data.length} rows`)
                    if (result.success === true && typeof(result.data) === 'object') {
                        //let jobs = [];
                        let re = / *\[ *[a-z 0-9]+ *\]/ig
                        for (let job of result.data) {
                            let color = job.description.match(re);
                            if (color) {
                                job.color = color[0].replace('[','').replace(']','').trim();
                                job.color = job.color === 'Color Not set'? '-': job.color;
                                job.description = job.description.replace(re, '').trim();
                                job.startdts = job.startdts? new Date(job.startdts): null;
                                job.enddts = job.enddts? new Date(job.enddts): null;
                                }
                            }
                        commit('populateJobs', result.data)
                        for (let job of store.state.jobs){
                            console.log(`   ${JSON.stringify(job)}`)
                            }
                        resolve()
                        }
                    }
                else {
                    commit('populateJobs', [])
                    }
                })
            .catch((error) => {
                    console.error("Fetch error", error)
                    reject(error)
                    })
        })
    }
  }
})

new Vue({
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')



//Time spent in the office [Color Not set] fvfvfdf