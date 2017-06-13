/* eslint-env node, mocha */
/* eslint-disable react/jsx-filename-extension*/

import React from 'react';
import { shallow, mount } from 'enzyme';

import Shiitake from '../src/index';

const expect = require('expect');

describe('Shiitake', () => {
  it('should render the children', () => {
    const el = mount(<Shiitake lines={1}>Hello world</Shiitake>);
    expect(el.text()).toContain('Hello world');
  });

  // TODO: figure how to do this
  it('should trim with elipsis');

  it('should pass mouse events through', () => {
    const testClick = expect.createSpy();
    const el = mount(<Shiitake lines={1} onClick={testClick}>Hello world</Shiitake>);

    el.simulate('click');
    expect(testClick).toHaveBeenCalled();
  });

  it('should use the tagname you want', () => {
    const el = shallow(<Shiitake lines={1} tagName="p">Hello world</Shiitake>);
    expect(el.find('p').length).toEqual(1);
  });

  it('should recalculate when children or lines change', (done) => {
    const el = mount(<Shiitake lines={1}>Hello world</Shiitake>);
    const el2 = mount(<Shiitake lines={1}>Hello world</Shiitake>);

    setTimeout(() => {
      // it should have done initial calculation by now
      expect(el.state().lastCalculatedWidth).toBeGreaterThan(-1);

      const spy = expect.spyOn(el.instance(), 'handleResize');
      el.setProps({ lines: 2 });
      el.setState({ children: 'hello…' });

      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(el.state().lastCalculatedWidth).toEqual(-1);
        expect(el.state().testChildren).toEqual('');
        expect(el.state().children).toEqual(el.props().children);

        done();
      }, 0);

      // it should have done initial calculation by now
      expect(el2.state().lastCalculatedWidth).toBeGreaterThan(-1);

      const spy2 = expect.spyOn(el2.instance(), '_setTestChildren');
      el2.setProps({ children: 'hello' });
      expect(spy2).toHaveBeenCalled();
      expect(el2.state().lastCalculatedWidth).toEqual(-1);

    }, 50);
  });
});
