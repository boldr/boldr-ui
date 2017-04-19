import React from 'react';
import styled from 'styled-components';
import type { ReactChildren } from '../../types/react.js.flow';

type Props = {
  children: ReactChildren,
};

const ContentCont = styled.div`
  width:  100%;
      padding-bottom: 50px;
`;

const DashboardContent = (props: Props) => {
  return (
    <ContentCont { ...props }>
      {props.children}
    </ContentCont>
  );
};

export default DashboardContent;
