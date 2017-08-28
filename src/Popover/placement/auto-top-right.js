import getViewportSize from '../../util/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import TopLeft from './top-left';
import TopRight from './top-right';

const positionMap = {
  BottomLeft,
  BottomRight,
  TopLeft,
  TopRight,
};

function locate(anchorBoundingBox, containerBoundingBox, contentDimension, options) {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  let horizontal;
  let vertical;

  if (
    anchorBoundingBoxViewport.right - contentDimension.width < 0 &&
    anchorBoundingBoxViewport.left + contentDimension.width < viewport.width
  ) {
    horizontal = 'Left';
  } else {
    horizontal = 'Right';
  }

  // Only when the following can not fit, and the above can be put down to move to the top
  if (
    anchorBoundingBoxViewport.top - cushion - contentDimension.height < 0 &&
    anchorBoundingBoxViewport.bottom + cushion + contentDimension.height < viewport.height
  ) {
    vertical = 'Bottom';
  } else {
    vertical = 'Top';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options,
  );
}

const AutoTopRight = createPlacement(locate);

export default AutoTopRight;
