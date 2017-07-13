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
  descriptionStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    color: "black",
    fontSize: 16,
  }

});

export default class InformationView extends Component {

  constructor(props) {
    super(props);
  }

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

  getBrandsFromItems = (items) => _.chain(items).map(item => item.brand).uniqBy(brand => brand.id).value();

  render() {
    const {likes,comments,items} = this.props;
    const brands = this.getBrandsFromItems(items);
    return (
      <BottomHalfScreenModal {...this.props}>
        <HalfScreenModalHeader title="Infromation" onPress={this.props.onRequestClose}/>
        <View style={{flex:1}}>
          <Text style={styles.descriptionStyle}>
            {this.props.description}
          </Text>
          <View style={{paddingVertical:20,paddingHorizontal:50}}>
          <Separator style={{backgroundColor:Colors.seperatorGray, height:1}}/>
          </View>
          <ItemBrandsView brands={brands}/>
          <InformationViewFooter likes={likes} comments={comments} />

        </View>
      </BottomHalfScreenModal>
    );
  }
}
