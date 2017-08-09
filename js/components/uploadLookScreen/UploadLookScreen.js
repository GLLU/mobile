// @flow

import React, { Component } from 'react';
import { Dimensions, Platform, View, Text, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import UploadLookHeader from './UploadLookHeader';
import { LOOK_STATES } from '../../constants';
import ImageWithTags from '../common/ImageWithTags';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import VideoWithTags from '../common/VideoWithTags';
import EditItemTabs from './editItemTabsContainer';
import ModalQuestion from './forms/ModalQuestion';
import SpinnerSwitch from '../loaders/SpinnerSwitch';
import { BackAndroid } from 'react-native';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;

export const CATEGORY = 'category';
export const BRAND = 'brand';
export const COLOR = 'color';
export const MOOD = 'mood';
export const DESCRIPTION = 'description';
export const LINK = 'link';

type Props = {
  updateLookItem: () => void,
  publishLookItem: () => void,
  createLookItem: () => void,
  removeLookItem: () => void,
  setTagPosition: () => void,
  getFeed: () => void,
  getUserLooks: () => void,
  lookId: number,
  userId: number,
  items: array,
  categories: array,
  image: string,
  filePath: string,
  state: string,
  currentFeedQuery: object
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
    this.state = {
      currentStep: CATEGORY,
      allowContinue: false,
      currItem: props.items[0].id,
      isPublishing: false,
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

  publishAction() {
    const { publishLookItem, clearFeed, logEvent, state, goBack, currentFeedQuery, userId, getFeed, getUserLooks, navigateTo } = this.props;
    logEvent('UploadLookScreen', { name: 'Publish click' });
    this.setState({ isPublishing: true }, () => {
      publishLookItem().then(() => {
        this.setState({ isPublishing: false }, () => {
          if (state === LOOK_STATES.PUBLISHED) {
            goBack();
          } else {
            const looksCall = {
              id: userId,
              all: true,
            };
            const query = _.cloneDeep(currentFeedQuery);
            getUserLooks(looksCall);
            clearFeed().then(() => {
              getFeed(query);
            });
            navigateTo('finishLookScreen');
          }
        });
      });
    });
  }

  getCurrentItem() {
    const { currItem } = this.state;
    return _.find(this.props.items, item => item.id === currItem);
  }

  handleNewItem() {
    const locationX = w / 2;
    const locationY = h / 2;
    const left = locationX / w;
    const top = locationY / h;
    const position = { locationX: left, locationY: top };
    this.props.createLookItem(position).then((data) => {
      this.setState({ currItem: data.payload.item.id });
    });
  }
  showRemoveItemModal() {
    this.setModalVisible({
      modalVisible: true,
      title: 'Are you sure u want to remove this item?',
      confirmString: 'Yes, delete it',
      cancelString: 'No, still want the edit this item',
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
    this.props.updateLookItem(position.id);
  }

  _renderModal(confirmString, cancelString, title, subtitle = '', confirmAction, cancelAction) {
    const { modalParams } = this.state;
    return (
      <ModalQuestion
        {...modalParams}
        closeModal={this.setModalVisible}/>
    );
  }

  renderImageWithTags() {
    const { items, filePath } = this.props;
    const currItem = this.getCurrentItem();
    return (
      <ImageWithTags
        items={items}
        image={filePath}
        setCurrentItem={itemId => this.setCurrentItem(itemId)}
        onDragEnd={position => this.handleOnDragEnd(position)}
        currItem={currItem}>
        {this.renderActions()}
      </ImageWithTags>
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

  renderActions() {
    return (
      <View style={styles.renderActionsContainer}>
        { this.renderHeader()}
        { this._renderEditItemTabs()}
      </View>
    );
  }

  _renderEditItemTabs() {
    const { currItem } = this.state;
    const { items } = this.props;
    const isFirstItem = currItem === items[0].id;
    return (
      <EditItemTabs
        item={currItem}
        setCurrentStep={this.setCurrentStep}
        isFirstItem={isFirstItem} />
    );
  }

  renderHeader() {
    const { currentStep } = this.state;
    const { isVideo, items, categories } = this.props;
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
        setCurrentItem={itemId => this.setCurrentItem(itemId)}
        categories={categories}
        publishItem={this.publishAction.bind(this)} />
    );
  }

  handleBackButton() {
    const {goBack} = this.props
    this.setModalVisible({
      modalVisible: true,
      title: 'Are you sure u want to abort the upload look process?',
      confirmString: 'Yes, i will come back later..',
      cancelString: 'No, i want to stay and upload my look',
      confirmAction: goBack,
    })
  }

  render() {
    const { isVideo } = this.props;
    const { isPublishing } = this.state;
    return (
      <View>
        {isVideo ? this.renderVideoWithTags() : this.renderImageWithTags()}
        {isPublishing ? <SpinnerSwitch /> : null}
        {this._renderModal()}
      </View>
    );
  }
}

export default UploadLookScreen;
