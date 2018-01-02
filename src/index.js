import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';
import { getData } from './services/persist';

import 'core-js/es6/map';
import 'core-js/es6/set';

import './icons/icon32.png';
import './icons/icon48.png';
import './icons/icon128.png';

import './index.scss';

const store = createStore(reducers, getData(), applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
    	<Router>
        	<App />
    	</Router>
    </Provider>,
    document.getElementById('root')
);