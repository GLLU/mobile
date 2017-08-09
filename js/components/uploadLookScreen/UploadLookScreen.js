// @flow

import React, {Component} from 'react';
import {Dimensions, Platform, View, Image, StyleSheet} from 'react-native';
import UploadLookHeader from './UploadLookHeader';
import {LOOK_STATES} from '../../constants';
import ImageWithTags from '../common/ImageWithTags';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import VideoWithTags from '../common/VideoWithTags';
import EditItemTabs from './editItemTabsContainer';
import SpinnerSwitch from '../loaders/SpinnerSwitch';
import {BackAndroid} from 'react-native';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;

export const CATEGORY = 'category'
export const BRAND = 'brand'
export const COLOR = 'color'
export const MOOD = 'mood'
export const DESCRIPTION = 'description'
export const LINK = 'link'

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
  currentFeedQuery: object,
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
    this.state = {
      currentStep: 0,
      allowContinue: false,
      currItem: props.items[0].id,
      isPublishing: false,
    };
  }

  setCurrentItem(itemId) {
    this.setState({currItem: itemId});
  }

  componentDidMount() {
    const {logEvent, isVideo} = this.props
    logEvent('UploadLookScreen', {
      name: 'User started uploading a look',
      mediaType: isVideo ? 'Video' : 'Image'
    });
  }

  publishAction() {
    const {publishLookItem, clearFeed, logEvent, state, goBack, currentFeedQuery, userId, getFeed, getUserLooks, navigateTo} = this.props;
    logEvent('UploadLookScreen', {name: 'Publish click'});
    this.setState({isPublishing: true}, () => {
      publishLookItem().then(() => {
        this.setState({isPublishing: false}, () => {
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
    const {currItem} = this.state;
    return _.find(this.props.items, (item) => item.id === currItem);
  }

  handleNewItem() {
    const locationX = w / 2;
    const locationY = h / 2;
    const left = locationX / w;
    const top = locationY / h;
    const position = {locationX: left, locationY: top};
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item.id});
    });
  }

  handleRemoveItem() {
    const itemToRemoveById = _.find(this.props.items, (item) => item.id !== this.state.currItem).id
    this.setCurrentItem(itemToRemoveById)
    this.props.removeLookItem(this.state.currItem);
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
    this.props.updateLookItem(position.id);
  }

  renderImageWithTags() {
    const {items, filePath} = this.props;
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
    const {filePath} = this.props
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
    return (
      <EditItemTabs
        item={this.state.currItem}/>
    )
  }

  renderHeader() {
    const {currentStep} = this.state
    const {isVideo, items, categories} = this.props
    const currItem = this.getCurrentItem()
    return (
      <UploadLookHeader
        isVideo={isVideo}
        currItem={currItem}
        currentStep={currentStep}
        items={items}
        handleNewItem={this.handleNewItem.bind(this)}
        handleRemoveItem={this.handleRemoveItem.bind(this)}
        handleBackButton={this.handleBackButton.bind(this)}
        setCurrentItem={itemId => this.setCurrentItem(itemId)}
        categories={categories}
        publishItem={this.publishAction.bind(this)}/>
    );
  }

  handleBackButton() {
    this.props.goBack();
  }

  render() {
    const {isVideo} = this.props;
    const {isPublishing} = this.state;
    return (
      <View>
        {isVideo ? this.renderVideoWithTags() : this.renderImageWithTags()}
        {isPublishing ? <SpinnerSwitch /> : null}
      </View>
    );
  }
}

export default UploadLookScreen;
