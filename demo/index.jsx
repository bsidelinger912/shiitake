import React from 'react';
import ReactDOM from 'react-dom';

import Shiitake from '../src/index.jsx';

export class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <h1>Shiitake Demo</h1>
        <Shiitake lines="3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel euismod dolor, at accumsan urna.
          Phasellus fermentum sagittis nisi vel hendrerit. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Shiitake>
      </div>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
