import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import RadioButtons from 'react-native-radio-buttons';
const MK = require('react-native-material-kit');

const {
    MKColor,
} = MK;

const scales = [ 'CM', 'INCH' ];


export default class CmInchRangeView extends Component {
  static propTypes = {
    isInchSelect: React.PropTypes.bool,
    toggleCMInch: React.PropTypes.func
  }
  constructor(props) {
      super(props);
      this.state = {
          scaleSelectedOption: 'CM',
      }
  }

  renderRadioContainer(optionNodes){
      return (
          <View style={styles.radioView}>
              {optionNodes}
          </View>
      )
  }

  renderRadioOption(option, selected, onSelect, index) {
      return (
          <View key={index}>
              <TouchableWithoutFeedback onPress={onSelect} >
                  <View style={styles.radioOption}>
                      <Text style={[ styles.radioBtn, selected ? {color: MKColor.Teal} : null]}>{option}</Text>
                      { index === 0 ? <Text style={styles.radioSlash}>/</Text> : null }
                  </View>
              </TouchableWithoutFeedback>
          </View>
      )
  }

  setScaleSelectedOption(scaleSelectedOption){
      this.setState({
          scaleSelectedOption: scaleSelectedOption
      })
      scaleSelectedOption === 'INCH' ? this.props.toggleCMInch(false) : this.props.toggleCMInch(true)
  }

  render() {
    return (
      <View style={styles.toggleContainer}>
          <RadioButtons
              options={ scales }
              onSelection={ this.setScaleSelectedOption.bind(this) }
              selectedOption={ this.state.scaleSelectedOption }
              renderOption={ this.renderRadioOption }
              renderContainer={ this.renderRadioContainer }
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection:'row',
    marginBottom: 10
  },
  radioView: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 60,
    width: 100,
    alignItems: 'flex-end',
    marginBottom: 15,
    marginLeft: 10
  },
  radioBtn: {
    color: 'lightgrey',
    fontSize: 17
  },
  radioOption: {
    flexDirection: 'row',
  },
  radioSlash: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'lightgrey',
    fontSize: 17
  }
});