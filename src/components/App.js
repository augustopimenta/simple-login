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
import * as settings from '../actions/settings';

import './App.scss';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: { url: null, params: null }
        };
    }

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
                dispatch(alert.setDelayedMessage(alert.DELAY_FAST, alert.TYPE_ERROR, 'Ocorreu um erro'));
            });
    };

    setError = error => {
        this.setState(prevState => {
            return {errors: { ...prevState.errors, ...error }};
        });
    };

    validateUrl = value => {
        let error = null;

        if (!value) {
            this.setError({ url: "Campo obrigatório" });
            return false; 
        }

        if (!/^((https?):\/\/)[a-zA-Z0-9-?\/\.=&]*/.test(value)) {
            this.setError({ url: "Url inválida" });
            return false;
        }

        this.setError({ url: null });
        return true;
    };

    validateParams = value => {
        let error = null;
        
        if (!value) {
            this.setError({ params: "Campo obrigatório" });
            return false;
        }

        let json = null;        
        try {
            json = JSON.parse(value);
        } catch (e) {
            this.setError({ params: "JSON inválido" });
            return false;
        }

        const findedId = Object.keys(json).some(key => json[key] === "#ID#");
        if (!findedId) {
            this.setError({ params: "Valor #ID# não encontrado" });
            return false;
        }

        this.setError({ params: null });
        return true;
    };

    storeSettings = e => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(loading.show());        

        const urlValid = this.validateUrl(e.target.url.value);
        const paramsValid = this.validateParams(e.target.params.value);

        if (urlValid && paramsValid) {
            this.goToMain();            
            dispatch(loading.hide());
            dispatch(settings.setData({ url: e.target.url.value, params: JSON.parse(e.target.params.value) }));            
            dispatch(alert.setDelayedMessage(alert.DELAY_FAST, alert.TYPE_SUCCESS, 'Configurações salvas!')); 
        } else {
            dispatch(loading.hide());            
            dispatch(alert.setDelayedMessage(alert.DELAY_MEDIUM, alert.TYPE_ERROR, 'Corrija os erros abaixo antes de continuar'));                                        
        }
    };

    goToMain = e => {
        this.props.history.replace('/');
    };

    goToSettings = e => {
        this.props.history.replace('/settings');
    };

    render() {
        const { loading, alert, settings } = this.props;

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
                <Route exact path="/settings" render={() => <SettingsForm data={{form: settings, errors: this.state.errors}} loading={loading} onBack={this.goToMain} onSubmit={this.storeSettings} />} />   
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading.enable,
    alert: state.alert,
    settings: state.settings
});

export default withRouter(connect(mapStateToProps)(App));
