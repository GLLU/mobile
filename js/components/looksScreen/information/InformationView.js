import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { noop } from 'lodash'
import BottomHalfScreenModal from "../common/BottomHalfScreenModal";
import ItemBrandView from "./ItemBrandView";

const styles = StyleSheet.create({
  descriptionStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    color: "black",
    fontSize: 16,
  }

});

export default class DescriptionView extends Component {

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

  getBrandsFromItems(items){
    const brands=_.chain(this.props.items).map(item=>item.brand).uniqBy(brand=>brand.id).value()
    return brands;
  }

  render() {
    const brands=this.getBrandsFromItems(this.props.items);
    return (
      <BottomHalfScreenModal {...this.props}>
        <View>
          {_.map(brands,brand=><ItemBrandView brand={brand}/>)}
          <ItemBrandsView items={this.props.items}/>
          <Text style={styles.descriptionStyle}>
            {this.props.description}
          </Text>
          <View style={{height:25}}/>

        </View>
      </BottomHalfScreenModal>
    );
  }
}
