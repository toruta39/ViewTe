import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  Animated,
  View,
  PanResponder,
  Dimensions
} from 'react-native';
import Browser from './Browser';
import LeftPane from './LeftPane';
import Dev from './Dev';
import Pane from './Pane';

export default class PaneWrapper extends Component {
  state = {
    activePane: 0,
    panePadding: 0,
    slideablePadding: 10,
    panX: new Animated.Value(0),
    screenWidth: Dimensions.get('window').width,
    browser: Object.keys(Browser.types)[0]
  }

  onLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState((state) => {
      return {
        screenWidth: width,
        paneWidth: width - this.state.panePadding
      };
    }, () => this.moveToActivePane({spring: false}));
  }

  moveToActivePane = ({spring}) => {
    const panX = this.state.activePane * -this.state.paneWidth;

    if (spring) {
      Animated.spring(this.state.panX, {
        toValue: panX,
        bounciness: 0
      }).start();
    } else {
      this.state.panX.setValue(panX);
    }
  }

  onMenuButtonPress = () => {
    this.setState((state) => {
      return {activePane: -1};
    }, () => this.moveToActivePane({spring: true}));
  }

  onDevButtonPress = () => {
    this.setState((state) => {
      return {activePane: 1};
    }, () => this.moveToActivePane({spring: true}));
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: ({nativeEvent}) => {
        return nativeEvent.pageX < this.state.slideablePadding ||
          nativeEvent.pageX > this.state.screenWidth - this.state.slideablePadding;
      },
      onMoveShouldSetPanResponderCapture: ({nativeEvent}) => {
        return nativeEvent.pageX < this.state.slideablePadding ||
          nativeEvent.pageX > this.state.screenWidth - this.state.slideablePadding;
      },
      onPanResponderMove: (e, {dx}) => {
        this.state.panX.setValue(
          dx + this.state.activePane * -this.state.paneWidth);
      },
      onPanResponderRelease: (e, {dx}) => {
        const deltaPane = dx > 100 ? 1 :
        dx < -100 ? -1 : 0;

        this.setState((state) => {
          let activePane = state.activePane - deltaPane;
          activePane = Math.max(-1, Math.min(1, activePane));
          return {activePane};
        }, () => this.moveToActivePane({spring: true}));
      }
    });
  }

  render() {
    return (
      <Animated.View style={[styles.container, {
        transform: [
          {translateX: this.state.panX}
        ]
        }]}
        {...this._panResponder.panHandlers} onLayout={this.onLayout}>
        <Pane style={{
          left: this.state.panePadding,
          transform: [
            {translateX: -this.state.screenWidth}
          ]
          }}>
          <LeftPane onSelect={(browser) => {
            this.setState({activePane: 0, browser},
              () => this.moveToActivePane({spring: true}));
            }} />
        </Pane>
        <Browser type={this.state.browser}
          onMenuButtonPress={this.onMenuButtonPress}
          onDevButtonPress={this.onDevButtonPress}/>
        { /*
           * <Pane style={{
           *   right: this.state.panePadding,
           *   transform: [
           *     {translateX: this.state.screenWidth}
           *   ]
           *   }}>
           *   <Dev/>
           * </Pane>
           */ }
      </Animated.View>
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
