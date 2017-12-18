import React from 'react';
import IconButton from './IconButton';

describe('<IconButton />', () => {
    let wrapper;
    let onClickFn;    

    beforeEach(() => {
        onClickFn = jest.fn();
        wrapper = shallow(<IconButton onClick={onClickFn} src="icon.png" alt="icon" title="icon" />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });
    
    it('renders icon', () => {
        expect(wrapper.find('img').exists()).toBe(true);
    });

    it('calls on click event', () => {
        wrapper.simulate('click');

        expect(onClickFn).toBeCalled();
    });
})




