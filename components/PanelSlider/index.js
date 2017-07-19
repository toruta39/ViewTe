import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  Animated,
  View,
  PanResponder,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Browser from '../Browser';
import EnvironmentPanel from '../EnvironmentPanel';
import DevelopmentPanel from '../DevelopmentPanel';
import Panel from '../Panel';
import {
  updateActivePanel
} from '../../actions';

const PANEL_PADDING = 50;

class PanelSlider extends Component {
  state = {
    browserOffsetX: 0,
    browserAnimatedX: 0,
    screenWidth: Dimensions.get('window').width
  }

  onLayout = ({nativeEvent: {layout: {width}}}) => {
    this.setState((state) => ({
      screenWidth: width,
      browserOffsetX:
        this.props.activePanel === 'development' ?
          -width + PANEL_PADDING :
        this.props.activePanel === 'environment' ?
          width - PANEL_PADDING :
        0
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activePanel !== this.props.activePanel) {
      this.setState((state) => ({
        browserOffsetX:
          nextProps.activePanel === 'development' ?
            -state.screenWidth + PANEL_PADDING :
          nextProps.activePanel === 'environment' ?
            state.screenWidth - PANEL_PADDING :
          0
      }));
    }
  }

  onShadePress = () => this.props.updateActivePanel('browser')

  render() {
    const { browserOffsetX, browserAnimatedX } = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {browserAnimatedX > 0 && <Panel style={{ paddingRight: 50 }}>
          <EnvironmentPanel/>
        </Panel>}
        {browserAnimatedX < 0 && <Panel style={{ paddingLeft: 50 }}>
          <DevelopmentPanel/>
        </Panel>}
        {<Panel x={browserOffsetX}
          onAnimate={({value}) => this.setState({browserAnimatedX: value})}
          onShadePress={this.onShadePress}>
          <Browser />
        </Panel>}
      </View>
    );
  }
}

export default connect((state) => ({
  activePanel: state.panel.activePanel
}), {
  updateActivePanel
})(PanelSlider);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
