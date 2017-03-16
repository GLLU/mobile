import {StyleSheet, Dimensions, Platform} from 'react-native';
import FontSizeCalculator from './../../calculators/FontSize';
const w = Dimensions.get('window').width;

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
  textStyle: {
    color: 'white',
    padding: 3,
    fontSize: new FontSizeCalculator(10).getSize(),

  },
  cancelEdit: {
    width: 20,
    height: 20,
    resizeMode: 'contain',


  },
});
