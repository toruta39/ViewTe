import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  WebView,
  TextInput
} from 'react-native';
import AddressBar from './AddressBar';

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
  }

  onLoadStart({nativeEvent:{url}}) {
    this.setState({
      currentUrl: url
    });
  }

  onAddressBarSubmitEditing({url}) {
    this.setState({
      gotoUrl: url
    });
  }

  render() {
    const {currentUrl, gotoUrl} = this.state;

    return (
      <View style={styles.container}>
        <AddressBar currentUrl={currentUrl}
          onSubmitEditing={this.onAddressBarSubmitEditing} />
        <WebView style={styles.webview} source={{uri: gotoUrl}}
          onLoadStart={this.onLoadStart} />
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
