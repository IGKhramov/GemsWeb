export const apiUrl = process.env.GEMS_API_URL || "https://us.navalclash.com/";
const clientId = process.env.GEMS_CLIENT_ID;
const clientKey = process.env.GEMS_CLIENT_SECRET;

let auth = {};

export async function apiCall(url, { body, searchParams, headers } = {}, method='GET') {
    let params = {
        method: method,
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if(body) params.body = typeof body === 'string' ? body : JSON.stringify(body);
    if(searchParams) url += '?' + new URLSearchParams(searchParams);
    if(headers) params.headers = headers;
    if(auth.bearer) params.headers['Authorization'] = `Bearer ${auth.bearer}`;

    return fetch(url, params).then(response => response.json());
}

export async function apiLogin(email, password) {
    let data = `grant_type=password&client_id=${clientId}&client_secret=${clientKey}&username=${email}&password=${password}`;
    let token = await apiCall(apiUrl+'auth/login', {body: data, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}, 'POST');
    if(token) {
        auth.bearer = token.access_token ? token.access_token : auth.bearer;
        auth.expiresAt = token.expires_in ? new Date(Date.now() + token.expires_in*1000) : auth.expiresAt;
    }

    console.log("AUTH", auth);
    return auth;
}

//login example
//apiLogin('test@example.com', 'example_passW0rd');