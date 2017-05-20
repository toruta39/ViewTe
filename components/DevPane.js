import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  Text
} from 'react-native';

export default class DevPane extends Component {
  render() {
    const {style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text>DevPane</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8'
  }
});
