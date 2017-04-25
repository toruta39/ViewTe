/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Browser from './components/Browser';

export default class WebviewTester extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Browser />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f8f8f8',
  }
});

AppRegistry.registerComponent('WebviewTester', () => WebviewTester);
