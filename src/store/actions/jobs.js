import {apiCall, apiUrl} from "./api";

function processGetJobs(result, state, commit) {
    if (typeof(result) == 'object') {
        if (result.success && typeof(result.data) === 'object' && result.data[0] != null) {
            console.log(`Recived jobs:\n     Success - ${result.success}\n     Data -  ${result.data} rows`)
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
            for (let job of state.jobs) {
                console.log(`   ${JSON.stringify(job)}`)
            }
        }
        else {
            console.log(`Recived jobs:\n     Error - ${result.success}\n     Data - ${result.data} rows`)
            commit('populateJobs', [])
            }
    }
    else {
        console.log(`Recived jobs:\n     Error - ${result.success}\n     Data - ${result.data} rows`)
        commit('populateJobs', [])
    }
}


export async function getJobs({commit, state}) {
    const from = state.dates[0];
    const to = state.dates.length>1? state.dates[1]: new Date().toISOString().substr(0, 10);
    var params = {workerid: state.currentWorker.id,
        start: from,
        end: to
        }
    return apiCall(apiUrl+'jobs', {searchParams: params})
        .then(response => processGetJobs(response, state, commit));
}
