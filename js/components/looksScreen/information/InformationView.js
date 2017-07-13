import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { noop } from 'lodash'
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
  descriptionStyle: {
    paddingHorizontal: 20,
    color: "black",
    fontSize: 16
  }

});

export default class InformationView extends Component {

  static propTypes = {
    description: React.PropTypes.string,
    items: React.PropTypes.array,
    style: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
  };

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop
  };

  constructor(props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  getBrandsFromItems = (items) => _.chain(items).map(item => item.brand).uniqBy(brand => brand.id).value();

  _onRequestClose() {
    this.props.onRequestClose(false)
  }

  render() {
    const {likes, comments, items} = this.props;
    const brands = this.getBrandsFromItems(items);
    return (
      <BottomHalfScreenModal {...this.props}>
        <View style={styles.container}>
          <HalfScreenModalHeader title="Infromation" onPress={this._onRequestClose}/>
          <View>
            <View style={{flexDirection: 'column', justifyContent: 'flex-end', paddingVertical: 20}}>
              <Text style={styles.descriptionStyle}>
                {this.props.description}
              </Text>
            </View>
            <View style={{paddingVertical: 10, paddingHorizontal: 50}}>
              <Separator style={{backgroundColor: Colors.separatorGray, height: 1}}/>
            </View>
            <ItemBrandsView style={{paddingVertical: 10}} brands={brands}/>
            <InformationViewFooter likes={likes} comments={comments}/>
          </View>
        </View>
      </BottomHalfScreenModal>
    );
  }
}
