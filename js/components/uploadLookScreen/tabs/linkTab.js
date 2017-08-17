// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import BrandUrlInput from '../forms/BrandUrlInput';


type Props = {
  updateCurrentFilter: void,
  filters: array,
  currentFilter: object,
};

class LinkTab extends Component {

  props: Props

  constructor(props) {
    super(props);
    this.renderBrandsUrl = this.renderBrandsUrl.bind(this);
  }

  renderBrandsUrl() {

    const {itemUrl} = this.props;
    let url = itemUrl ? itemUrl : '';

    return <BrandUrlInput itemUrl={url}
                          addUrl={this.props.addUrl}/>

  }

  render() {
    return (
      <View
        style={{flex: 1}}>
        {this.renderBrandsUrl()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowEdgeShadow: {
    position: 'absolute',
    width: 15,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },

});

export default LinkTab;
