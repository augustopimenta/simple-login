import React from 'react';
import PropTypes from 'prop-types';

import MainButton from './MainButton';

import './LoginForm.scss';

const LoginForm = ({onSubmit, loading}) => (
	<form className="LoginForm" onSubmit={onSubmit}>
        <input className="LoginForm__input" placeholder="Número" type="text" name="id" autoFocus={true} disabled={loading} />
        <MainButton type="submit" loading={loading} disabled={loading}>Logar</MainButton>
    </form>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default LoginForm;