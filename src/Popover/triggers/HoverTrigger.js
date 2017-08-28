import 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash.capitalize';
import throttle from 'lodash.throttle';
import uniq from 'lodash.uniq';
import isBrowser from '../../util/isBrowser';

import Trigger, { PopoverTriggerPropTypes } from './Trigger';

const MOUSE_EVENT_WHITE_LIST = ['down', 'up', 'move', 'over', 'out', 'enter', 'leave'];

function isMouseEventSuffix(suffix) {
  return MOUSE_EVENT_WHITE_LIST.indexOf(suffix) !== -1;
}

// hover recognizes state
const HoverState = {
  Init: 1,

  // Leave recognition must start before going out
  Started: 2,

  // waiting for delay
  Pending: 3,

  Finish: 255,
};

/**
 * Create a new state, each state is a one-time, after the completion of identification to create a new state
 *
 * @param {string} name state的名称
* @param  {function}  onFinish recognizes the callback function on success
 */
const makeState = (name, onFinish, initState = HoverState.Init) => {
  let state = initState;

  return {
    transit(nextState) {
      console.log(`${name}: ${state} -> ${nextState}`); // eslint-disable-line

      state = nextState;

      if (state === HoverState.Finish) {
        onFinish();
      }
    },

    is(st) {
      return st === state;
    },

    name,
  };
};

function forEachHook(hooks, action) {
  if (!hooks) {
    return;
  }

  if (!isBrowser) {
    return;
  }

  const hookNames = Object.keys(hooks);
  hookNames.forEach(hookName => {
    const eventName = isMouseEventSuffix(hookName) ? `mouse${hookName}` : hookName;
    if (action === 'install') {
      window.addEventListener(eventName, hooks[hookName], true);
    } else if (action === 'uninstall') {
      window.removeEventListener(eventName, hooks[hookName], true);
    }
  });
}

function makeRecognizer(state, options) {
  const recognizer = {
    ...options,

    destroy() {
      if (!state.is(HoverState.Finish)) {
        forEachHook(recognizer.global, 'uninstall');

        console.log(`destroy ${state.name}`); // eslint-disable-line
      }
    },
  };

  forEachHook(recognizer.global, 'install');
  return recognizer;
}

/**
 * Entry and exit recognition is independent of the recognizer, and each recognizer can bind any `onmouse ***` event.
 * Within the component only need to provide recognition after the completion of the callback function, do not need to know the details of the implement.
 *
 * Local events are directly bound to the trigger
 * The event under global is the capture event bound to the window
 */

/**
 * Into the state of recognition
 */
function makeHoverEnterRecognizer({ enterDelay, onEnter }) {
  const state = makeState('enter', onEnter);
  let timerId;

  const recognizer = makeRecognizer(state, {
    local: {
      enter() {
        state.transit(HoverState.Pending);

        timerId = setTimeout(() => {
          state.transit(HoverState.Finish);
          forEachHook(recognizer.global, 'uninstall');
        }, enterDelay);
      },

      leave() {
        if (timerId) {
          clearTimeout(timerId);
          timerId = undefined;

          state.transit(HoverState.Init);
        }
      },
    },
  });

  return recognizer;
}

/**
 * Identification of the departure state
 */
