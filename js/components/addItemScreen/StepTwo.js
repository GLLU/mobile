'use strict';

import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { View, Content, Button, Text, Picker, Item, Icon } from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import ImagePicker from 'react-native-image-crop-picker';
import ImageWithTags from '../common/ImageWithTags';
import AddMore from './forms/AddMore';
import Location from './forms/Location';
import TrustLevel from './forms/TrustLevel';
import Tags from './forms/Tags';
import {
    addLocation,
    addTrustLevel,
    addPhotosVideo,
} from '../../actions';

import FontSizeCalculator from './../../calculators/FontSize';

const checkboxUncheckIcon = require('../../../images/icons/checkbox-uncheck.png');
const checkboxCheckedIcon = require('../../../images/icons/checkbox-checked.png');

const w = Dimensions.get('window').width;

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
    fontFamily: 'PlayfairDisplay',
    fontSize: new FontSizeCalculator(18).getSize(),
    fontFamily: 'Times New Roman',
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
    fontFamily: 'Times New Roman',
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
  }
});

class StepTwo extends Component {
  static propTypes = {
    image: React.PropTypes.string,
    continueAction: React.PropTypes.func,
    addTag: React.PropTypes.func,
    image: React.PropTypes.object,
    tags: React.PropTypes.array,
    continueAction: React.PropTypes.func,
    addLocation: React.PropTypes.func,
    addTrustLevel: React.PropTypes.func,
    addPhotosVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
        tags: ['dresses', 'black', 'red', 'white'],
        images:['', '', ''],
        video: '',
        videoUrl: '',
        tmpValue: '',
        location: 'us',
        trustLevel: '0',
        confirm: true,
    }
  }

  addPhoto(number) {
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      var path = image.path;
      var Extension = path.substring(path.lastIndexOf('.')+1).toLowerCase();
      if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") {
        let images = this.state.images;
        images[number - 1] = path;
        this.setState({images: images});
        this.props.addPhotosVideo(images, this.state.videoUrl);
        console.log(this.state.images);
      }
    });
  }

  addVideo() {
    console.log('Add video');
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
    }
  }

  addTags(name) {
    var tags = this.state.tags;
    var pos = tags.indexOf(name);
    if (pos < 0) {
      tags.push(name);
      this.setState({tags: tags, tmpValue: ''});
    }
  }

  removeTag(name) {
    var tags = this.state.tags;
    var pos = tags.indexOf(name);
    tags.splice(pos, 1);
    this.setState({tags: tags});
  }

  getHeight(number) {
    var l = this.state.tags.length;
    var rH = 80;
    var numR = Math.round(l / number);
    if (l > numR * number) {
      numR = numR + 1;
    }
    return numR == 0 ? 250 : numR * rH + 270;
  }

  _renderDescribeAndTags() {
    var number = w < 375 ? 2 : 3;
    var height = this.getHeight(number);
    return (
        <Content scrollEnabled={false} style={{height: height, margin: 5}}>
          <Text style={styles.titleLabelInfo}>Describe what you're wearing</Text>
          <Text style={styles.describe}>
            Add some details about the items you've tagged and some relevant <Text style={styles.hashTag}>#hashtags</Text> to make it easier for people to find it
          </Text>
          <Text style={[styles.titleLabelInfo, {marginTop: 20}]}>Add tags</Text>
          <TextInput
              returnKeyType="done"
              placeholder=""
              value={this.state.tmpValue}
              keyboardType="default"
              placeholderTextColor="#BDBDBD"
              style={styles.textInput}
              onSubmitEditing={(event) => this.addTags(event.nativeEvent.text)}
              onChangeText={(text) => this.setState({tmpValue: text})} />
          <Tags tags={this.state.tags} removeTag={this.removeTag.bind(this)} />
        </Content>
    )
  }

  _renderSelections(){
    const checkBoxIcon = this.state.confirm ? checkboxCheckedIcon : checkboxUncheckIcon;
    return (
        <Content scrollEnabled={false} style={{height: 400, margin: 5}}>
            <Text style={[styles.titleLabelInfo, {color: '#333333'}]}>Improve your sales experience</Text>
            <Location location={this.state.location} updateSelectValue={this.updateSelectValue.bind(this)} />
            <TrustLevel trustLevel={this.state.trustLevel} updateSelectValue={this.updateSelectValue.bind(this)} />
            <Grid>
              <Col size={15}>
                <Button transparent onPress={() => this.setState({confirm: !this.state.confirm})} style={styles.fakeCheckbox}>
                  <Image source={checkBoxIcon} style={[styles.normalIconImage, {width: 25, height: 25}]} />
                </Button>
              </Col>
              <Col size={85}>
                <Text adjustsFontSizeToFit={true} numberOfLines={6} style={styles.confirmText}>
                  {'You will now become a "Glluer Presenter" while your exact measurements will still be hiddden. People that will view this item. Will see a % value of matching between their measurements and yours.'}
                </Text>
              </Col>
            </Grid>
        </Content>
    )
  }

  render() {
    const { tags, addTag, image} = this.props;
    return(
      <ScrollView scrollEnabled={true}>
        <View style={{padding: 20}}>
          <ImageWithTags tags={tags} image={image} addTag={addTag} width={w - 40}/>
        </View>
        <View style={styles.itemInfoView}>
            <AddMore video={this.state.video} images={this.state.images} addVideo={this.addVideo.bind(this)} addPhoto={this.addPhoto.bind(this)} />
            {this._renderDescribeAndTags()}
            {this._renderSelections()}
            <Button transparent onPress={() => this.props.continueAction()} style={styles.btnGoToStep3}>
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
    addTag: (tag) => dispatch(addTag(tag)),
    addLocation: (location) => dispatch([addLocation(location)]),
    addTrustLevel: (number) => dispatch([addTrustLevel(number)]),
    addPhotosVideo: (photos, video) => dispatch([addPhotosVideo(photos, video)]),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(StepTwo);
