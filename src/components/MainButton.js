import React from 'react';
import PropTypes from 'prop-types';

import './MainButton.css';

const MainButton = ({type, children, loading}) => (
    <button className="MainButton MainButton--primary" type={type} disabled={loading}>
        {loading && <img className="MainButton__spinner" src="spinner.svg" alt="spinner" />}
        <span>{children}</span>
    </button>
);

MainButton.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    loading: PropTypes.bool.isRequired
};

export default MainButton;