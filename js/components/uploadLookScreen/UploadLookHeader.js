import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import i18n from 'react-native-i18n';
import Colors from '../../styles/Colors.styles';
import styles from './styles';
import { BRAND, LINK } from './UploadLookScreen';
import DescriptionInput from './forms/DescriptionInput';

const trash = require('../../../images/icons/trash.png');
const leftLongArrow = require('../../../images/icons/left-long-arrow.png');

class UploadLookHeader extends Component {

  constructor(props) {
    super(props);
    this._handleNextPressed = this._handleNextPressed.bind(this);
    this.state = {
      isDescriptionShown: false,
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

  checkRequiredItemFields(item) {
    return !item.isCustom || (item.brand && item.category !== -1);
  }

  renderPublishBtn() {
    const allowPublish = this.allowPublishBtn();
    return (
      <TouchableOpacity style={styles.nextBtnContainer} onPress={() => this._handlePublishPressed(allowPublish)}>
        <Text style={[styles.publishBtnText, !allowPublish ? { color: Colors.gray } : null]}>{i18n.t('PUBLISH')}</Text>
      </TouchableOpacity>
    );
  }

  _handlePublishPressed = (allowPublish) => {
    const { showErrorMessage } = this.props;

    if (allowPublish) {
      this.setState({ isDescriptionShown: true });
    } else {
      showErrorMessage(i18n.t('REQUIRED_LOOK_FIELDS'));
    }
  }

  _handleNextPressed(description) {
    const { publishItem, addDescription } = this.props;
    addDescription(description);
    publishItem();
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
        {this.renderVideoItemsButtons()}
      </View>
    );
  }

  renderVideoItemsButtons() {
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
    const { isDescriptionShown } = this.state;
    return (
      <View>
        <View style={styles.headerContainer}>
          {this._renderBackButton()}
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            {this.renderPublishBtn()}
          </View>
        </View>
        
        { isDescriptionShown ? <DescriptionInput onClickNext={this._handleNextPressed} /> : null}
        { isVideo ? this.renderAddAnotherItemBtn() : null}
      </View>
    );
  }
}

export default UploadLookHeader;
