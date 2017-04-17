import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const INITIAL_STATE = {
  expanded: true,
  visible: true,
};
function toggleExpandCollapse(state) {
  const newState = Object.assign({}, state);
  newState.expanded = !newState.expanded;
  return newState;
}
function toggleSidebar(state) {
  const newState = Object.assign({}, state);
  newState.visible = !newState.visible;
  return newState;
}
function ui(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'TOGGLE_SB_MENU':
      return toggleExpandCollapse(state);
    case 'TOGGLE_SIDEBAR':
      return toggleSidebar(state);

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  ui,
  routing,
});

export default rootReducer;
