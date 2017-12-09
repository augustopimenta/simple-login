import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './MainButton.scss';

const MainButton = ({type, children, loading, primary, disabled, onClick}) => (
    <button onClick={onClick} className={classNames('MainButton', { 'MainButton--primary': primary })} type={type} disabled={disabled}>
        {loading && <img className="MainButton__spinner" src={ require('../assets/spinner.svg') } alt="spinner" />}
        <span>{children}</span>
    </button>
);

MainButton.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    onClick: PropTypes.func
};

MainButton.defaultProps = {
    primary: true,
    loading: false,
    disabled: false,
    onClick: () => {}
};

export default MainButton;