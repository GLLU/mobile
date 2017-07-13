'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import _ from 'lodash';
import BaseComponent from "../../common/base/BaseComponent";

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
});

class ItemBrandsView extends BaseComponent {

  static propTypes = {
    items: React.PropTypes.array,
  };

  static defaultProps = {
    items: []
  };

  constructor(props) {
    super(props);
    this.renderBrand = this.renderBrand.bind(this);
  }

  renderBrand(brand) {
    return (
      <View key={brand.id} style={{flex:-1, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:'black', backgroundColor:'white'}}>
        <Text numberOfLines={1} style={{padding:15}}>
          {brand.name}
        </Text>
      </View>
    )
  }

  render() {
    // const brands=_.chain(this.props.items).map(item=>item.brand).uniqBy(brand=>brand.id).value();
    let brands = _.map(this.props.items, item => item.brand);
    console.log(`flatten`, brands)
    brands = _.uniqBy(brands, brand => brand.id);
    console.log(`uniqBy`, brands)
    return (
      <View style={{backgroundColor: 'red'}}>
        {_.map(brands, this.renderBrand)}
      </View>
    );
  }
}

export default ItemBrandsView;

