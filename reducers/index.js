export default (state = {
  environments: ['UIWebView', 'WKWebView', 'SafariView'],
  browser: {
    environment: 'UIWebView',
    currentUrl: 'https://www.google.com/ncr',
    isLoading: true,
    isBackButtonEnabled: false,
    isForwardButtonEnabled: false
  }
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
