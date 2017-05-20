import React, { Component } from 'react';
import IconButton from '../IconButton';
import {
  Animated
} from 'react-native';

export default class ReloadButton extends Component {
  state = {
    spin: new Animated.Value(0)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoading && !prevProps.isLoading) {
      this.startAnim();
    }
  }

  startAnim = () => {
    this.state.spin.setValue(0);
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 1000
    }).start(() => {
      if (this.props.isLoading) {this.startAnim();}
    });
  }

  onPress = (...args) => {
    this.startAnim();
    this.props.onPress(...args);
  }

  render() {
    return (
      <Animated.View style={{
        transform: [
          {
            rotate: this.state.spin.interpolate({
              inputRange: [0, 1],
              outputRange: [
                '0deg', '360deg'
              ]
            })
          }
        ]
        }}>
        <IconButton onPress={this.onPress} source={require('./reload.png')} />
      </Animated.View>
    );
  }
}
