import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import {
  addItemType,
} from '../../actions';
import Category from '../common/CategoryStrip';
import FontSizeCalculator from './../../calculators/FontSize';
import _ from 'lodash';
import Gllu from '../common';

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
    marginBottom: 8
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


class StepOne extends Component {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.object,
    addItemType: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  selectCategory(item) {
    if (item.id != this.props.selectedCategory) {
      this.props.addItemType(item);
    }
  }

  render() {
    const { categories, selectedCategory } = this.props;
    return(
      <View style={{flex: 1, justifyContent: 'center', paddingVertical: 5, paddingHorizontal: 25}}>
        <Text style={styles.titleLabelInfo}>Item Type</Text>
        <View style={{flex: 1, backgroundColor: '#FFFFFF', height: 100}}>
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
    selectedCategory: item ? item.selectedCategory : null,
  };
};

export default connect(mapStateToProps, bindActions)(StepOne);