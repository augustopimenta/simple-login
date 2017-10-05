import { combineReducers } from 'redux';

import loading from './loading';
import alert from './alert';

export default combineReducers({ loading, alert });