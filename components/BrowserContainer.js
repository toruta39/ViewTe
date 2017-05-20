import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import Browser from './Browser';

export default class BrowserContainer extends Component {
  render() {
    const {style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Browser />
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
  }
});
