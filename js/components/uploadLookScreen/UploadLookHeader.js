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
const trash = require('../../../images/icons/trash.png')
const styles = StyleSheet.create({
  nextBtnContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: 'white',
    opacity: 0.7,
    height: 45,
    alignItems: 'center'
  },
  nextBtnText: {
    color: Colors.secondaryColor,
    fontSize: generateAdjustedSize(16),
  },
  addItemContainer: {
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 15
  },
  addItemText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontSize: 16
  },
  removeBtnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1
  },
  removeBtnImage: {
    width: 22, height: 22, alignSelf: 'center'
  },
  backBtnContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    flex: 1
  },
  addAnotherContainer: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 3
  },
  videoItemsBtnContainer: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 3,
    marginRight: 3
  },
  videoItemRedCircle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 3,
    right: 3
  },
  vidItemCategory: {
    flex: 1,
    width: 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleAndAddContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'black',
    opacity: 0.7,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


class UploadLookHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      brandName: props.brand ? props.brand.name : null,
    }
  }

  allowPublishBtn() {
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
    if (currItem.category && currItem.category !== -1) {
      title = 'Select Item Brand';
    }
    if (currItem.brand) {
      title = 'Select Colors';
    }
    if (currItem.occasions && currItem.occasions.length > 0) {
      title = 'Add a Link';
    }
    return title;
  }

  renderNextorPublish() {
    return (
      <TouchableOpacity style={styles.nextBtnContainer} onPress={() => this.props.publishItem()}>
        <Text style={styles.nextBtnText}>Publish</Text>
      </TouchableOpacity>
    )
  }

  _renderAddItemBtn() {
    return (
      <TouchableOpacity onPress={() => this.props.handleNewItem()} style={styles.addItemContainer}>
        <Text style={styles.addItemText}>+</Text>
      </TouchableOpacity>
    )
  }

  _renderRemoveItemBtn() {
    return (
      <TouchableOpacity onPress={() => this.props.handleRemoveItem()} style={styles.removeBtnContainer}>
        <Image source={trash} resizeMode={'contain'} style={styles.removeBtnImage}/>
      </TouchableOpacity>
    )
  }

  _renderBackButton() {
    return (
      <TouchableOpacity transparent onPress={() => this.props.handleBackButton()}
                        style={styles.backBtnContainer}>
        <Icon style={{color: this.props.currentStep !== 1 ? 'black' : '#000'}} name="ios-arrow-back"/>
      </TouchableOpacity>
    )
  }

  renderAddAnotherItemBtn() {
    return (
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TouchableOpacity onPress={this.props.handleNewItem} style={styles.addAnotherContainer}>
          <Icon style={{color: Colors.white}} name="ios-add"/>
        </TouchableOpacity>
        {this.renderVideoItemsBtns()}
      </View>
    )
  }

  renderVideoItemsBtns() {
    const {items, currItem, setCurrentItem} = this.props
    return items.map((item, index) => {
      const isSelected = currItem.id === item.id;
      const isDone = item.brand && item.category !== null
      return (
        <TouchableOpacity key={index} onPress={() => setCurrentItem(item)} style={styles.videoItemsBtnContainer}>
          {isDone ? null : <View style={styles.videoItemRedCircle}/>}
          {item.category !== -1 ? this.renderItemCategorySmallIcon(item, isSelected) : <Text
            style={{color: isSelected ? '#009688' : 'white', textAlign: 'center', fontSize: 13}}>{`${index}`}</Text>}
        </TouchableOpacity>
      );
    });
  }

  renderItemCategorySmallIcon(item, isSelected) {
    let categoryIcon = this.getItemIconUrl(item)
    if (item) {
      categoryIcon = isSelected ? categoryIcon.icon.url_hover : categoryIcon.icon.url;
      return (
        <View style={{flex: 1, padding: 2}}>
          <Image source={{uri: categoryIcon}} style={styles.vidItemCategory}/>
        </View>
      )
    }
  }


  getItemIconUrl(item) { //Temp function until we will receive it from the server
    return _.find(this.props.categories, category => category.id === item.category);
  }

  render() {
    const {isVideo} = this.props
    const allowContinue = this.allowPublishBtn();
    return (
      <View>
        <View style={styles.headerContainer}>
          {this._renderBackButton()}
          {this.props.items.length > 1 ? this._renderRemoveItemBtn() : null}
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            {this._renderAddItemBtn()}
            {allowContinue ? this.renderNextorPublish() : null}
          </View>
        </View>
        <View style={styles.titleAndAddContainer}>
          <Text
            style={{fontWeight: '400', color: 'white'}}>{this.getHeadingTitle()}</Text>
        </View>
        { isVideo ? this.renderAddAnotherItemBtn() : null}
      </View>
    )
  }
}

export default UploadLookHeader;