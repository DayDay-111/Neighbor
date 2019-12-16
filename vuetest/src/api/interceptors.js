import axios from 'axios'

axios.defaults.timeout = 5000
if(window.basePath){
    axios.defaults.baseURL = window.basePath
}
