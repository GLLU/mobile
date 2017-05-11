import React, { Component } from 'react';
import { Text,StyleSheet, Dimensions, Image, UIManager, LayoutAnimation } from 'react-native'
import { Button } from 'native-base';
import BaseComponent from './BaseComponent';
import FontSizeCalculator from './../../calculators/FontSize';
import glluTheme from '../../themes/gllu-theme';
import * as _ from "lodash";
const screen = Dimensions.get('window');

const ACTIVE_COLOR = '#05d7b2';
const INACTIVE_COLOR = '#ADADAD';

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

class GlluButton extends BaseComponent {
  static propTypes = {
    style: React.PropTypes.object,
    text: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const bgColorBtn = this.props.disabled ? glluTheme.btnDisabledBg : glluTheme.btnPrimaryBg;

    let style ={
      marginTop: 20,
      marginBottom: 20,
      backgroundColor:bgColorBtn,
      height: 50,
      width: screen.width / 2 - 28,
      borderRadius: 0,
      alignSelf: 'center'
    }
    Object.assign(style,this.props.style);
    const textStyle = [styles.text, this.props.textStyle];
    
    return (
      <Button disabled={this.props.disabled} transparent onPress={this.props.onPress} style={style}>
        <Text style={textStyle}>{this.props.text}</Text>
      </Button>
    );
  }
}

GlluButton.defaultProps = {
  style: {},
  textStyle: {},
  text: '',
};

export default GlluButton;
