import React, { Component } from 'react';
import IconButton from '../IconButton';
import {
  Animated
} from 'react-native';

export default class ReloadButton extends Component {
  loadingAnim = new Animated.Value(0)

  componentDidUpdate(prevProps) {
    if (this.props.isLoading && !prevProps.isLoading) {
      this.startAnim();
    }
  }

  startAnim = () => {
    this.loadingAnim.setValue(0);
    Animated.timing(this.loadingAnim, {
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
            rotate: this.loadingAnim.interpolate({
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
