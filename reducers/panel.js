import * as ActionTypes from '../actions';

export default (state = {
  activePanel: 'browser'
}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_PANEL:
      return {
        ...state,
        activePanel: action.activePanel
      };
    case ActionTypes.UPDATE_ENVIRONMENT:
      return {
        ...state,
        activePanel: 'browser'
      };
    default:
      return state;
  }
}
