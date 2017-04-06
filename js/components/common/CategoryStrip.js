import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { View} from 'native-base';
import CategoryItem from './StripItem';

const ITEM_WIDTH = 80;

const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
  },
});

class CategoryStrip extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    onCategorySelected: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedCategory ? this.props.selectedCategory : null
    }
  }

  _handleSelectCategory(item) {
    this.props.onCategorySelected(item);

  }
  _handleCategorySelected(item) {
    this.setState({selected: item}, () => {
      this._handleSelectCategory(item)
    });
  }

  _drawCategoryItems() {
    const { categories } = this.props;
    let selected;
    return categories.map((item, index) => {
       selected = this.state.selected && this.state.selected.id === item.id ? true : false;
      return (
        <CategoryItem
                key={index}
                item={item}
                itemWidth={ITEM_WIDTH}
                selected={selected}
                onPress={this._handleSelectCategory.bind(this)}
                handleCategorySelected={(item) => this._handleCategorySelected(item)}
        />
      );
    });
  }

  render() {

    return (
      <View style={[styles.categoriesContainer]}>
        <ScrollView
            keyboardShouldPersistTap={true}
            pagingEnabled={false}
            horizontal={false}
            decelerationRate={'fast'}
            scrollEventThrottle={0}
            directionalLockEnabled={false}
            alwaysBounceHorizontal={false}
            contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
            showsHorizontalScrollIndicator={false}>
          {this._drawCategoryItems()}
        </ScrollView>
      </View>
    )
  }
}

export default CategoryStrip