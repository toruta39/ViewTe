import React, { Component } from 'react';
import StyleSheet from '../utils/CrossPlatformStyleSheet';
import {
  Animated,
  View,
  PanResponder,
  Dimensions
} from 'react-native';
import BrowserContainer from './BrowserContainer';
import DevPane from './DevPane';

export default class PaneWrapper extends Component {
  state = {
    activePane: 0,
    panePadding: 40,
    slideablePadding: 10,
    panX: new Animated.Value(0),
    screenWidth: Dimensions.get('window').width
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
        <DevPane style={{
          left: this.state.panePadding,
          transform: [
            {translateX: -this.state.screenWidth}
          ]
          }} />
        <BrowserContainer />
        <DevPane style={{
          right: this.state.panePadding,
          transform: [
            {translateX: this.state.screenWidth}
          ]
          }} />
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
