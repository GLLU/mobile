import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
const iconInfomation = require('../../../images/icons/information.png');

export default class InformationTextIcon extends Component {
  static propTypes = {
    text: React.PropTypes.string
  }

  render() {
    return (
      <View style={styles.privacy}>
        <Image source={iconInfomation} style={styles.privacyIcon}/>
        <Text style={styles.privacyText}>{this.props.text}</Text>
      </View>
    )
  }
}
