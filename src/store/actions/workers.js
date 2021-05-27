import {apiCall, apiUrl} from "./api";

function processGetWorkers(result, commit) {
    if(typeof(result) == 'object') {
    console.log(`workers.processWorkers: responce data: ${JSON.stringify(result)}`)
        var workers = [];
        if(result.success === true && typeof(result.data) === 'object') {
            let re =  /,? *e-mail: *([a-z0-9_]\.?)*@[a-z0-9]*?\.[a-z0-9]* *,?/ig

            result.data.sort((a,b)=> a.name.localeCompare(b.name));

            for (let worker of result.data) {
                var email = worker.description.match(re);
                email = email? email[0]: "";
                email = email.replace('e-mail:','').replace(',','').trim();
                const desc = worker.description.replace(re, '').trim();
                worker.email = email;
                worker.description = desc;
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
    console.log("workers.getWorkers")
    return apiCall(apiUrl+'workers').then(response => processGetWorkers(response, commit));
}
