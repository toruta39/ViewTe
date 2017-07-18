export const UPDATE_INPUT_URL = 'UPDATE_INPUT_URL';
export const updateInputUrl = (inputUrl) => ({
  type: UPDATE_INPUT_URL,
  inputUrl
});

export const UPDATE_SELECTION = 'UPDATE_SELECTION';
export const updateSelection = (selection) => ({
  type: UPDATE_SELECTION,
  selection
});

export const SELECT_ALL = 'SELECT_ALL';
export const selectAll = () => ({
  type: SELECT_ALL
});

export const UPDATE_NAV_STATE = 'UPDATE_NAV_STATE';
export const updateNavState = (navState) => ({
  type: UPDATE_NAV_STATE,
  navState
});

export const UPDATE_GOTO_URL = 'UPDATE_GOTO_URL';
export const updateGotoUrl = (gotoUrl) => ({
  type: UPDATE_GOTO_URL,
  gotoUrl
});
