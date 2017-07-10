import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 4,
    borderColor: '#009688',
    borderWidth: 2,
    width: deviceWidth - 80,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',


  }
});

class SolidButton extends Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func,
    showLoader: React.PropTypes.bool,
  }

  static defaultProps = {
    onPress: _.noop,
    showLoader: false,
    loaderElement: null
  }

  render() {
    console.log('this.props.loaderElement',this.props.loaderElement)
    return (
      <TouchableHighlight style={[styles.center, this.props.style]} onPress={this.props.onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.text}>{this.props.label}</Text>
          {this.props.loaderElement}
        </View>
      </TouchableHighlight>
    );
  }
}

export default SolidButton;
