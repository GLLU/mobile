// @flow

import React, { Component } from 'react';
import { View, BackAndroid, Image, Text, TouchableWithoutFeedback } from 'react-native';
import i18n from 'react-native-i18n';
import _ from 'lodash';
import UploadLookHeader from './UploadLookHeader';
import VideoWithTags from '../common/VideoWithTags';
import EditItemTabs from './editItemTabsContainer';
import ModalQuestion from './forms/ModalQuestion';
import SpinnerSwitch from '../loaders/SpinnerSwitch';
import ProductItemsCarousel from './productItems/ProductItemsCarousel';
import Tag from '../common/Tag';
import { logUploadLookEvent } from '../../utils/UploadUtils';
import styles from './styles';

const EDIT_MODE = 'edit';
const MAX_ITEMS_PER_TAG = 5;

export const BRAND = 'brand';
export const LINK = 'link';

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

class UploadLookScreen extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.setCurrentItem = this.setCurrentItem.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.showRemoveItemModal = this.showRemoveItemModal.bind(this);
    this.gobackAndCancel = this.gobackAndCancel.bind(this);
    this.resetToFeed = this.resetToFeed.bind(this);
    this._toggleSuggestionList = this._toggleSuggestionList.bind(this);
    this._removeCarousel = this._removeCarousel.bind(this);
    this.handleProductItemSelection = this.handleProductItemSelection.bind(this);
    this.publishAction = this.publishAction.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.setCurrentStep = this.setCurrentStep.bind(this);
    this._handleEnlargeItem = this._handleEnlargeItem.bind(this);
    this._renderProductItemsHeader = this._renderProductItemsHeader.bind(this);
    this.state = {
      currentStep: BRAND,
      currItemId: props.items[0].id,
      items: props.items,
      isFirstPublishClick: true,
      isPublishing: false,
      isShowFooter: false,
      isChosenTag: false,
      modalParams: {
        modalVisible: false,
      },
    };
  }

  setCurrentStep(step) {
    this.setState({ currentStep: step });
  }

  setModalVisible(params: object) {
    const { modalParams } = this.state;
    this.setState({ modalParams: { ...modalParams, ...params } });
  }

  setCurrentItem(itemId) {
    this.setState({ currItemId: itemId, isShowFooter: true, isChosenTag: true });
  }

  componentDidMount() {
    const { logEvent, isVideo } = this.props;
    logEvent('UploadLookScreen', {
      name: 'User started uploading a look',
      mediaType: isVideo ? 'Video' : 'Image',
    });
  }

  componentWillMount() {
    BackAndroid.addEventListener('uploadBackPress', () => {
      this.handleBackButton();
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('uploadBackPress');
  }

  publishAction() {
    const { isUploading, publishLookItem, logEvent, items, resetTo, userId, getUserLooks, description, mode } = this.props;

    logUploadLookEvent(logEvent, 'user uploaded a look', items, description);

    this.setState({ isPublishing: true }, () => {
      publishLookItem().then(() => {
        this.setState({ isPublishing: false }, () => {
          const looksCall = {
            id: userId,
            all: true,
          };
          getUserLooks(looksCall);
          if (isUploading) {
            this.setModalVisible({
              modalVisible: true,
              title: i18n.t('FINISH_LOOK_IMAGE_PENDING'),
              confirmString: i18n.t('CONTINUE'),
              cancelString: '',
              confirmAction: this.resetToFeed,
            })
          } else if (mode === 'edit') {
            resetTo('feedscreen', { resetToIndex: 1 });
          } else {
            this.setModalVisible({
              modalVisible: true,
              title: i18n.t('FINISH_LOOK'),
              confirmString: i18n.t('CONTINUE'),
              cancelString: '',
              subtitle: i18n.t('FINISH_LOOK_LEGEND'),
              confirmAction: this.resetToFeed,
            });
          }
        });
      });
    });
  }

  resetToFeed() {
    const { resetTo } = this.props;
    resetTo('feedscreen', { resetToIndex: 1 });
  }

  getCurrentItem() {
    const { currItemId, items } = this.state;
    return _.find(items, item => item.id === currItemId);
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
    const itemToRemoveById = _.find(this.props.items, item => item.id !== this.state.currItemId).id;
    this.setCurrentItem(itemToRemoveById);
    this.props.removeLookItem(this.state.currItemId);
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

  _renderImageWithTags() {
    const { filePath } = this.props;
    return (
      <Image source={{ uri: filePath }} style={styles.itemsContainer} resizeMode={'stretch'}>
        <TouchableWithoutFeedback onPress={this._removeCarousel}>
          {this.renderActions()}
        </TouchableWithoutFeedback>
      </Image>
    );
  }

  _renderVideoWithTags() {
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

  _handleEnlargeItem(offer) {
    this.props.navigateTo('productItemLarge', { offer });
  }

  _renderProductItemsHeader() {
    const { items, currItemId } = this.state;
    const currTag = _.find(items, item => item.id === currItemId);
    const numOfSelectedOffers = (currTag && currTag.numOfSelectedOffers) ? currTag.numOfSelectedOffers : 0;
    return (
      <View style={styles.carouselTitle}>
        {numOfSelectedOffers ?
          <Text style={styles.carouselTitleText}> {`You have selected ${numOfSelectedOffers} items`} </Text> :
          <Text style={styles.carouselTitleText}> {`Choose up to ${MAX_ITEMS_PER_TAG} items`} </Text>
        }
      </View>
    );
  }

  _renderSuggestionItems(currTag) {
    const { lookId } = this.props;
    const { isShowFooter } = this.state;
    return (
      <View>
        {isShowFooter ?
          currTag.offers ?
            <View>
              {this._renderProductItemsHeader()}
              <ProductItemsCarousel
                lookId={lookId}
                itemId={currTag.id}
                offers={currTag.offers}
                onChangeToManualPress={this._toggleSuggestionList}
                onSelectProductItem={this.handleProductItemSelection}
                onEnlargeItem={offer => this._handleEnlargeItem(offer)} />
            </View> :
            <View>
              <Text> Loading Items... </Text>
            </View>
        : null}
      </View>
    );
  }

  renderActions() {
    const { isVideo, items } = this.props;
    const { currItemId } = this.state;
    const currTag = _.find(items, item => item.id === currItemId);
    return (
      <View style={styles.renderActionsContainer}>
        { this.renderHeader() }
        { isVideo ? null : this.renderTags() }
        { !currTag.isCustom ? this._renderSuggestionItems(currTag) : this._renderEditItemTabs() }
      </View>
    );
  }

  renderTags() {
    const { items } = this.props;
    const { isChosenTag } = this.state;
    const currItem = this.getCurrentItem();
    if (currItem) {
      return items.map((item) => {
        return (
          <Tag key={item.id} isCustom={!item.offers} currItemId={currItem.id} setCurrentItem={itemId => this.setCurrentItem(itemId)} item={item}
            onDragEnd={position => this.handleOnDragEnd(position)} isChosenTag={isChosenTag} />
        );
      });
    }
  }

  _renderEditItemTabs() {
    const { currItemId, isShowFooter } = this.state;
    const { items } = this.props;
    const isFirstItem = currItemId === items[0].id;
    const manualItem = { ...this.getCurrentItem(), isCustom: true };
    return (
      isShowFooter ?
        <EditItemTabs
          item={manualItem}
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

  handleBackButton() {
    const { mode } = this.props;

    this.setModalVisible({
      modalVisible: true,
      title: mode === EDIT_MODE ? i18n.t('CANCEL_EDIT_LOOK') : i18n.t('CANCEL_UPLOAD_LOOK'),
      confirmString: i18n.t('POPUP_CONFIRM_STRING'),
      cancelString: i18n.t('POPUP_CANCEL_STRING'),
      confirmAction: this.gobackAndCancel,
    });
  }

  gobackAndCancel() {
    const { goBack, clearUploadLook, logEvent, description, items } = this.props;

    logUploadLookEvent(logEvent, 'User canceled the upload look', items, description, 'tagging');
    goBack();
    clearUploadLook();
  }

  _toggleSuggestionList() {
    const { items } = this.props;
    const { currItemId } = this.state;
    const itemIndex = items.findIndex((element => element.id === currItemId));
    if (itemIndex !== -1) {
      const newItems = items;
      newItems[itemIndex].isCustom = true;
      this.setState({ items: newItems, currItemId: newItems[itemIndex].id });
      BackAndroid.addEventListener('uploadBackPress', () => {
        this.handleBackButton();
        return true;
      });
    }
  }

  handleProductItemSelection(offerIndex) {
    const { toggleProductItemSelection, showErrorMessage } = this.props;
    const { currItemId } = this.state;

    const currItem = this.getCurrentItem();
    if (currItemId) {
      const numOfSelectedOffers = currItem.offers.filter(offer => offer.selected === true).length;
      const offers = currItem.offers;
      if (numOfSelectedOffers < MAX_ITEMS_PER_TAG || offers[offerIndex].selected) {
        toggleProductItemSelection(currItemId, offerIndex);
        this.forceUpdate();
      } else {
        showErrorMessage(i18n.t('SELECT_UP_TO_5'));
      }
    }
  }

  renderHeader() {
    const { items, categories, showErrorMessage, isVideo, addDescription } = this.props;
    const currItem = this.getCurrentItem();
    return (
      <UploadLookHeader
        isVideo={isVideo}
        currItem={currItem}
        addDescription={addDescription}
        items={items}
        handleRemoveItem={this.showRemoveItemModal}
        handleBackButton={this.handleBackButton}
        showErrorMessage={showErrorMessage}
        setCurrentItem={itemId => this.setCurrentItem(itemId)}
        categories={categories}
        publishItem={this.handlePublish} />
    );
  }

  render() {
    const { filePath, isVideo } = this.props;
    const { isPublishing } = this.state;
    if (!filePath) {
      return null;
    }
    return (
      <View>
        {isVideo ? this._renderVideoWithTags() : this._renderImageWithTags()}
        {isPublishing ? <SpinnerSwitch /> : null}
        {this._renderModal()}
      </View>
    );
  }
}

export default UploadLookScreen;
