/* eslint-env node, mocha */
/* eslint-disable react/jsx-filename-extension */

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

  it('should handle non string children', () => {
    shallow(<Shiitake lines={1}>{null}</Shiitake>);
    shallow(<Shiitake lines={1}>{undefined}</Shiitake>);
    shallow(<Shiitake lines={1}>{false}</Shiitake>);
    shallow(<Shiitake lines={1}><div>foo bar</div></Shiitake>);
  });

  it('should recalculate when children or lines change', (done) => {
    const el = mount(<Shiitake lines={1}>Hello world</Shiitake>);
    const el2 = mount(<Shiitake lines={1}>Hello world</Shiitake>);

    setTimeout(() => {
      // it should have done initial calculation by now
      expect(el.state().lastCalculatedWidth).toBeGreaterThan(-1);

      el.setProps({ lines: 2 });
      el.setState({ children: 'hello...' });

      expect(el2.state().lastCalculatedWidth).toBeGreaterThan(-1);
      el2.setProps({ children: 'yo there' });

      setTimeout(() => {
        expect(el.find('.shiitake-visible-children').text().indexOf('Hello world')).toBeGreaterThan(-1);
        expect(el.find('.shiitake-test-children').text().indexOf('Hello world')).toBeGreaterThan(-1);

        // it should set the children then render again with the test children set
        expect(el2.find('.shiitake-visible-children').text().indexOf('yo there')).toBeGreaterThan(-1);
        setTimeout(() => {
          expect(el2.find('.shiitake-test-children').text().indexOf('yo there')).toBeGreaterThan(-1);
          done();
        }, 0);
      }, 0);
    }, 50);
  });

  it('should use a custom overflowNode if provided', () => {
    const el = shallow(
      <Shiitake
        lines={1}
        overflowNode={<a href="https://google.com" target="_blank" rel="noopener noreferrer"> ...read more</a>}
      >
        Hello world
      </Shiitake>
    );
    expect(el.find('a').length).toEqual(1);
  });
});
