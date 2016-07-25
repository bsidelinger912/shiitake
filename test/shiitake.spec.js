/* eslint-env node, mocha */

const expect = require('expect');

import React from 'react';
import { shallow, mount } from 'enzyme';

import Shiitake from '../src/index';

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
});
