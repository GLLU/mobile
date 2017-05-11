'use strict';

import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet, Modal, TouchableOpacity, View,Text } from 'react-native';
import {  Button, Thumbnail, H3, Grid, Row, Col, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImageWithTags from '../common/ImageWithTags';
import TagInput from './forms/TagInput';
import Gllu from '../common';
import BaseComponent from '../common/BaseComponent';
import {
    createLookItem,
    addDescription,
    addUrl,
    addLocation,
    addTrustLevel,
    addPhotosVideo,
    toggleOccasionTag,
    addItemTag,
    removeItemTag,
} from '../../actions';
import _ from 'lodash';
import { LOOK_STATES } from '../../constants';

import FontSizeCalculator from './../../calculators/FontSize';
import VideoWithTags from '../common/VideoWithTags';

const checkboxUncheckIcon = require('../../../images/icons/checkbox-uncheck.png');
const checkboxCheckedIcon = require('../../../images/icons/checkbox-checked.png');
const dollarBill = require('../../../images/dollar-bill.png')
const smartphone = require('../../../images/smartphone.png')
const deviceWidth = Dimensions.get('window').width;
const BTN_RADIO_MARGIN_TOP = deviceWidth < 375 ? 0 : 10;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 10,
  },
  itemInfoView: {
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: 60,
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#7f7f7f',
    fontWeight: '300',
  },
  describe: {
    flex: 1,
    flexGrow: 1,
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#9E9E9E',
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  textInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  confirmText: {
    flex: 1,
    height: 120,
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '300',
    color: '#000',
    backgroundColor: 'transparent',
    padding: 2
  },
  normalIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5
  },
  btnGoToStep3: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#05d7b2',
    height: 45,
    width: (deviceWidth / 8) * 6,
    borderRadius: 0,
    alignSelf: 'center'
  },
  btnGoToStep3Text: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(18).getSize(),
    fontWeight: '400',
    textAlign: 'center'
  },
  hashTag: {
    color: '#05d7b2'
  },
  fakeCheckbox: {
    marginTop: BTN_RADIO_MARGIN_TOP,
  },
  text: {
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  link: {
    color: '#00ABED',
    fontSize: 12,
    fontWeight: 'normal',
  },
});

class StepThreePublish extends BaseComponent {
  static propTypes = {
    image: React.PropTypes.string,
    state: React.PropTypes.string,
    brandUrl: React.PropTypes.string,
    publishItem: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    description: React.PropTypes.string,
    photos: React.PropTypes.array,
    items: React.PropTypes.array,
    occasions: React.PropTypes.array,
    addDescription: React.PropTypes.func,
    addLocation: React.PropTypes.func,
    addTrustLevel: React.PropTypes.func,
    addPhotosVideo: React.PropTypes.func,
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    const isVideo = this.props.image.search(".mp4") > -1
    this.state = {
      images:['', '', ''],
      video: '',
      videoUrl: '',
      isVideo,
      location: 'us',
      trustLevel: '0',
      confirm: false,
      imageOverlayVisible: false,
      urlOverlayVisible: false,
      description: props.description,
      url: props.url,
    }

    this.urlDialogShown = false;
  }

