import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import PropTypes from 'prop-types';
import {
  View,
  WebView as UIWebView,
  TextInput
} from 'react-native';
import WKWebView from 'react-native-wkwebview-reborn';
import AddressBar from './AddressBar';
import ControlBar from './ControlBar';
import SafariViewCaller from './SafariViewCaller';

const WEBVIEW_REF = 'webview';

export default class Browser extends Component {
  static types = {
    'UIWebView': UIWebView,
    'WKWebView': WKWebView,
    'SafariView': SafariViewCaller
  }

  static propTypes = {
    type: PropTypes.oneOf(['UIWebView', 'WKWebView', 'SafariView']).isRequired
  }

  state = {
    currentUrl: '',
    isBackButtonEnabled: false,
    isForwardButtonEnabled: false,
    isLoading: false,
    gotoUrl: 'https://www.google.com' // to trigger navigation in webview
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      isBackButtonEnabled: navState.canGoBack,
      isForwardButtonEnabled: navState.canGoForward,
      currentUrl: navState.url,
      isLoading: navState.loading
    });
  }

  onAddressBarSubmitEditing = ({url}) => {
    if (url !== this.state.gotoUrl) {
      this.setState({
        gotoUrl: url
      });
    } else {
      this.refs[WEBVIEW_REF].reload();
    }
  }

  onReload = () => this.refs[WEBVIEW_REF].reload()

  onForward = () => this.refs[WEBVIEW_REF].goForward()

  onBack = () => this.refs[WEBVIEW_REF].goBack()

  render() {
    const {type} = this.props;
    const {currentUrl, gotoUrl, isLoading} = this.state;

    const WebView = Browser.types[type];

    return (
      <View style={styles.container}>
        <AddressBar currentUrl={currentUrl} isLoading={isLoading}
          onSubmitEditing={this.onAddressBarSubmitEditing}
          onReload={this.onReload} />
        <WebView style={styles.webview} source={{uri: gotoUrl}}
          onNavigationStateChange={this.onNavigationStateChange}
          ref={WEBVIEW_REF} />
        <ControlBar {...this.state} onForward={this.onForward}
          onBack={this.onBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f8f8f8'
  },
  webview: {
    flex: 1
  }
});
