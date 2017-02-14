import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View} from 'native-base';
import CategoryItem from './CategoryItem';
import _ from 'lodash';

import {
  loadCategories,
} from '../../../actions';

import { ITEM_WIDTH } from './styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    height: 120,
  },
  categoriesContainer: {
    flex: 1,
    padding: 10
  },
});

class CategoryStrip extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategoryId: React.PropTypes.number,
    onCategorySelected: React.PropTypes.func,
    loadCategories: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      positionX: this.getPositionX(props.categories, props.selectedCategoryId)
    }
    this.scrollViewWidth = 315;
  }

  componentWillReceiveProps(nextProps) {
    const positionX = this.getPositionX(nextProps.categories, nextProps.selectedCategoryId);
    // this._categoryScrollView.scrollTo({x: positionX, y: 0});
    this.setState({positionX});
  }

  componentDidUpdate(prevProps, prevState) {
    this.normalizeContentOffsetX();
  }

  componentDidMount() {
    this.normalizeContentOffsetX();
    this.props.loadCategories();
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

  getPositionX(categories, selectedCategoryId) {
    let posInCategories = 0;
    if (selectedCategoryId) {
      posInCategories = _.findIndex(categories, { 'id': selectedCategoryId });
    }
    return posInCategories * ITEM_WIDTH;
  }

  _handleCategoryScrollViewLayout(contentWidth, contentHeight) {
    console.log('contentWidth contentHeight', contentWidth, contentHeight);
  }

  _handleSelectCategory(item) {
    this.props.onCategorySelected(item);
  }

  _drawCategoryItems() {
    const { selectedCategoryId, categories } = this.props;
    return categories.map((item, index) => {
      const selected = selectedCategoryId && selectedCategoryId == item.id;
      return (<CategoryItem key={index} item={item} itemWidth={ITEM_WIDTH} selected={selected} onPress={this._handleSelectCategory.bind(this)}/>);
    });
  }

  render() {

    // const contentOffsetX = this.normalizeContentOffsetX(this.state.positionX);

    return (
      <View style={[styles.container]}>
        <View style={[styles.categoriesContainer]}>
          <ScrollView
              onLayout={(e) => this.scrollViewWidth = e.nativeEvent.layout.width}
              ref={(ref) => this._categoryScrollView = ref}
              keyboardShouldPersistTap={true}
              pagingEnabled={false}
              horizontal={true}
              decelerationRate={'fast'}
              scrollEventThrottle={0}
              directionalLockEnabled={true}
              alwaysBounceHorizontal={true}
              contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
              showsHorizontalScrollIndicator={false}>
            {this._drawCategoryItems()}
          </ScrollView>
        </View>
      </View>)
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
    categories: state.filters.categories,
  };
};

export default connect(mapStateToProps, bindActions)(CategoryStrip);