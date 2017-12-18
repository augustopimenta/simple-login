import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Alert.scss';

const Alert = ({type, message}) => (
    <div className={classNames('Alert', {[`Alert--${type}`]: type, 'Alert--visible': message})}>
        {message}
    </div>
);

Alert.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired
};

export default Alert;
