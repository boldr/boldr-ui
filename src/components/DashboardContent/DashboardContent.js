import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
};

const ContentCont = styled.div`
  height: 100%;
  width:  100%;
`;

const DashboardContent = (props: Props) => {
  return (
    <ContentCont { ...props }>
      {props.children}
    </ContentCont>
  );
};

export default DashboardContent;
