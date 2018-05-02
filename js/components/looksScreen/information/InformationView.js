// @flow

import React, { Component } from 'react';
import i18n from 'react-native-i18n';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { chain, noop } from 'lodash';
import ItemBrandsView from './ItemBrandsView';
import HalfScreenModalHeader from '../../common/headers/HalfScreenModalHeader';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  description: {
    paddingHorizontal: 20,
    fontFamily: Fonts.contentFont,
    color: Colors.black,
    fontSize: 16,
  },
  separator: {
    backgroundColor: Colors.separatorGray,
    height: 1,
  },
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
    onRequestClose: noop,
  };

  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  getBrandsFromItems = (items: Array<object>) =>
    chain(items)
      .map(item => item.brand)
      .filter(brand => brand && brand.id)
      .uniqBy(brand => brand.id)
      .value();

  _onRequestClose() {
    this.setState({ isOpen: false });
    this.props.onRequestClose(false);
  }

  componentWillReceiveProps(props) {
    this.setState({ isOpen: props.isOpen });
  }

  render() {
    const { items, description } = this.props;
    const { isOpen } = this.state;
    const brands = this.getBrandsFromItems(items);
    return (
      <Modal transparent visible={isOpen}>
        <TouchableOpacity style={{ flex: 1 }} onPress={this._onRequestClose}>
          <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: Colors.white }}>
            <HalfScreenModalHeader title={i18n.t('INFORMATION')} onCancelPress={this._onRequestClose} iconType={'info'} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {description}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <ItemBrandsView brands={brands} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    );
  }
}

export default InformationView;
