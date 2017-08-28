/* @flow */
import * as React from 'react';
import classNames from 'classnames';

type Props = {
  id: string,
  isExpanded: boolean,
  children: Array<React.Node>,
  className: string,
  hideBodyClassName: string,
  role: string,
};

const defaultProps = {
  id: '',
  isExpanded: false,
  className: 'boldrui-accordion__body',
  hideBodyClassName: 'boldrui-accordion__body--hidden',
  role: '',
};

const AccordionItemBody = ({
  id,
  isExpanded,
  children,
  className,
  hideBodyClassName,
  role,
}: Props) => {
  const bodyClass = classNames(className, {
    [hideBodyClassName]: !isExpanded,
  });
  const ariaHidden = !isExpanded;
  return (
    <div id={id} className={bodyClass} aria-hidden={ariaHidden} role={role}>
      {children}
    </div>
  );
};

AccordionItemBody.defaultProps = defaultProps;
AccordionItemBody.accordionElementName = 'AccordionItemBody';

export default AccordionItemBody;
