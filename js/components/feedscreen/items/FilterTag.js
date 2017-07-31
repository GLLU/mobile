// @flow

import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';

const removeIcon = require('../../../../images/icons/remove_filter_x.png');


const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 5,
    margin: 3,
    borderRadius: 3,
  },
  filterName: {
    fontSize: generateAdjustedSize(14),
    color: Colors.white,
    fontFamily: 'Montserrat-Regular',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});

type Props = {
  title: string,
  onRemove: (string) => void
};

class FilterTag extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {title, onRemove} = this.props;
    if (title.length > 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.filterName}>{title}</Text>
          <TouchableOpacity
            activeOpacity={0.5} style={{paddingHorizontal: 5, justifyContent: 'center'}}
            onPress={() => onRemove(this.props.title)}>
            <Image source={removeIcon} resizeMode={'contain'}
                   style={{
                     width: generateAdjustedSize(12),
                     height: generateAdjustedSize(12),
                   }}/>
          </TouchableOpacity>
        </View>
      );
    }
    return null

  }
}

export default FilterTag;

