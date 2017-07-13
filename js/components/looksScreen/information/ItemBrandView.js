'use strict';

import React, { PureComponent } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native';
import BaseComponent from "../../common/base/BaseComponent";

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
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

  render() {
    return (
      <View style={{flex:-1, flexDirection:'row'}}>
        <Text numberOfLines={1} style={styles.textStyle}>
          {this.props.brand.name}
        </Text>
      </View>
    );
  }
}

export default ItemBrandView;

