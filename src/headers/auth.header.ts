export default function authHeader() {
    let accessTokken = localStorage.getItem('Authorization')
    if(accessTokken) {
        return {
            Authorization: `Bearer ${accessTokken}`
        }
    }
    return {
        Authorization: ""
    }
}