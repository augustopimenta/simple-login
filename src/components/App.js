import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Alert from './Alert';
import Logo from './Logo';
import LoginForm from './LoginForm';
import SettingsForm from './SettingsForm';
import IconButton from './IconButton';

import { getActiveTab, changeTabUrl, closeExtension } from '../services/extension';
import { requestLogin } from '../services/request';

import * as loading from '../actions/loading';
import * as alert from '../actions/alert';

import './App.scss';

class App extends Component {

    authenticate = e => {
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

    storeSettings = e => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(loading.show());

        setTimeout(() => {
            dispatch(loading.hide());
            this.goToMain();
            dispatch(alert.setDelayedMessage(5000, alert.TYPE_SUCCESS, 'Configurações salvas!'));            
        }, 3000);
    };

    goToMain = e => {
        this.props.history.replace('/');
    };

    goToSettings = e => {
        this.props.history.replace('/settings');
    };

    render() {
        const { loading, alert } = this.props;

        return (
            <div className="App">
                <Alert type={alert.type} message={alert.message} />
                <Switch>
                    <Route exact path="/" 
                        render={() => (
                            <header className="App__header">
                                <Logo />   
                                <IconButton 
                                    onClick={this.goToSettings}
                                    src={ require('../assets/settings.svg') }
                                    title="Configurações"
                                    alt="settings" />
                            </header>
                        )} 
                    />
                    <Route exact path="/settings" 
                        render={() => (
                            <header className="App__header"> 
                                <Logo title="Configurações" />                                
                                <IconButton 
                                    onClick={this.goToMain}
                                    src={ require('../assets/back.svg') }
                                    title="Voltar"
                                    alt="back" />
                            </header>                                
                        )} 
                    />
                    <Redirect to="/" />
                </Switch>
                
                <Route exact path="/" render={() => <LoginForm loading={loading} onSubmit={this.authenticate} />} />
                <Route exact path="/settings" render={() => <SettingsForm loading={loading} onBack={this.goToMain} onSubmit={this.storeSettings} />} />    
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading.enable,
    alert: state.alert,
});

export default withRouter(connect(mapStateToProps)(App));
