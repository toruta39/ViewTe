import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default class IconButton extends Component {
  render() {
    const {style, onPress, disabled, source} = this.props;

    const icon = <Image style={styles.icon} source={source} />;

    return disabled ? (
      <View style={[style, styles.disabled]}>
        {icon}
      </View>
    ) : (
      <TouchableOpacity onPress={onPress} style={style}>
        {icon}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.2
  },
  icon: {
    width: 24,
    height: 24
  }
});
