// @flow
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import i18n from 'react-native-i18n';
const deviceWidth = Dimensions.get('window').width;
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import Fonts from '../../styles/Fonts.styles';
const styles = StyleSheet.create({

  RowTitle: {
    color: Colors.gray,
    fontFamily: Fonts.regularFont,
    fontWeight: '300',
    fontSize: generateAdjustedSize(14),
  },
  clearText: {
    color: 'red',
    fontWeight: '300',
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(12),
  },
  rowTitleContainer: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    padding: generateAdjustedSize(15),
  },
});

type Props = {
  results: array,
  suggestions: array,
  searchHistory: array,
  canShowEmptyView: boolean,
  navigateTo: () => void,
  searchFromHistory: () => void,
  clearSearchHistory: () => void
};

class SectionSeperator extends Component {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    const {title, showClear, clearAction} = this.props
    return (
      <View style={styles.rowTitleContainer}>
        <Text style={styles.RowTitle}>{title}</Text>
        {showClear ? <TouchableOpacity>
          <Text
            style={styles.clearText}
            onPress={clearAction}>{i18n.t('CLEAR')}</Text>
        </TouchableOpacity> : null}
      </View>
    );
  }
}

export default SectionSeperator;
