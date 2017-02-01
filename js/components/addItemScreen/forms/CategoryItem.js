import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native'
import { View, Text, Button } from 'native-base';

import FontSizeCalculator from './../../../calculators/FontSize';

const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  categoryItem: {
    width: (w - 40) / 5,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5
  },
  categoryItemTitle: {
    color: '#333333',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoryItemSelectedTitle: {
    color: '#1DE9B6',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoryItemImage: {
    height: 100,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  categoryItemSelectedImage: {
    height: 110,
    width: 55,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btncategoryItem: {
    height: 100,
    width: 50,
    alignSelf: 'center'
  },
});

class CategoryItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
    selected: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  }

  _renderIcon(url, selected) {
    if (url) {
     return selected ?
        <Image source={{uri: url}} style={styles.categoryItemImage} />
        :
        <Image source={{uri: url}} style={styles.categoryItemImage} />;
    }

    return null;
  }

  render() {
    const { item, selected, onPress } = this.props;
    const categoryItemTitle = selected ? styles.categoryItemSelectedTitle : styles.categoryItemTitle;
    const url = item.icon ? item.icon.url : false;
    return (<View style={styles.categoryItem}>
              <Text style={categoryItemTitle}>{item.attributes.name}</Text>
              <Button transparent style={styles.btncategoryItem} onPress={() => onPress(item)} >
                {this._renderIcon(url, selected)}
              </Button>
            </View>);
  }
}

export default CategoryItem;
