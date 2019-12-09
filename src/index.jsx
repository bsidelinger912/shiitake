/**
 * @class Shiitake
 * @description React line clamp that won't get you fired
 */

import React from 'react';
import Rebuild from './rebuild';

class Shiitake extends React.Component {
  render() {
    return (
      <Rebuild {...this.props} />
    );
  }
}

export default Shiitake;
