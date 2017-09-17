import { Platform } from 'react-native';

export const ENVIRONMENTS = Platform.select({
  ios: ['UIWebView', 'WKWebView', 'SFSafariViewController'],
  android: ['WebView']
});
