import React, { Component } from 'react';
import { ScrollView } from 'react-native'
import { View } from 'native-base';
import CategoryItem from './CategoryItem';

import styles from '../styles';

class CategoryStrip extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    onCategorySelected: React.PropTypes.func,
  }

  _drawCategoryItems() {
    const selectedCategory = this.props.selectedCategory;
    return this.props.categories.map((item, index) => {
      const selected = selectedCategory && selectedCategory.id === item.id;
      return (<CategoryItem key={index} item={item} selected={selected} onPress={() => this.props.onCategorySelected(item)}/>);
    });
  }

  render() {
    return (
      <View style={styles.filterCategories}>
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          scrollEventThrottle={32}
          showsHorizontalScrollIndicator={false}>
          {this._drawCategoryItems()}
        </ScrollView>
      </View>)
  }
}

export default CategoryStrip;
