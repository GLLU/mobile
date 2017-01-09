import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  stepsContainer: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  btnSteps: {
    width: 40,
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 2
  },
  stepsLabel: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontWeight: '500',
    fontFamily: 'Times New Roman'
  },
  stepsLine: {
    flex: 1,
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#BDBDBD',
    height: 2,
    marginLeft: 40,
    marginRight: 40
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
    return parseInt(step) < parseInt(this.props.currentStep) ? false : true;
  }

  render () {
    return (<View style={styles.stepsContainer}>
              <View style={styles.stepsLine} />
              <Grid>
                <Col size={30}>
                  <Button disabled={this.getDisabled(1)} bordered rounded large style={[styles.btnSteps, this.getStepStyle(1), {alignSelf: 'flex-start'}]} onPress={() => this.props.selectTab(1)} >
                    <Text style={[styles.stepsLabel, {color: this.getStepTextColor(1)}]}>1</Text>
                  </Button>
                </Col>
                <Col size={40}>
                  <Button disabled={this.getDisabled(2)} bordered rounded large style={[styles.btnSteps, this.getStepStyle(2), {alignSelf: 'center'}]} onPress={() => this.props.selectTab(2)}>
                    <Text style={[styles.stepsLabel, {color: this.getStepTextColor(2)}]}>2</Text>
                  </Button>
                </Col>
                <Col size={30}>
                  <Button disabled={this.getDisabled(3)} bordered rounded large style={[styles.btnSteps, this.getStepStyle(3), {alignSelf: 'flex-end'}]} onPress={() => this.props.selectTab(1)}>
                    <Text style={[styles.stepsLabel, {color: this.getStepTextColor(3)}]}>3</Text>
                  </Button>
                </Col>
                </Grid>
            </View>)
  }

}

export default StepsBar;
