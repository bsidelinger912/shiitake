import React from 'react';
import ReactDOM from 'react-dom';

import Shiitake from 'shiitake';

import './index.css';

export class App extends React.Component {
  render() {
    const text = 'Cook it up all night with Shitakes';

    function click() {
      console.log('click');
    }

    return (
      <div className="wrapper">
        <h1>Shiitake Demo</h1>
        <div className="side-by-side">
          <Shiitake lines={2} throttleRate={200} className="shiitake">
            {text}
          </Shiitake>
          <div className="line-clamp">
            {text}
          </div>
        </div>
        <div className="shiitake-inline-wrapper">
          <Shiitake lines={1} throttleRate={200} className="shiitake-inline">
            {text}
          </Shiitake>
          >
        </div>
        <Shiitake tagName="p" lines={1} throttleRate={200} className="shiitake-paragraph" onClick={click}>
          {text}
        </Shiitake>
        <p className="read-more">
          read more <a href="https://github.com/bsidelinger912/shiitake#readme">here</a>.
        </p>
      </div>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
