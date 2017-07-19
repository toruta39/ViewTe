import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  Animated,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

export default class Pane extends Component {
  static defaultProps = {
    x: 0
  }

  state = {
    x: new Animated.Value(0),
    shadeOpacity: new Animated.Value(0)
  }

  onShadeOpacityAnimate = ({value}) => {
    this.setState({
      animatedShadeOpacity: value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x) {
      Animated.timing(this.state.x, {
        duration: 300,
        toValue: nextProps.x
      }).start();

      Animated.timing(this.state.shadeOpacity, {
        duration: 300,
        toValue: nextProps.x ? 0.5 : 0
      }).start();
    }
  }

  componentDidMount() {
    if (this.props.onAnimate) {
      this.state.x.addListener(this.props.onAnimate);
    }

    this.state.shadeOpacity.addListener(this.onShadeOpacityAnimate);
  }

  render() {
    const {style, children, onShadePress} = this.props;
    const {x, shadeOpacity, animatedShadeOpacity} = this.state;

    return (
      <Animated.View style={[styles.container, styles.shadow, style, {
        transform: [
          {translateX: x}
        ]
      }]}>
        {children}
        {animatedShadeOpacity > 0 && <TouchableWithoutFeedback
          onPress={onShadePress}>
          <Animated.View style={[styles.shade, {
            opacity: shadeOpacity
          }]} />
        </TouchableWithoutFeedback>}
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
  },
  shade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#fff'
  }
});
