import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  Animated,
  Text,
  View
} from 'react-native';

export default class Pane extends Component {
  render() {
    const {style, children, x} = this.props;

    return (
      <View style={[styles.container, style, {
        transform: [
          {translateX: x}
        ]
      }]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'stretch',
    shadowColor: '#4B4739',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    ios: {
      paddingTop: 20
    }
  }
});
