'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image,View, Text, StyleSheet, Dimensions, Platform  } from 'react-native';
import { connect } from 'react-redux';
import { hideParisBottomMessage } from '../../actions/paris';
import FontSizeCalculator from './../../calculators/FontSize';
import Fonts from '../../styles/Fonts.styles';
const w = Dimensions.get('window').width;
const ParisHead = require('../../../images/paris/Paris.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    padding: 5,
    flexDirection: 'row',
    minHeight: 35,
    opacity: 0.9,
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
    textAlign: 'center',
    fontSize: new FontSizeCalculator(16).getSize(),
    fontFamily: Fonts.contentFont,
    flex: 9

  },
  cancelEdit: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    flex: 1
  },
});

class ParisMessages extends Component {

  constructor(props) {
    super(props);
    this.hide=this.hide.bind(this)
  }

  hide() {
    this.props.hideParisBottomMessage();
  }

  componentDidMount(){
    const time = this.props.messageTime * 1000
    setTimeout(this.hide, time)
  }

  render() {
    let text = this.props.message.length > 0 ? `${this.props.message}` : ''
    return (
      <View style={[styles.container, {backgroundColor: 'black'}]}>
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
    message: state.paris.messageBottom || '',
    messageTime: state.paris.messageBottomTime,
    userName: state.user.name

  }
};

export default connect(mapStateToProps, bindActions)(ParisMessages);