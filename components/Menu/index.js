import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import Browser from '../Browser';

export default class Menu extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  render() {
    const {style, onSelect} = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Please select test environment</Text>
        </View>
        <View>
          {Object.keys(Browser.types)
            .map((key, i) => (
              <TouchableOpacity key={key} style={styles.button}
                onPress={() => onSelect(key)}>
                <Text style={styles.buttonText}>{key}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#f7df1e'
  },
  titleWrapper: {
    paddingLeft: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#565656'
  },
  title: {
    fontSize: 20,
    color: '#565656'
  },
  button: {
    height: 40,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#565656'
  },
  buttonText: {
    color: '#565656'
  }
});
