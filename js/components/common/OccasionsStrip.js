import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { View, Text } from 'native-base';
import {
  addItemType,
} from '../../actions';
import Category from './CategoryStrip';
import FontSizeCalculator from '../../calculators/FontSize';
import _ from 'lodash';
import Gllu from '../common';
import BaseComponent from './BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;


const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    color: '#7f7f7f',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(15).getSize(),
    textAlign: 'center',
    backgroundColor: 'lightblue'
  },
  textBtn: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  headinSharing: {
    fontFamily: 'Montserrat',
    color: '#000000',
    fontSize: new FontSizeCalculator(20).getSize(),
    fontWeight: '300',
    marginTop: 15,
    paddingTop: 20
  },
  legendLabel: {
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    paddingTop: 8
  },
  containerStyle: {
  },
  labelStyle: {
    flex: 1
  },
  checkboxStyle: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 13,
  },
  checkboxLabelStyle: {
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '300',
    paddingTop: 15
  },
  textInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
  textInfo: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(12).getSize(),
    paddingTop: 5,
    paddingLeft: 10
  },
  iconInfo: {
    fontSize: new FontSizeCalculator(35).getSize()
  }
});


class OccasionsStrip extends BaseComponent {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.object,
    addItemType: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  selectCategory(item) {
    if (item.id !== this.props.selectedCategory) {
      this.logEvent('UploadLookScreen', { name: 'Category select', category: item.name });
      this.props.addItemType(item);
    }
  }

  render() {
    const { categories, selectedCategory } = this.props;
    return(
      <View style={{ width: 90, height: 100}}>
        <Text style={styles.titleLabelInfo}>occas Type</Text>
        <View style={{backgroundColor: '#FFFFFF', height: h / 2}}>
          <Category
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelected={(cat) => this.selectCategory(cat)}/>
        </View>
      </View>
    )
  }
}
import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    addItemType: (type) => dispatch(addItemType(type)),
  };
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id == itemId);
  return {
    categories: state.filters.categories,
    selectedCategory: item ? item.category : null,
  };
};

export default connect(mapStateToProps, bindActions)(OccasionsStrip);