import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  Animated,
  View,
  PanResponder,
  Dimensions
} from 'react-native';
import Browser from '../Browser';
import EnvironmentPanel from '../EnvironmentPanel';
import DevelopmentPanel from '../DevelopmentPanel';
import Pane from '../Pane';

export default class PaneSlider extends Component {
  state = {
    browserOffsetX: 0,
    browserAnimatedX: 0,
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
      browserOffsetX: state.screenWidth - 50
    }));
  }

  onDevButtonPress = () => {
    this.setState((state) => ({
      browserOffsetX: -state.screenWidth + 50
    }));
  }

  onShadePress = () => {
    this.setState({ browserOffsetX: 0 });
  }

  render() {
    const { browserOffsetX, browserAnimatedX } = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {browserAnimatedX > 0 && <Pane style={{ paddingRight: 50 }}>
          <EnvironmentPanel
            onSelect={(browser) => this.setState({browserOffsetX: 0, browser})} />
        </Pane>}
        {browserAnimatedX < 0 && <Pane style={{ paddingLeft: 50 }}>
          <DevelopmentPanel/>
        </Pane>}
        {<Pane x={browserOffsetX}
          onAnimate={({value}) => this.setState({browserAnimatedX: value})}
          onShadePress={this.onShadePress}>
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
