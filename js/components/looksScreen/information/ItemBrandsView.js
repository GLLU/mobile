'use strict';

import React, { PureComponent } from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import BaseComponent from "../../common/base/BaseComponent";
import ItemBrand from "./ItemBrand";

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  textStyle:{
    flex:-1,
    flexDirection:'row',
    padding:10,
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    backgroundColor:'white'
  }
});

class ItemBrandsView extends PureComponent {

  static propTypes = {
    brands: React.PropTypes.array,
  };

  render() {
    const {brands}=this.props;
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={this.props.style} contentContainerStyle={styles.container}>
        {_.map(brands,brand=><ItemBrand key={brand.id} style={{marginHorizontal:10}} brand={brand}/>)}
      </ScrollView>
    );
  }
}

export default ItemBrandsView;

