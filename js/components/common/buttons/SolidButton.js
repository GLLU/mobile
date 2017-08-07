import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
import Spinner from '../../loaders/Spinner';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  center: {
    flexDirection:'column',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    fontSize: generateAdjustedSize(14),
    fontFamily: Fonts.regularFont,
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
    disabled: React.PropTypes.bool,
    onPress: React.PropTypes.func,
    showLoader: React.PropTypes.bool,
  }

  static defaultProps = {
    onPress: _.noop,
    disabled: false,
    showLoader: false,
    loaderElement: null
  }

  render() {
    return (
      <TouchableOpacity style={[styles.center, styles.basicStyle ,this.props.style]} disabled={this.props.disabled} onPress={this.props.onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.text}>{this.props.label}</Text>
          {this.props.showLoader ? <Spinner animating={true} size={'small'} style={{ left: 10 }}/> : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default SolidButton;
