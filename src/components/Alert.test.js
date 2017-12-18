import React from 'react';
import Alert from './Alert';

it('renders without crashing', () => {
    const wrapper = shallow(<Alert type="info" message="" />);
    
    expect(wrapper).toBeTruthy();
});

it('displays message of prop', () => {
    const message = 'Custom message';
    const wrapper = shallow(<Alert type="info" message={message} />);

    expect(wrapper.text()).toBe(message);
    expect(wrapper.find('.Alert--visible').exists()).toBe(true);
});

it('stays hidden with an empty message', () => {
    const wrapper = shallow(<Alert type="info" message="" />);

    expect(wrapper.find('.Alert--visible').exists()).toBe(false);
});