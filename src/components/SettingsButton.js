import React from 'react';

import './SettingsButton.scss';

const SettingsButton = ({onClick}) => (
    <button className="SettingsButton" type="button" onClick={onClick}>
        <img className="SettingsButton__icon" src={ require('../assets/settings.svg') } title="Configurações" alt="settings" />
    </button>
);

export default SettingsButton;