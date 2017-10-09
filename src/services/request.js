import axios from 'axios';

export const requestLogin = id => {
    const data = {
        '_token': '',
        'isTablet': 0,
        'impressora': 0,
        'usuarioAD': '99705636',
        'numeroUsuario': id,
        'senhaAD': '',
        'cpf': '024.252.377-39',
        'nascimento': '13/08/1976'
    };

    return axios.post('http://portalclick-aceite.la.interbrew.net/login', data);
};