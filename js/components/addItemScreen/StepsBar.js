import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

const WIZARD_PADDING = 80;

const styles = StyleSheet.create({
  stepsContainer: {
    flex: 1,
    paddingHorizontal: WIZARD_PADDING,
    justifyContent: 'center'
  },
  btnSteps: {
    width: 40,
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 2,
    alignItems: 'center'
  },
  stepsLabel: {
    paddingTop: (Platform.OS === 'ios') ? 0 : -5,
    textAlign: 'center',
    color: '#BDBDBD',
  },
  stepsLine: {
    flex: 1,
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 40,
    right: 40,
    backgroundColor: '#BDBDBD',
    height: 2,
    marginHorizontal: WIZARD_PADDING,
  },
  stepsTab: {
    marginTop: 40,
    marginBottom: 10
  },
});


class StepsBar extends Component {

  static propTypes = {
    getStepTextColor: React.PropTypes.func,
    getStepStyle: React.PropTypes.func,
    selectTab: React.PropTypes.func,
    currentStep: React.PropTypes.number
  }

  constructor(props) {
    super(props);
  }

  getStepStyle(step) {
    const stepNormalStyle = {backgroundColor: '#FFFFFF'};
    const stepActiveStyle = {backgroundColor: '#1DE9B6', borderColor: '#1DE9B6'}
    return this.props.currentStep == step ? stepActiveStyle : stepNormalStyle;
  }

  getStepTextColor(step) {
    return this.props.currentStep == step ? '#FFFFFF' : '#BDBDBD'
  }

  getDisabled(step) {
    return parseInt(step) == parseInt(this.props.currentStep) ? true : false;
  }

  render () {
    return (<View style={styles.stepsContainer}>
              <View style={styles.stepsLine} />
              <Grid>
                <Col size={40}>
                  <Button disabled={this.getDisabled(0)} bordered rounded large style={[styles.btnSteps, this.getStepStyle(0), {alignSelf: 'flex-start'}]} onPress={() => this.props.selectTab(-1)} >
                    <Text style={[styles.stepsLabel, {color: this.getStepTextColor(0)}]}>1</Text>
                  </Button>
                </Col>
                <Col size={40}>
                  <Button disabled={this.getDisabled(1)} bordered rounded large style={[styles.btnSteps, this.getStepStyle(1), {alignSelf: 'flex-end'}]} onPress={() => this.props.selectTab(1)}>
                    <Text style={[styles.stepsLabel, {color: this.getStepTextColor(1)}]}>2</Text>
                  </Button>
                </Col>
              </Grid>
            </View>)
  }

}

export default StepsBar;
