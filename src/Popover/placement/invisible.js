import createPlacement from './create';

/**
 * Not visible
 */
function locate() {
  const x = -100000;
  const y = -100000;

  return {
    getCSSStyle() {
      return {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: -10,
        opacity: 0,
      };
    },

    name: 'position-invisible',
  };
}

const Invisible = createPlacement(locate);

export default Invisible;
