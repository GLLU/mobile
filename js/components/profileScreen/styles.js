import {StyleSheet, Dimensions} from 'react-native';

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default StyleSheet.create({
  container: {

  },
  tempBtn: {
    position: 'absolute',width: 50, height: 50, backgroundColor :'green'
  },
  itemImage: {
    width: w,
    height: h,
  },
  linearGradient: {
    width: w,
    height: h,
  },
});
