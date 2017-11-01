import axios from 'axios';
import * as env from '../env';

export const requestLogin = id => {
    return axios.post(env.LOGIN_URL, { ...env.LOGIN_PARAMS, numeroUsuario: id });
};