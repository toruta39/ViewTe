import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Browser from '../Browser';
import Cell from '../Cell';
import CellTitle from '../CellTitle';

export default class EnvironmentPanel extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired // TODO: Dispatch redux action
  }

  render() {
    const {style, onSelect} = this.props;

    return (
      <View style={[styles.container, style]}>
        {/* TODO: Use <FlatList /> or <SectionList /> instead */}
        <CellTitle>Browsing Environment</CellTitle>
        {/* TODO: Move Browser.types to redux state */}
        {Object.keys(Browser.types).map((key, i) => (
          <Cell key={key} onPress={() => onSelect(key)}>{key}</Cell>
        ))}
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
