import React from 'react';
import ReactDOM from 'react-dom';

import Shiitake from '../src/index.jsx';

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium tincidunt viverra. Pellentesque
          auctor leo sit amet eros fringilla placerat. Proin et velit nec nulla laoreet sagittis. Nullam finibus lorem
          cursus, convallis diam nec, laoreet libero. In venenatis, risus sit amet lobortis commodo, dui nulla feugiat
          libero, sed pharetra enim mauris id turpis.
        </Shiitake>
        <p className="read-more">
          read more <a href="https://github.com/bsidelinger912/shiitake#readme">here</a>.
        </p>
      </div>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
