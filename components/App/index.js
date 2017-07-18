import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {
  Provider
} from 'react-redux';
import PanelSlider from '../PanelSlider';
import configureStore from '../../store/configureStore';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <PanelSlider />
          </View>
        </TouchableWithoutFeedback>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});
