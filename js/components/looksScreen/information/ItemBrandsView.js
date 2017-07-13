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
    padding:15,
    textAlign:'center',
    borderColor:'black',
    borderWidth:2,
    backgroundColor:'white'
  }
});

class ItemBrandView extends PureComponent {

  static propTypes = {
    brand: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  getBrandsFromItems(items){
    return _.chain(items).map(item=>item.brand).uniqBy(brand=>brand.id).value()
  }

  render() {
    const brands=this.getBrandsFromItems(this.props.items);
    return (
      <ScrollView horizontal={true} style={this.props.style} contentContainerStyle={styles.container}>
        {_.map(brands,brand=><ItemBrand key={brand.id} style={{marginHorizontal:10}} brand={brand}/>)}
      </ScrollView>
    );
  }
}

export default ItemBrandView;

