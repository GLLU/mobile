import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { View, Container, Content, Button, Text, Picker, Item, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import FontSizeCalculator from './../../../calculators/FontSize';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  titleLabelInfo: {
    color: '#757575',
    fontWeight: '400',
    marginBottom: 8
  },
  textHalfInput: {
    width: w / 2 - 30,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
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

class CurrencyAndPrice extends Component {

  static propTypes = {
    currency: React.PropTypes.string,
    price: React.PropTypes.string,
    updateValue: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _renderCurrency() {
    return (<View style={{flex: 1, flexDirection: 'row', marginTop: 0, marginBottom: 0}}>
              <View style={{flex: 0.5}}>
                <Text style={[styles.titleLabelInfo]}>Currency</Text>
              </View>
              <View style={{flex: 0.5, paddingLeft: 12}}>
                <Text style={[styles.titleLabelInfo]}>Price</Text>
              </View>
          </View>)
  }

  render () {
    return (<View style={{flex: 1, marginBottom: 20, marginTop: 0}}>
                {this._renderCurrency()}
                <Grid>
                  <Col size={48}>
                    <Grid style={styles.fakeBtnContainer}>
                      <Col size={80}>
                        <Picker
                          style={[styles.selectOptions, {width: 100}]}
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.props.currency}
                          onValueChange={(value) => this.props.updateValue('currency', value)}>
                          <Item label="£ GBP" value="LGP" />
                          <Item label="$ USD" value="USD" />
                        </Picker>
                      </Col>
                      <Col size={20}>
                        <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                      </Col>
                    </Grid>
                  </Col>
                  <Col size={4} />
                  <Col size={48}>
                    <TextInput placeholder="Type a price" keyboardType="numeric" placeholderTextColor="#BDBDBD"  style={styles.textHalfInput} value={this.props.price} onChangeText={(price) => this.props.updateValue('price', price)} />
                  </Col>
                </Grid>
            </View>)
  }

}

export default CurrencyAndPrice;
