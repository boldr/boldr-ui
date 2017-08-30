import React from 'react';
import PropTypes from 'prop-types';
import cN from 'classnames';

/*
 * The paragraph should be used to display long strings.
 * A good rule is to separate long texts in paragraphs after the third row.
 */

const Paragraph = ({ className, isLead, isLight, children, ...rest }) => {
  const finalClassName = cN({
    'boldrui-p': true,
    'boldrui-p--lead': isLead,
    'boldrui-p--light': isLight,
    [className]: className && className.length,
  });

  return (
    <p {...rest} className={finalClassName}>
      {children}
    </p>
  );
};

Paragraph.propTypes = {
  /**
   * The text content
   */
  children: PropTypes.node.isRequired,

  /**
   * If set to `true` the paragraph will be displayed in a
   * slightly bigger manner.
   */
  isLead: PropTypes.bool,
  /**
   * If set to `true` the paragraph will use a light font color
   */
  isLight: PropTypes.bool,
  /**
   * Optional css class name
   */
  className: PropTypes.string,
};
Paragraph.defaultProps = {
  isLead: false,
  isLight: false,
};

export default Paragraph;
