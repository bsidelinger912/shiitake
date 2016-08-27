/* eslint-disable max-len, import/no-unresolved */

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Shiitake = require('shiitake').default;

const text = 'You will see that no visible content is rendered, but if you look at the full text you will see the sentence is fully in the markup returned from the server, this makes Shiitake SEO complient for isomorphic apps.';

class App extends React.Component {
  render() {
    return (
      <div>
        <Shiitake lines={2} tagName="p">{text}</Shiitake>
      </div>
    );
  }
}

ReactDOMServer.renderToString(<App />);
