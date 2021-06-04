export function authHeader() {
    // return authorization header with jwt token


    if (localStorage.getItem('token')) {
        return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    } else {
        return { 'Content-Type': 'application/json' };
    }



}