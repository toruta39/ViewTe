import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import PaneWrapper from './PaneWrapper';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PaneWrapper />
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
