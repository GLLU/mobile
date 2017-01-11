import React, {Component} from 'react';
import {View, Text, Switch, TouchableWithoutFeedback} from 'react-native';
import myStyles from '../styles';
import RadioButtons from 'react-native-radio-buttons';
const MK = require('react-native-material-kit');

const {
    MKButton,
    MKColor,
} = MK;

const scales = [ "Male", "Female" ];


export default class CmInchRangeView extends Component {
  static propTypes = {
    isInchSelect: React.PropTypes.bool,
    toggleCMInch: React.PropTypes.func
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
            scale: scaleSelectedOption
        })
    }

  render() {
    const isInchSelect = this.props.isInchSelect;
    const leftTextStyle = [isInchSelect ? myStyles.toggleDeactive : myStyles.toggleActive ];
    const rightTextStyle = [isInchSelect ? myStyles.toggleActive : myStyles.toggleDeactive ];
    return (
      <View style={myStyles.toggleContainer}>
        <Text style={leftTextStyle}>CM</Text>
        <Switch style={{marginHorizontal: 5}}
            onValueChange={(value) => this.props.toggleCMInch(value)}
            value={this.props.isInchSelect} />
        <Text style={rightTextStyle}>INCH</Text>
          <RadioButtons
              options={ scales }
              onSelection={ this.setScaleSelectedOption.bind(this) }
              selectedOption={this.state.scale }
              renderOption={ this.renderRadioOption }
              renderContainer={ this.renderRadioContainer }
          />
      </View>
    )
  }
}
