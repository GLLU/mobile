import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    borderRadius: 4,
    borderColor: '#009688',
    borderWidth: 2,
    marginBottom: 10,
    width: deviceWidth - 80
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
      <View style={[styles.center, this.props.style]}>
        <TouchableHighlight onPress={this.props.onPress}>
          <Text style={styles.text}>{this.props.label}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SolidButton;
