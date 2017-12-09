import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  Text
} from 'react-native';

export default class CellTitle extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }

  render() {
    const {children} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{children.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#e4e0cf',
    borderBottomWidth: 1,
    borderColor: '#e4e0cf',
    flexDirection: 'row'
  },
  text: {
    color: '#4b4739',
    fontSize: 13
  }
});
