import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getActiveTab, changeTabUrl, closeExtension } from '../services/extension';
import { requestLogin } from '../services/request';

import * as loading from '../actions/loading';
import * as alert from '../actions/alert';

import Button from './Button';

import './LoginForm.scss';

export class LoginForm extends Component {
    
    authenticate = e => {
        e.preventDefault();

        const { dispatch, settings } = this.props;

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
    }

    goToSettings = () => {
        this.props.history.replace('/settings');
    }

    render() {
        const { enabled } = this.props.loading;

        return (
            <form className="LoginForm" onSubmit={e => this.authenticate(e)}>
                <input className="LoginForm__input" placeholder="Número" type="text" id="id" name="id" autoFocus={true} disabled={enabled} />
                <Button type="submit" loading={enabled} disabled={enabled}>Logar</Button>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    settings: state.settings
});

export default withRouter(connect(mapStateToProps)(LoginForm));