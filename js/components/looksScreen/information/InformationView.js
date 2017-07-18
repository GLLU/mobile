// @flow

import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { chain, noop } from 'lodash'
import BottomHalfScreenModal from "../common/BottomHalfScreenModal";
import ItemBrandsView from "./ItemBrandsView";
import HalfScreenModalHeader from "../../common/headers/HalfScreenModalHeader";
import Separator from "../../common/lists/Separator";

import Colors from '../../../styles/Colors.styles'
import InformationViewFooter from "./InformationViewFooter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingVertical: 20
  },
  description: {
    paddingHorizontal: 20,
    color: Colors.black,
    fontSize: 16
  },
  separatorContainer: {
    paddingVertical: 10,
    paddingHorizontal: 50
  },
  separator: {
    backgroundColor: Colors.separatorGray,
    height: 1
  }

});

type Props = {
  description: string,
  items: Array<object>,
  style: any,
  isOpen: boolean,
  onRequestClose: void,
  onCommentsPress: void,
  onLikesPress: void
};

class InformationView extends Component {

  props: Props;

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop
  };

  constructor(props: Props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  getBrandsFromItems = (items: Array<object>) =>
    chain(items)
      .map(item => item.brand)
      .filter(brand => brand && brand.id)
      .uniqBy(brand => brand.id)
      .value();

  _onRequestClose() {
    this.props.onRequestClose(false)
  }

  render() {
    const {likes, comments, items, onCommentsPress, onLikesPress} = this.props;
    const brands = this.getBrandsFromItems(items);
    return (
      <BottomHalfScreenModal {...this.props}>
        <View style={styles.container}>
          <HalfScreenModalHeader title={i18n.t('INFORMATION')} onCancelPress={this._onRequestClose}/>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {this.props.description}
            </Text>
          </View>
          <View style={styles.separatorContainer}>
            <Separator style={styles.separator}/>
          </View>
          <ItemBrandsView style={{paddingVertical: 10}} brands={brands}/>
          <InformationViewFooter
            onCommentsPress={onCommentsPress}
            onLikesPress={onLikesPress}
            likes={likes}
            comments={comments}/>
        </View>
      </BottomHalfScreenModal>
    );
  }
}

export default InformationView
