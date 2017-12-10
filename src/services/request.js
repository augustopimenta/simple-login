import axios from 'axios';

export const requestLogin = (url, params, id) => {
    const data = Object.keys(params).reduce((obj, key) => {
        obj[key] = /#ID#/.test(params[key]) ? params[key].replace('#ID#', id) : params[key];
        return obj;
    }, {});

    return axios.post(url, data);
};