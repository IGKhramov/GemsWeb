import {apiCall, apiUrl} from "./api";

function processGetUsers(result, state, commit) {
    if (typeof(result) == 'object') {
        console.log(`Recived users: Success - ${result.success} \n  Data - ${result.data.length} rows`)
        if (result.success === true && typeof(result.data) === 'object') {
            commit('populateUsers', result.data)
            for (let user of state.users) {
                console.log(`   ${JSON.stringify(user)}`)
            }
        }
    }
    else {
        commit('populateUsers', [])
    }
}


export async function getUsers({commit, state}) {
    return apiCall(apiUrl+'v2/users')
        .then(response => processGetUsers(response, state, commit));
}


function processGetCurrentUser(result, commit) {
    if(typeof(result) == 'object') {
//        console.log(`processCurrentUser: responce data: ${JSON.stringify(result)}`)
        var user = {};
        if(result.success === true && typeof(result.data) === 'object') {
            user = result.data
            console.log(`processCurrentUser: responce data: ${JSON.stringify(user)}`)
        }
        commit('setCurrentUser', user);
    } else {
        commit('setCurrentUser', {})
    }
}

export async function getCurrentUser({commit}) {
console.log("store.getCurrentUser")
    return apiCall(apiUrl+'v2/who').then(response => processGetCurrentUser(response, commit));
}