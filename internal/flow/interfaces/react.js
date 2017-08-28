// @flow
import React from 'react';

declare type ReactElement = React.Element<any>;

declare type ReactNode = string | number | ReactElement | Array<ReactElement>;

declare type ReactChild = ReactNode | boolean | void | null;

declare type ReactChildren = ReactChild | Array<ReactChildren>;
