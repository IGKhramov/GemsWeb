import { authHeader } from '../js/auth.header';

export const userService = {
    login,
    logout,
//    register,
    getAll,
//    getById,
//    update,
//    delete: _delete
};

function login(username, password) {
//    const client_id = "gem_web_ui";
//    const client_secret = '86f3478157f4db80dd962ce83539251e51f288924f12aaa070cbd0a487704fc8';
//    const grant_type = 'password';

    const formBody ="client_id=gem_web_ui&client_secret=86f3478157f4db80dd962ce83539251e51f288924f12aaa070cbd0a487704fc8&grant_type=password&username="+username+"&password="+password;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//        body: JSON.stringify({ grant_type, username, password, client_id, client_secret})
        body: formBody
    };

    return fetch(`http://192.168.10.33:10080/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                user.cTime = new Date();
                user.expTime = new Date(user.cTime.getTime()+user.expires_in*3600);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    console.log("running logout");
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
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
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