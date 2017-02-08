import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native'
import { View, Text, Button } from 'native-base';

import FontSizeCalculator from './../../../calculators/FontSize';
import { ITEM_WIDTH } from './styles';

const ICON_WIDTH = parseInt(ITEM_WIDTH * 5 / 8);
const ICON_HEIGHT = ICON_WIDTH * 6 / 5;

const styles = StyleSheet.create({
  categoryItem: {
    width: ITEM_WIDTH,
    padding: 5
  },
  categoryItemTitle: {
    color: '#333333',
    fontSize: new FontSizeCalculator(11).getSize(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoryItemSelectedTitle: {
    color: '#1DE9B6',
    fontSize: new FontSizeCalculator(11).getSize(),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  categoryItemImage: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  btnCategoryItem: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
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
              <Text adjustsFontSizeToFit={true} style={categoryItemTitle}>{item.name}</Text>
              <Button transparent style={styles.btnCategoryItem} onPress={() => onPress(item)} >
                {this._renderIcon(item.icon, selected)}
              </Button>
            </View>);
  }
}

export default CategoryItem;
