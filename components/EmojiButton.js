import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export default class EmojiButton extends Component {
  render() {
    const {style, onPress, children, disabled} = this.props;

    const text = <Text style={styles.text}>{children}</Text>;

    return disabled ? (
      <View style={[style, styles.disabled]}>
        {text}
      </View>
    ) : (
      <TouchableOpacity onPress={onPress} style={style}>
        {text}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.2
  },
  text: {
    fontSize: 20,
    width: 24,
    lineHeight: 24
  }
});
