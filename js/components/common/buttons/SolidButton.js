import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center'
  }
});

class SolidButton extends Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func
  }

  static defaultProps = {
    onPress: _.noop
  }

  render() {
    return (
        <TouchableHighlight style={[styles.center, this.props.style]} onPress={this.props.onPress}>
            <Text style={styles.text}>{this.props.label}</Text>
        </TouchableHighlight>
    );
  }
}

export default SolidButton;
