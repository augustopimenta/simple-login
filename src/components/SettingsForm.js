import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import * as loading from '../actions/loading';
import * as alert from '../actions/alert';
import * as settings from '../actions/settings';

import { saveData } from '../services/persist';

import Button from './Button';

import './SettingsForm.scss';

export class SettingsForm extends Component {

    state = { errors: { url: null, params: null }};

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
        const { elements } = e.target;

        dispatch(loading.show());

        const urlValid = this.validateUrl(elements.url.value);
        const paramsValid = this.validateParams(elements.params.value);

        if (urlValid && paramsValid) {
            const data = { url: elements.url.value, params: JSON.parse(elements.params.value) };
            
            saveData({ settings: data }).then(() => {
                this.goToMain();            

                dispatch(settings.setData(data));                            
                dispatch(loading.hide());            
                dispatch(alert.setDelayedMessage(alert.DELAY_FAST, alert.TYPE_SUCCESS, 'Configurações salvas!')); 
            });
        } else {
            dispatch(loading.hide());            
            dispatch(alert.setDelayedMessage(alert.DELAY_MEDIUM, alert.TYPE_ERROR, 'Corrija os erros abaixo antes de continuar'));                                        
        }
    };

    goToMain = () => {
        this.props.history.replace('/');
    }

    render() {
        const { errors } = this.state;
        const { settings, loading } = this.props;

        return (
            <form className="SettingsForm" onSubmit={e => this.storeSettings(e)}>
                <label className="SettingsForm__label" htmlFor="url">Url de login:</label>
                <input 
                    id="url" 
                    className="SettingsForm__input" 
                    placeholder="Exemplo: http://meusite.com/login" 
                    type="text" 
                    name="url" 
                    defaultValue={settings.url} 
                    autoFocus={true} 
                    disabled={loading} 
                    />
                {errors.url && <span className="SettingsForm__error">{errors.url}</span>}
        
                <label className="SettingsForm__label" htmlFor="params">Parâmetros de envio: <small>Obrigatório adicionar um valor #ID#</small> </label>
                <textarea 
                    id="params" 
                    className="SettingsForm__input" 
                    placeholder={'Exemplo:\n\n{\n  "id": "#ID#",\n  "tipo": 1\n}'} 
                    rows="8" 
                    name="params" 
                    defaultValue={settings.params ? JSON.stringify(settings.params, null, 4) : ''} 
                    disabled={loading} 
                    />
                {errors.params && <span className="SettingsForm__error">{errors.params}</span>}
        
                <div className="SettingsForm__buttons">
                    <Button type="button" primary={false} disabled={loading} onClick={() => this.goToMain()}>Voltar</Button>
                    <Button type="submit" loading={loading} disabled={loading}>Salvar</Button>            
                </div>
            </form>
        );
    }

}

const mapStateToProps = state => ({
    loading: state.loading.enabled,
    settings: state.settings
});

export default withRouter(connect(mapStateToProps)(SettingsForm));