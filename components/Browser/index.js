import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import PropTypes from 'prop-types';
import {
  View,
  WebView,
  TextInput,
  Text,
  Platform,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import WKWebView from 'react-native-wkwebview-reborn';
import AddressBar from '../AddressBar';
import ControlBar from '../ControlBar';
import SafariViewCaller from '../SafariViewCaller';
import BrowserHeader from '../BrowserHeader';
import VTButton from '../VTButton';
import {
  updateNavState,
  updateGotoUrl
} from '../../actions';

const WEBVIEW_REF = 'webview';

const types = Platform.select({
  ios: {
    'UIWebView': WebView,
    'WKWebView': WKWebView,
    'SFSafariViewController': SafariViewCaller
  },
  android: {
    'WebView': WebView,
  }
});

class Browser extends Component {
  static types = types

  static propTypes = {
    type: PropTypes.oneOf(Object.keys(types)).isRequired,
    onMenuButtonPress: PropTypes.func.isRequired,
    onDevButtonPress: PropTypes.func.isRequired
  }

  onNavigationStateChange = (navState) => {
    this.props.updateNavState(navState);
  }

  onAddressBarSubmitEditing = ({url}) => {
    if (url !== this.props.gotoUrl) {
      this.props.updateGotoUrl(url);
    } else {
      this.refs[WEBVIEW_REF].reload();
    }
  }

  onReload = () => this.refs[WEBVIEW_REF].reload()

  onForward = () => this.refs[WEBVIEW_REF].goForward()

  onBack = () => this.refs[WEBVIEW_REF].goBack()

  onShare = () => Share.share({message: this.props.currentUrl})

  render() {
    const {
      type,
      onMenuButtonPress,
      onDevButtonPress,
      style,
      gotoUrl
    } = this.props;

    const WebView = Browser.types[type];
    const additionalProps = type === 'WKWebView' ? {
      openNewWindowInWebView: true
    } : {};

    return (
      <View style={[styles.container, style]}>
        <BrowserHeader
          left={(
            /* TODO: redux action */
            <VTButton type="menu" onPress={onMenuButtonPress} />
          )}
          right={(
            /* TODO: redux action */
            <VTButton type="code" onPress={onDevButtonPress} />
          )}>
          {type}
        </BrowserHeader>
        <AddressBar onSubmitEditing={this.onAddressBarSubmitEditing}
          onReload={this.onReload}/>
        <WebView style={styles.webview} source={{uri: gotoUrl}}
          onNavigationStateChange={this.onNavigationStateChange}
          ref={WEBVIEW_REF} {...additionalProps} />
        <ControlBar {...this.state} onForward={this.onForward}
          onBack={this.onBack} onShare={this.onShare} />
      </View>
    );
  }
}

export default connect((state) => ({
  gotoUrl: state.browser.gotoUrl
}), {
  updateNavState,
  updateGotoUrl
})(Browser);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fec207'
  },
  webview: {
    flex: 1
  }
});
