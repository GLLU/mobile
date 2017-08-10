'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image,View, Text, StyleSheet, Dimensions, Platform  } from 'react-native';
import { connect } from 'react-redux';

import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';
import { hideError, hideWarning, hideInfo, hideFatalError } from '../../actions/errorHandler';

class ErrorHandler extends Component {

  constructor(props) {
    super(props);
  }

  hide() {
    if (this.props.error) {
      this.props.hideError();
    }
    else {
      if (this.props.warning) {
        this.props.hideWarning();
      } else {
        if(this.props.fatalError) {
          this.props.hideFatalError();
        } else {
          this.props.hideInfo();
        }
      }

    }
  }

  componentDidMount(){
    setTimeout(()=>this.hide(),2000);
  }

  render() {
    let text = this.props.error.length > 0 ? `Watch out: ${this.props.error}`
      :
      this.props.warning.length > 0 ? `${this.props.warning}` : this.props.fatalError.length > 0 ? `${this.props.fatalError}` : this.props.info;
    let color = this.props.error.length > 0 ? '#993333' : this.props.fatalError.length > 0 ? '#993333' :  this.props.warning.length > 0 ? '#cc9900' : '#3C997E';
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' ? 20 : 0,
  },
  messageText: {
    fontFamily: Fonts.contentFont,
    fontSize:14,
    textAlign: 'center',
    marginLeft: 8,
    marginRight: 8,
    color:'white'
  },
});


function bindActions(dispatch) {
  return {
    hideError: name => dispatch(hideError()),
    hideFatalError: name => dispatch(hideFatalError()),
    hideWarning: name => dispatch(hideWarning()),
    hideInfo: name => dispatch(hideInfo()),
  };
}

const mapStateToProps = state => {
  return {
    error: state.errorHandler.error || '',
    fatalError: state.errorHandler.fatal_error || '',
    warning: state.errorHandler.warning || '',
    info: state.errorHandler.info || ''
  }
};

export default connect(mapStateToProps, bindActions)(ErrorHandler);