import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Keyboard,
  Animated
} from 'react-native';
import { getProps } from '../../utils/e2e';

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
    Keyboard.dismiss();
    this.startAnim();
    this.props.onPress(...args);
  }

  render() {
    const testProps = getProps('reload-button');

    return (
      <TouchableOpacity onPress={this.onPress} {...testProps}>
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
          <Image source={require('./reload.png')} style={{
            width: 20,
            height: 20
          }} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
