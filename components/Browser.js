import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  WebView,
  TextInput
} from 'react-native';
import AddressBar from './AddressBar';
import ControlBar from './ControlBar';

const WEBVIEW_REF = 'webview';

export default class Browser extends Component {
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
    const {currentUrl, gotoUrl, isLoading} = this.state;

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
    alignItems: 'stretch'
  },
  webview: {
    flex: 1
  }
});
