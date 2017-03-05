import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { View, Text, Col, Grid } from "react-native-easy-grid";
import Button from '../common/Button';

const Window = Dimensions.get('window');
const deviceWidth = Window.width;
const deviceHeight = Window.height;
import FontSizeCalculator from './../../calculators/FontSize';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    alignItems: 'center',
  },
  btnTagAnother: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#333333',
    height: 50,
    width: deviceWidth / 2 - 28,
    borderRadius: 0
  },
  btnContinue: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#1DE9B6',
    height: 50,
    width: deviceWidth / 2 - 28,
    borderRadius: 0,
    alignSelf: 'center',
  },
  textBtn: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
});

class ActionsBar extends Component {

  static propTypes = {
    continueAction: React.PropTypes.func,
    tagAnotherAction: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render () {
    return (<View style={styles.actionsContainer}>
              <Button onPress={() => this.props.continueAction()} text='CONTINUE'/>
          </View>)
  }

}

export default ActionsBar;