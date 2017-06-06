import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

export default class Cell extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const {children, onPress} = this.props;

    return (
      <TouchableHighlight onPress={onPress} underlayColor="#e4e0cf">
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
          <Image style={styles.accessory} source={require('./accessory.png')} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e4e0cf',
    flexDirection: 'row',
    marginTop: -1
  },
  text: {
    flex: 1,
    color: '#4b4739',
    fontSize: 17
  },
  accessory: {
    flex: 0
  }
});
