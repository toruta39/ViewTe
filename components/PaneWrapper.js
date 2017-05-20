import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import BrowserContainer from './BrowserContainer';
import DevPane from './DevPane';

export default class PaneWrapper extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BrowserContainer />
        <DevPane />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
