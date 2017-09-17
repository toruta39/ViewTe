import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import PropTypes from 'prop-types';
import {
  View,
  WebView,
  TextInput,
  Text,
  Platform
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
  updateGotoUrl,
  updateActivePanel
} from '../../actions';
import { ENVIRONMENTS } from '../../constants';

const WEBVIEW_REF = 'webview';

const environments = Platform.select({
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
  static propTypes = {
    environment: PropTypes.oneOf(ENVIRONMENTS).isRequired
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

  render() {
    const {
      environment,
      style,
      gotoUrl,
      updateActivePanel
    } = this.props;

    const WebView = environments[environment];
    const additionalProps = environment === 'WKWebView' ? {
      openNewWindowInWebView: true
    } : {};

    return (
      <View style={[styles.container, style]}>
        <BrowserHeader
          left={(
            <VTButton
              type="menu"
              onPress={() => updateActivePanel('environment')}
              testID="menu-button"
            />
          )}
          right={(
            <VTButton type="code"
              onPress={() => updateActivePanel('development')} />
          )}>
          {environment}
        </BrowserHeader>
        <AddressBar onSubmitEditing={this.onAddressBarSubmitEditing}
          onReload={this.onReload}/>
        <WebView style={styles.webview} source={{uri: gotoUrl}}
          onNavigationStateChange={this.onNavigationStateChange}
          ref={WEBVIEW_REF} {...additionalProps} />
        <ControlBar onForward={this.onForward} onBack={this.onBack} />
      </View>
    );
  }
}

export default connect((state) => ({
  gotoUrl: state.browser.gotoUrl,
  environment: state.browser.environment
}), {
  updateNavState,
  updateGotoUrl,
  updateActivePanel
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
