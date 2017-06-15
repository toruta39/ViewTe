import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  Animated,
  View,
  PanResponder,
  Dimensions
} from 'react-native';
import Browser from './Browser';
import EnvironmentPanel from './LeftPane';
import DevelopmentPanel from './RightPane';
import Pane from './Pane';

export default class PaneWrapper extends Component {
  state = {
    browserOffsetX: 0,
    screenWidth: Dimensions.get('window').width,
    browser: Object.keys(Browser.types)[0]
  }

  onLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState((state) => ({
      screenWidth: width,
      browserOffsetX: state.browserOffsetX < 0 ? -width + 50 :
        state.browserOffsetX > 0 ? width - 50 : 0
    }));
  }

  onMenuButtonPress = () => {
    this.setState((state) => ({
      browserOffsetX: state.browserOffsetX ? 0 : state.screenWidth - 50
    }));
  }

  onDevButtonPress = () => {
    this.setState((state) => ({
      browserOffsetX: state.browserOffsetX ? 0 : -state.screenWidth + 50
    }));
  }

  render() {
    const { browserOffsetX } = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {browserOffsetX > 0 && <Pane>
          <EnvironmentPanel
            onSelect={(browser) => this.setState({activePane: 2, browser})} />
        </Pane>}
        {browserOffsetX < 0 && <Pane>
          <DevelopmentPanel/>
        </Pane>}
        {<Pane x={browserOffsetX}>
          <Browser type={this.state.browser}
            onMenuButtonPress={this.onMenuButtonPress}
            onDevButtonPress={this.onDevButtonPress} />
        </Pane>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
