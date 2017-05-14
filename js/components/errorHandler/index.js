'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image,View, Text  } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { hideError, hideWarning, hideInfo } from '../../actions/errorHandler';

const cancelEdit = require('../../../images/icons/cancelEdit.png');

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
      }
      else {
        this.props.hideInfo();
      }
    }
  }

  componentDidMount(){
    setTimeout(()=>this.hide(),3000);
  }

  render() {
    let text = this.props.error.length > 0 ? `Watch out: ${this.props.error}` : this.props.warning.length > 0 ? `Watch out: ${this.props.warning}` : this.props.info;
    let color = this.props.error.length > 0 ? '#993333' : this.props.warning.length > 0 ? '#cc9900' : '#3C997E';
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text style={styles.textStyle}>{text}</Text>
        <TouchableOpacity transparent onPress={() => this.hide()} style={styles.headerBtn}>
          <Image source={cancelEdit} style={styles.cancelEdit}/>
        </TouchableOpacity>
      </View>
    )
  }
}


function bindActions(dispatch) {
  return {
    hideError: name => dispatch(hideError()),
    hideWarning: name => dispatch(hideWarning()),
    hideInfo: name => dispatch(hideInfo()),
  };
}

const mapStateToProps = state => {
  return {
    error: state.errorHandler.error || '',
    warning: state.errorHandler.warning || '',
    info: state.errorHandler.info || ''
  }
};

export default connect(mapStateToProps, bindActions)(ErrorHandler);