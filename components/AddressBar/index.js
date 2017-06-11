import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TextInput,
  Button
} from 'react-native';
import ReloadButton from '../ReloadButton';

export default class AddressBar extends Component {
  state = {
    inputUrl: '',
    selection: {
      start: 0,
      end: 0
    }
  }

  componentDidMount() {
    this.setState({
      inputUrl: this.props.currentUrl
    });
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
    // focused, so i delay selecting all text after the default behavior
    setTimeout(() => this.setState({
      selection: {
        start: 0,
        end: this.state.inputUrl.length
      }
    }), 300);
  }

  render() {
    const {
      onReload,
      isLoading,
      onMenuButtonPress,
      onDevButtonPress
    } = this.props;
    const {inputUrl, selection} = this.state;

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
              returnKeyType="go"/>
          </View>
          <View style={styles.buttonWrapper}>
            <ReloadButton onPress={onReload} isLoading={isLoading} />
          </View>
        </View>
      </View>
    );
  }
}

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
