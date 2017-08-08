// @flow

import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import FilterGroup from '../../feedscreen/filters/FilterGroup';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import I18n from 'react-native-i18n';
import BrandUrlInput from '../forms/BrandUrlInput';

const deviceWidth = Dimensions.get('window').width;

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
