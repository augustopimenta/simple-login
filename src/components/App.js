import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import Alert from './Alert';
import Logo from './Logo';
import LoginForm from './LoginForm';
import SettingsForm from './SettingsForm';
import IconButton from './IconButton';

import './App.scss';

export class App extends Component {

    goToMain = e => {
        this.props.history.replace('/');
    };

    goToSettings = e => {
        this.props.history.replace('/settings');
    };

    render() {
        const { alert } = this.props;

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
                <Route exact path="/settings" component={SettingsForm} />   
            </div>
        );
    }
}

const mapStateToProps = state => ({
    alert: state.alert,
});

export default withRouter(connect(mapStateToProps, null, null, { withRef: true })(App));
