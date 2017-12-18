import { combineReducers } from 'redux';

import loading from './loading';
import alert from './alert';
import settings from './settings';

export default combineReducers({ loading, alert, settings });