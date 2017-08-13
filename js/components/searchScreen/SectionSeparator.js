// @flow
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import i18n from 'react-native-i18n';
const deviceWidth = Dimensions.get('window').width;
import Separator from '../common/lists/Separator';
import UserActionRow from '../common/lists/UserActionRow';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import EmptyStateScreen from '../common/EmptyStateScreen';
import Fonts from '../../styles/Fonts.styles';
const emptyUser = require('../../../images/emptyStates/user-woman.png');
const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.white,
    flex: 1
  },
  RowTitle: {
    color: Colors.gray,
    fontFamily: Fonts.regularFont,
    fontWeight: '300',
    fontSize: generateAdjustedSize(14),
  },
  historyRowContainer: {
    height: generateAdjustedSize(60),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderBottomWidth: generateAdjustedSize(1),
    borderBottomColor: Colors.separatorGray,
  },
  historyRowText: {
    fontWeight: '600',
    marginLeft: 15,
    fontSize: generateAdjustedSize(14),
  },
  historyListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    backgroundColor: Colors.backgroundGrey,
    padding: generateAdjustedSize(15),
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
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
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
