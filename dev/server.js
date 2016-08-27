/* eslint-disable strict */
'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Shiitake = require('../src').default;

class App extends React.Component {
  render() {
    return (
      <div>
        <Shiitake lines={2} tagName="p">Hello</Shiitake>
      </div>
    );
  }
}

const string = ReactDOMServer.renderToString(<App />);

console.log(string);
