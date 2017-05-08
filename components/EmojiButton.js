import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  TouchableOpacity,
  Text
} from 'react-native';

export default class EmojiButton extends Component {
  render() {
    const {style, onPress, children} = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    width: 24,
    lineHeight: 24
  }
});
