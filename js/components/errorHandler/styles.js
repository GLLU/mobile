import {StyleSheet, Dimensions, Platform} from 'react-native';
const w = Dimensions.get('window').width

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    width: w-20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row'
  },
  headerBtn: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textColor: {
    color: 'white',
    padding: 3

  },
  cancelEdit: {
    width: 20,
    height: 20,
    resizeMode: 'contain',


  },
});
