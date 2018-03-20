// @flow

import React, { Component } from 'react';
import { View, ScrollView, Platform, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import i18n from 'react-native-i18n';
import ProductItem from './ProductItem';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';

const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const HEADER_HEIGHT = 45;
const cancelClear = require('../../../../images/icons/cancel-clear-x.png');
const leftLongArrow = require('../../../../images/icons/left-long-arrow.png');

class ProductItemsList extends Component {

  constructor(props) {
    super(props);
    this._handleExit = this._handleExit.bind(this);
  }

  _handleExit() {
    const { onCloseSuggestionList } = this.props;
    onCloseSuggestionList();
  }

  _handleDonePressed() {
  }

  renderBackButton() {
    
    return (
      <TouchableOpacity
        transparent onPress={this._handleExit}
        style={styles.backBtnContainer}>
        <Image style={styles.backIcon} source={leftLongArrow} />
      </TouchableOpacity>
    );
  }

  renderDoneBtn() {
    const isChosenItems = false; //TODO: handle item choice
    return (
      <TouchableOpacity style={styles.doneBtnContainer} onPress={() => this._handleDonePressed()}>
        <Text style={[styles.doneBtnText, !isChosenItems ? { color: Colors.gray } : null]}>{i18n.t('DONE')}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { offers } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {this.renderBackButton()}
          <Text style={styles.title}> {i18n.t('SELECT_SIMILAR_ITEMS')} </Text>
          {this.renderDoneBtn()}
        </View>
        <TouchableOpacity style={styles.exitButton} onPress={this._handleExit}>
          <Image style={{ height: 15, width: 15 }} source={cancelClear} />
        </TouchableOpacity>
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContainerItem}>
          {
            offers.map((item, i) => <ProductItem key={i} imageUrl={item.imageUrl} brand={item.brand} />)
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 22 : 0,
    backgroundColor: 'white',
    opacity: 0.7,
    height: HEADER_HEIGHT,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    justifyContent: 'center',
    alignSelf: 'center',
    lineHeight: HEADER_HEIGHT,
  },
  doneBtnContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  doneBtnText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontSize: generateAdjustedSize(20),
    fontFamily: Fonts.boldContentFont,
  },
  listContainer: {
    backgroundColor: '#1A1A1A',
    flexWrap: 'wrap',
    position: 'absolute',
    overflow: 'scroll',
    bottom: 0,
    height: Platform.OS === 'ios' ? height - HEADER_HEIGHT - 22 : height - HEADER_HEIGHT,
  },
  listContainerItem: {
    justifyContent: 'space-between',
  },
  backBtnContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});

export default ProductItemsList;
