import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'
const buyItImage = require('../../../../images/buyItButton-noprice.png');
const bagItImage = require('../../../../images/bagItImage.png');

const likeImage = require('../../../../images/like.png');
const likeClickedImage = require('../../../../images/likeClicked.png');

export default class ItemDataLine extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    onPress: _.noop,
  };

  _getStyle(isActive) {
    return isActive ? styles.footerButtonActive : styles.footerButton;
  }

  _onPress() {
    const shouldActive = !this.props.isActive;
    this.props.onPress(shouldActive);
  }


  render() {
    console.log('props item',this.props.data)
    if(this.props.isOpen){
      return (
        <TouchableHighlight>
          <Animated.View style={[styles.footerButton, {flex: 1, flexDirection: 'row', flexGrow: 10, marginTop: this.props.itemY-5}]}>

            <Text style={[styles.footerButtonText, {marginLeft: 10, marginRight: 10}]}>{this.props.data.brand.name}</Text>
            <View style={{padding: 5, borderLeftWidth: 2, borderRightWidth: 2, borderColor: 'gray'}}>
              <Text style={styles.footerButtonText}>250$</Text>
            </View>
            <View style={{ padding: 5, borderColor: 'gray', marginLeft: 5}}>
              <TouchableOpacity>
                <Image source={bagItImage}
                       style={[styles.footerButtonIcon,{width: 25, height: 25}]}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableHighlight>
      );
    } else return null

  }
}

