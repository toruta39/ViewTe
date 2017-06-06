import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import CellTitle from '../CellTitle';

export default class RightPane extends Component {
  render() {
    const {style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <CellTitle>Development</CellTitle>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  }
});
