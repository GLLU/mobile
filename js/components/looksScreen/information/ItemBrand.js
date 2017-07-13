'use strict';

import React, { PureComponent } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row'
  },
  textStyle: {
    flex: -1,
    flexDirection: 'row',
    padding: 10 ,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white'
  }
});

class ItemBrand extends PureComponent {

  static propTypes = {
    brand: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <Text numberOfLines={1} style={styles.textStyle}>
          {this.props.brand.name}
        </Text>
      </View>
    );
  }
}

export default ItemBrand;

