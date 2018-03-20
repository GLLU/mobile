// @flow

import React, { Component } from 'react';
import { Dimensions, Platform, View, StyleSheet, BackAndroid, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
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

type Props = {
  publishLookItem: () => void,
  createLookItem: () => void,
  removeLookItem: () => void,
  setTagPosition: () => void,
  showErrorMessage: (string) => void,
  clearUploadLook: () => void,
  getFeed: () => void,
  getUserLooks: () => void,
  lookId: number,
  userId: number,
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
    this.toggleSuggestionList = this.toggleSuggestionList.bind(this);
    this.state = {
      currentStep: CATEGORY,
      allowContinue: false,
      currItem: props.items[0].id,
      isPublishing: false,
      isShowMoreSuggestions: false,
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
    this.setState({ currItem: itemId });
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
    const {resetTo} = this.props
    resetTo('feedscreen',{resetToIndex: 1});
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
      title: 'ARE YOU SURE U WANT TO REMOVE THIS ITEM?',
      confirmString: 'DELETE',
      cancelString: 'NO, CONTINUE EDITING',
      confirmAction: this.handleRemoveItem,
    })
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
        closeModal={this.setModalVisible}/>
    );
  }

  renderImageWithTags() {
    const { filePath } = this.props;
    return (
      <Image source={{uri: filePath}} style={styles.itemsContainer} resizeMode={'stretch'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {this.renderActions()}
        </TouchableWithoutFeedback>
      </Image>
    )
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

  renderActions() {
    const { isVideo, items } = this.props;
    const { currItem } = this.state;
    const currTag = _.find(items, item => item.id === currItem);
    return (
      <View style={styles.renderActionsContainer}>
        { this.renderHeader() }
        { isVideo ? null : this.renderTags() }
        { currTag.isCustom ? this._renderEditItemTabs() : <ProductItemsCarousel offers={currTag.offers} onMoreContentPress={this.toggleSuggestionList} /> }
      </View>
    );
  }

  renderTags() {
    const { items } = this.props;
    const currItem = this.getCurrentItem();
    if (currItem) {
      return items.map((item, i) => {
        return (
          <Tag key={item.id} isCustom={item.isCustom} currItemId={currItem.id} setCurrentItem={itemId => this.setCurrentItem(itemId)} item={item}
               onDragEnd={position => this.handleOnDragEnd(position)} />
        );
      });
    }
  }

  _renderEditItemTabs() {
    const { currItem } = this.state;
    const { items } = this.props;
    const isFirstItem = currItem === items[0].id;
    return (
      <EditItemTabs
        item={currItem}
        setCurrentStep={this.setCurrentStep}
        isFirstItem={isFirstItem}/>
    );
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
        publishItem={this.publishAction.bind(this)}/>
    );
  }

  handleBackButton() {
    const { mode } = this.props;

    this.setModalVisible({
      modalVisible: true,
      title: mode === EDIT_MODE ? i18n.t('CANCEL_EDIT_LOOK') : i18n.t('CANCEL_UPLOAD_LOOK'),
      subtitle: 'Please note changes will not be saved...',
      confirmString: 'YES',
      cancelString: 'NO, I WANT TO CONTINUE',
      confirmAction: this.gobackAndCancel,
    })
  }

  gobackAndCancel() {
    const { goBack, clearUploadLook, logEvent, description, items } = this.props
    logEvent('uploadLook', {
      name: 'User canceled the upload look', origin: 'tagging',
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
    })
    return joinedArray
  }

  toggleSuggestionList() {
    this.setState({ isShowMoreSuggestions: !this.state.isShowMoreSuggestions });
  }

  render() {
    const { isVideo, filePath, items } = this.props;
    const { isPublishing, currItem, isShowMoreSuggestions } = this.state;
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
         </View> : <ProductItemList offers={currTag.offers} onCloseSuggestionList={this.toggleSuggestionList} />
    );
  }
}

export default UploadLookScreen;
