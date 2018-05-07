// @flow

import React, { Component } from 'react';
import { Dimensions, Platform, View, StyleSheet, BackAndroid, Image, Text, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Colors from '../../styles/Colors.styles';
import fonts from '../../styles/Fonts.styles';
import i18n from 'react-native-i18n';
import UploadLookHeader from './UploadLookHeader';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import VideoWithTags from '../common/VideoWithTags';
import EditItemTabs from './editItemTabsContainer';
import ModalQuestion from './forms/ModalQuestion';
import SpinnerSwitch from '../loaders/SpinnerSwitch';
import ProductItemsCarousel from './productItems/ProductItemsCarousel';
import ProductItemList from './productItems/ProductItemList';
import DescriptionInput from './forms/DescriptionInput';
import { getItems } from '../../actions/look';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;
import Tag from '../common/Tag';
import { isVideo } from '../../utils/MediaUtils';

export const CATEGORY = 'category';
export const BRAND = 'brand';
export const COLOR = 'color';
export const MOOD = 'mood';
export const DESCRIPTION = 'description';
export const LINK = 'link';

const EDIT_MODE = 'edit';
const MAX_ITEMS_PER_TAG = 10;

type Props = {
  publishLookItem: () => void,
  addDescription: () => void,
  createLookItem: () => void,
  removeLookItem: () => void,
  setTagPosition: () => void,
  showErrorMessage: (string) => void,
  clearUploadLook: () => void,
  getFeed: () => void,
  getUserLooks: () => void,
  toggleProductItemSelection: () => void,
  lookId: number,
  userId: number,
  lookDescription: string,
  mode: string,
  items: array,
  categories: array,
  image: string,
  filePath: string,
  state: string,
  currentFeedQuery: object,
  isVideo: boolean
};

const styles = StyleSheet.create({
  renderActionsContainer: {
    height: h,
    width: w,
    justifyContent: 'space-between',
  },
  bottomBarToggle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    opacity: 0.7,
    width: 40,
    height: 25,
  },
  carouselTitle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: Colors.white,
    lineHeight: 24,
    fontFamily: fonts.subHeaderFont,
  },
  footerToggleButton: {
    height: 8,
    width: 18,
  },
});

