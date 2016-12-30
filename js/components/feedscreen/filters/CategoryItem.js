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

  render() {
    const { item, selected, onPress } = this.props;
    return (<View style={styles.categoryItem}>
              <Text style={styles.categoryItemTitle}>{item.attributes.name}</Text>
              <Button transparent style={styles.btncategoryItem} onPress={() => this.props.onPress(item)} >
                { selected ?
                  <Image source={{uri: item.attributes.icon.url}} style={styles.categoryItemImage} />
                  :
                  <Image source={{uri: item.attributes.icon.url}} style={styles.categoryItemImage} />
                }
              </Button>
            </View>);
  }
}

export default CategoryItem;
