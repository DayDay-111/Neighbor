import axios from 'axios'

export function fetch( url, payload,method = 'post'){
    if(method === 'get'){
        return axios['get'](url, {params: payload})
    } else {
        return axios[method](url, payload)
    }
}
