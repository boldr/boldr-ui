import position from './TooltipPosition';

describe('Tooltip position calculation helper', () => {
  let anchor, element;

  beforeEach(() => {
    anchor = new Rect();
    element = new Rect();

    anchor.at(500, 500).size(100, 100);

    element.size(50, 50);
  });

  it('should not include window scroll X and Y props', () => {
    window.scrollX = window.scrollY = 100;
    expect(position(anchor, element, params('top', 'left'))).toEqual({
      left: 500,
      top: 440,
    });
  });

  it('should position top-left ', () => {
    expect(position(anchor, element, params('top', 'left'))).toEqual({
      left: 500,
      top: 440,
    });
  });

  it('should position top-center ', () => {
    expect(position(anchor, element, params('top', 'center'))).toEqual({
      left: 525,
      top: 440,
    });
  });

  it('should position top-right ', () => {
    expect(position(anchor, element, params('top', 'right'))).toEqual({
      left: 550,
      top: 440,
    });
  });

  it('should position right-top', () => {
    expect(position(anchor, element, params('right', 'top'))).toEqual({
      left: 610,
      top: 500,
    });
  });

  it('should position right-center', () => {
    expect(position(anchor, element, params('right', 'center'))).toEqual({
      left: 610,
      top: 525,
    });
  });

  it('should position right-bottom', () => {
    expect(position(anchor, element, params('right', 'bottom'))).toEqual({
      left: 610,
      top: 550,
    });
  });

  it('should position bottom-left', () => {
    expect(position(anchor, element, params('bottom', 'left'))).toEqual({
      left: 500,
      top: 610,
    });
  });

  it('should position bottom-center', () => {
    expect(position(anchor, element, params('bottom', 'center'))).toEqual({
      left: 525,
      top: 610,
    });
  });

  it('should position bottom-right', () => {
    expect(position(anchor, element, params('bottom', 'right'))).toEqual({
      left: 550,
      top: 610,
    });
  });

  it('should position left-top', () => {
    expect(position(anchor, element, params('left', 'top'))).toEqual({
      left: 440,
      top: 500,
    });
  });

  it('should position left-center', () => {
    expect(position(anchor, element, params('left', 'center'))).toEqual({
      left: 440,
      top: 525,
    });
  });

  it('should position left-bottom', () => {
    expect(position(anchor, element, params('left', 'bottom'))).toEqual({
      left: 440,
      top: 550,
    });
  });
});

function params(placement, alignment, margin = 10) {
  return { placement, alignment, margin };
}

function Rect() {
  this.at = (left, top) => {
    this.left = left;
    this.top = top;
    return this;
  };
  this.size = (width, height) => {
    this.width = width;
    this.height = height;
    return this;
  };
}
