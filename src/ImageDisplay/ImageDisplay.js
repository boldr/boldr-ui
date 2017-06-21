/* @flow */
import React from 'react';
import cxN from 'classnames';
import Tooltip from '../Tooltip';

import Icon from '../Icons';
import BoldrComponent from '../utils/BoldrComponent';

export type Props = {
  imageSrc: string,
  onAddImage?: () => void,
  onUpdateImage?: () => void,
  onRemoveImage?: () => void,
};

class ImageDisplay extends BoldrComponent {
  props: Props;
  render() {
    const { imageSrc, onAddImage, onUpdateImage, onRemoveImage } = this.props;

    const tooltipCommonProps = {
      showDelay: 0,
      hideDelay: 0,
      align: 'center',
      placement: 'left',
      moveBy: { x: 2, y: 0 },
    };
    const classes = cxN('boldrui-image-display__container', { 'has-logo': imageSrc });
    return (
      <div className={classes}>
        <div data-hook="add-image" className="add-logo" onClick={onAddImage}>
          <div className="dashed-border" />
          <div className="plus-icon"><Icon kind="plus2" size="47px" color="#eaf7ff" /></div>
        </div>
        {!!imageSrc &&
          <div className="boldrui-image-display__logo--container">
            <div className="boldrui-image-display__layout">
              <img
                data-hook="boldrui-image-display-image"
                className="boldrui-image-display__image"
                src={imageSrc}
              />
            </div>
            <div className="boldrui-image-display__bg">
              <div className="boldrui-image-display__btns">
                <Tooltip content="Replace" {...tooltipCommonProps}>
                  <div
                    data-hook="update-image"
                    className="boldrui-image-display__btn"
                    onClick={onUpdateImage}
                  >
                    <Icon kind="replace" color="#eaf7ff" size="1.2em" />
                  </div>
                </Tooltip>
                <Tooltip content="Remove" {...tooltipCommonProps}>
                  <div
                    data-hook="remove-image"
                    className="boldrui-image-display__btn"
                    onClick={onRemoveImage}
                  >
                    <Icon kind="delete" color="#eaf7ff" size="1.2em" />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

export default ImageDisplay;
