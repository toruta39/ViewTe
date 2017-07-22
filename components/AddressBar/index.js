import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TextInput,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import ReloadButton from '../ReloadButton';
import {
  updateInputUrl,
  updateSelection,
  selectAll
} from '../../actions';
import { connect } from 'react-redux';

class AddressBar extends Component {
  static propTypes = {
    onSubmitEditing: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  }

  onFieldChange = ({nativeEvent:{text}}) => {
    this.props.updateInputUrl(text);
  }

  onSubmitEditing = ({nativeEvent: {text}}) => {
    let url = text;

    if (!/^[^:]+:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    this.props.onSubmitEditing({url});
  }

  onSelectionChange = ({nativeEvent: {selection}}) => {
    this.props.updateSelection(selection);
  }

  onFocus = () => {
    // by default, cursor will be placed at the end of text after being
    // focused, so i delay selecting all text after the default behavior
    setTimeout(() => this.props.selectAll(), 100);
  }

  render() {
    const {
      onReload,
      isLoading,
      inputUrl,
      selection
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} value={inputUrl}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              selection={selection}
              onChange={this.onFieldChange}
              onSubmitEditing={this.onSubmitEditing}
              onSelectionChange={this.onSelectionChange}
              onFocus={this.onFocus}
              underlineColorAndroid="transparent"
              returnKeyType="go" />
          </View>
          <View style={styles.buttonWrapper}>
            <ReloadButton onPress={onReload} isLoading={isLoading} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect((state) => ({
  inputUrl: state.browser.inputUrl,
  selection: state.browser.selection,
  isLoading: state.browser.isLoading
}), {
  updateInputUrl,
  updateSelection,
  selectAll
})(AddressBar);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
    height: 42
  },
  background: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    flex: 1,
    height: 32
  },
  inputWrapper: {
    flex: 1
  },
  input: {
    fontSize: 16,
    padding: 0,
    height: 24,
    color: '#4b4739'
  },
  buttonWrapper: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
