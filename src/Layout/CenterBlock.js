/* @flow */
import * as React from 'react';

import Row from './Row';
import Col from './Col';

type Props = {
  children: React.ChildrenArray<number>,
};

const CenterBlock = (props: Props) => {
  return (
    <Row xsCenter>
      <Col xs={6}>
        {props.children}
      </Col>
    </Row>
  );
};

export default CenterBlock;
