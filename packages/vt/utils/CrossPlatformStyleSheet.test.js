import StyleSheet from './CrossPlatformStyleSheet';

test('create ios style sheet', () => {
  expect(StyleSheet.create({
    container: {
      margin: 10,
      ios: {
        width: 200,
        height: 100,
        color: '#fff'
      },
      android: {
        width: 300,
        height: 150,
        color: '#ddd'
      }
    },
    text: {
      fontSize: 20
    }
  })).toEqual(StyleSheet.create({
    container: {
      margin: 10,
      width: 200,
      height: 100,
      color: '#fff'
    },
    text: {
      fontSize: 20
    }
  }));
});
