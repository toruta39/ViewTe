import {
  Platform
} from 'react-native';

export function getProps(testID) {
  return Platform.select({
    'android': {
      'accessibilityLabel': testID
    },
    'ios': {
      'testID': testID
    }
  });
}
