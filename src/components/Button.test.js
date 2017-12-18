import React from 'react';
import Button from './Button';

it('renders without crashing', () => {
    const wrapper = shallow(<Button type="button">Ok</Button>);

    expect(wrapper).toBeTruthy();
});

it('renders children', () => {
    const children = 'Go back';
    const wrapper = shallow(<Button type="button">{children}</Button>);

    expect(wrapper.text()).toBe(children);
});

it('shows spinner when loading', () => {
    const wrapper = shallow(<Button loading type="button">Ok</Button>);
    
    expect(wrapper.find('.Button__spinner').exists()).toBe(true);
});

it('can be disabled', () => {
    const wrapper = shallow(<Button disabled type="button">Ok</Button>);

    expect(wrapper.find('.Button[disabled]').exists()).toBe(true);    
});