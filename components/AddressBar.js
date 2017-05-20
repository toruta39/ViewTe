import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  View,
  TextInput
} from 'react-native';
import ReloadButton from './ReloadButton';

export default class AddressBar extends Component {
  state = {
    inputUrl: '',
    selection: {
      start: 0,
      end: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUrl !== this.props.currentUrl) {
      this.setState({
        inputUrl: nextProps.currentUrl
      });
    }
  }

  onFieldChange = ({nativeEvent:{text}}) => {
    this.setState({
      inputUrl: text
    });
  }

  onSubmitEditing = ({nativeEvent: {text}}) => {
    let url = text;

    if (!/^[^:]+:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    this.props.onSubmitEditing({url});
  }

  onSelectionChange = ({nativeEvent: {selection}}) => {
    this.setState({
      selection: selection
    });
  }

  onFocus = () => {
    // by default, cursor will be placed at the end of text after being
    // focused, so i delay selecting all text for 100ms after the default
    // behavior
    setTimeout(() => this.setState({
      selection: {
        start: 0,
        end: this.state.inputUrl.length
      }
    }), 100);
  }

  render() {
    const {onReload, isLoading} = this.props;
    const {inputUrl, selection} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.fieldBackground}>
          <TextInput style={styles.field} value={inputUrl}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            selection={selection}
            onChange={this.onFieldChange}
            onSubmitEditing={this.onSubmitEditing}
            onSelectionChange={this.onSelectionChange}
            onFocus={this.onFocus}
            returnKeyType="go"/>
        </View>
        <View style={styles.reloadButtonWrapper}>
          <ReloadButton onPress={onReload} isLoading={isLoading} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    ios: {
      height: 50
    },
    android: {
      height: 60
    },
    borderBottomColor: '#cecdce',
    borderBottomWidth: 1
  },
  fieldBackground: {
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#e6e6e7',
    flex: 1
  },
  field: {
    flex: 1,
    fontSize: 16,
    height: 24
  },
  reloadButtonWrapper: {
    marginLeft: 10,
    justifyContent: 'center'
  }
});
