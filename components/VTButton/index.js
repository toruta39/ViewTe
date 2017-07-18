import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';

const iconTable = {
  'back': require('./back.png'),
  'forward': require('./forward.png'),
  'code': require('./code.png'),
  'menu': require('./menu.png'),
  'reload': require('./reload.png'),
  'share': require('./share.png')
};

export default class VTButton extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(iconTable)).isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  onPress = (...args) => {
    Keyboard.dismiss();
    return !this.props.disabled && this.props.onPress(...args);
  }

  render() {
    const {type, style, onPress, disabled} = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <Image source={iconTable[type]}
          style={[styles.icon, disabled && styles.disabled, style]}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32
  },
  disabled: {
    opacity: 0.2
  }
});
