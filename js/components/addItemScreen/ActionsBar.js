import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

const Window = Dimensions.get('window');
const deviceWidth = Window.width;
const deviceHeight = Window.height;
import FontSizeCalculator from './../../calculators/FontSize';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const styles = StyleSheet.create({
  actionsContainer: {
    width: deviceWidth,
    height: 100,
    backgroundColor: 'transparent',
    padding: 20,
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
    borderRadius: 0
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
              <Grid>
                <Col size={48}>
                  <Button transparent onPress={() => this.props.tagAnotherAction()} style={styles.btnTagAnother}>
                    <Text style={styles.textBtn}>TAG ANOTHER</Text>
                  </Button>
                </Col>
                <Col size={4}></Col>
                <Col size={48}>
                  <Button transparent onPress={() => this.props.continueAction()} style={styles.btnContinue}>
                    <Text style={styles.textBtn}>CONTINUE</Text>
                  </Button>
                </Col>
              </Grid>
          </View>)
  }

}

export default ActionsBar;