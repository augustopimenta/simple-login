import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const Button = ({type, children, loading, primary, disabled, onClick}) => (
    <button onClick={onClick} className={classNames('Button', { 'Button--primary': primary })} type={type} disabled={disabled}>
        {loading && <img className="Button__spinner" src={ require('../assets/spinner.svg') } alt="spinner" />}
        <span>{loading || children}</span>
    </button>
);

Button.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    onClick: PropTypes.func
};

Button.defaultProps = {
    primary: true,
    loading: false,
    disabled: false,
    onClick: () => {}
};

export default Button;