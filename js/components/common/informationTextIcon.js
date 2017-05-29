import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
const iconInfomation = require('../../../images/icons/info-circle-black.png');

export default class InformationTextIcon extends Component {
  static propTypes = {
    text: React.PropTypes.string
  }

  render() {
    let styles =  StyleSheet.create({
      privacy: {
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
      },
      privacyText: {
        flexDirection: 'column',
        textAlign: 'center'
      },
      privacyIcon: {
        width: 32,
        height: 32,
        marginRight: 5
      }
    });

    return (
      <View style={styles.privacy}>
        <Image source={iconInfomation} style={styles.privacyIcon}/>
        <Text style={styles.privacyText}>{this.props.text}</Text>
      </View>
    )
  }
}
