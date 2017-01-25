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

  _renderIcon(icon, selected) {
    const uri = selected ? icon['url-hover'] : icon['url'];
    return <Image source={{uri: uri}} style={styles.categoryItemImage} resizeMode={'contain'}/>;
  }

  render() {
    const { item, selected, onPress } = this.props;
    return (<View style={styles.categoryItem}>
              <Text style={styles.categoryItemTitle}>{item.attributes.name}</Text>
              <Button transparent style={styles.btncategoryItem} onPress={() => this.props.onPress(item)} >
                {this._renderIcon(item.attributes.icon, selected)}
              </Button>
            </View>);
    }
}

export default CategoryItem;
