import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import EmojiButton from './EmojiButton';

export default class ControlBar extends Component {
  render() {
    const {
      onBack,
      onForward,
      isBackButtonEnabled,
      isForwardButtonEnabled
    } = this.props;

    return (
      <View style={styles.container}>
        <EmojiButton onPress={onBack} style={styles.button}
          disabled={!isBackButtonEnabled}>
          👈
        </EmojiButton>
        <EmojiButton onPress={onForward} style={styles.button}
          disabled={!isForwardButtonEnabled}>
          👉
        </EmojiButton>
        <EmojiButton disabled style={styles.button}>🚀</EmojiButton>
        <EmojiButton disabled style={styles.button}>🔖</EmojiButton>
        <EmojiButton disabled style={styles.button}>⚙</EmojiButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: '#cecdce',
    borderTopWidth: 1,
    height: 40
  },
  button: {
    padding: 8
  }
});
