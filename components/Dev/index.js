import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import Browser from '../Browser';

export default class Dev extends Component {
  render() {
    const {style, htmlSource} = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.wrapper}>
          <Text>Dev Placeholder</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#f7df1e',
    borderLeftWidth: 1,
    borderLeftColor: '#cecdce'
  },
  wrapper: {
    marginTop: 49,
    borderTopWidth: 1,
    borderTopColor: '#cecdce'
  },
  button: {
    height: 48,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cecdce'
  }
});
