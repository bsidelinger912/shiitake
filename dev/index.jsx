import React from 'react';
import ReactDOM from 'react-dom';

import Shiitake from '../src/index.jsx';

import './index.css';

const ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium tincidunt viverra. Pellentesque
auctor leo sit amet eros fringilla placerat. Proin et velit nec nulla laoreet sagittis. Nullam finibus lorem
cursus, convallis diam nec, laoreet libero. In venenatis, risus sit amet lobortis commodo, dui nulla feugiat
libero, sed pharetra enim mauris id turpis.`;

const ipsum2 = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export class App extends React.Component {
  constructor() {
    super();

    this.state = { ipsum };

    this.click = this.click.bind(this);
  }

  click() {
    this.setState({ ipsum: ipsum2 });
  }

  render() {
    const text = 'Cook it up all night with Shitakes';

    // used to verify that passing undefined is safe
    let nullText;

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
        <Shiitake tagName="p" lines={1} throttleRate={200} className="shiitake-paragraph" onClick={this.click}>
          {this.state.ipsum}
        </Shiitake>
        <Shiitake lines={1}>
          {nullText}
        </Shiitake>
        <p className="read-more">
          read more <a href="https://github.com/bsidelinger912/shiitake#readme">here</a>.
        </p>
      </div>
		);
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
