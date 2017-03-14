'use strict';

import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";
import ImagePicker from 'react-native-image-crop-picker';
import ImageWithTags from '../common/ImageWithTags';
import TagInput from './forms/TagInput';
import AddMore from './forms/AddMore';
import Location from './forms/Location';
import TrustLevel from './forms/TrustLevel';
import OccasionsDropdown from './forms/OccasionsDropdown';
import Gllu from '../common';
import BaseComponent from '../common/BaseComponent';
import {
    createLookItem,
    addDescription,
    addLocation,
    addTrustLevel,
    addPhotosVideo,
    toggleOccasionTag
} from '../../actions';
import _ from 'lodash';

import FontSizeCalculator from './../../calculators/FontSize';

const checkboxUncheckIcon = require('../../../images/icons/checkbox-uncheck.png');
const checkboxCheckedIcon = require('../../../images/icons/checkbox-checked.png');

const w = Dimensions.get('window').width;
const BTN_RADIO_MARGIN_TOP = w < 375 ? 0 : 10;
import { IMAGE_VIEW_WIDTH } from './styles';

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
    marginBottom: 10
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
    width: (w / 8) * 6,
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
});

class StepTwo extends BaseComponent {
  static propTypes = {
    image: React.PropTypes.string,
    publishItem: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    description: React.PropTypes.string,
    photos: React.PropTypes.array,
    items: React.PropTypes.array,
    occasionTags: React.PropTypes.array,
    addDescription: React.PropTypes.func,
    addLocation: React.PropTypes.func,
    addTrustLevel: React.PropTypes.func,
    addPhotosVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
        images:['', '', ''],
        video: '',
        videoUrl: '',
        location: 'us',
        trustLevel: '0',
        confirm: false,
    }
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
    this.setState({[key]: value});
    switch (key) {
      case 'location':
        this.props.addLocation(value);
        break;
      case 'trustLevel':
        this.props.addTrustLevel(value);
        break;
      case 'description':
        this.props.addDescription(value);
        break;
    }
  }

  _handlePublishItem() {
    this.props.publishItem();
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
  }

  handleUrlEndEditing() {
   this.logEvent('UploadLookScreen', { name: 'Url' }); 
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

  render() {
    const { items, createLookItem, image} = this.props;
    return(
      <ScrollView scrollEnabled={true} style={{paddingTop: 10, paddingHorizontal: 20}}>
        <Grid>
          <Row style={styles.row, { flexDirection: 'row' }}>
            <Col size={25} style={{paddingRight: 20}}>
              <TouchableOpacity onPress={this.handleImagePress.bind(this)}>
                <ImageWithTags
                    items={items}
                    image={image}
                    width={80}
                    showMarker={false}
                    createLookItem={createLookItem}/>
              </TouchableOpacity>
            </Col>
            <Col size={75} style={{flexDirection: 'column'}}>
              <TextInput
                textAlignVertical='top'
                multiline={true}
                style={styles.describe}
                value={this.props.description}
                placeholder="Describe what you're wearing..."
                onEndEditing={this.handleDescriptionEndEditing.bind(this)}
                onChangeText={(text) => this.updateSelectValue('description', text)}/>
            </Col>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.titleLabelInfo}>Occassions</Text>
            <OccasionsDropdown selectedTags={this.props.occasionTags} toggleOccasionTag={this.props.toggleOccasionTag.bind(this)}/>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.titleLabelInfo}>Add tags</Text>
            <TagInput/>
          </Row>
          <Row style={styles.row}>
            <Text style={styles.titleLabelInfo}>Url</Text>
            <TextInput
              underlineColorAndroid='transparent'
              style={styles.textInput}
              placeholder='http://www.gllu.com'
              onEndEditing={this.handleUrlEndEditing.bind(this)}
              value={this.props.url}/>
          </Row>
          <Row style={[styles.row, {paddingBottom: 60}]}>
            <Gllu.Button
              disabled={false}
              onPress={() => this._handlePublishItem()}
              text='PUBLISH'
            />
          </Row>
        </Grid>
        {this.renderImageOverlay()}
      </ScrollView>
    )
  }
}

import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    createLookItem: (tag) => dispatch(createLookItem(tag)),
    addDescription: (description) => dispatch(addDescription(description)),
    addLocation: (location) => dispatch(addLocation(location)),
    addTrustLevel: (number) => dispatch(addTrustLevel(number)),
    addPhotosVideo: (photos, video) => dispatch(addPhotosVideo(photos, video)),
    toggleOccasionTag: (tag, selected) => dispatch(toggleOccasionTag(tag, selected)),
  };
}

const mapStateToProps = state => {
  const { itemId, items } = state.uploadLook;
  const item = _.find(items, item => item.id == itemId);
  return {
    navigation: state.cardNavigation,
    ...state.uploadLook,
    occasionTags: [{ id: 103,
       name: 'Date'}],
    photos: item ? item.photos : [],
  }
};

export default connect(mapStateToProps, bindActions)(StepTwo);