  addPhoto(number) {
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: false
    }).then(image => {
      var path = image.path;
      var Extension = path.substring(path.lastIndexOf('.')+1).toLowerCase();
      if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") {
        this.props.addPhotosVideo(image);
      }
    });
  }

  addVideo() {
    ImagePicker.openPicker({
      cropping: false
    }).then(video => {
      var path = video.path;
      var Extension = path.substring(path.lastIndexOf('.')+1).toLowerCase();
      if (Extension == "mp4" || Extension == "avi" || Extension == "flv" || Extension == "mov" || Extension == "webm") {
        console.log(`${path} will upload and get thumbnail via api`);
        this.setState({videoUrl: path, video: ''});
        this.props.addPhotosVideo(this.state.images, path);
      }
    });
  }

  updateSelectValue(key, value) {
    switch (key) {
      case 'location':
        this.props.addLocation(value);
        break;
      case 'trustLevel':
        this.props.addTrustLevel(value);
        break;
      case 'url':
        this.setState({
          url: value
        });
      case 'description':
        this.setState({
          description: value
        });
        break;
    }
  }

  checkUrlOk() {
    const { brandUrl } = this.props;
    // it is ok if it is not empty and not the same as item brand url (means no change made)
    if (!this.state.url) {
      return false;
    }
    if (!brandUrl) {
      return true;
    }

    if (this.state.url.toLowerCase() == brandUrl.toLowerCase()) {
      return false;
    }

    return true;
  }

  handlePublishPress() {
    // we don't show the dialog during editing look
    // we only show it one time
    if (!this.urlDialogShown && !this.checkUrlOk() && this.props.state == LOOK_STATES.DRAFT) {
      this.setState({urlOverlayVisible: true}, () => {
        this.urlDialogShown = true;
      });
    } else {
      this.props.publishItem();
    }
  }

  handleOkPress() {
    this.setState({urlOverlayVisible: false}, () => {
      this.urlText.focus();
    });
  }

  handleContinuePress() {
    this.handleUrlEndEditing();
    this.setState({urlOverlayVisible: false}, () => {
      this.props.publishItem();
    });
  }

  _renderSelections(){
    const checkBoxIcon = this.state.confirm ? checkboxCheckedIcon : checkboxUncheckIcon;
    return (
        <View style={{height: 150, margin: 5}}>
            {/*
            <Text style={[styles.titleLabelInfo, {color: '#333333'}]}>Improve your sales experience</Text>
            <Location location={this.state.location} updateSelectValue={this.updateSelectValue.bind(this)} />
            <TrustLevel trustLevel={this.state.trustLevel} updateSelectValue={this.updateSelectValue.bind(this)} />
          */}
            <Grid>
              <Col size={15}>
                <Button transparent onPress={() => this.setState({confirm: !this.state.confirm})} style={styles.fakeCheckbox}>
                  <Image source={checkBoxIcon} style={[styles.normalIconImage, {width: 25, height: 25}]} />
                </Button>
              </Col>
              <Col size={85}>
                <Text adjustsFontSizeToFit={true} numberOfLines={8} style={styles.confirmText}>
                  {'You will now become a "Glluer Presenter" while your exact measurements will still be hiddden. People that will view this item. Will see a % value of matching between their measurements and yours.'}
                </Text>
              </Col>
            </Grid>
        </View>
    )
  }

  handleImagePress() {
    this.setState({imageOverlayVisible: true});
  }

  handleDescriptionEndEditing() {
    this.logEvent('UploadLookScreen', { name: 'Additional Info Description', description: this.props.description });
    this.props.addDescription(this.state.description);
  }

  handleUrlEndEditing() {
    this.logEvent('UploadLookScreen', { name: 'Url', url: this.state.url });
    this.props.addUrl(this.state.url);
  }

  renderImageOverlay() {
    if (this.state.imageOverlayVisible) {
      return (
          <Modal animationType='fade'
             transparent={true}
             visible={this.state.imageOverlayVisible}
             onRequestClose={() => this.setState({imageOverlayVisible: false})}>
              <Image source={{uri: this.props.image}} style={{flex: 1}} resizeMode='cover'>
                <TouchableOpacity
                  style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}
                  onPress={() => this.setState({imageOverlayVisible: false})}>
                </TouchableOpacity>
              </Image>
          </Modal>

      );
    }

    return null;
  }

  renderConfirmUrlOverlay() {
    if (this.state.urlOverlayVisible) {
      return (
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.urlOverlayVisible}
            onRequestClose={() => this.setState({urlOverlayVisible: false})}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', opacity: 0.8, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
              <View style={{backgroundColor: '#FFFFFF', height: 350, width: 300}}>
                <View style={{flex: 1,  alignItems: 'center', padding: 20}}>
                  <View style={{flex: 6,  paddingBottom: 10}}>
                    <Text
                      style={[styles.text, {fontSize: 18}]}
                    >
                      Want to make more money?
                    </Text>
                    <View style={{width: 100, flexDirection: 'row', paddingVertical: 15}}>
                      <Image resizeMode={'contain'} source={smartphone} style={{width: 100, height: 100}}/>
                      <Image resizeMode={'contain'} source={dollarBill} style={{width: 100, height: 100}}/>
                    </View>
                    <Text
                      style={[styles.text, {fontSize: 14}]}
                    >
                      Make sure to copy-paste the exact
                      webpage of the item in your image
                    </Text>
                  </View>
                  <View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
                    <Gllu.Button
                      onPress={this.handleOkPress.bind(this)}
                      style={{alignSelf: 'center', width: 200}}
                      text="OK. Let's do it"
                    />
                    <Text style={styles.link} onPress={this.handleContinuePress.bind(this)}>
                      Continue Anyway
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
      );
    }

    return null;
  }

  createLookItemForVideo(position) {
    this.logEvent('AddItemScreen', { name: 'Marker add video' });
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'})
    });
  }

  renderImageWithTags() {
    const { items, image, itemId } = this.props;
    const { imageWidth } = this.state;
    const mode = this.getCurrentMode();
    return (
      <ImageWithTags
        items={items}
        image={image}
        width={80}
        showMarker={false}
        createLookItem={createLookItem}/>
    );
  }

  renderVideoWithTags() {
    const { image, itemId } = this.props;
    return (
      <VideoWithTags
        itemId={itemId}
        width={80}
        image={image}
        createLookItemForVideo={this.createLookItemForVideo.bind(this)}
      />
    );
  }

  render() {
    const { image, tags} = this.props;
    return(
      <ScrollView scrollEnabled={true} style={{paddingTop: 10, paddingHorizontal: 20, marginTop: 50}}>
        <Grid>
          <Row style={[styles.row, { flexDirection: 'row' }]}>
            <Col size={25} style={{paddingRight: 20}}>
              <TouchableOpacity onPress={this.handleImagePress.bind(this)}>
                  <Image
                      style={{width: 90, height: 160}}
                      source={{uri: image}}
                      resizeMode={'stretch'}
                      />
              </TouchableOpacity>
            </Col>
            <Col size={75} style={{flexDirection: 'column'}}>
              <TextInput
                textAlignVertical='top'
                multiline={true}
                style={styles.describe}
                value={this.state.description}
                placeholder="Describe what you're wearing..."
                underlineColorAndroid='transparent'
                onEndEditing={this.handleDescriptionEndEditing.bind(this)}
                onChangeText={(text) => this.updateSelectValue('description', text)}/>
            </Col>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.titleLabelInfo}>Add tags</Text>
            <TagInput
              tags={tags}
              addItemTag={this.props.addItemTag}
              removeItemTag={this.props.removeItemTag}
            />
          </Row>
          <Row style={styles.row}>
            <Text style={styles.titleLabelInfo}>Url</Text>
            <TextInput
              ref={ref => this.urlText = ref}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              keyboardType='url'
              style={styles.textInput}
              placeholder='http://www.gllu.com'
              onChangeText={text => this.updateSelectValue('url', text)}
              onEndEditing={this.handleUrlEndEditing.bind(this)}
              value={this.state.url}/>
          </Row>
          <Row style={[styles.row, {height: 100}]}>
            <Gllu.Button
              disabled={false}
              onPress={() => this.handlePublishPress()}
              text={ this.props.state == LOOK_STATES.PUBLISHED ? 'SAVE' : 'PUBLISH'}
            />
          </Row>
        </Grid>
        {this.renderImageOverlay()}
        {this.renderConfirmUrlOverlay()}
      </ScrollView>
    )
  }
}

import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    createLookItem: (tag) => dispatch(createLookItem(tag)),
    addDescription: (description) => dispatch(addDescription(description)),
    addUrl: (url) => dispatch(addUrl(url)),
    addLocation: (location) => dispatch(addLocation(location)),
    addTrustLevel: (number) => dispatch(addTrustLevel(number)),
    addPhotosVideo: (photos, video) => dispatch(addPhotosVideo(photos, video)),
    toggleOccasionTag: (tag, selected) => dispatch(toggleOccasionTag(tag, selected)),
    addItemTag: (name) => dispatch(addItemTag(name)),
    removeItemTag: (name) => dispatch(removeItemTag(name)),
  };
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id == itemId);
  let url = null;
  if (item) {
    if (item.url) {
      url = item.url;
    } else {
      url = item.brand ? item.brand.url : null;
    }
  }
  return {
    navigation: state.cardNavigation,
    ...state.uploadLook,
    occasions: item ? item.occasions : [],
    tags: item ? item.tags : [],
    photos: item ? item.photos : [],
    brandUrl: item && item.brand ? item.brand.url : null,
    url,
  }
};

export default connect(mapStateToProps, bindActions)(StepThreePublish);
