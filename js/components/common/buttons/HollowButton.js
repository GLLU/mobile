import React, { Component } from 'react';
import * as _ from 'lodash';
import {Dimensions, StyleSheet} from 'react-native'
import SolidButton from "./SolidButton";

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 4,
    borderColor: '#009688',
    borderWidth: 2,
    width: deviceWidth - 80,
    backgroundColor: 'transparent'
  }
});

class HollowButton extends Component {



  static propTypes = {
    onPress: React.PropTypes.func
  }

  static defaultProps = {
    onPress: _.noop
  }

  render() {
    return (
      <SolidButton {...this.props} style={[styles.btn,this.props.style]}/>
    );
  }
}

export default HollowButton;
