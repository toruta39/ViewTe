import React, {Component} from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  Alert,
  View,
  Text,
  Button
} from 'react-native';
import SafariView from 'react-native-safari-view';

export default class SafariViewCaller extends Component {
  onPress = () => {
    const {source: {uri}} = this.props;

    SafariView.isAvailable()
      .then(() => SafariView.show({url: uri}))
      .catch((err) => {
        Alert.alert('Error', 'SafariView is not supported');
        console.error(err);
      });
  }

  goBack = () => false

  goForward = () => false

  reload = () => false

  componentDidMount() {
    const {source: {uri}} = this.props;

    this.props.onNavigationStateChange({
      canGoBack: false,
      canGoForward: false,
      url: uri,
      isLoading: false
    })
  }

  render() {
    const {style, source: {uri}} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.url} ellipsizeMode="tail" numberOfLines={2}>
          Desitination URL:{'\n'}
          {uri}
        </Text>
        <Button title="Open SafariView" onPress={this.onPress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8'
  },
  url: {
    marginBottom: 36,
    textAlign: 'center'
  }
});
