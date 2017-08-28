import getViewportSize from '../../util/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import BottomCenter from './bottom-center';
import TopLeft from './top-left';
import TopRight from './top-right';
import TopCenter from './top-center';

const positionMap = {
  BottomLeft,
  BottomRight,
  BottomCenter,
  TopLeft,
  TopRight,
  TopCenter,
};

function locate(anchorBoundingBox, containerBoundingBox, contentDimension, options) {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  let horizontal;
  let vertical;

  const mid = (anchorBoundingBoxViewport.left + anchorBoundingBoxViewport.right) / 2;
  const halfWidth = contentDimension.width / 2;

  // Only when the right does not fit, and the left can be put down when the move to the left
  if (
    mid + halfWidth > viewport.width &&
    anchorBoundingBoxViewport.right - contentDimension.width > 0
  ) {
    horizontal = 'Right';
  } else if (
    mid - halfWidth < 0 &&
    anchorBoundingBoxViewport.left + contentDimension.width < viewport.width
  ) {
    horizontal = 'Left';
  } else {
    horizontal = 'Center';
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

const AutoBottomCenter = createPlacement(locate);

export default AutoBottomCenter;
