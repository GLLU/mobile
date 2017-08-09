import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import i18n from 'react-native-i18n';
const trash = require('../../../images/icons/trash.png');
const leftLongArrow = require('../../../images/icons/left-long-arrow.png');
import { CATEGORY, BRAND, COLOR, MOOD, LINK } from './UploadLookScreen';
const styles = StyleSheet.create({
  nextBtnContainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: 'white',
    opacity: 0.7,
    height: 45,
    alignItems: 'center',
  },
  nextBtnText: {
    color: Colors.secondaryColor,
    fontSize: generateAdjustedSize(16),
  },
  addItemContainer: {
    marginRight: 15,
  },
  addItemText: {
    color: Colors.secondaryColor,
    textAlign: 'center',
    fontSize: 20,
  },
  removeBtnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  removeBtnImage: {
    width: 22, height: 22, alignSelf: 'center',
  },
  backBtnContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  addAnotherContainer: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    marginRight: 3,

  },
  videoItemsBtnContainer: {
    height: 35,
    width: 35,
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 3,
    marginRight: 3,
  },
  videoItemRedCircle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 3,
    right: 3,
  },
  vidItemCategory: {
    flex: 1,
    width: 25,
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
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  videoItemNumber: {
    textAlign: 'center',
    fontSize: 13,
  },
  itemCategoryIconContainer: {
    flex: 1,
    padding: 2,
  },
  headerTitle: {
    fontWeight: '400',
    color: Colors.white,
  },
});


class UploadLookHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      brandName: props.brand ? props.brand.name : null,
    };
  }

  allowPublishBtn() {
    const { items, currItem } = this.props;
    if (currItem && this.checkRequiredItemFields(currItem)) {
      const verifiedItems = _.filter(items, item => this.checkRequiredItemFields(item));
      return verifiedItems.length === items.length;
    }
    return false;
  }

  getHeadingTitle() {
    let title = '';
    switch (this.props.currentStep) {
      case CATEGORY:
        title = 'Select Item Category'
        break;
      case BRAND:
        title = 'Select Item Brand';
        break;
      case COLOR:
        title = 'Select Item Colors';
        break;
      case MOOD:
        title = 'Select Item Moods';
        break;
      case LINK:
        title = 'Add Item Link';
        break;
      default:
        title = 'Drag & Place Marker to tag an item';
    }
    return title;
  }

  checkRequiredItemFields(item) {
    return item.brand && item.category !== 0;
  }

  renderPublishBtn() {
    const allowContinue = this.allowPublishBtn();
    return (
      <TouchableOpacity style={styles.nextBtnContainer} disabled={!allowContinue} onPress={() => this.props.publishItem()}>
        <Text style={[styles.nextBtnText, !allowContinue ? {color: Colors.gray} : null ]}>PUBLISH</Text>
      </TouchableOpacity>
    );
  }

  _renderAddItemBtn() {
    const allowContinue = this.allowPublishBtn();
    return (
      <TouchableOpacity onPress={() => this.props.handleNewItem()} disabled={!allowContinue} style={styles.addItemContainer}>
        <Text style={[styles.addItemText, !allowContinue ? {color: Colors.gray} : null]}>+</Text>
      </TouchableOpacity>
    );
  }

  _renderRemoveItemBtn() {
    return (
      <TouchableOpacity onPress={() => this.props.handleRemoveItem()} style={styles.removeBtnContainer}>
        <Image source={trash} resizeMode={'contain'} style={styles.removeBtnImage} />
      </TouchableOpacity>
    );
  }

  _renderBackButton() {
    const { handleBackButton } = this.props;
    return (
      <TouchableOpacity
        transparent onPress={() => handleBackButton()}
        style={styles.backBtnContainer}>
        <Image style={styles.backIcon} source={leftLongArrow} />
      </TouchableOpacity>
    );
  }

  renderAddAnotherItemBtn() {
    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {this.renderVideoItemsBtns()}
      </View>
    );
  }

  renderVideoItemsBtns() {
    const { items, currItem, setCurrentItem } = this.props;
    return items.map((item, index) => {
      const isSelected = currItem.id === item.id;
      const isDone = this.checkRequiredItemFields(item);
      return (
        <TouchableOpacity key={index} onPress={() => setCurrentItem(item.id)} style={styles.videoItemsBtnContainer}>
          {isDone ? null : <View style={styles.videoItemRedCircle} />}
          {item.category !== -1 ? this.renderItemCategorySmallIcon(item, isSelected) : <Text
            style={[{ color: isSelected ? Colors.secondaryColor : Colors.white }, styles.videoItemNumber]}>{`${index}`}</Text>}
        </TouchableOpacity>
      );
    });
  }

  renderItemCategorySmallIcon(item, isSelected) {
    let categoryIcon = this.getItemIconUrl(item);
    if (item) {
      categoryIcon = isSelected ? categoryIcon.icon.url_hover : categoryIcon.icon.url;
      return (
        <View style={styles.itemCategoryIconContainer}>
          <Image source={{ uri: categoryIcon }} style={styles.vidItemCategory} />
        </View>
      );
    }
  }


  getItemIconUrl(item) {
    return _.find(this.props.categories, category => category.id === item.category);
  }

  render() {
    const { isVideo } = this.props;
    return (
      <View>
        <View style={styles.headerContainer}>
          {this._renderBackButton()}
          {this.props.items.length > 1 ? this._renderRemoveItemBtn() : null}
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
            {this._renderAddItemBtn()}
            {this.renderPublishBtn()}
          </View>
        </View>
        <View style={styles.titleAndAddContainer}>
          <Text
            style={styles.headerTitle}>{this.getHeadingTitle()}</Text>
        </View>
        { isVideo ? this.renderAddAnotherItemBtn() : null}
      </View>
    );
  }
}

export default UploadLookHeader;
