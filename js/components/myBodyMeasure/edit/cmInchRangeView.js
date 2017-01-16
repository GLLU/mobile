import React, {Component} from 'react';
import {View, Text, Switch, TouchableWithoutFeedback} from 'react-native';
import myStyles from '../styles';
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
            <View style={myStyles.radioView}>
                {optionNodes}
            </View>
        )
    }

    renderRadioOption(option, selected, onSelect, index) {
        return (
            <View key={index}>
                <TouchableWithoutFeedback onPress={onSelect} >
                    <View style={myStyles.radioOption}>
                        <Text style={[ myStyles.radioBtn, selected ? {color: MKColor.Teal} : null]}>{option}</Text>
                        { index === 0 ? <Text style={myStyles.radioSlash}>/</Text> : null }
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
      <View style={myStyles.toggleContainer}>
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
