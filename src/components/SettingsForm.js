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

class SettingsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: { url: null, params: null }
        };
    }

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
            this.goToMain();            
            dispatch(loading.hide());
            const data = { url: elements.url.value, params: JSON.parse(elements.params.value) };
            dispatch(settings.setData(data));
            dispatch(alert.setDelayedMessage(alert.DELAY_FAST, alert.TYPE_SUCCESS, 'Configurações salvas!')); 
            
            saveData({ settings: data });
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
                    placeholder="http://meusite.com/login" 
                    type="text" 
                    name="url" 
                    defaultValue={settings.url} 
                    autoFocus={true} 
                    disabled={loading.enabled} 
                    />
                {errors.url && <span className="SettingsForm__error">{errors.url}</span>}
        
                <label className="SettingsForm__label" htmlFor="params">Parâmetros de envio: <small>Obrigatório adicionar um valor #ID#</small> </label>
                <textarea 
                    id="params" 
                    className="SettingsForm__input" 
                    placeholder={'{\n  id: "#ID#",\n  tipo: 1\n}'} 
                    rows="4" 
                    name="params" 
                    defaultValue={settings.params ? JSON.stringify(settings.params, null, 4) : ''} 
                    disabled={loading.enabled} 
                    />
                {errors.params && <span className="SettingsForm__error">{errors.params}</span>}
        
                <div className="SettingsForm__buttons">
                    <Button type="button" primary={false} disabled={loading.enabled} onClick={() => this.goToMain()}>Voltar</Button>
                    <Button type="submit" loading={loading.enabled} disabled={loading.enabled}>Salvar</Button>            
                </div>
            </form>
        );
    }

}

const mapStateToProps = state => ({
    loading: state.loading,
    settings: state.settings
});

export default withRouter(connect(mapStateToProps, null, null, {withRef: true})(SettingsForm));