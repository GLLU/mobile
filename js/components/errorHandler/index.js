'use strict';

import React, { Component } from 'react';
import { TouchableOpacity, Image} from 'react-native';

import { View, Text } from 'native-base';
import styles from './styles';
import { connect } from 'react-redux';
import { hideError, hideWarning } from '../../actions/errorHandler';

const cancelEdit = require('../../../images/icons/cancelEdit.png');

class ErrorHandler extends Component {

  constructor(props) {
    super(props);
  }

  hide() {
    if(this.props.error) {
      this.props.hideError();
    } else {
      this.props.hideWarning();
    }
  }

  render() {
    let error = this.props.error.length > 0  ? this.props.error : this.props.warning;
    let color = this.props.error.length > 0  ? '#993333' : '#cc9900';
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text style={styles.textColor}>Watch out: {error}</Text>
        <TouchableOpacity transparent onPress={() => this.hide()} style={styles.headerBtn}>
          <Image source={cancelEdit} style={styles.cancelEdit} />
        </TouchableOpacity>
      </View>
    )
  }
}


function bindActions(dispatch) {
  return {
    hideError: name => dispatch(hideError()),
    hideWarning: name => dispatch(hideWarning()),
  };
}

const mapStateToProps = state => {
  const error = state.errorHandler.error ? state.errorHandler.error : '';
  const warning = state.errorHandler.warning ? state.errorHandler.warning : '';
  return {
    error: error,
    warning: warning,
  }
};

export default connect(mapStateToProps, bindActions)(ErrorHandler);