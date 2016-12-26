import React, {Component} from 'react';
import {View, Text, Switch} from 'react-native';
import myStyles from '../styles';

export default class CmInchRangeView extends Component {
  static propTypes = {
    isInchSelect: React.PropTypes.bool,
    toggleCMInch: React.PropTypes.func
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
      </View>
    )
  }
}
