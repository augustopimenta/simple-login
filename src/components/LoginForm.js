import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import './LoginForm.scss';

const LoginForm = ({onSubmit, loading}) => (
	<form className="LoginForm" onSubmit={onSubmit}>
        <input className="LoginForm__input" placeholder="Número" type="text" name="id" autoFocus={true} disabled={loading} />
        <Button type="submit" loading={loading} disabled={loading}>Logar</Button>
    </form>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default LoginForm;