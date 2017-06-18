'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image,View, Text, StyleSheet, Dimensions, Platform  } from 'react-native';
import { connect } from 'react-redux';
import { hideParisBottomMessage } from '../../actions/paris';
import FontSizeCalculator from './../../calculators/FontSize';
const w = Dimensions.get('window').width;
const ParisHead = require('../../../images/paris/Paris.png');

const styles = StyleSheet.create({
  container: {
    width: w - 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    minHeight: 35
  },
  headerBtn: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textStyle: {
    color: 'grey',
    padding: 3,
    textAlign: 'center',
    fontSize: new FontSizeCalculator(16).getSize(),
    flex: 9

  },
  cancelEdit: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    flex: 1
  },

});

class ParisAdjustableMessage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { text } = this.props
    return (
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <View style={styles.headerBtn}>
          <Image source={ParisHead} style={styles.cancelEdit}/>
        </View>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    )
  }
}


function bindActions(dispatch) {
  return {
    hideParisBottomMessage: name => dispatch(hideParisBottomMessage()),

  };
}

const mapStateToProps = state => {
  return {
    userName: state.user.name
  }
};

export default connect(mapStateToProps, bindActions)(ParisAdjustableMessage);