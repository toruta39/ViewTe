import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  Text
} from 'react-native';
import CellTitle from '../CellTitle';

export default class RightPane extends Component {
  render() {
    const {style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <CellTitle>Development</CellTitle>
        <Text style={styles.text}>
          How to debug the webview{'\n'}
          {'\n'}
          1. Connect your device to a Mac{'\n'}
          2. Open Safari on the Mac{'\n'}
          3. In menubar, select Develop > Device name > URL{'\n'}
          4. Now you can debug in the web inspector
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  text: {
    margin: 20,
    color: '#4b4739',
    fontSize: 14,
    lineHeight: 20
  }
});
