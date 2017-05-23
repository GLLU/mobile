import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions, LayoutAnimation,View } from 'react-native';
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
      selected: this.props.selectedCategory ? this.props.selectedCategory : null,
      currItemId: this.props.currItemId
    }
  }

  _handleSelectCategory(item) {
    this.props.onCategorySelected(item);

  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _handleCategorySelected(item) {
    this.setState({selected: item}, () => {
      this._handleSelectCategory(item)
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currItemId !== this.state.currItemId) {
      this.setState({currItemId: nextProps.currItemId, selected: nextProps.selectedCategory})
    }
  }

  _drawCategoryItems() {
    const { categories } = this.props;
    let selected;
    return categories.map((category, index) => {

       selected = this.state.selected && this.state.selected.id === category.id ? true : false;
      return (
        <CategoryItem
                key={index}
                item={category}
                itemWidth={ITEM_WIDTH}
                selected={selected}
                onPress={this._handleSelectCategory.bind(this)}
                handleCategorySelected={(category) => this._handleCategorySelected(category)}
        />
      );
    });
  }

  render() {

    return (
      <View style={[styles.categoriesContainer]}>
        <ScrollView
            keyboardShouldPersistTaps='always'
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