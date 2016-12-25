import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';

export default class InformationTextIcon extends Component {
  static propTypes = {
    text: React.PropTypes.string,
    icon: React.PropTypes.string
  }

  static defaultProps = {
      icon: 'ios-information'
  };

  render() {
    return (
      <View style={styles.privacy}>
        <Icon name={this.props.icon} style={styles.privacyIcon}/>
        <Text style={styles.privacyText}>{this.props.text}</Text>
      </View>
    )
  }
}
