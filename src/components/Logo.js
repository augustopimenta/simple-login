import React from 'react';
import PropTypes from 'prop-types';

import './Logo.scss';

const Logo = ({title}) => (
    <div className="Logo">
        Simple Login {title && <strong> / {title}</strong>}
    </div>
);

Logo.propTypes = {
    title: PropTypes.string,
};

export default Logo;