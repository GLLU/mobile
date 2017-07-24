import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';

const styles = StyleSheet.create({
  center: {
    flexDirection:'column',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  basicStyle:{
    width: generateAdjustedSize(265),
    height: generateAdjustedSize(45),
    alignSelf: 'center',
    backgroundColor: Colors.secondaryColor,
  }
  ,
});

class SolidButton extends Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func,
    showLoader: React.PropTypes.bool,
  }

  static defaultProps = {
    onPress: _.noop,
    showLoader: false,
    loaderElement: null
  }

  render() {
    return (
      <TouchableOpacity style={[styles.center, styles.basicStyle ,this.props.style]} onPress={this.props.onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.text}>{this.props.label}</Text>
          {this.props.loaderElement}
        </View>
      </TouchableOpacity>
    );
  }
}

export default SolidButton;
