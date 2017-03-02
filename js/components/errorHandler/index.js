'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, TouchableOpacity, Image} from 'react-native';
import { View, Text } from 'native-base';
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
const w = Dimensions.get('window').width
const styles = StyleSheet.create({
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