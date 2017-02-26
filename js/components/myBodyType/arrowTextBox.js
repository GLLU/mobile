import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';

export default class ArrowTextBox extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string
  }

  render() {
    return (
        <View style={styles.guideText}>
          <Text style={[styles.bodyTypeText, {marginBottom: 10}]}>{this.props.title}</Text>
          <Text style={{ textAlign: 'center' }}>{this.props.description}</Text>
        </View>
   )
  }
}
