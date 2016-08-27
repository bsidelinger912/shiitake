/* eslint-env node, mocha */

const expect = require('expect');

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Shiitake from '../src/index';

describe('Shiitake', () => {
  it('should render all the children on the server', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium tincidunt viverra.';
    const string = ReactDOMServer.renderToString(<Shiitake lines={2} tagName="p">{text}</Shiitake>);
    expect(string).toContain(text);
  });
});
