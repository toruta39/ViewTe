import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  render() {
    const {style, onSelect} = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.button}
          onPress={() => onSelect('uiwebview')}>
          <Text>UIWebView</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => onSelect('wkwebview')}>
          <Text>WKWebView</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => onSelect('safariview')}>
          <Text>SafariView</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#f8f8f8'
  },
  button: {
    height: 48,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cecdce'
  }
});
