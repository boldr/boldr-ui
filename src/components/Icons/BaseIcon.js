import { default as React } from 'react';
import { PropTypes } from 'prop-types';

const BaseIcon = (
  { children, color, size, style, ...props },
  { reactIconBase = {} },
) => {
  const computedSize = size || reactIconBase.size || '1em';
  function onClick(e: Event) {
    if (props.onClick) {
      props.onClick(e);
    }
  }
  return (
    <svg
      children={children}
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      height={computedSize}
      width={computedSize}
      onClick={onClick}
      {...reactIconBase}
      {...props}
      style={{
        verticalAlign: 'middle',
        color: color || reactIconBase.color,
        ...(reactIconBase.style || {}),
        ...style,
      }}
    />
  );
};

BaseIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  onClick: PropTypes.func,
};
BaseIcon.defaultProps = {
  color: '#fff',
  size: '24',
};
BaseIcon.contextTypes = {
  iconBase: PropTypes.shape(BaseIcon.propTypes),
};

export default BaseIcon;
