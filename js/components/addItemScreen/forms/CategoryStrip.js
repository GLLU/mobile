import React, { Component } from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import Triangle from 'react-native-triangle';
import CategoryItem from './CategoryItem';
import _ from 'lodash';

import ItemTypeCalculator from './../../../calculators/ItemType';
import FontSizeCalculator from './../../../calculators/FontSize';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10
  },
  categoriesContainer: {
    height: 200,
    padding: 10
  },
  descContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 50,
    width: w - 40,
    backgroundColor: 'black'
  },
  textDesc: {
    color: '#BDBDBD',
    textAlign: 'left',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    padding: 15
  },
  triangleContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    height: 15,
    width: w - 40,
    backgroundColor: 'transparent'
  },
  blankItem: {
    width: ((w - 40) / 5) * 2 + 20
  }
});

class CategoryStrip extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategoryId: React.PropTypes.number,
    onCategorySelected: React.PropTypes.func,
    posInCategories: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      positionX: this.getPositionX()
    }
  }

  componentWillReceiveProps() {
  }

  getPositionX() {
    let itemTypeCalculator = new ItemTypeCalculator(this.props.posInCategories - 1);
    let x = itemTypeCalculator.findCurrentPosition();
    return x;
  }

  handleScroll(event) {
    let currentScrollX = event.nativeEvent.contentOffset.x + (w - 40) / 2;
    this.props.categories.map((cate, index) => {
      let itemTypeCalculator = new ItemTypeCalculator(index);
      let prev = itemTypeCalculator.findPrevPosition();
      let next = itemTypeCalculator.findNextPosition();
      if ( prev <= currentScrollX && currentScrollX <= next ) {
        console.log(`Select ${cate.name}`);
        this.props.onCategorySelected(cate);
      }
    });
  }

  _handleSelectCategory(item) {
    console.log('_handleSelectCategory', item);
    this.props.onCategorySelected(item);
  }

  _drawCategoryItems() {
    const selectedCategoryId = this.props.selectedCategoryId;
    const categories = this.props.categories;
    return categories.map((item, index) => {
      const selected = selectedCategoryId && selectedCategoryId == item.id;
      return (<CategoryItem key={index} item={item} selected={selected} onPress={this._handleSelectCategory.bind(this)}/>);
    });
  }

  _renderSelection() {
    const { selectedCategoryId, categories } = this.props;
    if (selectedCategoryId) {
      const category = _.find(categories, item => item.id == selectedCategoryId);
      console.log('_renderSelection', selectedCategoryId, category)
      return (<View style={{}}>
          <View style={[styles.triangleContainer, {bottom: 50}]}>
            <Triangle
              width={30}
              height={15}
              color={'black'}
              direction={'up'}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={[styles.descContainer, {bottom: 0}]}>
            <Text style={[styles.textDesc]}>{category.name}</Text>
          </View>
        </View>);
    }

    return null;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.categoriesContainer]}>
          <ScrollView
              onScroll={this.handleScroll.bind(this)}
              ref="categories"
              keyboardShouldPersistTap={true}
              pagingEnabled={false}
              horizontal={true}
              decelerationRate={'fast'}
              scrollEventThrottle={32}
              directionalLockEnabled={true}
              contentInset={{top: 0, left: -20, bottom: 0, right: -20}}
              contentOffset={{x: this.state.positionX, y:0}}
              showsHorizontalScrollIndicator={false}>
            <View style={styles.blankItem} />
            {this._drawCategoryItems()}
            <View style={styles.blankItem} />
          </ScrollView>
        </View>
        {this._renderSelection()}
      </View>)
  }
}

export default CategoryStrip;
