// @flow

import React, {Component} from 'react';
import i18n from 'react-native-i18n';
import {Animated, View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {chain, noop} from 'lodash'
import ItemBrandsView from "./ItemBrandsView";
import Separator from "../../common/lists/Separator";
import HalfScreenModalHeader from '../../common/headers/HalfScreenModalHeader';

import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
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
    fontFamily: Fonts.contentFont,
    color: Colors.black,
    textAlign: 'center',
    fontSize: 16,
  },
  separatorContainer: {
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
    this.state = {isOpen: false};
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
    const { likes, comments, items, onCommentsPress, onLikesPress } = this.props;
    const brands = this.getBrandsFromItems(items);
    return (
      <Modal transparent={true} visible={this.state.isOpen}>
        <TouchableOpacity style={{flex: 1}} onPress={this._onRequestClose}>
          <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'white' }}>
            <HalfScreenModalHeader title={i18n.t('INFORMATION')} onCancelPress={this._onRequestClose} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {this.props.description}
              </Text>
            </View>
            <View style={styles.separatorContainer}>
              <Separator style={styles.separator}/>
            </View>
            <View style={{alignItems: 'center'}}>
            <ItemBrandsView style={{ paddingVertical: 10}} brands={brands}/>
            </View>
            <InformationViewFooter
              onCommentsPress={onCommentsPress}
              onLikesPress={onLikesPress}
              likes={likes}
              comments={comments}/>
          </View>
        </TouchableOpacity>
      </Modal>

    );
  }
}

export default InformationView
