import {apiCall, apiUrl} from "./api";

function processGetJobs(result, state, commit) {
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
            for (let job of state.jobs) {
                console.log(`   ${JSON.stringify(job)}`)
            }
        }
    }
    else {
        commit('populateJobs', [])
    }
}


export async function getJobs({commit, state}) {
    return apiCall(apiUrl+'oldsdb/jobs', {searchParams: {workerid: state.currentWorker.id}})
        .then(response => processGetJobs(response, state, commit));
}
