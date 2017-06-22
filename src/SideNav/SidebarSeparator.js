/* @flow */
import React from 'react';
import styled from 'styled-components';
import HorizontalRule from '../HorizontalRule';

export const Title = styled.div`
    padding: 12px;
`;

export const Separator = styled.div`
    padding-right: 12px;
`;

const SeparatorTitleContainer = styled.div`
    font-size: 14px;
    color: #AAA;
    margin: 10px 12px;
    padding: 4px 12px 2px;
`;

const SeparatorTitle = ({ children }: ReactChildren) => {
  return (
    <SeparatorTitleContainer>
      {children}
      <HorizontalRule />
    </SeparatorTitleContainer>
  );
};

export default SeparatorTitle;
