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
    panePadding: 30,
    panX: new Animated.Value(0),
    screenWidth: Dimensions.get('window').width
  }

  onLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState((state) => {
      return {
        screenWidth: width,
        paneWidth: width - this.state.panePadding
      };
    });
  }

  moveToActivePane = () => (
    Animated.spring(this.state.panX, {
      toValue: this.state.activePane * -this.state.paneWidth
    }).start()
  )

  componentDidUpdate(prevProps, prevState) {
    this.moveToActivePane();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: ({nativeEvent}) => {
        return nativeEvent.pageX < this.state.panePadding ||
          nativeEvent.pageX > this.state.screenWidth - this.state.panePadding;
      },
      onMoveShouldSetPanResponderCapture: ({nativeEvent}) => {
        return nativeEvent.pageX < this.state.panePadding ||
          nativeEvent.pageX > this.state.screenWidth - this.state.panePadding;
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
        });
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
