import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, Animated, InteractionManager } from 'react-native';
import { View, Text } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  addItemType,
  loadCategories,
} from '../../actions';
import CategoryStrip from '../common/CategoryStrip';
import FontSizeCalculator from './../../calculators/FontSize';
import _ from 'lodash';
import Gllu from '../common';
import BaseComponent from '../common/BaseComponent';
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
    flexWrap: 'nowrap',
    color: 'white',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(14).getSize(),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingTop: 5,
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


class StepOneCategory extends BaseComponent {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    addItemType: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimContentOnPress: Platform.OS ==='ios' ? new Animated.Value(0) : new Animated.Value(90)
    }
  }

  componentDidMount() {
    if(!this.props.selectedCategory && Platform.OS === 'ios') {
      let that = this
      setTimeout(function(){ that.toggleBottomContainer(); }, 500);
    }
  }

  componentWillMount() {
    this.props.loadCategories().catch(err => {
      console.log('unable to load categories');
    });
  }

  selectCategory(item) {
    if (item.id !== this.props.selectedCategory) {
      this.logEvent('UploadLookScreen', { name: 'Category select', category: item.name });
      this.props.addItemType(item);
      if(Platform.OS === 'ios') {
        let that = this
        setTimeout(function(){ that.toggleBottomContainer(); }, 1500);
      }

    }
  }

  toggleBottomContainer() {

      if (this.state.fadeAnimContentOnPress._value === 90) {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimContentOnPress,    // The value to drive
          {
            toValue: 0,
            delay: 250
          }            // Configuration
        ).start();
      } else {
        Animated.timing(          // Uses easing functions
          this.state.fadeAnimContentOnPress,    // The value to drive
          {
            toValue: 90,
            delay: 250
          }            // Configuration
        ).start();
      }

  }

  renderOpenButton() {
    const btnColor = !this.props.selectedCategory ? 'rgba(32, 32, 32, 0.4)' : 'rgba(0, 255, 128, 0.6)';
    return (
      <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
        <View style={{width: 20, height: 50, backgroundColor: btnColor, alignSelf: 'center'}}>
          <FontAwesome style={{transform: [{ rotate: '90deg'}], fontSize: 16, marginTop: 20}} name="bars"/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() { //
    const { categories, selectedCategory } = this.props;
    return(
      <View style={{ flexDirection: 'row', height: h / 1.8,}}>
        {this.renderOpenButton()}
        <Animated.View style={{backgroundColor: 'rgba(32, 32, 32, 0.8)',  width: this.state.fadeAnimContentOnPress, borderRadius: 10}}>
          <Text numberOfLines={1} style={styles.titleLabelInfo}>Item Type</Text>
          <CategoryStrip
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelected={(cat) => this.selectCategory(cat)}/>
        </Animated.View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    addItemType: (type) => dispatch(addItemType(type)),
    loadCategories: () => dispatch(loadCategories()),
  };
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id === itemId);
  return {
    categories: state.filters.categories,
    selectedCategory: item.category ? item.category : false,
  };
};

export default connect(mapStateToProps, bindActions)(StepOneCategory);