'use strict';

import React, { PureComponent } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text, View, FlatList, ViewPropTypes } from 'react-native';
import * as _ from "lodash";
import withAnalytics from '../../common/analytics/WithAnalytics'

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row'
  },
  textStyle: {
    flex: -1,
    flexDirection: 'row',
    padding: 10 ,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white'
  }
});

class ItemBrand extends PureComponent {

  static propTypes = {
    brand: React.PropTypes.object.isRequired,
    onPress: React.PropTypes.func
  };

  static defaultProps = {
    onPress: _.noop
  };

  constructor(props) {
    super(props);
    this.onPress=this.onPress.bind(this);
  }

  onPress(){
    const {logEvent,brand} = this.props;
    logEvent('LookScreen', {name: 'Information Brand clicked!',brandName:brand.name});
  }

  render() {
    const {brand,style} = this.props;
    return (
      <TouchableOpacity style={[styles.container,style]} onPress={this.onPress}>
        <Text numberOfLines={1} style={styles.textStyle}>
          {brand.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withAnalytics(ItemBrand);

