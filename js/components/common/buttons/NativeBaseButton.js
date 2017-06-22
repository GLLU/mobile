import React, { Component } from 'react';
import { Text,StyleSheet, Dimensions, Image, UIManager, LayoutAnimation } from 'react-native'
import { Button } from 'native-base';
import BaseComponent from '../base/BaseComponent';
import FontSizeCalculator from '../../../calculators/FontSize';
const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {

  },
  text: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
});

class NativeBaseButton extends BaseComponent {
  static propTypes = {
    color: React.PropTypes.string,
    disabledColor: React.PropTypes.string,
    style: React.PropTypes.object,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  }

  static defaultProps={
    color: '#00D7B2',
    disabledColor: '#b5b5b5',
    style: {},
    textStyle: {},
    label: '',
  };

  getStyle=(style,screenWidth)=>{
    const defaultStyle ={
      marginTop: 20,
      marginBottom: 20,
      backgroundColor:this.props.disabled ? this.props.disabledColor : this.props.color,
      height: 50,
      width: screenWidth / 2 - 28,
      borderRadius: 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return {
      ...defaultStyle,
      ...style
    }
  };

  render() {
    const style = this.getStyle(this.props.style,screen.width);
    return (
      <Button disabled={this.props.disabled} transparent onPress={this.props.onPress} style={style}>
          <Text style={[styles.text, this.props.textStyle]}>{this.props.label}</Text>
      </Button>
    );
  }
}

export default NativeBaseButton;
