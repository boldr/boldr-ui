// @flow
import React from 'react';
import type { Node } from 'react';
import cN from 'classnames';

type Props = {
  /**
   * The children to render within the Box.
   */
  children: Array<Node>,
  /**
   * An optional className of the Box.
   */
  className?: string,
};
// A Box can display more important content in a simple manner.

const Block = ({ className, children, ...rest }: Props) => {
  const finalClassName = cN({
    'boldr-block': true,
    // $FlowIssue
    [className]: className && className.length,
  });

  return (
    <div {...rest} className={finalClassName}>
      {children}
    </div>
  );
};

export default Block;
