// @flow

import React, { Component } from 'react';
import { View, ScrollView, Platform, StyleSheet, Dimensions, BackAndroid } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import ProductItem from './ProductItem';
import ListViewHeader from '../../common/headers/ListViewHeader';

const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const HEADER_HEIGHT = 60;

class ProductItemsList extends Component {

  constructor(props) {
    super(props);
    this._handleExit = this._handleExit.bind(this);
  }

  _handleExit() {
    const { onCloseSuggestionList } = this.props;
    onCloseSuggestionList();
  }

  renderGridItem(item) {
    return (
      <ProductItem imageUrl={item.imageUrl} brand={item.brand} />
    );
  }

  componentWillMount() {
    BackAndroid.addEventListener('productListBackPress', () => {
      this._handleExit();
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('productListBackPress');
  }

  render() {
    const { offers, onSelectProductItem } = this.props;
    return (
      <View style={styles.container}>
        <ListViewHeader goBack={this._handleExit} title={i18n.t('SELECT_SIMILAR_ITEMS')} />
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContainerItem}>
          <View style={styles.imageGridContainer}>
            {
              offers.map((item, i) => <ProductItem key={i} offer={item} onSelectProductItem={() => onSelectProductItem(i)} />)
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height,
  },
  listContainer: {
    backgroundColor: '#1A1A1A',
    flexWrap: 'wrap',
    position: 'absolute',
    overflow: 'scroll',
    bottom: 0,
    height: Platform.OS === 'ios' ? height - HEADER_HEIGHT - 15 : height - HEADER_HEIGHT,
  },
  imageGridContainer: {
    marginLeft: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listContainerItem: {
    justifyContent: 'space-between',
  },
});

export default ProductItemsList;
