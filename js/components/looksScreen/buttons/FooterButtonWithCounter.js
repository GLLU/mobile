import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import FooterButton from "./FooterButton";
import { formatNumberAsString } from "../../../utils/FormatUtils";

const styles = StyleSheet.create({
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    paddingBottom: 3,
    fontSize: 12
  }
});

export default class FooterButtonWithCounter extends PureComponent {

  static propTypes = {
    count:React.PropTypes.number,
    icon:React.PropTypes.object,
    isActive:React.PropTypes.bool,
    onIconPress: React.PropTypes.func,
    onNumberPress: React.PropTypes.func,
  };

  static defaultProps = {
    onIconPress: _.noop,
    onNumberPress: _.noop,
  };

  getIconByActive = (icon,isActive) => isActive ? icon.active : icon.inactive;

  renderCount(){
    const count = formatNumberAsString(this.props.count);
    return(
      <TouchableWithoutFeedback onPress={this.props.onNumberPress}>
        <View>
          <Text style={styles.footerButtonText}>{count}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View>
        <FooterButton {...this.props} onPress={this.props.onIconPress} isActive={false} icon={this.getIconByActive(this.props.icon,this.props.isActive)}/>
        {this.renderCount()}
      </View>
    );
  }
}

