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
    const {
      onReload,
      isLoading,
      onMenuButtonPress,
      onDevButtonPress
    } = this.props;
    const {inputUrl, selection} = this.state;

    return (
      <View style={styles.container}>
        <Button style={styles.button} title="Menu" color="#565656"
          onPress={onMenuButtonPress}/>
        <View style={styles.fieldBackground}>
          <View style={styles.fieldWrapper}>
            <TextInput style={styles.field} value={inputUrl}
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
          <View style={styles.reloadButtonWrapper}>
            <ReloadButton onPress={onReload} isLoading={isLoading} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#565656'
  },
  fieldBackground: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#565656',
    flex: 1,
    height: 30
  },
  fieldWrapper: {
    flex: 1
  },
  field: {
    fontSize: 16,
    padding: 0,
    height: 24,
    color: '#f7df1e'
  },
  reloadButtonWrapper: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
