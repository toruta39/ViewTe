import * as ActionTypes from '../actions';
import { ENVIRONMENTS } from '../constants';

export default (state = {
  environment: ENVIRONMENTS[0],
  isLoading: true,
  isBackButtonEnabled: false,
  isForwardButtonEnabled: false,
  // to trigger navigation in webview
  gotoUrl: 'https://www.github.com/toruta39/ViewTe',
  // for url sharing
  currentUrl: '',
  // for address bar editing
  inputUrl: '',
  selection: {
    start: 0,
    end: 0
  }
}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_INPUT_URL:
      return {
        ...state,
        inputUrl: action.inputUrl
      };
    case ActionTypes.UPDATE_SELECTION:
      return {
        ...state,
        selection: action.selection
      };
    case ActionTypes.SELECT_ALL:
      return {
        ...state,
        selection: {
          start: 0,
          end: state.inputUrl.length
        }
      };
    case ActionTypes.UPDATE_NAV_STATE:
      return {
        ...state,
        isBackButtonEnabled: action.navState.canGoBack,
        isForwardButtonEnabled: action.navState.canGoForward,
        currentUrl: action.navState.url,
        inputUrl: action.navState.url,
        isLoading: action.navState.loading
      };
    case ActionTypes.UPDATE_GOTO_URL:
      return {
        ...state,
        gotoUrl: action.gotoUrl
      };
    case ActionTypes.UPDATE_ENVIRONMENT:
      return {
        ...state,
        environment: action.environment
      };
    default:
      return state;
  }
}
