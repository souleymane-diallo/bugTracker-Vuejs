import axios from 'axios';

export default (url = 'http://greenvelvet.alwaysdata.net/bugTracker/api') => {
    return axios.create({
        basrURL: url
    })
}