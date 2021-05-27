import {apiCall, apiUrl} from "./api";

function processGetResults(result, state, commit) {
    if (typeof(result) == 'object') {
        if (result.success && typeof(result.data) === 'object' && result.data[0] != null) {
            console.log(`Recived results:\n     Success - ${result.success}\n     Data -  ${result.data.length} rows`)
            commit('populateResults', result.data)
            for (let job of state.jobs) {
                console.log(`   ${JSON.stringify(job)}`)
            }
        }
        else {
            console.log(`Recived jobs:\n     Error - ${result.success}\n     Data - ${JSON.stringify(result.data)}`)
            commit('populateResults', [])
            }
    }
    else {
        console.log(`Recived jobs:\n     Error - ${result.success}\n     Data - ${JSON.stringify(result.data)}`)
        commit('populateResults', [])
    }
}


export async function getResults({commit, state}) {
    const from = state.dates[0];
    const to = state.dates.length>1? state.dates[1]: new Date().toISOString().substr(0, 10);
    var params = {
        start: from,
        end: to
        }
    return apiCall(apiUrl+`results/${state.currentWorker.id}`, {searchParams: params})
        .then(response => processGetResults(response, state, commit));
}
