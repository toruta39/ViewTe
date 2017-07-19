import React, { Component } from 'react';
import StyleSheet from '../../utils/CrossPlatformStyleSheet';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import {
  Provider
} from 'react-redux';
import PanelSlider from '../PanelSlider';
import configureStore from '../../store/configureStore';

const store = configureStore();

export default class App extends Component {
  render() {
    const content = (
      <View style={styles.container}>
        <PanelSlider />
      </View>
    );

    return (
      <Provider store={store}>
        {Platform.select({
          ios: (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {content}
            </TouchableWithoutFeedback>
          ),
          // TouchableWithoutFeedback is avoided in android, which will
          // block dragging
          android: content
        })}
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
