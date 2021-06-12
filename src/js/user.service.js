import { authHeader } from '../js/auth.header';
import {authUrl} from "../store/actions/api";
import {setInterval} from "timers";
//import { apiCall } from './api';

export const userService = {
    login,
    logout,
    start_timer,
//    register,
    getAll
//    getById,
//    update,
//    delete: _delete
};

function login(username, password) {

    const formBody ="client_id=gem_web_ui&client_secret=86f3478157f4db80dd962ce83539251e51f288924f12aaa070cbd0a487704fc8&grant_type=password&username="+username+"&password="+password;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        protocol:'http:',
//        body: JSON.stringify({ grant_type, username, password, client_id, client_secret})
        body: formBody
    };
    return fetch(authUrl + `login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                user.cTime = new Date();
                user.expTime = new Date(user.cTime.getTime()+user.expires_in*1000);
                localStorage.setItem('user', JSON.stringify(user));
                start_timer();
            }
            return user;
        });
}

function start_timer() {
    console.log(`!!!  Start Timer ${localStorage.getItem("user")}`);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.access_token) {
        window.app.timer = setInterval(() => {
            check_token()
        }, 5000);
        return true;
    }
    console.log(`!!!  No user in store`);
    return false;
}

function check_token(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {return}
    const d1 = new Date();
    const d2 = new Date(user.expTime);
    if ( d1> d2) {
        console.log(`Token has expired ${d2}`);
        window.vm.app.logout_();
    }
    else {
        console.log(`    expTime: ${d2}\n        Now: ${d1}`)
    }
}

function logout() {
    // remove user from local storage to log user out
    console.log(`running logout`);
    localStorage.removeItem('user');
}

//
//function register(user) {
//    const requestOptions = {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(user)
//    };
//
//    return fetch(`/users/register`, requestOptions).then(handleResponse);
//}
//

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {...{ 'Content-Type': 'application/json' },...authHeader()}
    };
    return fetch(`/v2/users`, requestOptions).then(handleResponse);
}

//
//function getById(id) {
//    const requestOptions = {
//        method: 'GET',
//        headers: authHeader()
//    };
//
//    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
//}
//
//function update(user) {
//    const requestOptions = {
//        method: 'PUT',
//        headers: { ...authHeader(), 'Content-Type': 'application/json' },
//        body: JSON.stringify(user)
//    };
//
//    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
//}
//
//// prefixed function name with underscore because delete is a reserved word in javascript
//function _delete(id) {
//    const requestOptions = {
//        method: 'DELETE',
//        headers: authHeader()
//    };
//
//    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
//}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
//        if (!response.ok) {
//            if (response.status === 401) {
//                // auto logout if 401 response returned from api
//                logout();
//                location.reload(true);
//            }
//
//            const error = (data && data.message) || response.statusText;
//            return Promise.reject(error);
//        }

        return data;
    });
}