export const apiUrl = process.env.GEMS_API_URL || "https://us.navalclash.com/oldsdb/";

export async function apiCall(url, { body, searchParams } = {}, method='GET') {
    let params = {
        method: method,
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if(body) params.body = JSON.stringify(body);
    if(searchParams) url += '?' + new URLSearchParams(searchParams);

    return fetch(url, params).then(response => response.json());
}
