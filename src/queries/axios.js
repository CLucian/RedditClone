import axios from 'axios'

let instance

export default function getAxios() {
    return instance
}

export function setupAxios(token) {
    instance = axios.create({
        headers: {
            authorization: 'bearer ' + token,
        },
    })
}
