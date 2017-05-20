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
        <Text style={{color:'#fff'}}>DevPane</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
});
