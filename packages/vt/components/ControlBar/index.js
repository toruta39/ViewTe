import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import VTButton from '../VTButton';
import { shareCurrentUrl } from '../../actions';

class ControlBar extends Component {
  render() {
    const {
      onBack,
      onForward,
      isBackButtonEnabled,
      isForwardButtonEnabled,
      shareCurrentUrl
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
          <VTButton onPress={shareCurrentUrl} style={styles.share} type="share" />
        </View>
      </View>
    );
  }
}

export default connect((state) => ({
  isBackButtonEnabled: state.browser.isBackButtonEnabled,
  isForwardButtonEnabled: state.browser.isForwardButtonEnabled,
  currentUrl: state.browser.currentUrl
}), {
  shareCurrentUrl
})(ControlBar);

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
