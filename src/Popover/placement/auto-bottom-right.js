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

  // Only when the right does not fit, and the left can be put down when the move to the left
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
    anchorBoundingBoxViewport.bottom + cushion + contentDimension.height > viewport.height &&
    anchorBoundingBoxViewport.top - cushion - contentDimension.height > 0
  ) {
    vertical = 'Top';
  } else {
    vertical = 'Bottom';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options,
  );
}

const AutoBottomRight = createPlacement(locate);

export default AutoBottomRight;
