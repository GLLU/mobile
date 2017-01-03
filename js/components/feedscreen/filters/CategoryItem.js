import React, { Component } from 'react';
import { Image } from 'react-native'
import { View, Text, Button } from 'native-base';

import styles from '../styles';

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
    const url = item.attributes.icon ? item.attributes.icon.url : false;
    return (<View style={styles.categoryItem}>
              <Text style={styles.categoryItemTitle}>{item.attributes.name}</Text>
              <Button transparent style={styles.btncategoryItem} onPress={() => this.props.onPress(item)} >
                {this._renderIcon(url, selected)}
              </Button>
            </View>);
    }
}

export default CategoryItem;
