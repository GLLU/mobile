import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Col, Grid } from "react-native-easy-grid";
import _ from 'lodash';

import CustomPicker from './CustomPicker';

class ItemSize extends Component {

  static propTypes = {
    itemSizeRegion: React.PropTypes.string,
    itemSizeValue: React.PropTypes.string,
    countries: React.PropTypes.array,
    itemSizes: React.PropTypes.array,
    updateValue: React.PropTypes.func,
  }

  render () {
    const { itemSizes, countries } = this.props;
    const regions = _.uniq(itemSizes.map(x => x.region));
    const itemSizeRegion = this.props.itemSizeRegion ? this.props.itemSizeRegion : _.first(regions);
    const sizesByCountry = _.filter(itemSizes, x => x.region == itemSizeRegion);
    const values = _.uniq(sizesByCountry.map(x => x.value));
    const itemSizeValue = this.props.itemSizeValue ? this.props.itemSizeValue : _.first(values);

    return (<View style={{flex: 1, marginBottom: 0, marginTop: 0, height: 50}}>
              <Grid>
                <Col size={48}>
                  <CustomPicker
                      items={regions}
                      selectedValue={itemSizeRegion}
                      onValueChange={(value) => this.props.updateValue('itemSizeRegion', value)}/>
                </Col>
                <Col size={4} />
                <Col size={48}>
                  <CustomPicker
                      items={values}
                      selectedValue={itemSizeValue}
                      onValueChange={(value) => this.props.updateValue('itemSizeValue', value)}/>
                </Col>
              </Grid>
            </View>);
  }

}

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => {
  return {
    countries: state.filters.countries,
    itemSizes: state.filters.itemSizes,
  };
};

export default connect(mapStateToProps, bindActions)(ItemSize);
