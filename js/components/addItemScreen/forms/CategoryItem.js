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
  btnCategoryItem: {
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

  _renderIcon(icon, selected) {
    if (icon) {
     return selected ?
        <Image source={{uri: icon.url_hover}} style={styles.categoryItemImage} />
        :
        <Image source={{uri: icon.url}} style={styles.categoryItemImage} />;
    }

    return null;
  }

  render() {
    const { item, selected, onPress } = this.props;
    const categoryItemTitle = selected ? styles.categoryItemSelectedTitle : styles.categoryItemTitle;
    return (<View style={styles.categoryItem}>
              <Text style={categoryItemTitle}>{item.name}</Text>
              <Button transparent style={styles.btnCategoryItem} onPress={() => onPress(item)} >
                {this._renderIcon(item.icon, selected)}
              </Button>
            </View>);
  }
}

export default CategoryItem;
