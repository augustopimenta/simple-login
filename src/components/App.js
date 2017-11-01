import React, {Component} from 'react';
import {connect} from 'react-redux';

import Logo from './Logo';
import MainButton from './MainButton';
import Alert from './Alert';

import {getActiveTab, changeTabUrl, closeExtension} from '../services/extension';
import {requestLogin} from '../services/request';

import * as loading from '../actions/loading';
import * as alert from '../actions/alert';

import './App.scss';

class App extends Component {

    onSubmit = e => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(loading.show());
        dispatch(alert.setMessage(alert.TYPE_INFO, 'Autenticando...'));

        requestLogin(e.target.id.value)
            .then(response => {
                getActiveTab(tab => {
                    changeTabUrl(tab.id, response.request.responseURL);
                    dispatch(loading.hide());
                    dispatch(alert.clearMessage());
                    closeExtension();
                });
            })
            .catch(() => {
                dispatch(loading.hide());
                dispatch(alert.setDelayedMessage(5000, alert.TYPE_ERROR, 'Ocorreu um erro'));
            });
    };

    render() {
        const { loading, alert } = this.props;

        return (
            <div className="App">
                <Alert type={alert.type} message={alert.message} />
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
    loading: state.loading.enable,
    alert: state.alert,
});

export default connect(mapStateToProps)(App);
