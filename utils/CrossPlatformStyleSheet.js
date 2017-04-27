import {
  StyleSheet,
  Platform
} from 'react-native';

function aggregate(styleSheet) {
  const newStyleSheet = Object.keys(styleSheet)
    .reduce((newStyleSheet, name) => {
      const style = styleSheet[name];

      const newStyle = Object.keys(style)
        .filter((prop) => typeof style[prop] !== 'object')
        .reduce((newStyle, prop) => {
          newStyle[prop] = style[prop];
          return newStyle;
        }, {});

      newStyleSheet[name] = {
        ...newStyle,
        ...Platform.select(style)
      };

      return newStyleSheet;
    }, {});

  return newStyleSheet;
}

export default {
  create(styleSheet) {
    return StyleSheet.create(aggregate(styleSheet));
  }
};
