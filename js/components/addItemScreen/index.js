import React, {Component} from 'react';
import {StyleSheet, Dimensions, Platform, View, TouchableOpacity, Image} from 'react-native';
import {
  setUser,
  updateLookItem,
  publishLookItem,
  createLookItem,
  setTagPosition,
  getUserLooks,
  getFeed,
  clearFeed,
  removeLookItem
} from '../../actions';
import StepZeroBrand from './StepZeroBrand';
import StepOneCategory from './StepOneCategory';
import StepTwoOccasions from './StepTwoOccasions';
import StepThreePublish from './StepThreePublish';
import UploadLookHeader from './UploadLookHeader';
import {LOOK_STATES} from '../../constants';
import ImageWithTags from '../common/ImageWithTags';
import _ from 'lodash';
import Utils from '../../utils';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import VideoWithTags from '../common/VideoWithTags';
import EditItemTabs from './editItemTabsContainer';
import asScreen from '../common/containers/Screen';
import {connect} from 'react-redux';
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

class AddItemPage extends Component {

  static propTypes = {
    publishLookItem: React.PropTypes.func,
    updateLookItem: React.PropTypes.func,
    mode: React.PropTypes.string,
    setUser: React.PropTypes.func,
    look: React.PropTypes.object,
    item: React.PropTypes.object,
    state: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
    this.state = {
      isVideo: this.props.isVideo,
      currentStep: this.props.isVideo && props.items.length > 0 ? 0 : -1,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
      currMode: 'tagging',
      currItem: props.navigation.state.params.mode === 'edit' ? {...props.items[0]} : {id: -1},
      isPublishing: false,

    };
  }

  setCurrentItem(item) {
    console.log('itemmmm', item)
    this.setState({currItem: item});
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

  componentDidMount() {
    this.props.logEvent('UploadLookScreen', {
      name: 'User started uploading a look',
      mediaType: this.state.isVideo ? 'Video' : 'Image'
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.state.currentStep === -1 && this.state.isVideo) {
      this.handleContinue();
    }
  }

  handleContinue() {
    const {currentStep} = this.state;
    if (currentStep < 1) {
      this.setState({currentStep: this.state.currentStep + 1});
    }
  }

  setUser(name) {
    this.props.setUser(name);
  }

  publishAction() {
    const {publishLookItem, logEvent, state, goBack, currentFeedQuery, userId, getFeed, getUserLooks, navigateTo} = this.props;
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

  handleBackButton() {
    if (this.state.currentStep === 0 && this.state.isVideo === true) {
      this.props.goBack();
    }
    if (this.state.currentStep > -1) {
      this.setState({currentStep: this.state.currentStep - 1});
    } else {
      this.props.goBack();
    }
  }

  getCurrentMode() {
    switch (this.state.currentStep) {
      default:
        return 'view';
    }
  }

  createLookItemForVideo(position) {
    this.props.logEvent('UploadLookScreen', {name: 'Marker add video'});
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'});
    });
  }

  handleAddItem(position) {
    this.props.logEvent('UploadLookScreen', {name: 'Marker add'});
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item, currentStep: this.state.isVideo ? 0 : this.state.currentStep});
    });
  }

  handleNewItem() {
    const locationX = w / 2;
    const locationY = h / 2;
    const left = locationX / w;
    const top = locationY / h;
    const position = {locationX: left, locationY: top};
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item, currentStep: this.state.isVideo ? this.state.currentStep : -1});
    });
  }

  handleRemoveItem() {
    const firstItem = _.find(this.props.items, (item) => item.id !== this.state.currItem.id)
    this.setCurrentItem(firstItem)
    this.props.removeLookItem(this.state.currItem.id);
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
    this.props.updateLookItem(position.id);
  }

  renderImageWithTags() {
    const {items, image} = this.props;
    console.log('this.state.currItem', this.state.currItem)
    return (
      <ImageWithTags
        items={items}
        image={image}
        setCurrentItem={item => this.setCurrentItem(item)}
        onMarkerCreate={this.handleAddItem.bind(this)}
        onDragEnd={position => this.handleOnDragEnd(position)}
        currStep={this.state.currentStep}
        currItem={this.state.currItem}>
        {this.renderActions()}
      </ImageWithTags>
    );
  }

  renderVideoWithTags() {
    const fileLocalPath = this.props.fileLocalPath ? this.props.fileLocalPath : this.props.image;
    const mode = this.getCurrentMode();
    return (
      <VideoWithTags
        items={this.props.items}
        mode={mode}
        image={fileLocalPath}
        createLookItemForVideo={this.handleAddItem.bind(this)}>
        {this.renderActions()}
      </VideoWithTags>
    );
  }

  renderActions() {
    return (
      <View style={{height: h, width: w, justifyContent: 'space-between'}}>
        {this.renderHeader()}
        {this.state.currentStep === -1 ? null : this._renderEditItemTabs()}

      </View>
    );
  }

  _renderEditItemTabs() {
    console.log('isDiff', this.state.currItem)
    return (
      <EditItemTabs
        item={this.state.currItem.id}/>
    )
  }

  renderContent() {
    if (this.state.currentStep !== 1) {
      return this.state.isVideo ? this.renderVideoWithTags() : this.renderImageWithTags();
    }
    return (
      <View>
        {this.renderHeader()}
        <StepThreePublish items={this.props.items} publishItem={this.publishAction.bind(this)}/>
      </View>);
  }

  renderHeader() {
    return (
      <UploadLookHeader
        isVideo={this.state.isVideo}
        currItem={this.state.currItem}
        currentStep={this.state.currentStep}
        items={this.props.items}
        handleBackButton={this.handleBackButton.bind(this)}
        handleContinue={this.handleContinue}
        handleNewItem={this.handleNewItem.bind(this)}
        handleRemoveItem={this.handleRemoveItem.bind(this)}
        setCurrentItem={item => this.setCurrentItem(item)}
        categories={this.props.categories}
        publishItem={this.publishAction.bind(this)}/>
    );
  }

  render() {
    console.log('currItemRender:', this.state.currItem)
    return (
      <View>
        {this.renderContent()}
        {this.state.isPublishing ? <SpinnerSwitch /> : null}
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
    updateLookItem: look => dispatch(updateLookItem(look)),
    publishLookItem: look => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    removeLookItem: (itemId) => dispatch(removeLookItem(itemId)),
    setTagPosition: position => dispatch(setTagPosition(position)),
    getFeed: query => dispatch(getFeed(query)),
    clearFeed: () => dispatch(clearFeed()),
    getUserLooks: data => dispatch(getUserLooks(data)),
  };
}

const mapStateToProps = (state) => {
  const {lookId, image, items, localFilePath} = state.uploadLook;
  const isVideo = Utils.isVideo(image);
  return {
    lookId,
    image,
    isVideo,
    fileLocalPath: localFilePath,
    items,
    state: state.uploadLook.state,
    categories: state.filters.categories,
    currentFeedQuery: state.feed.query,
    userId: state.user.id,
  };
};

export default connect(mapStateToProps, bindActions)(asScreen(AddItemPage));
