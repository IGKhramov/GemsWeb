import {apiCall, apiUrl} from "./api";

function processGetWorkers(result, commit) {
    if(typeof(result) == 'object') {
        let workers = [];
        if(result.success === true && typeof(result.data) === 'object') {
            let re =  /,? *e-mail: *([a-z0-9]\.?)*@[a-z0-9]*?\.[a-z0-9]* *,?/ig

            result.data.sort((a,b)=> a.name.localeCompare(b.name));

            for (let worker of result.data) {
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
    } else {
        commit('populateWorkers', [])
    }
}


export async function getWorkers({commit}) {
    return apiCall(apiUrl+'oldsdb/workers').then(response => processGetWorkers(response, commit));
}
