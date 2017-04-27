import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import Browser from './Browser';

export default class App extends Component {
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
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
