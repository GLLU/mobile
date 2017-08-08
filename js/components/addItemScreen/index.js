import React, {Component} from 'react';
import {StyleSheet, Dimensions, Platform, View, TouchableOpacity, Image} from 'react-native';
import {
  updateLookItem,
  publishLookItem,
  createLookItem,
  setTagPosition,
  getUserLooks,
  getFeed,
  clearFeed,
  removeLookItem
} from '../../actions';
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
    look: React.PropTypes.object,
    item: React.PropTypes.object,
    state: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.setCurrentItem = this.setCurrentItem.bind(this);
    this.state = {
      isVideo: props.isVideo,
      currentStep: 0,
      allowContinue: false,
      currItem: {...props.items[0]},
      isPublishing: false,

    };
  }

  setCurrentItem(item) {
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

  handleNewItem() {
    const locationX = w / 2;
    const locationY = h / 2;
    const left = locationX / w;
    const top = locationY / h;
    const position = {locationX: left, locationY: top};
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item});
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
    const {currItem} = this.state;
    return (
      <ImageWithTags
        items={items}
        image={image}
        setCurrentItem={item => this.setCurrentItem(item)}
        onDragEnd={position => this.handleOnDragEnd(position)}
        currItem={currItem}>
        {this.renderActions()}
      </ImageWithTags>
    );
  }

  renderVideoWithTags() {
    const {fileLocalPath, image} = this.props
    const VidfileLocalPath = fileLocalPath ? fileLocalPath : image;
    return (
      <VideoWithTags
        image={VidfileLocalPath}>
        {this.renderActions()}
      </VideoWithTags>
    );
  }

  renderActions() {
    return (
      <View style={{height: h, width: w, justifyContent: 'space-between'}}>
        { this.renderHeader()}
        { this._renderEditItemTabs()}
      </View>
    );
  }

  _renderEditItemTabs() {
    return (
      <EditItemTabs
        item={this.state.currItem.id}/>
    )
  }

  renderContent() {
    return this.state.isVideo ? this.renderVideoWithTags() : this.renderImageWithTags();
  }

  renderHeader() {
    return (
      <UploadLookHeader
        isVideo={this.state.isVideo}
        currItem={this.state.currItem}
        currentStep={this.state.currentStep}
        items={this.props.items}
        handleNewItem={this.handleNewItem.bind(this)}
        handleRemoveItem={this.handleRemoveItem.bind(this)}
        handleBackButton={this.handleBackButton.bind(this)}
        setCurrentItem={item => this.setCurrentItem(item)}
        categories={this.props.categories}
        publishItem={this.publishAction.bind(this)}/>
    );
  }

  handleBackButton() {
    this.props.goBack();
  }

  render() {
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
