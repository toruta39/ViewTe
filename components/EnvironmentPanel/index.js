import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProps } from '../../utils/e2e';
import Browser from '../Browser';
import Cell from '../Cell';
import CellTitle from '../CellTitle';
import { ENVIRONMENTS } from '../../constants';
import { updateEnvironment } from '../../actions';

class EnvironmentPanel extends Component {
  static propTypes = {
    updateEnvironment: PropTypes.func.isRequired
  }

  render() {
    const {style, updateEnvironment} = this.props;
    const testProps = getProps('environment-list');

    return (
      <View style={[styles.container, style]} {...testProps}>
        {/* TODO: Use <FlatList /> or <SectionList /> instead */}
        <CellTitle>Browsing Environment</CellTitle>
        {ENVIRONMENTS.map((key, i) => (
          <Cell
            onPress={() => updateEnvironment(key)}
            key={key}
            testID={key}
          >
            {key}
          </Cell>
        ))}
      </View>
    );
  }
}

export default connect(null, {
  updateEnvironment
})(EnvironmentPanel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  }
});
