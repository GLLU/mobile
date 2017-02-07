
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text } from 'native-base';
import Modal from 'react-native-modalbox';
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
  text: {
    backgroundColor: '#fff',
    color: '#000000',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
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
        <Text style={styles.text}>Processing...</Text>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
});


export default connect(mapStateToProps, bindAction)(Cropping);
