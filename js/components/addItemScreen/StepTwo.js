'use strict';

import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import ImagePicker from 'react-native-image-crop-picker';
import ImageWithTags from '../common/ImageWithTags';
import AddMore from './forms/AddMore';
import Location from './forms/Location';
import TrustLevel from './forms/TrustLevel';
import OccasionTags from './forms/OccasionTags';
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
  itemInfoView: {
    backgroundColor: 'transparent',
    padding: 20
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#7f7f7f',
    fontWeight: '300',
    marginBottom: 8
  },
  describe: {
    flex: 1,
    height: 60,
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#9E9E9E',
    marginVertical:6,
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  textInput: {
    width: w - 40,
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
    marginBottom: 20,
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

class StepTwo extends Component {
  static propTypes = {
    image: React.PropTypes.string,
    publishItem: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    description: React.PropTypes.string,
    photos: React.PropTypes.array,
    items: React.PropTypes.array,
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

  _renderDescribeAndTags() {
    return (
        <View style={{margin: 5}}>
        {/*
          <Text style={styles.titleLabelInfo}>Describe what you're wearing</Text>
          <TextInput multiline={true} style={styles.describe} value={this.props.description} onChangeText={(text) => this.updateSelectValue('description', text)}/>
        */}
          <OccasionTags selectedTags={this.props.occasionTags} toggleOccasionTag={this.props.toggleOccasionTag.bind(this)}/>
        </View>
    )
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

  render() {
    const { items, createLookItem, image} = this.props;
    return(
      <ScrollView scrollEnabled={true}>
        <View style={{padding: 15, alignItems: 'center'}}>
          <ImageWithTags
              items={items}
              image={image}
              createLookItem={createLookItem}
              width={IMAGE_VIEW_WIDTH}/>
        </View>
        <View style={styles.itemInfoView}>
            {/*<AddMore video={this.state.video} photos={this.props.photos} addVideo={this.addVideo.bind(this)} addPhoto={this.addPhoto.bind(this)} />*/}
            {this._renderDescribeAndTags()}
            {this._renderSelections()}
            <Button disabled={!this.state.confirm} transparent onPress={() => this._handlePublishItem()} style={styles.btnGoToStep3}>
                <Text style={styles.btnGoToStep3Text}>PUBLISH</Text>
            </Button>
        </View>
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
    occasionTags: item ? item.occasionTags : [],
    photos: item ? item.photos : [],
  }
};

export default connect(mapStateToProps, bindActions)(StepTwo);
