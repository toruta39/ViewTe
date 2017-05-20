import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  Image
} from 'react-native';
import IconButton from '../IconButton';

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
        <IconButton onPress={onBack} style={styles.button}
          source={require('./back.png')}
          disabled={!isBackButtonEnabled} />
        <IconButton onPress={onForward} style={styles.button}
          source={require('./forward.png')}
          disabled={!isForwardButtonEnabled} />
        <IconButton disabled style={styles.button}
          source={require('./misc.png')} />
        <IconButton disabled style={styles.button}
          source={require('./fav.png')} />
        <IconButton disabled style={styles.button}
          source={require('./dev.png')} />
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
