import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text } from 'react-native';
import * as _ from 'lodash'
import FooterButton from "./FooterButton";
import { formatNumberAsString } from "../../../utils/FormatUtils";

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    width:45,
    alignSelf:'flex-end'
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
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
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    count:0,
    onPress:_.noop
  };

  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  getIconByActive = (icon,isActive) => isActive ? icon.active : icon.inactive;

  renderCount(){
    const count = formatNumberAsString(this.props.count);
    return(
      <TouchableWithoutFeedback style={{justifyContent:'center', alignItems:'center'}} onPress={this.props.onNumberPress || this._onPress}>
        <View>
          <Text style={styles.footerButtonText}>{count}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _onPress() {
    const shouldActive = !this.props.isActive;
    this.props.onPress(shouldActive);
  }

  render() {
    return (
      <View style={styles.container}>
        <FooterButton {...this.props} onPress={this.props.onIconPress || this._onPress} isActive={false} icon={this.getIconByActive(this.props.icon,this.props.isActive)}/>
        {this.renderCount()}
      </View>
    );
  }
}

