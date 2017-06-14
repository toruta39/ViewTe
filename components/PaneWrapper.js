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
    activePane: 2,
    screenWidth: Dimensions.get('window').width,
    browser: Object.keys(Browser.types)[0]
  }

  onLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState({screenWidth: width});
  }

  onMenuButtonPress = () => {
    this.setState({activePane: 0});
  }

  onDevButtonPress = () => {
    this.setState({activePane: 1});
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {this.state.activePane === 0 && <Pane>
          <EnvironmentPanel
            onSelect={(browser) => this.setState({activePane: 2, browser})} />
        </Pane>}
        {this.state.activePane === 1 && <Pane>
          <DevelopmentPanel/>
        </Pane>}
        {this.state.activePane === 2 && <Pane>
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
