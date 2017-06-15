import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  Animated,
  Text,
  View
} from 'react-native';

export default class Pane extends Component {
  static defaultProps = {
    x: 0
  }

  state = {
    x: new Animated.Value(0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x) {
      Animated.timing(this.state.x, {
        duration: 300,
        toValue: nextProps.x
      }).start();
    }
  }

  render() {
    const {style, children} = this.props;
    const {x} = this.state;

    return (
      <Animated.View style={[styles.container, styles.shadow ,style, {
        transform: [
          {translateX: x}
        ]
      }]}>
        {children}
      </Animated.View>
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
    ios: {
      paddingTop: 20
    }
  },
  shadow: {
    shadowColor: '#4B4739',
    shadowOpacity: 0.5,
    shadowRadius: 10
  }
});
