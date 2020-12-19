import axios from 'axios'

// let instance = axios.create({
//     headers: {
//         authorization: 'bearer ' + token,
//         // authorization: 'bearer ' + '49481234-gexpTbKRGfc7Q3HtPkA778FWz4R2As',
//     },
// })

// export default instance

let instance

export default function getAxios() {
    return instance
}

export function setupAxios(token, logout) {
    instance = axios.create({
        headers: {
            authorization: 'bearer ' + token,
            // authorization:
            //     'bearer ' + '49481234-gexpTbKRGfc7Q3HtPkA778FWz4R2As',
        },
    })

    /* instance.interceptors.request.use((response) => {
        console.log('response in getAxios', response)
        return response
    }) */
    instance.interceptors.response.use(
        (response) => {
            console.log('response in getAxios', response)
            return response
        },
        (err) => {
            const { response } = err
            console.log('HANDLING INTERCEPTOR', response)
            console.log('interceptor thingy', response.status === 401)
            if (response.status === 401) {
                logout()
                return
                // window.location.href = '/login'
                // alert('please relog')
            }
            return Promise.reject({})
            // const myresponse = err.response

            // history.push('/')
            // location.href = '/login'
            // TODO - invalidate token
        }
        /* ({ response }) => {
            console.log('HANDLING INTERCEPTOR', response)
        } */
    )
}
