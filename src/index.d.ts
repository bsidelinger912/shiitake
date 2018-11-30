declare module 'shiitake' {

  import * as React from 'react';

  export interface ShiitakeProps {
    lines: number,
    throttleRate?: number,
    className?: string,
    tagName?: string,
    renderFullOnServer?: boolean,
    overflowNode?: React.ReactNode,
    onTruncationToggle?: (isTruncated: boolean) => void,
  }

  export default class Shiitake extends React.Component<ShiitakeProps> {
  }

}
