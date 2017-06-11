import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  Image
} from 'react-native';
import VTButton from '../VTButton';

export default class ControlBar extends Component {
  render() {
    const {
      onBack,
      onForward,
      onShare,
      isBackButtonEnabled,
      isForwardButtonEnabled
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <VTButton onPress={onBack} type="back"
            disabled={!isBackButtonEnabled} />
          <VTButton onPress={onForward} style={styles.forward} type="forward"
            disabled={!isForwardButtonEnabled} />
        </View>

        <View style={styles.right}>
          <VTButton onPress={() => 1} style={styles.share} type="share"
            disabled={!isForwardButtonEnabled} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    padding: 10
  },
  forward: {
    marginLeft: 16
  },
  left: {
    flex: 1,
    flexDirection: 'row'
  },
  right: {
    flex: 0,
    flexDirection: 'row'
  }
});
