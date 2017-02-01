import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Container, Content, Button, Text, Picker, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import FontSizeCalculator from './../../../calculators/FontSize';
const Item = Picker.Item;

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const us = require('../../../../images/flags/us.png');
const uk = require('../../../../images/flags/uk.png');
const eu = require('../../../../images/flags/eu.png');

const styles = StyleSheet.create({
  selectOptions: {
    backgroundColor: 'transparent'
  },
  arrowSelect: {
    color: '#BDBDBD',
    fontSize: new FontSizeCalculator(18).getSize(),
    paddingTop: 10
  },
  fakeBtnView: {
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
    item: React.PropTypes.object,
    updateValue: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  _renderRegionPicker(regions, itemSizeRegion) {
    console.log('_renderRegionPicker', regions, itemSizeRegion);
    if (regions.length > 0) {
      return <Picker
                  style={styles.selectOptions}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={itemSizeRegion}
                  onValueChange={(value) => this.props.updateValue('itemSizeRegion', value)}>
                {regions.map((region, i) => {
                  return <Item key={i} label={region.toUpperCase()} value={region} />
                })}
              </Picker>;
    }
    return null;
  }

  _renderValuePicker(values, itemSizeValue) {
    console.log('_renderValuePicker', values, itemSizeValue);
    if (values.length > 0) {
      return <Picker
        style={[styles.selectOptions, {width: 100}]}
        iosHeader="Select one"
        mode="dropdown"
        selectedValue={itemSizeValue}
        onValueChange={(value) => this.props.updateValue('itemSizeValue', value)}>
        {values.map((value, i) => {
          return <Item key={i} label={value} value={value} />
        })}
    </Picker>;  
    }
    return null;
  }

  render () {
    const { itemSizes, countries, item } = this.props;
    const regions = _.uniq(itemSizes.map(x => x.region));
    const itemSizeRegion = item.itemSizeRegion ? item.itemSizeRegion : _.first(regions);
    const sizesByCountry = _.filter(itemSizes, x => x.region == itemSizeRegion);
    const values = _.uniq(sizesByCountry.map(x => x.value));
    const itemSizeValue = item.itemSizeValue ? item.itemSizeValue : _.first(values);
    let flagIcon = us;
    countries.map((c) => {
      if (c.name == itemSizeRegion) {
        flagIcon = c.icon;
      }
    });

    console.log('item ItemSize', item);

    return (<Container style={{flex: 1, marginBottom: 0, marginTop: 0}}>
              <Content scrollEnabled={false}>
                <Grid>
                  <Col size={48}>
                    <Grid style={styles.fakeBtnView}>
                      <Col size={20}>
                        <Image source={flagIcon} style={styles.flagSelectOptions} />
                      </Col>
                      <Col size={60}>
                        {this._renderRegionPicker(regions, itemSizeRegion)}
                      </Col>
                      <Col size={20}>
                        <Icon style={styles.arrowSelect} name='ios-arrow-down' />
                      </Col>
                    </Grid>
                  </Col>
                  <Col size={4} />
                  <Col size={48}>
                    <Grid style={styles.fakeBtnView}>
                      <Col size={80}>
                        {this._renderValuePicker(values, itemSizeValue)}
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
  console.log('ItemSize state', state.filters.countries, state.filters.itemSizes);
  return {
    countries: state.filters.countries,
    itemSizes: state.filters.itemSizes,
  };
};

export default connect(mapStateToProps, bindActions)(ItemSize);
