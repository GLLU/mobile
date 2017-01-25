import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { View, Container, Content, Button, Text, Picker, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import FontSizeCalculator from './../../../calculators/FontSize';
const Item = Picker.Item;

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    color: '#7f7f7f',
    fontWeight: '300',
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
    price: React.PropTypes.number,
    updateValue: React.PropTypes.func,
    currencies: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _renderCurrency() {
    return (<View style={{flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: -10}}>
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
                <Grid style={{marginTop: 0}}>
                  <Col size={48}>
                    <Grid style={styles.fakeBtnContainer}>
                      <Col size={80}>
                        <Picker
                          style={[styles.selectOptions, {width: 100}]}
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={this.props.currency}
                          onValueChange={(value) => this.props.updateValue('currency', value)}>
                          {this.props.currencies.map((c, i) => {
                            return <Item key={i} label={c.name} value={c.value} />
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
                    <Grid>
                      <Col size={80}>
                        <TextInput placeholder="Type a price" keyboardType="numeric" placeholderTextColor="#BDBDBD"  style={styles.textHalfInput} value={`${this.props.price}`} onChangeText={(price) => this.props.updateValue('price', price)} />
                      </Col>
                      <Col size={20}>
                        <Icon style={[styles.arrowSelect, {marginTop: 15}]} name='ios-arrow-down' />
                      </Col>
                    </Grid>
                  </Col>
                </Grid>
            </View>)
  }

}

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => {
  return {
    currencies: state.formData.currencies,
  };
};

export default connect(mapStateToProps, bindActions)(CurrencyAndPrice);
