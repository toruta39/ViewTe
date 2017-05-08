import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  WebView,
  TextInput
} from 'react-native';
import AddressBar from './AddressBar';

const WEBVIEW_REF = 'webview';

export default class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: '',
      gotoUrl: 'https://www.google.com' // to trigger navigation in webview
    }

    this.onLoadStart = this.onLoadStart.bind(this);
    this.onAddressBarSubmitEditing =
      this.onAddressBarSubmitEditing.bind(this);
    this.onReload = this.onReload.bind(this);
  }

  onLoadStart({nativeEvent:{url}}) {
    this.setState({
      currentUrl: url
    });
  }

  onAddressBarSubmitEditing({url}) {
    if (url !== this.state.gotoUrl) {
      this.setState({
        gotoUrl: url
      });
    } else {
      this.refs[WEBVIEW_REF].reload();
    }
  }

  onReload() {
    this.refs[WEBVIEW_REF].reload();
  }

  render() {
    const {currentUrl, gotoUrl} = this.state;

    return (
      <View style={styles.container}>
        <AddressBar currentUrl={currentUrl}
          onSubmitEditing={this.onAddressBarSubmitEditing}
          onReload={this.onReload} />
        <WebView style={styles.webview} source={{uri: gotoUrl}}
          onLoadStart={this.onLoadStart} ref={WEBVIEW_REF} />
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
