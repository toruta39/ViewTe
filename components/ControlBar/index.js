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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: '#565656'
  },
  button: {
    padding: 8
  }
});
