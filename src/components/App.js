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

                <Route exact path="/" component={LoginForm} />
                <Route exact path="/settings" render={SettingsForm} />   
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading.enable,
    alert: state.alert,
    settings: state.settings
});

export default withRouter(connect(mapStateToProps, null, null, {withRef: true})(App));
