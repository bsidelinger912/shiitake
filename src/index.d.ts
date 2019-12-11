declare module 'shiitake' {

  import * as React from 'react';

  type WhitelistedElementAttributes = React.HTMLAttributes<HTMLDivElement> 
    | React.HTMLAttributes<HTMLParagraphElement>
    | React.HTMLAttributes<HTMLAnchorElement>
    | React.HTMLAttributes<HTMLSpanElement>
    | React.HTMLAttributes<HTMLHeadingElement>;

  export interface ShiitakeProps {
    lines: number,
    throttleRate?: number,
    className?: string,
    tagName?: string,
    overflowNode?: React.ReactNode,
    onTruncationChange?: (isTruncated: boolean) => void,
    attributes: WhitelistedElementAttributes,
  }

  export default class Shiitake extends React.Component<ShiitakeProps> {
  }

}
