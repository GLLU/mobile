import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, Container, Content, Button, Text, Picker, Item, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import FontSizeCalculator from './../../../calculators/FontSize';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const us = require('../../../../images/flags/us.png');
const uk = require('../../../../images/flags/uk.png');

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
    width: new FontSizeCalculator(40).getSize(),
    height: new FontSizeCalculator(30).getSize(),
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
    updateValue: React.PropTypes.func,
    countries: React.PropTypes.array,
    itemSizes: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render () {
    let flagIcon = uk;
    this.props.countries.map((c) => {
      if (c.name == this.props.itemSizeCountry) {
        flagIcon = c.icon;
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
                          {this.props.countries.map((c, i) => {
                            return <Item key={i} label={c.text} value={c.name} />
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
                            {this.props.itemSizes.map((s, i) => {
                            return <Item key={i} label={s.name} value={s.value} />
                          })}
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

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => {
  return {
    countries: state.formData.countries,
    itemSizes: state.formData.itemSizes,
  };
};

export default connect(mapStateToProps, bindActions)(ItemSize);
