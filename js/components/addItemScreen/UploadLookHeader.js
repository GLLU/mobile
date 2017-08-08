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


class UploadLookHeader extends Component {

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
        return this.allowPublishBtn();
      default:
        return true;
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
    const {currentStep} = this.props
    if (currentStep === -1) {
      return (
        <TouchableOpacity style={styles.nextBtnContainer} onPress={() => this.props.handleContinue()}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.nextBtnContainer} onPress={() => this.props.publishItem()}>
          <Text style={styles.nextBtnText}>Publish</Text>
        </TouchableOpacity>
      )
    }
  }

  _renderAddItemBtn() {
    return (
      <TouchableOpacity onPress={() => this.props.handleNewItem()} style={{
        height: 15,
        width: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: 15
      }}>
        <Text style={{color: Colors.secondaryColor, textAlign: 'center', fontSize: 16}}>+</Text>
      </TouchableOpacity>
    )
  }

  _renderRemoveItemBtn() {
    return (
      <TouchableOpacity onPress={() => this.props.handleRemoveItem()} style={{

        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1
      }}>
        <Image source={trash} resizeMode={'contain'} style={{width: 22, height: 22, alignSelf: 'center'}}/>
      </TouchableOpacity>
    )
  }

  _renderBackButton() {
    return (
      <TouchableOpacity transparent onPress={() => this.props.handleBackButton()}
                        style={{width: 30, height: 30, backgroundColor: 'transparent', flex: 1}}>
        <Icon style={{color: this.props.currentStep !== 1 ? 'black' : '#000'}} name="ios-arrow-back"/>
      </TouchableOpacity>
    )
  }

  render() {
    const allowContinue = this.getAllowContinue();
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
          {this._renderBackButton()}
          {this.props.items.length > 1 ? this._renderRemoveItemBtn() : null}
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
            {this._renderAddItemBtn()}
            {allowContinue ? this.renderNextorPublish() : null}
          </View>
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