import React, {Component} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
const w = Dimensions.get('window').width
let fontSizeDefault = 14;
let fontColor = '#000';

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

const styles = StyleSheet.create({
  guideText: {
    borderWidth: 2,
    borderColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 120,
  },
  bodyTypeText: {
    textAlign: 'center',
    width: w * 0.6,
    alignSelf: 'center',
    fontSize: fontSizeDefault * 1.25,
    color: fontColor,
    fontFamily: 'PlayfairDisplay-Bold',
  },
});