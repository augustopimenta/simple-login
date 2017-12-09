import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './SettingsForm.scss';

const SettingsForm = ({onSubmit, loading, onBack}) => (
	<form className="SettingsForm" onSubmit={onSubmit}>
        <label htmlFor="url">Url de login:</label>
        <input id="url" className="SettingsForm__input" placeholder="http://meusite.com/login" type="text" name="id" autoFocus={true} disabled={loading} />

        <label htmlFor="params">Parâmetros de envio: <small>Obrigatório adicionar um valor #ID#</small> </label>
        <textarea id="params" className="SettingsForm__input" placeholder={'{\n  id: "#ID#",\n  tipo: 1\n}'} rows="4" name="params" disabled={loading} />

        <div className="SettingsForm__buttons">
            <Button type="button" primary={false} disabled={loading} onClick={onBack}>Voltar</Button>
            <Button type="submit" loading={loading} disabled={loading} >Salvar</Button>            
        </div>
    </form>
);

SettingsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default SettingsForm;