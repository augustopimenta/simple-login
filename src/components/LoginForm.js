import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getActiveTab, createTab, changeTabUrl, closeExtension } from '../services/extension';
import { requestLogin } from '../services/request';

import * as loading from '../actions/loading';
import * as alert from '../actions/alert';

import Button from './Button';

import './LoginForm.scss';

export class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { ctrlPressed: false };
    }

    componentDidMount() {
        window.document.addEventListener('keydown', this.ctrlKeyDown, false);
        window.document.addEventListener('keyup', this.ctrlKeyUp, false);
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.ctrlKeyDown);
        window.document.removeEventListener('keyup', this.ctrlKeyUp);
    }

    ctrlKeyDown = e => {
        if (e.which === 17) {
            this.setState({ ctrlPressed: true });
        }
    };

    ctrlKeyUp = e => {
        if (e.which === 17) {
            this.setState({ ctrlPressed: false });
        }
    };

    inputKeyDown = e =>  {
        if (e.which === 13 && e.ctrlKey) {
            this.form.dispatchEvent(new Event('submit'));
        }
    };

    authenticate = e => {
        e.preventDefault();

        const { dispatch, settings } = this.props;

        const ctrlPressed = this.state.ctrlPressed;

        if (!settings.url) {
            dispatch(alert.setDelayedMessage(alert.DELAY_MEDIUM, alert.TYPE_ERROR, 'Nenhuma configuração foi encontrada'));
            this.goToSettings();
            return;
        }

        dispatch(loading.show());
        dispatch(alert.setMessage(alert.TYPE_INFO, 'Autenticando...'));

        requestLogin(settings.url, settings.params, e.target.elements.id.value)
            .then(response => {
                getActiveTab(tab => {
                    if (ctrlPressed) {
                        createTab(response.request.responseURL);
                    } else {
                        changeTabUrl(tab.id, response.request.responseURL);
                    }

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

    goToSettings = () => {
        this.props.history.replace('/settings');
    };

    render() {
        const { loading } = this.props;

        return (
            <form ref={ref => this.form = ref} className="LoginForm" onSubmit={e => this.authenticate(e)}>
                <input onKeyDown={this.inputKeyDown} className="LoginForm__input" placeholder="Número" type="text" id="id" name="id" autoFocus={true} disabled={loading} />
                <Button type="submit" loading={loading} disabled={loading}>
                    Logar {this.state.ctrlPressed && <small>(Nova aba)</small>}
                </Button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading.enabled,
    settings: state.settings
});

export default withRouter(connect(mapStateToProps)(LoginForm));