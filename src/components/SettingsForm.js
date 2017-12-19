import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './SettingsForm.scss';

const SettingsForm = ({data, onSubmit, loading, onBack}) => (
	<form className="SettingsForm" onSubmit={onSubmit}>
        <label className="SettingsForm__label" htmlFor="url">Url de login:</label>
        <input 
            id="url" 
            className="SettingsForm__input" 
            placeholder="http://meusite.com/login" 
            type="text" 
            name="url" 
            defaultValue={data.form.url} 
            autoFocus={true} 
            disabled={loading} 
            />
        {data.errors.url && <span className="SettingsForm__error">{data.errors.url}</span>}

        <label className="SettingsForm__label" htmlFor="params">Parâmetros de envio: <small>Obrigatório adicionar um valor #ID#</small> </label>
        <textarea 
            id="params" 
            className="SettingsForm__input" 
            placeholder={'{\n  id: "#ID#",\n  tipo: 1\n}'} 
            rows="4" 
            name="params" 
            defaultValue={data.form.params ? JSON.stringify(data.form.params, null, 4) : ''} 
            disabled={loading} 
            />
        {data.errors.params && <span className="SettingsForm__error">{data.errors.params}</span>}

        <div className="SettingsForm__buttons">
            <Button type="button" primary={false} disabled={loading} onClick={onBack}>Voltar</Button>
            <Button type="submit" loading={loading} disabled={loading}>Salvar</Button>            
        </div>
    </form>
);

SettingsForm.propTypes = {
    data: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default SettingsForm;