function makeHoverLeaveRecognizer({ leaveDelay, onLeave, isOutSide, quirk }) {
  const state = makeState('leave', onLeave);
  let recognizer;
  let timerId;

  const gotoFinishState = () => {
    state.transit(HoverState.Finish);
    forEachHook(recognizer.global, 'uninstall');
  };

  recognizer = makeRecognizer(state, {
    global: {
      move: throttle(evt => {
        const { target } = evt;

        if (isOutSide(target)) {
          if (!quirk && !state.is(HoverState.Started)) {
            return;
          }

          state.transit(HoverState.Pending);

          timerId = setTimeout(gotoFinishState, leaveDelay);
        } else {
          if (state.is(HoverState.Init)) {
            state.transit(HoverState.Started);
            return;
          }

          if (!state.is(HoverState.Pending)) {
            return;
          }

          if (timerId) {
            clearTimeout(timerId);
            timerId = undefined;

            state.transit(HoverState.Started);
          }
        }
      }, 16),

      // When the page is out of focus forced to close, otherwise there must be moved in
      // and then go out to close the problem

      blur: evt => {
        // Make sure the event comes from the window
        // React the event system will bubble blur events, but the native is not bubble.
        // https://github.com/facebook/react/issues/6410#issuecomment-292895495

        const target = evt.target || evt.srcElement;
        if (target !== window) {
          return;
        }

        if (timerId) {
          clearTimeout(timerId);
          timerId = undefined;
        }

        gotoFinishState();
      },
    },
  });

  return recognizer;
}

function callHook(recognizer, namespace, hookName, ...args) {
  const ns = recognizer && recognizer[namespace];
  if (ns && ns[hookName]) {
    ns[hookName](...args);
  }
}

function destroyRecognizer(recognizer) {
  if (recognizer) {
    recognizer.destroy();
  }
}

export default class PopoverHoverTrigger extends Trigger {
  static propTypes = {
    ...PopoverTriggerPropTypes,

    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,

    isOutside: PropTypes.func,

    quirk: PropTypes.bool,
  };

  static defaultProps = {
    showDelay: 150,
    hideDelay: 150,
    quirk: false,
  };

  open = () => {
    this.props.open();
  };

  close = () => {
    this.props.close();
  };

  state = {
    enterRecognizer: null,
    leaveRecognizer: null,
  };

  makeEnterRecognizer() {
    const { showDelay, quirk } = this.props;

    return makeHoverEnterRecognizer({
      enterDelay: showDelay,
      onEnter: this.open,
      quirk,
    });
  }

  makeLeaveRecognizer() {
    const { quirk, hideDelay, isOutsideStacked } = this.props;

    return makeHoverLeaveRecognizer({
      leaveDelay: hideDelay,
      onLeave: this.close,
      isOutSide: isOutsideStacked,
      quirk,
    });
  }

  getTriggerProps(child) {
    const { enterRecognizer, leaveRecognizer } = this.state;
    const enterHooks = (enterRecognizer && enterRecognizer.local) || {};
    const leaveHooks = (leaveRecognizer && leaveRecognizer.local) || {};
    const eventNames = uniq([].concat(Object.keys(enterHooks), Object.keys(leaveHooks))).map(
      name => `onMouse${capitalize(name)}`,
    );
    const eventNameToHookName = eventName => eventName.slice('onMouse'.length).toLowerCase();

    return eventNames.reduce((events, evtName) => {
      const hookName = eventNameToHookName(evtName);
      events[evtName] = evt => {
        callHook(enterRecognizer, 'local', hookName);
        callHook(leaveRecognizer, 'local', hookName);

        this.triggerEvent(child, evtName, evt);
      };

      return events;
    }, {});
  }

  cleanup() {
    // ensure global events are removed
    destroyRecognizer(this.state.enterRecognizer);
    destroyRecognizer(this.state.leaveRecognizer);
  }

  initRecognizers(props) {
    props = props || this.props;
    const { contentVisible } = props;

    this.cleanup();
    this.setState({
      enterRecognizer: contentVisible ? null : this.makeEnterRecognizer(),
      leaveRecognizer: contentVisible ? this.makeLeaveRecognizer() : null,
    });
  }

  componentWillUnmount() {
    this.cleanup();
  }

  componentDidMount() {
    this.initRecognizers();
  }

  componentWillReceiveProps(nextProps) {
    const { contentVisible } = nextProps;

    // visibility changed, create new recognizers
    if (contentVisible !== this.props.contentVisible) {
      this.initRecognizers(nextProps);
    }
  }
}
