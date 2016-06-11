/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React from 'react';
import assert from 'assert';

export default class extends React.Component {
  render() {
    assert(typeof this.props.children === 'string', 'You must only have text as the child of Shiitake');

    return (
      <div className="shiitake">{this.props.children}</div>
    );
  }
}
