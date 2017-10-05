/*global chrome*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Logo from './Logo';
import MainButton from './MainButton';
import * as loading from '../actions/loading';

import './App.css';

class App extends Component {

    onSubmit = e => {
        e.preventDefault();

        const form = e.target;

        const data = {
            '_token': '',
            'isTablet': 0,
            'impressora': 0,
            'usuarioAD': '99705636',
            'numeroUsuario': e.target.id.value,
            'senhaAD': '',
            'cpf': '024.252.377-39',
            'nascimento': '13/08/1976'
        };

        this.props.showLoading();

        axios.post('http://portalclick-aceite.la.interbrew.net/login', data)
            .then(response => {
                chrome.tabs.query({active: true}, tab => {
                    chrome.tabs.update(tab[0].id, {url: response.request.responseURL});
                    this.props.hideLoading();
                    form.reset();
                });
            })
            .catch(() => {
                this.props.hideLoading();
            });
    };

    render() {
        const { loading } = this.props;

        return (
            <div className="App">
                <Logo />
                <form className="App__form" onSubmit={this.onSubmit}>
                    <input className="App__input" placeholder="Número" type="text" name="id" autoFocus={true} disabled={loading} />
                    <MainButton type="submit" loading={loading}>Logar</MainButton>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading.enable
});

const mapDispatchToProps = dispatch => ({
    showLoading: () => {
        dispatch(loading.show());
    },
    hideLoading: () => {
        dispatch(loading.hide());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
