import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, Container, Content, Button, Text, Picker, Item, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import FontSizeCalculator from './../../../calculators/FontSize';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const us = require('../../../../images/flags/us.png');
const uk = require('../../../../images/flags/uk.png');
const FLAGS = [
        {name: 'uk', icon: uk, text: 'UK'},
        {name: 'us', icon: us, text: 'US'}
      ];

const styles = StyleSheet.create({
  selectOptions: {
    backgroundColor: 'transparent'
  },
  arrowSelect: {
    color: '#BDBDBD',
    fontSize: new FontSizeCalculator(18).getSize(),
    paddingTop: 10
  },
  fakeBtnContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    paddingTop: 5,
    height: 50,
  },
  flagSelectOptions: {
    width: 40,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});

class ItemSize extends Component {

  static propTypes = {
    itemSizeCountry: React.PropTypes.string,
    itemSizeNumber: React.PropTypes.string,
    updateValue: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render () {
    let flagIcon = uk;
    FLAGS.map((flag) => {
      if (flag.name == this.props.itemSizeCountry) {
        flagIcon = flag.icon;
      }
    });
    return (<Container style={{flex: 1, marginBottom: 0, marginTop: 0}}>
              <Content scrollEnabled={false}>
                <Grid>
                  <Col size={48}>
                    <Grid style={styles.fakeBtnContainer}>
                      <Col size={20}>
                        <Image source={flagIcon} style={styles.flagSelectOptions} />
                      </Col>
                      <Col size={60}>
                        <Picker
                          style={styles.selectOptions}
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.props.itemSizeCountry}
                          onValueChange={(value) => this.props.updateValue('itemSizeCountry', value)}>
                          {FLAGS.map((flag, i) => {
                            return <Item key={i} label={flag.text} value={flag.name} />  
                          })}
                        </Picker>
                      </Col>
                      <Col size={20}>
                        <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                      </Col>
                    </Grid>
                  </Col>
                  <Col size={4} />
                  <Col size={48}>
                    <Grid style={styles.fakeBtnContainer}>
                      <Col size={80}>
                        <Picker
                            style={[styles.selectOptions, {width: 100}]}
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.props.itemSizeNumber}
                            onValueChange={(value) => this.props.updateValue('itemSizeNumber', value)}>
                            <Item label="1" value="1" />
                            <Item label="2" value="2" />
                            <Item label="3" value="3" />
                            <Item label="4" value="4" />
                        </Picker>
                      </Col>
                      <Col size={20}>
                        <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                      </Col>
                    </Grid>
                  </Col>
                </Grid>
              </Content>
            </Container>);
  }

}

export default ItemSize;
