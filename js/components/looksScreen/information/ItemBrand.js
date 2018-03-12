// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ViewPropTypes } from 'react-native';
import * as _ from "lodash";
import withAnalytics from '../../common/analytics/WithAnalytics'
import Colors from "../../../styles/Colors.styles";

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row'
  },
  textStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
    borderColor: Colors.black,
    borderWidth: 2,
    backgroundColor: Colors.white
  }
});

type Props = {
  brand: object,
  onPress: void
}

class ItemBrand extends PureComponent {

  props: Props;

  static defaultProps = {
    onPress: _.noop
  };

  constructor(props: Props) {
    super(props);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    const {logEvent, brand} = this.props;
    logEvent('LookScreen', {name: 'Information Brand clicked!', brandName: brand.name});
  }

  render() {
    const {brand, style} = this.props;
    return (
      <TouchableOpacity style={[styles.container, style]} onPress={this._onPress}>
        <Text numberOfLines={1} style={styles.textStyle}>
          {brand.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withAnalytics(ItemBrand);

