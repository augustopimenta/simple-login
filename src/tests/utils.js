import React from 'react';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter as Router } from 'react-router-dom';

import reducers from '../reducers';

export const completeMount = (Component) => {
    let initialState = undefined;
    let routerProps = undefined;

    const obj = {
        url(url) {
            routerProps = { initialEntries: url };
            return this;
        },
        route(props) {
            routerProps = props;
            return this;
        },
        state(state) {
            initialState = state;
            return this;
        },
        make() {
            const store = createReduxStore(initialState);
            
            const wrapper = mount(
                <Provider store={store}>
                    <Router {...routerProps} >
                        <Component />
                    </Router>
                </Provider>
            );

            return { wrapper, store };
        }
    }

    return obj;
};

const createReduxStore = initialState => {
    return createStore(reducers, initialState, applyMiddleware(thunk));
};