import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  WebView,
  TextInput
} from 'react-native';

export default class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleUrl: '', // shown in the address bar
      gotoUrl: 'https://www.google.com' // to trigger navigation in webview
    }

    this.onLoadStart = this.onLoadStart.bind(this);
    this.onAddressBarFieldChange = this.onAddressBarFieldChange.bind(this);
    this.onAddressBarFieldSubmitEditing =
      this.onAddressBarFieldSubmitEditing.bind(this);
  }

  onAddressBarFieldChange(e) {
    this.setState({
      visibleUrl: e.nativeEvent.text
    });
  }

  onAddressBarFieldSubmitEditing(e) {
    this.setState({
      gotoUrl: e.nativeEvent.text
    });
  }

  onLoadStart(e) {
    this.setState({
      visibleUrl: e.nativeEvent.url
    });
  }

  render() {
    const {visibleUrl, gotoUrl} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.addressBar}>
          <TextInput style={styles.addressBarField} value={visibleUrl}
            onChange={this.onAddressBarFieldChange}
            onSubmitEditing={this.onAddressBarFieldSubmitEditing}
            returnKeyType="go"/>
        </View>
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
  addressBar: {
    justifyContent: 'center',
    margin: 10,
    paddingLeft: 8,
    paddingRight: 8,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#e6e6e7'
  },
  addressBarField: {
    flex: 1,
    fontSize: 16,
    height: 16
  },
  webview: {
    flex: 1
  }
});
