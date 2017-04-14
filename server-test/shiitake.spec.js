/* eslint-env node, mocha */
/* eslint-disable react/jsx-filename-extension*/

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Shiitake from '../src/index';

const expect = require('expect');

describe('Shiitake', () => {
  it('should render all the children on the server', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium tincidunt viverra.';
    const string = ReactDOMServer.renderToString(<Shiitake lines={2} tagName="p">{text}</Shiitake>);
    expect(string).toContain(text);
  });
});
