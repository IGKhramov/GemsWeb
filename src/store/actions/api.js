import { authHeader } from "../../js/auth.header"

//export const apiUrl = process.env.GEMS_API_URL || "https://us.navalclash.com/oldsdb/";
//export const authUrl = process.env.GEMS_AUTH_URL || "https://us.navalclash.com/auth/";

export const apiUrl = process.env.GEMS_API_URL || "https://us.navalclash.com/oldsdb/";
export const authUrl = process.env.GEMS_AUTH_URL || "https://us.navalclash.com/auth/";




export async function apiCall(url, { body, searchParams } = {}, method='GET') {

    const token = authHeader();
    if (!token) {
        console.log("No token !!!")
    }
    token['Content-Type'] = 'application/json'
    const params = {
        method: method,
        cache: 'no-cache',
        headers: token
    };
    if(body) params.body = JSON.stringify(body);
    if(searchParams) url += '?' + new URLSearchParams(searchParams);

    console.log(`API call: \n   url:  ${JSON.stringify(url)}\n   params:  ${JSON.stringify(params)}`)
    return fetch(url, params).then(response => response.json());
}