class UploadLookScreen extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.setCurrentItem = this.setCurrentItem.bind(this);
    this.setCurrentStep = this.setCurrentStep.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.showRemoveItemModal = this.showRemoveItemModal.bind(this);
    this.gobackAndCancel = this.gobackAndCancel.bind(this);
    this.resetToFeed = this.resetToFeed.bind(this);
    this._toggleSuggestionList = this._toggleSuggestionList.bind(this);
    this._removeCarousel = this._removeCarousel.bind(this);
    this.handleSelectProductItem = this.handleSelectProductItem.bind(this);
    this.publishAction = this.publishAction.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.state = {
      currentStep: CATEGORY,
      allowContinue: false,
      currItem: props.items[0].id,
      items: props.items,
      isFirstPublishClick: true,
      isPublishing: false,
      isShowFooter: false,
      isShowMoreSuggestions: false,
      isChosenTag: false,
      modalParams: {
        modalVisible: false,
      },
    };
  }

  setModalVisible(params: object) {
    const { modalParams } = this.state;
    this.setState({ modalParams: { ...modalParams, ...params } });
  }

  setCurrentStep(step) {
    this.setState({ currentStep: step });
  }

  setCurrentItem(itemId) {
    this.setState({ currItem: itemId, isShowFooter: true, isChosenTag: true });
  }

  componentDidMount() {
    const { logEvent, isVideo } = this.props;
    logEvent('UploadLookScreen', {
      name: 'User started uploading a look',
      mediaType: isVideo ? 'Video' : 'Image',
    });
  }

  _addBackAndroidListener() {
  }

  componentWillMount() {
    const { mode, lookId } = this.props;
    BackAndroid.addEventListener('uploadBackPress', () => {
      this.handleBackButton();
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('uploadBackPress');
  }

  publishAction() {
    const { isUploading, publishLookItem, logEvent, items, resetTo, currentFeedQuery, userId, getFeed, getUserLooks, description, mode } = this.props;
    logEvent('uploadLook', {
      name: 'user uploaded a look',
      category: this.mapItemsForAnalytics('category'),
      brand: this.mapItemsForAnalytics('brand'),
      colors: this.mapItemsForAnalytics('color_ids'),
      occasions: this.mapItemsForAnalytics('occasions'),
      description,
      link: this.mapItemsForAnalytics('url'),
      items: items.length,
    });

    this.setState({ isPublishing: true }, () => {
      publishLookItem().then(() => {
        this.setState({ isPublishing: false }, () => {
          const looksCall = {
            id: userId,
            all: true,
          };
          getUserLooks(looksCall);
/*
          const query = _.cloneDeep(currentFeedQuery);
          getFeed(query);
*/
          if (isUploading) {
            this.setModalVisible({
              modalVisible: true,
              title: i18n.t('FINISH_LOOK_IMAGE_PENDING'),
              confirmString: i18n.t('CONTINUE'),
              cancelString: '',
              confirmAction: this.resetToFeed,
              cancelAction: this.resetToFeed,
            })
          } else if (mode === 'edit') {
            resetTo('feedscreen',{resetToIndex: 1});
          } else {
            this.setModalVisible({
              modalVisible: true,
              title: i18n.t('FINISH_LOOK'),
              confirmString: i18n.t('CONTINUE'),
              cancelString: '',
              subtitle: i18n.t('FINISH_LOOK_LEGEND'),
              confirmAction: this.resetToFeed,
              cancelAction: this.resetToFeed,
            });
          }
        });
        ;
      });
    });
  }

  resetToFeed() {
    const { resetTo } = this.props;
    resetTo('feedscreen', { resetToIndex: 1 });
  }

  getCurrentItem() {
    const { currItem } = this.state;
    return _.find(this.props.items, item => item.id === currItem);
  }

  handleNewItem() {
    this.props.createLookItem().then((data) => {
      this.setState({ currItem: data });
    });
  }

  showRemoveItemModal() {
    this.setModalVisible({
      modalVisible: true,
      title: 'DELETE ITEM',
      subtitle: 'Please note changes will not be saved...',
      confirmString: i18n.t('POPUP_CONFIRM_STRING'),
      cancelString: i18n.t('POPUP_CANCEL_STRING'),
      confirmAction: this.handleRemoveItem,
    });
  }

  showNoOffersModal() {
    this.setModalVisible({
      modalVisible: true,
      title: 'SKIP ITEM TAGGING?',
      confirmString: 'PUBLISH LOOK ANYWAY',
      cancelString: 'CONTINUE EDITING',
      confirmAction: this.publishAction,
    });
  }

  handleRemoveItem() {
    const itemToRemoveById = _.find(this.props.items, item => item.id !== this.state.currItem).id;
    this.setCurrentItem(itemToRemoveById);
    this.props.removeLookItem(this.state.currItem);
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
  }

  _renderModal() {
    const { modalParams } = this.state;
    return (
      <ModalQuestion
        {...modalParams}
        closeModal={this.setModalVisible} />
    );
  }

  renderImageWithTags() {
    const { filePath } = this.props;
    return (
      <Image source={{ uri: filePath }} style={styles.itemsContainer} resizeMode={'stretch'}>
        <TouchableWithoutFeedback onPress={this._removeCarousel}>
          {this.renderActions()}
        </TouchableWithoutFeedback>
      </Image>
    );
  }

  renderVideoWithTags() {
    const { filePath } = this.props;
    return (
      <VideoWithTags
        image={filePath}>
        {this.renderActions()}
      </VideoWithTags>
    );
  }

  _removeCarousel() {
    this.setState({ isShowFooter: false, isChosenTag: false });
  }

  _renderSuggestionItems(offers) {
    const { isShowFooter } = this.state;
    return (
      <View>
        {isShowFooter ?
          offers ?
            <View>
              <Text style={styles.carouselTitle}> {i18n.t('CHOOSE_SIMILAR_ITEM')} </Text>
              <ProductItemsCarousel offers={offers} onMoreContentPress={this._toggleSuggestionList} onSelectProductItem={this.handleSelectProductItem} />
            </View> :
            <View>
              <Text> Loading Items... </Text>
            </View>
        : null}
      </View>
    );
  }

  renderActions() {
    const { isVideo, items, addDescription, lookDescription } = this.props;
    const { currItem } = this.state;
    const currTag = _.find(items, item => item.id === currItem);
    const hasIdentifiedItems = currTag && ((currTag.offers && currTag.offers.length) || currTag.offersLink);
    return (
      <View style={styles.renderActionsContainer}>
        { this.renderHeader() }
        { isVideo ? null : this.renderTags() }
        { (hasIdentifiedItems) ? this._renderSuggestionItems(currTag.offers) : this._renderEditItemTabs() }
        <DescriptionInput description={lookDescription} addDescription={description => addDescription(description)} />
      </View>
    );
  }

  renderTags() {
    const { items } = this.props;
    const { isChosenTag } = this.state;
    const currItem = this.getCurrentItem();
    if (currItem) {
      return items.map((item, i) => {
        return (
          <Tag key={item.id} isCustom={!item.offers} currItemId={currItem.id} setCurrentItem={itemId => this.setCurrentItem(itemId)} item={item}
            onDragEnd={position => this.handleOnDragEnd(position)} isChosenTag={isChosenTag} />
        );
      });
    }
  }

  _renderEditItemTabs() {
    const { currItem, isShowFooter } = this.state;
    const { items } = this.props;
    const isFirstItem = currItem === items[0].id;
    return (
      isShowFooter ?
        <EditItemTabs
          item={currItem}
          setCurrentStep={this.setCurrentStep}
          isFirstItem={isFirstItem} /> : null
    );
  }

  _hasOffers(item) {
    return (!item.isCustom && item.offers) && item.offers.findIndex((element => element.selected === true)) !== -1;
  }

  _hasOnlyCustomItems(item) {
    return (item.isCustom);
  }

  handlePublish() {
    const { items } = this.props;
    const { isShowFooter, isFirstPublishClick } = this.state;
    const hasOnlyCustomItems = items.every(this._hasOnlyCustomItems);
    const hasOffers = items.some(this._hasOffers);
    if (hasOffers || hasOnlyCustomItems) {
      this.publishAction();
    } else if (!isShowFooter && isFirstPublishClick) {
        this.setState({ isShowFooter: true, isFirstPublishClick: false, isChosenTag: true });
        setTimeout(() => {
          this.showNoOffersModal();
        }, 500);
      } else if (isFirstPublishClick) {
          this.setState({ isFirstPublishClick: false });
          this.showNoOffersModal();
      } else {
        this.publishAction();
      }
  }

  renderHeader() {
    const { currentStep } = this.state;
    const { isVideo, items, categories, showErrorMessage } = this.props;
    const currItem = this.getCurrentItem();
    return (
      <UploadLookHeader
        isVideo={isVideo}
        currItem={currItem}
        currentStep={currentStep}
        items={items}
        handleNewItem={this.handleNewItem}
        handleRemoveItem={this.showRemoveItemModal}
        handleBackButton={this.handleBackButton}
        showErrorMessage={showErrorMessage}
        setCurrentItem={itemId => this.setCurrentItem(itemId)}
        categories={categories}
        publishItem={this.handlePublish} />
    );
  }

  handleBackButton() {
    const { mode } = this.props;

    this.setModalVisible({
      modalVisible: true,
      title: mode === EDIT_MODE ? i18n.t('CANCEL_EDIT_LOOK') : i18n.t('CANCEL_UPLOAD_LOOK'),
      subtitle: 'Please note changes will not be saved...',
      confirmString: i18n.t('POPUP_CONFIRM_STRING'),
      cancelString: i18n.t('POPUP_CANCEL_STRING'),
      confirmAction: this.gobackAndCancel,
    })
  }

  gobackAndCancel() {
    const { goBack, clearUploadLook, logEvent, description, items } = this.props;
    logEvent('uploadLook', {
      name: 'User canceled the upload look', 
      origin: 'tagging',
      category: this.mapItemsForAnalytics('category'),
      brand: this.mapItemsForAnalytics('brand'),
      colors: this.mapItemsForAnalytics('color_ids'),
      occasions: this.mapItemsForAnalytics('occasions'),
      description,
      link: this.mapItemsForAnalytics('url'),
      items: items.length,
    });
    goBack();
    clearUploadLook();
  }

  mapItemsForAnalytics(type) {
    const { items } = this.props;
    const joinedArray = _.map(items, (item) => {
      if (type === 'color_ids' || type === 'occasions') {
        return (item[type] && item[type].length > 0) ? true : null;
      }
      return item[type] && item[type] !== -1 ? item[type] : null;
    });
    return joinedArray;
  }

  _toggleSuggestionList() {
    this.setState({ isShowMoreSuggestions: !this.state.isShowMoreSuggestions });
    if (!this.state.isShowMoreSuggestions) {
      BackAndroid.addEventListener('uploadBackPress', () => {
        this.handleBackButton();
        return true;
      });
    }
  }

  handleSelectProductItem(offerIndex) {
    const { showErrorMessage, toggleProductItemSelection, items } = this.props;
    const { currItem } = this.state;

    const itemIndex = items.findIndex((element => element.id === currItem));
    if (itemIndex !== -1) {
      const numOfSelectedOffers = items[itemIndex].offers.filter(offer => offer.selected === true).length;
      const offers = items[itemIndex].offers;
      if (numOfSelectedOffers < MAX_ITEMS_PER_TAG || offers[offerIndex].selected) {
        toggleProductItemSelection(itemIndex, offerIndex);
        this.forceUpdate();
      } else {
        showErrorMessage(i18n.t('SELECT_UP_TO_10'));
      }
    }
  }

  render() {
    const { isVideo, filePath, showErrorMessage, items } = this.props;
    const { isPublishing, isShowMoreSuggestions, currItem } = this.state;
    const currTag = _.find(items, item => item.id === currItem);
    if (!filePath) {
      return null;
    }
    return (
      !isShowMoreSuggestions ?
        <View>
          {isVideo ? this.renderVideoWithTags() : this.renderImageWithTags()}
          {isPublishing ? <SpinnerSwitch /> : null}
          {this._renderModal()}
        </View> :
        <ProductItemList
          offers={currTag.offers}
          onCloseSuggestionList={this._toggleSuggestionList}
          showErrorMessage={showErrorMessage}
          onSelectProductItem={this.handleSelectProductItem} />
    );
  }
}

export default UploadLookScreen;
