import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import { getProps } from '../../utils/e2e';
import {
  View,
  Text
} from 'react-native';

export default class BrowserHeader extends Component {
  static propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
    children: PropTypes.node.isRequired
  }

  render() {
    const {left, right, children} = this.props;
    const environmentNameTestProps = getProps('environment-name');

    return (
      <View style={styles.container}>
        <View style={styles.left}>{left}</View>
        <Text style={styles.text} {...environmentNameTestProps}>
          {children}
        </Text>
        <View style={styles.right}>{right}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  text: {
    flex: 1,
    color: '#4b4739',
    fontSize: 24
  }
});
