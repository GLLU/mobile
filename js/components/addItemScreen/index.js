import React, {Component} from 'react';
import BasePage from '../common/base/BasePage';
import {StyleSheet, Text, Dimensions, Platform, View, TouchableOpacity, Image} from 'react-native';
import {setUser, updateLookItem, publishLookItem, createLookItem, setTagPosition} from '../../actions';
import StepMarker from './StepMarker';
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
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;
import VideoWithTags from '../common/VideoWithTags';

const IMAGE_VIEW_PADDING = 80;


class AddItemPage extends BasePage {

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
      currentStep: -1,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
      currMode: 'tagging',
      currItem: props.navigation.state.params.mode === "edit" ? { ...props.items[0]} : {id: -1}
    };

  }

  setCurrentItem(item) {
    console.log('setting curreny item: ', item)
    this.setState({currItem: item})
  }

  componentDidMount() {
    console.log('image from redux', this.props.image)
    this.logEvent('UploadLookScreen', { name: `User started uploading a look`, mediaType: this.state.isVideo? 'Video':'Image' });
  }


  _handleLayoutImage(e) {
    const {width} = e.nativeEvent.layout;
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item && this.state.currentStep === -1 && this.state.isVideo) {
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

  selectTab(step) {
    this.swiper.scrollBy(step);
  }


  continueAction() {
    this.props.updateLookItem().then(response => {
      this.selectTab(this.state.currentStep + 1);
    });
  }

  publishAction() {
    this.logEvent('UploadLookScreen', {name: 'Publish click'});
    this.props.publishLookItem().then(response => {
      if (this.props.state === LOOK_STATES.PUBLISHED) {
        this.goBack()
      } else {
        this.navigateTo('finishLookScreen');
      }
    });
  }

  handleBackButton() {
    if (this.state.currentStep === 0 && this.state.isVideo === true) {
      this.goBack();
    }
    if (this.state.currentStep > -1) {
      this.setState({currentStep: this.state.currentStep - 1});
    } else {
      this.goBack();
    }
  }

  getCurrentMode() {
    switch (this.state.currentStep) {
      default:
        return 'view';
    }
  }

  createLookItemForVideo(position) {
    this.logEvent('AddItemScreen', {name: 'Marker add video'});
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'})
    });
  }

  handleAddItem(position) {
    this.logEvent('AddItemScreen', {name: 'Marker add'});
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item, currentStep: this.state.isVideo ? 0 : this.state.currentStep})
    });
  }

  handleNewItem() {
    const locationX = w / 2;
    const locationY = h / 2;
    const left = locationX / w;
    const top = locationY / h;
    const position = {locationX: left, locationY: top};
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item, currentStep: this.state.isVideo ? this.state.currentStep : -1})
    });
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
    this.props.updateLookItem();
  }

  renderImageWithTags() {
    const {items, image} = this.props;
    const mode = this.getCurrentMode();
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
    const {fileLocalPath} = this.props;
    console.log('fileLocalPath', fileLocalPath)
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

  handleStepZeroValid() {
    this.setState({
      allowContinue: true
    })
  }

  renderActions() {
    return (
      <View>
        {this.renderHeader()}
        {this.state.currentStep === -1 ? null : this.renderThreeSteps()}
      </View>
    )
  }

  renderThreeSteps() {
    const {currItem} = this.state
    return (
      <View style={{height: h}}>
        <View style={{width: w, justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, height: h - 70}}>
          <StepTwoOccasions item={currItem} onValid={this.continueAction.bind(this)}/>
          <StepOneCategory item={currItem} onValid={this.continueAction.bind(this)}/>
        </View>
        <StepZeroBrand item={currItem} onValid={this.handleStepZeroValid.bind(this)}/>
      </View>
    )
  }

  renderContent() {
    if (this.state.currentStep !== 1) {
      return (
        <View>
          {this.state.isVideo ? this.renderVideoWithTags() : this.renderImageWithTags()}
        </View>
      );
    }
    return (
      <View>
        <View style={{position: 'absolute'}}>
          {this.renderHeader()}
        </View>
        <StepThreePublish items={this.props.items} publishItem={this.publishAction.bind(this)}></StepThreePublish>
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
        setCurrentItem={(item) => this.setCurrentItem(item)}/>
    )
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

import {connect} from 'react-redux';

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
    updateLookItem: (look) => dispatch(updateLookItem(look)),
    publishLookItem: (look) => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
  };
}

const mapStateToProps = state => {
  const {lookId, image, items, localFilePath} = state.uploadLook;
  const isVideo = Utils.isVideo(image)
  return {
    lookId,
    image,
    isVideo,
    fileLocalPath: localFilePath,
    items,
    state: state.uploadLook.state,
  };
}

export default connect(mapStateToProps, bindActions)(AddItemPage);
