import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default class ArrowTextBox extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string
  }

  render() {
    return (
      <View>
        <Text style={styles.bodyTypeText}>{this.props.title}</Text>
        <View style={{position: 'relative', height: 10}}>
          <Text style={styles.arrow}>{' '}</Text>
          <Text style={styles.arrowBorder}>{' '}</Text>
        </View>
        <Text style={styles.guideText}>{this.props.description}</Text>
      </View>
    )
  }
}
