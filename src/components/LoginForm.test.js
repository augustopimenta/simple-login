import React from 'react';
import LoginForm from './LoginForm';
import sinon from 'sinon';

describe('<LoginForm />', () => {
    let wrapper;
    let onSubmitForm;

    beforeEach(() => {
        onSubmitForm = sinon.spy();
        wrapper = shallow(<LoginForm onSubmit={onSubmitForm} loading={false} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });
    
    it('can be disabled when is loading', () => {
        wrapper.setProps({ loading: true })

        expect(wrapper.find('.LoginForm__input[disabled]').exists()).toBe(true);
    });

    it('calls submit event', () => {
        const value = '12345678';
        
        const wrapper = mount(<LoginForm onSubmit={onSubmitForm} loading={false} />);
        wrapper.find('input').instance().value = value;
        wrapper.simulate('submit');

        const input = onSubmitForm.getCall(0).args[0].target.elements.id;

        expect(onSubmitForm.calledOnce).toBe(true);
        expect(input.value).toBe(value);
    });
})




