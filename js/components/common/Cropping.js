
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator,Text } from 'react-native';
import glluTheme from '../../themes/gllu-theme';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const bg = require('../../../images/background-shadow.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(192,192,192, .4)',
    height: h
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: w,
    height: h,
    resizeMode: 'cover'
  },
  textView: {
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
  spinner: {
    marginRight: 10,
  },
  text: {
    color: '#000000',
  }
});

class Cropping extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    
    return(
      <View style={styles.container}>
        <Image source={bg} style={styles.bgImage} />
        <View style={styles.textView}>
          <ActivityIndicator
              style={styles.spinner}
              color={glluTheme.defaultSpinnerColor}
              size={'small'}
            />
          <Text style={styles.text}>Processing...</Text>
        </View>
      </View>
    );
  }
}

export default Cropping;
