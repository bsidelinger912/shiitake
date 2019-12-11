/* eslint-env node, mocha */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Shiitake from '../src/index';

Enzyme.configure({ adapter: new Adapter() });

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
    const el = mount(<Shiitake lines={1} attributes={{ onClick: testClick }}>Hello world</Shiitake>);

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

  // TODO: redo tests with react-testing-library in order to capture re-render without arbitrary timeouts
  it('should recalculate when children or lines change');

  it('should use a custom overflowNode if provided', () => {
    const el = shallow(
      <Shiitake
        lines={1}
        overflowNode={<a href="https://google.com" target="_blank" rel="noopener noreferrer"> ...read more</a>}
      >
        Hello world
      </Shiitake>
    );
    expect(el.find('a').length).toBeGreaterThan(0);
  });
});
