/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import Shiitake from '../src';

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

class App extends React.Component {
  constructor() {
    super();

    this.state = { ipsum, dynamicLines: 2, truncatedText: false, dynamicText: ipsum };

    this.click = this.click.bind(this);
    this.toggleDynamicLines = this.toggleDynamicLines.bind(this);
    this.toggleTruncatedText = this.toggleTruncatedText.bind(this);
    this.toggleDynamicText = this.toggleDynamicText.bind(this);
  }

  click() {
    this.setState({ ipsum: ipsum2 });
  }

  toggleDynamicLines() {
    this.setState({ dynamicLines: (this.state.dynamicLines === 2) ? 1 : 2 });
  }

  toggleTruncatedText(isTruncated) {
    this.setState({ truncatedText: isTruncated });
  }

  toggleDynamicText() {
    const dynamicText = this.state.dynamicText === ipsum ? ipsum2 : ipsum;
    this.setState({ dynamicText });
  }

  render() {
    const { truncatedText } = this.state;
    const text = 'Cook it up all night with Shitakes';

    // used to verify that passing undefined is safe
    let nullText;

    return (
      <div className="wrapper">
        <h1>Shiitake Demo</h1>
        <p>
          Here are some examples of Shiitake in the wild.
        </p>

        <h2>Compare with webkit line-clamp</h2>
        <div className="side-by-side">
          <Shiitake lines={2} throttleRate={200} attributes={{ className: 'shiitake' }}>
            {text}
          </Shiitake>
          <div className="line-clamp">
            {text}
          </div>
        </div>

        <h2>Create inline style with flexbox:</h2>
        <div className="shiitake-inline-wrapper">
          <Shiitake lines={1} throttleRate={200} attributes={{ className: 'shiitake' }}>
            {text}
          </Shiitake>
          &gt;
        </div>

        <h2>Specify your own tag name:</h2>
        <Shiitake tagName="p" lines={1} throttleRate={200} attributes={{ className: 'shiitake', onClick: this.onClick }}>
          {this.state.ipsum}
        </Shiitake>

        <h2>Can handle undefined children</h2>
        <Shiitake lines={1}>
          {nullText}
        </Shiitake>

        <h2>Example of showing/hiding</h2>
        <div className="show-hide-example">
          <h4>Hover here</h4>
          <div className="show-hide-content">
            <Shiitake lines={2}>
              {ipsum}
            </Shiitake>
          </div>
        </div>

        <h2>Change lines dynamically</h2>
        <div>
          <Shiitake lines={this.state.dynamicLines}>{ipsum}</Shiitake>
          <button onClick={this.toggleDynamicLines}>Change to {(this.state.dynamicLines === 2) ? '1 line' : '2 lines'}</button>
        </div>

        <h2>Change content dynamically</h2>
        <div>
          <Shiitake lines={1}>{this.state.dynamicText}</Shiitake>
          <button onClick={this.toggleDynamicText}>Change text</button>
        </div>

        <h2>Custom overflow node</h2>
        <div>
          <Shiitake
            lines={2}
            overflowNode={<a href="https://github.com/bsidelinger912/shiitake#readme" target="_blank" rel="noopener noreferrer"> ...read more</a>}
          >
            {ipsum}
          </Shiitake>
        </div>

        <h2>Detect if text is truncated</h2>
        <div>
          <Shiitake
            lines={2}
            onTruncationChange={this.toggleTruncatedText}
          >
            {ipsum}
          </Shiitake>
          <p className="example-label">
            {truncatedText ? 'this text is truncated ^^' : 'this text is not truncated ^^'}
          </p>
        </div>

        <h2>Truncate the contents of an anchor tag</h2>
        <div>
          <Shiitake lines={2} tagName="a" attributes={{ href: 'https://github.com/bsidelinger912/shiitake#readme' }}>
            {ipsum}
          </Shiitake>
        </div>

        <p className="read-more">
          read more <a href="https://github.com/bsidelinger912/shiitake#readme">here</a>.
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
