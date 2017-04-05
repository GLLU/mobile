import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { View} from 'native-base';
import CategoryItem from './StripItem';
import _ from 'lodash';

import {
  loadCategories,
} from '../../actions';

const screen = Dimensions.get('window');

const ITEM_WIDTH = 80;

const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
  },
});

class OccassionsStrip extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    onCategorySelected: React.PropTypes.func,
    loadCategories: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      positionX: this.getPositionX(props.categories, props.selectedCategory)
    }
    this.scrollViewWidth = screen.width;
  }

  componentWillReceiveProps(nextProps) {
    const positionX = this.getPositionX(nextProps.categories, nextProps.selectedCategory);
    // this._categoryScrollView.scrollTo({x: positionX, y: 0});
    this.setState({positionX});
  }

  componentDidUpdate(prevProps, prevState) {
    this.normalizeContentOffsetX();
  }

  normalizeContentOffsetX() {
    const positionX = this.state.positionX;
    const midPoint = this.scrollViewWidth / 2;
    const maxLeft = this.props.categories.length * ITEM_WIDTH - this.scrollViewWidth;
    let x = 0;
    if (positionX < midPoint) {
      x = 0;
    } else {
      x = positionX - midPoint + ITEM_WIDTH / 2;
      x = Math.min(x, maxLeft);
    }
    
    this._categoryScrollView.scrollTo({x: x, y: 0});
  }

  getPositionX(categories, selectedCategory) {
    let posInCategories = 0;
    if (selectedCategory) {
      posInCategories = _.findIndex(categories, { 'id': selectedCategory.id });
    }
    return posInCategories * ITEM_WIDTH;
  }

  _handleSelectCategory(item) {
    this.setState({selected: this.state.selected === item.id ? null : item.id})
    this.props.onCategorySelected(item);
  }

  _drawCategoryItems() {
    const { selectedCategory, categories } = this.props;
    return categories.map((item, index) => {
      let isSelected = _.find(selectedCategory, Occassion => Occassion.id === item.id)
      const selected = !!isSelected || this.state.selected === item.id;
      return (
        <CategoryItem
                key={index}
                item={item}
                itemWidth={ITEM_WIDTH}
                selected={selected}
                onPress={this._handleSelectCategory.bind(this)}/>
      );
    });
  }

  render() {

    // const contentOffsetX = this.normalizeContentOffsetX(this.state.positionX);

    return (
      <View style={[styles.categoriesContainer]}>
        <ScrollView
            onLayout={(e) => this.scrollViewWidth = e.nativeEvent.layout.width}
            ref={(ref) => this._categoryScrollView = ref}
            keyboardShouldPersistTap={true}
            pagingEnabled={false}
            horizontal={false}
            decelerationRate={'fast'}
            scrollEventThrottle={0}
            directionalLockEnabled={true}
            alwaysBounceHorizontal={true}
            contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
            showsHorizontalScrollIndicator={false}>
          {this._drawCategoryItems()}
        </ScrollView>
      </View>
    )
  }
}

import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
  };
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps, bindActions)(OccassionsStrip);