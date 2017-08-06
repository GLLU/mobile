import React, {Component} from 'react';
import {Modal, TextInput, StyleSheet, TouchableOpacity, View, Text, Image, Platform, Dimensions} from 'react-native';
import {Button, Icon} from 'native-base';
import {
  createBrandName,
} from '../../actions';
import IconPlus from 'react-native-vector-icons/EvilIcons';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;
import BaseComponent from '../common/base/BaseComponent';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import i18n from 'react-native-i18n';
import Fonts from '../../styles/Fonts.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  backIcon: {
    color: 'blue'
  },
  wrapper: {
    backgroundColor: 'red',
    width: w,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  headerContainer: {

    top: Platform.OS === 'ios' ? 20 : 10,
    height: 60,
    flexDirection: 'row',
    width: w,
    justifyContent: 'space-around'
  },
  headerTitle: {
    backgroundColor: 'transparent',
    fontWeight: '600',
    fontSize: 17,
    alignSelf: 'center'
  },
  nextBtn: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 22
  },
  nextBtnContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  plusIcon: {
    fontSize: 14,
    color: 'green'
  },
  nextBtnText: {
    color: Colors.secondaryColor,
    fontSize: generateAdjustedSize(16),
  },
});


class UploadLookHeader extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      brandName: props.brand ? props.brand.name : null,
    }
  }

  getAllowContinue() {
    const {currItem, currentStep} = this.props;
    switch (currentStep) {
      case -1:
        return currItem !== null;
      case 0:
        return this.getAllowAddAnotherItem();
      case 1:
        return false;
      default:
        return true;
    }
  }

  getAllowAddAnotherItem() {
    const {items, currItem} = this.props;
    let verifiedItems = '';
    if (currItem && currItem.brand && currItem.category !== null) {
      verifiedItems = _.filter(items, item => item.brand && item.category !== null);
      return verifiedItems.length === items.length
    }
    return false;
  }

  getHeadingTitle() {
    let title = '';
    switch (this.props.currentStep) {
      case 0:
        title = this.getStepsTitle();
        break;
      case 1:
        title = 'Additional Info';
        break;
      default:
        title = 'Drag & Place Marker to tag an item';
    }
    return title;
  }

  getStepsTitle() {
    const {currItem} = this.props;
    let title = 'Select Item Category'
    if (currItem.category !== null) {
      title = 'Select Item Brand';
    }
    if (currItem.brand) {
      title = 'For which Occasion?';
    }
    if (currItem.occasions && currItem.occasions.length > 0) {

      title = 'Edit or Continue';
    }
    return title;
  }

  renderNext() {
    return (
      <TouchableOpacity style={styles.nextBtnContainer} onPress={() => this.props.handleContinue()}>
        <Text style={styles.nextBtnText}>Next</Text>
      </TouchableOpacity>
    )
  }

  renderAddAnotherItemBtn() {
    if (this.props.isVideo) {
      return (
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity onPress={this.props.handleNewItem} style={{
            height: 30,
            width: 30,
            backgroundColor: 'rgba(32, 32, 32, 0.8)',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 3,
            marginRight: 3
          }}>
            <Icon style={{color: '#F2F2F2'}} name="ios-add"/>
          </TouchableOpacity>
          {this.renderVideoItemsBtns()}
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.handleNewItem()} style={{
          height: 20,
          width: 100,
          backgroundColor: 'rgba(32, 32, 32, 0.8)',
          justifyContent: 'center',
          alignSelf: 'center',
          borderBottomWidth: 2,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8
        }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>Tag another Item</Text>
        </TouchableOpacity>
      )
    }

  }

  getItemIconUrl(item) { //Temp function until we will receive it from the server
    return _.find(this.props.categories, category => category.name === item.name);
  }

  renderVideoItemsBtns() {
    const {items} = this.props

    return items.map((item, index) => {
      const isSelected = this.props.currItem.id === item.id;
      const isDone = item.brand && item.category !== null
      return (
        <TouchableOpacity key={index} onPress={() => this.props.setCurrentItem(item)} style={{
          height: 30,
          width: 30,
          backgroundColor: 'rgba(32, 32, 32, 0.8)',
          justifyContent: 'center',
          alignSelf: 'center',
          borderBottomWidth: 2,
          borderRadius: 3,
          marginLeft: 3,
          marginRight: 3
        }}>
          {isDone ? null : <View style={{
            width: 5,
            height: 5,
            borderRadius: 5,
            backgroundColor: 'red',
            position: 'absolute',
            top: 3,
            right: 3
          }}/>}
          {item.category ? this.renderItemCategorySmallIcon(item, isSelected) : <Text
            style={{color: isSelected ? '#009688' : 'white', textAlign: 'center', fontSize: 13}}>{`${index}`}</Text>}
        </TouchableOpacity>
      );
    });
  }

  renderItemCategorySmallIcon(item, isSelected) {
    let categoryIcon;
    if (item.category.icon) {
      categoryIcon = isSelected ? item.category.icon.url_hover : item.category.icon.url;
    } else {
      const iconUrl = this.getItemIconUrl(item.category);
      categoryIcon = isSelected ? iconUrl.icon.url_hover : iconUrl.icon.url;

    }

    return (
      <View style={{flex: 1, padding: 2}}>
        <Image source={{uri: categoryIcon}} style={[{
          flex: 1, width: 20, backgroundColor: 'transparent',
          resizeMode: 'contain',
          alignSelf: 'center',
        }]}/>
      </View>
    )
  }

  render() {
    const allowContinue = this.getAllowContinue();
    const fgColor = '#F2F2F2';
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 20,
          backgroundColor: 'white',
          opacity: 0.7,
          height: 45,
          alignItems: 'center'
        }}>
          <TouchableOpacity transparent onPress={() => this.props.handleBackButton()}
                            style={{width: 30, height: 30, backgroundColor: 'transparent'}}>
            <Icon style={{color: this.props.currentStep !== 1 ? 'black' : '#000'}} name="ios-arrow-back"/>
          </TouchableOpacity>
          {allowContinue ? this.renderNext(fgColor) : <View style={{width: 30, height: 30}}/>}
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          backgroundColor: 'black',
          opacity: 0.7,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text
            style={{fontWeight: '400', color: 'white'}}>{this.getHeadingTitle()}</Text>
        </View>
      </View>
    )
  }
}

export default UploadLookHeader;