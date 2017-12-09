import React from 'react';
import PropTypes from 'prop-types';

import './IconButton.scss';

const IconButton = ({onClick, src, title, alt}) => (
    <button className="IconButton" type="button" onClick={onClick}>
        <img className="IconButton__icon" src={src} title={title} alt={alt} />
    </button>
);

IconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default IconButton;