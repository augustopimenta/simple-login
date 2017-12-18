import React from 'react';
import Logo from './Logo';

it('renders without crashing', () => {
    const wrapper = shallow(<Logo />);

    expect(wrapper).toBeTruthy();
});

it('display title after logo', () => {
    const title = 'Configs';
    const wrapper = shallow(<Logo title={title} />);

    expect(wrapper.text()).toContain(title);
});