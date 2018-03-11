import React, {Component} from 'react';
import {StyleSheet, Dimensions, Platform, View, TouchableOpacity, Image} from 'react-native';
import {setUser, updateLookItem, publishLookItem, createLookItem, setTagPosition, getUserLooks, getFeed} from '../../actions';
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
import asScreen from "../common/containers/Screen"
import {connect} from 'react-redux';
import SpinnerSwitch from "../loaders/SpinnerSwitch";
import { BackAndroid } from "react-native";

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;

class AddItemPage extends Component {

  static propTypes = {
    publishLookItem: React.PropTypes.func,
    updateLookItem: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    goBack: React.PropTypes.func,
    mode: React.PropTypes.string,
    setUser: React.PropTypes.func,
    look: React.PropTypes.object,
    item: React.PropTypes.object,
    state: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.state = {
      isVideo: this.props.isVideo,
      currentStep: this.props.isVideo && props.items.length > 0 ? 0 : -1,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
      currMode: 'tagging',
      currItem: props.navigation.state.params.mode === "edit" ? { ...props.items[0]} : {id: -1},
      isPublishing: false,
      tagsPositions: [],
    };

  }

  setCurrentItem(item) {
    this.setState({ currItem: item });
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
    this.props.logEvent('UploadLookScreen', { name: `User started uploading a look`, mediaType: this.state.isVideo? 'Video':'Image' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && this.state.currentStep === -1 && this.state.isVideo) {
      this.handleContinue();
    }
    if (nextProps.items !== this.props.items) {
      const item = _.find(nextProps.items, item => item.id === this.state.currItem.id);
      this.setState({currItem: item})
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
    const { logEvent, goBack, navigateTo, currentFeedQuery } = this.props;
    logEvent('UploadLookScreen', {name: 'Publish click'});
    this.setState({isPublishing:true},()=>{
      publishLookItem().then(() => {
        this.setState({isPublishing:false},()=> {
          if (this.props.state === LOOK_STATES.PUBLISHED) {
            goBack();
          } else {
            const looksCall = {
              id: this.state.userId,
              all: true,
            };
            getUserLooks(looksCall);
            getFeed(currentFeedQuery);
            navigateTo('finishLookScreen');
          }
        });
      });
    })

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
      this.setState({mode: 'view'})
    });
  }

  handleAddItem(position) {
    this.props.logEvent('UploadLookScreen', {name: 'Marker add'});
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item, currentStep: this.state.isVideo ? 0 : this.state.currentStep})
    });
  }

  handleNewItem(position) {
    const itemPosition = { locationX: position ? position.locationX : 0.5, locationY: position ? position.locationY : 0.5 };
    return this.props.createLookItem(itemPosition).then((data) => {
      this.setState({ currItem: data.payload.item, currentStep: this.state.isVideo ? this.state.currentStep : -1 });
    });
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
    this.props.updateLookItem(position.id);
  }

  renderImageWithTags() {
    const { items, image } = this.props;
    const mode = this.getCurrentMode();
    //this.addTags();
    return (
      <ImageWithTags
        mode={mode}
        items={items}
        image={image}
        setCurrentItem={(item) => this.setCurrentItem(item)}
        onMarkerCreate={this.handleAddItem.bind(this)}
        onDragEnd={(position) => this.handleOnDragEnd(position)}
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
      <View style={{ height: h, width: w }}>
        {this.renderHeader()}
        {this.state.currentStep === -1 ? null : this.renderThreeSteps()}

      </View>
    )
  }

  renderThreeSteps() {
    const { currItem } = this.state;
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ width: w, justifyContent: 'space-between', flexDirection: 'row' }}>
          <StepTwoOccasions item={currItem} />
          <StepOneCategory item={currItem} />
        </View>
        <StepZeroBrand item={currItem} />
      </View>
    )
  }

  renderContent() {
    if (this.state.currentStep !== 1) {
      return this.state.isVideo ? this.renderVideoWithTags() : this.renderImageWithTags();
    }
    return (
      <View>
        {this.renderHeader()}
        <StepThreePublish items={this.props.items} publishItem={this.publishAction.bind(this)} />
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
        setCurrentItem={(item) => this.setCurrentItem(item)}
        categories={this.props.categories}/>
    )
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
    setUser: name => dispatch(setUser(name)),
    updateLookItem: look => dispatch(updateLookItem(look)),
    publishLookItem: look => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: position => dispatch(setTagPosition(position)),
    getFeed: query => dispatch(getFeed(query)),
    getUserLooks: data => dispatch(getUserLooks(data)),
  };
}

const mapStateToProps = (state) => {
  const { lookId, image, items, localFilePath, positions } = state.uploadLook;
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
    positions,
  };
};

export default connect(mapStateToProps, bindActions)(asScreen(AddItemPage));
